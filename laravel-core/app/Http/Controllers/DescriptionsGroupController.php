<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Description;
use App\Models\DescriptionsGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDescriptionsGroupRequest;
use App\Http\Requests\UpdateDescriptionsGroupRequest;

class DescriptionsGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = DescriptionsGroup::with(["createdBy", "updatedBy", "deletedBy", 'descriptions'])
            ->whereNull('deleted_by')
            ->whereNull('deleted_at')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Descriptions/Index', [
            'groups' => $groups,
            'from' => 1,
            'to' => $groups->count(),
            'total' => $groups->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Descriptions/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDescriptionsGroupRequest $request)
    {
        DB::beginTransaction();
        
        try {
            $group = DescriptionsGroup::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "created_by" => Auth::id(),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {

                foreach($request->input('descriptions') as $description) {
                    if (!empty($description)) {
                        
                        Description::create([
                            'description' => $description,
                            'descriptions_group_id' => $group->id,
                            "created_by" => Auth::id(),
                            "updated_by" => Auth::id(),
                        ]);
                    }
                }

                DB::commit();
                return redirect()->route('descriptions.index')->with('success', 'Group of descriptions created successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of descriptions could not be created.');
            }
        } catch (\Exception $e) {
            
            DB::rollBack();
            Log::error('Error creating DescriptionsGroup: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while creating the group of descriptions.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DescriptionsGroup $group)
    {
        $group = DescriptionsGroup::with('descriptions')
        ->find($group->id);


        $group->string_descriptions = $group->descriptions->pluck('description');
        return Inertia::render('Descriptions/Edit', ['group' => $group]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDescriptionsGroupRequest $request, DescriptionsGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {
                $inputDescriptions = $request->input('descriptions', []);
                $existingDescriptions = Description::where('descriptions_group_id', $group->id)->pluck('id', 'description')->toArray();
                
                foreach($inputDescriptions as $description) {
                    if (!empty($description)) {
                        if (array_key_exists($description, $existingDescriptions)) {

                            Description::where('descriptions_group_id', $group->id)
                                ->where('description', $description)
                                ->update([
                                    'description' => $description,
                                    "deleted_at" => null,
                                    "deleted_by" => null,
                                    'updated_at' => now(),
                                    'updated_by' => Auth::user()->id,
                                ]);
                            unset($existingDescriptions[$description]);
                        } else {
                            
                            Description::create([
                                'description' => $description,
                                'descriptions_group_id' => $group->id,
                                'created_by' => Auth::user()->id,
                                'updated_by' => Auth::user()->id,
                            ]);
                        }
                    }
                }
                if (!empty($existingDescriptions)) {
                    Description::where('descriptions_group_id', $group->id)
                        ->whereIn('description', array_keys($existingDescriptions))
                        ->update([
                            "deleted_at" => now(),
                            "deleted_by" => Auth::user()->id
                        ]);
                }
                DB::commit();
                return redirect()->route('descriptions.index')->with('success', 'Group of descriptions updated successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of descriptions could not be updated.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating DescriptionsGroup: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while updating the group of descriptions.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DescriptionsGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                "deleted_by" => Auth::id(),
                "deleted_at" => now(),
            ]);

            if ($group) {
                Description::where('descriptions_group_id', $group->id)
                ->update([
                    "deleted_at" => now(),
                    "deleted_by" => Auth::user()->id
                ]);;
                DB::commit();
                return redirect()->route('descriptions.index')->with('success', 'Group of descriptions deleted successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of descriptions could not be deleted.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting DescriptionsGroup: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while deleting the group of descriptions.');
        }
    }
}
