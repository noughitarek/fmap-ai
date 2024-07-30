<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Program;
use App\Models\ProgramRecord;
use App\Models\ProgramsGroup;
use App\Models\TemplatesGroup;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = ProgramsGroup::with("createdBy", "updatedBy", "deletedBy", 'programs.group', 'programs.createdBy', 'programs.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        return Inertia::render('Programs/Index', [
            'groups' => $groups,
            'from' => 1,
            'to' => count($groups),
            'total' => count($groups),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $groups = ProgramsGroup::with("createdBy", "updatedBy", "deletedBy", 'programs.group', 'programs.createdBy', 'programs.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();
        
        $templates_groups = TemplatesGroup::with("createdBy", "updatedBy", "deletedBy", 'templates.group', 'templates.createdBy', 'templates.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        foreach ($templates_groups as &$group) {
            foreach ($group['templates'] as &$template) {
                $template['stringphotos'] = $template['photos'];
                $template['stringvideos'] = $template['videos'];
                $template['stringaudios'] = $template['audios'];

                $template['photos'] = $this->convertStringToArray($template['photos']);
                $template['videos'] = $this->convertStringToArray($template['videos']);
                $template['audios'] = $this->convertStringToArray($template['audios']);
            }
        }
        
        return Inertia::render('Programs/CreateProgram', [
            'groups' => $groups,
            'templates_groups' => $templates_groups,
        ]);
    }

    /**
     * Splits a comma-separated string of file paths into an array of individual file paths.
     *
     * @param string $filePathsString Comma-separated string of file paths.
     * @return array Array of trimmed, non-empty file paths.
     */
    private function convertStringToArray($filePathsString)
    {
        $filePaths = explode(',', $filePathsString);
        $filePaths = array_map('trim', $filePaths);
        $filePaths = array_filter($filePaths);
        return $filePaths;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgramRequest $request)
    {
        $program = Program::create([
            "name" => $request->input('name'),
            "description" => $request->input('description'),
            "group_id" => $request->input('group_id'),
            "reuse_after" => $request->input('reuse_after')*$request->input('unit_of_time'),
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ]);
        foreach($request->input('program_records') as $record)
        {
            ProgramRecord::create([
                "templates_group_id" => $record['group']==0?null:$record['group'],
                "template_id" => $record['template']==0?null:$record['template'],
                "program_id" => $program->id ,
                "send_after" => $record['send_after']*($record['unit_of_time']??1)
            ]);
        }
        if ($program) {
            return redirect()->route('programs.index')->with('success', 'Program created successfully.');
        } else {
            return redirect()->back()->with('error', 'Program could not be created.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Program $program)
    {
        $program = Program::with('records.template', 'records.group', 'group')->find($program->id)->toArray();
        
        $templates_groups = TemplatesGroup::with("createdBy", "updatedBy", "deletedBy", 'templates.group', 'templates.createdBy', 'templates.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $groups = ProgramsGroup::with("createdBy", "updatedBy", "deletedBy", 'programs.group', 'programs.createdBy', 'programs.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get();

        return Inertia::render('Programs/EditProgram', ['program' => $program, 'groups' => $groups, 'templates_groups' => $templates_groups]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgramRequest $request, Program $program)
    {
        $program->update([
            "name" => $request->input('name'),
            "description" => $request->input('description'),
            "group_id" => $request->input('group_id'),
            "reuse_after" => $request->input('reuse_after'),
            "updated_by" => Auth::user()->id,
        ]);
        ProgramRecord::where('program_id', $program->id)->delete();
        $conversations = FacebookConversation::where('program_id', $program->id)->get();
        
        foreach($conversations as $conversation){
            
            $conversation->program_id = null;
            $conversation->save();
            
            RemarketingMessage::where('facebook_conversation', $conversation->facebook_conversation_id)
            ->whereNull('sent_at')
            ->where('archived', 0)
            ->delete();
        }
        foreach($request->input('program_records') as $record)
        {
            if(isset($record['template'])){
                if(is_array($record['template'])){
                    $template = $record['template']['id'];
                }elseif($record['template'] != 0){
                    $template = $record['template'];
                }else{
                    $template = null;
                }
            }else{
                $template = null;
            }
            if(isset($record['group'])){
                if(is_array($record['group'])){
                    $templates_group = $record['group']['id'];
                }elseif($record['group'] != 0){
                    $templates_group = $record['group'];
                }else{
                    $templates_group = null;
                }
            }else{
                $templates_group = null;
            }
            ProgramRecord::create([
                "templates_group_id" => $templates_group,
                "template_id" => $template,
                "program_id" => $program->id ,
                "send_after" => ($record['send_after'] ?? 0) * ($record['unit_of_time'] ?? 1),
            ]);
        }
        if ($program->wasChanged()) {
            return redirect()->route('programs.index')->with('success', 'Program updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Program could not be updated.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Program $program)
    {
        $program->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        if ($program->wasChanged()) {
            return redirect()->route('programs.index')->with('success', 'Program deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Program could not be deleted.');
        }
    }
}
