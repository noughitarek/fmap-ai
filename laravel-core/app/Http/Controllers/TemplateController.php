<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Template;
use App\Models\TemplatesGroup;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTemplateRequest;
use App\Http\Requests\UpdateTemplateRequest;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = TemplatesGroup::with("createdBy", "updatedBy", "deletedBy", 'templates.group', 'templates.createdBy', 'templates.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        foreach ($groups as &$group) {
            foreach ($group['templates'] as &$template) {
                $template['stringphotos'] = $template['photos'];
                $template['stringvideos'] = $template['videos'];
                $template['stringaudios'] = $template['audios'];

                $template['photos'] = $this->convertStringToArray($template['photos']);
                $template['videos'] = $this->convertStringToArray($template['videos']);
                $template['audios'] = $this->convertStringToArray($template['audios']);
            }
        }

        return Inertia::render('Templates/Index', [
            'groups' => $groups,
            'from' => 1,
            'to' => count($groups),
            'total' => count($groups),
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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $groups = TemplatesGroup::with("createdBy", "updatedBy", "deletedBy", 'templates.group', 'templates.createdBy', 'templates.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        return Inertia::render('Templates/CreateTemplate', [
            'groups' => $groups
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTemplateRequest $request)
    {
        $photosPaths = [];
        $videosPaths = [];
        $audiosPaths = [];
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $photo->getClientOriginalExtension();
                $photo->move(public_path('storage/photos'), $filename);
                $photosPaths[] = asset('storage/photos/' . $filename);
            }
        }
        if ($request->hasFile('videos')) {
            foreach ($request->file('videos') as $video) {
                $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $video->getClientOriginalExtension();
                $video->move(public_path('storage/videos'), $filename);
                $videosPaths[] = asset('storage/videos/' . $filename);
            }
        }
        if ($request->hasFile('audios')) {
            foreach ($request->file('audios') as $audio) {
                $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $audio->getClientOriginalExtension();
                $audio->move(public_path('storage/audios'), $filename);
                $audiosPaths[] = asset('storage/audios/' . $filename);
            }
        }
        $template = Template::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'group_id' => $request->input('group_id'),
            'photos' => implode(',', $photosPaths),
            'videos' => implode(',', $videosPaths),
            'audios' => implode(',', $audiosPaths),
            'message' => $request->input('message'),
            'created_by' => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ]);
        if ($template) {
            return redirect()->route('templates.index')->with('success', 'Template created successfully.');
        } else {
            return redirect()->back()->with('error', 'Template could not be created.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Template $template)
    {
        $template->group = TemplatesGroup::find($template->group_id);
        $template->photos = $this->convertStringToArray($template->photos);
        $template->videos = $this->convertStringToArray($template->videos);
        $template->audios = $this->convertStringToArray($template->audios);

        $groups = TemplatesGroup::with("createdBy", "updatedBy", "deletedBy", 'templates.group', 'templates.createdBy', 'templates.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        return Inertia::render('Templates/EditTemplate', ['template' => $template->toArray(), 'groups' => $groups]);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTemplateRequest $request, Template $template)
    {
        $photosPaths = [];
        $videosPaths = [];
        $audiosPaths = [];
    
        if ($request->hasFile('photos')) {
            foreach ($request->file('photos') as $photo) {
                $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $photo->getClientOriginalExtension();
                $photo->move(public_path('storage/photos'), $filename);
                $photosPaths[] = asset('storage/photos/' . $filename);
            }
        }
        if($request->has('old_photos')){
            foreach ($request->input('old_photos') as $photo) {
                $photosPaths[] = $photo;
            }
        }
    
        if ($request->hasFile('videos')) {
            foreach ($request->file('videos') as $video) {
                $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $video->getClientOriginalExtension();
                $video->move(public_path('storage/videos'), $filename);
                $videosPaths[] = asset('storage/videos/' . $filename);
            }
        }
        if($request->has('old_videos')){
            foreach ($request->input('old_videos') as $video) {
                $videosPaths[] = $video;
            }
        }
    
        if ($request->hasFile('audios')) {
            foreach ($request->file('audios') as $audio) {
                $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $audio->getClientOriginalExtension();
                $audio->move(public_path('storage/audios'), $filename);
                $audiosPaths[] = asset('storage/audios/' . $filename);
            }
        }
        if($request->has('old_audios')){
            foreach ($request->input('old_audios') as $audio) {
                $audiosPaths[] = $audio;
            }
        }
        $template->update([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'group_id' => $request->input('group_id'),
            'photos' => implode(',', $photosPaths),
            'videos' => implode(',', $videosPaths),
            'audios' => implode(',', $audiosPaths),
            'message' => $request->input('message'),
            'updated_by' => Auth::user()->id
        ]);
        
        if ($template->wasChanged()) {
            return redirect()->route('templates.index')->with('success', 'Template updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Template could not be updated.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Template $template)
    {
        $template->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        if ($template->wasChanged()) {
            return redirect()->route('templates.index')->with('success', 'Template deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Template could not be deleted.');
        }
    }

    /**
     * Generates a random unique name of a specified length.
     *
     * @param int $length The length of the generated name. Default is 8.
     * @return string The randomly generated unique name.
     */
    private function generateRandomUniqueName($length = 8) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomName = '';
        
        for ($i = 0; $i < $length; $i++) {
            $randomName .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomName;
    }
}
