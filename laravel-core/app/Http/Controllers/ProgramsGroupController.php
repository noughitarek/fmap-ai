<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Program;
use App\Models\ProgramsGroup;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProgramsGroupRequest;
use App\Http\Requests\UpdateProgramsGroupRequest;

class ProgramsGroupController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Programs/CreateGroup');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProgramsGroupRequest $request)
    {
        $group = ProgramsGroup::create([
            "name" => $request->input('name'), 
            "description" => $request->input('description'), 
            "total_used" => 0, 
            "total_orders" => 0, 
            "total_responses" => 0, 
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ]);
        if ($group) {
            return redirect()->route('programs.index')->with('success', 'Group of programs created successfully.');
        } else {
            return redirect()->back()->with('error', 'Group of programs could not be created.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProgramsGroup $group)
    {
        return Inertia::render('Programs/EditGroup', ['group' => $group]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProgramsGroupRequest $request, ProgramsGroup $group)
    {
        $group->update([
            "name" => $request->input('name'), 
            "description" => $request->input('description'), 
            'updated_by' => Auth::user()->id,
        ]);
    
        if ($group->wasChanged()) {
            return redirect()->route('programs.index')->with('success', 'Group of programs edited successfully.');
        } else {
            return redirect()->back()->with('error', 'Group of programs could not be edited.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProgramsGroup $group)
    {
        $group->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        Program::where('group_id', $group->id)->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        if ($group->wasChanged()) {
            return redirect()->route('programs.index')->with('success', 'Group of programs deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Group of programs could not be deleted.');
        }
    }
}
