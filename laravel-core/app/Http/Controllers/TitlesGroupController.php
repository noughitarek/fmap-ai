<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Title;
use App\Models\TitlesGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTitlesGroupRequest;
use App\Http\Requests\UpdateTitlesGroupRequest;

class TitlesGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = TitlesGroup::with(["createdBy", "updatedBy", "deletedBy", 'titles'])
            ->whereNull('deleted_by')
            ->whereNull('deleted_at')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Titles/Index', [
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
        return Inertia::render('Titles/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTitlesGroupRequest $request)
    {
        DB::beginTransaction();
        
        try {
            $group = TitlesGroup::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "created_by" => Auth::id(),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {

                foreach($request->input('titles') as $title) {
                    if (!empty($title)) {
                        
                        Title::create([
                            'title' => $title,
                            'titles_group_id' => $group->id,
                            "created_by" => Auth::id(),
                            "updated_by" => Auth::id(),
                        ]);
                    }
                }

                DB::commit();
                return redirect()->route('titles.index')->with('success', 'Group of titles created successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of titles could not be created.');
            }
        } catch (\Exception $e) {
            
            DB::rollBack();
            Log::error('Error creating TitlesGroup: ' . $e->getMessage());
            print_r($e->getMessage());
            exit;
            return redirect()->back()->with('error', 'An error occurred while creating the group of titles.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TitlesGroup $group)
    {
        $group = TitlesGroup::with('titles')
        ->find($group->id);


        $group->string_titles = $group->titles->pluck('title');
        return Inertia::render('Titles/Edit', ['group' => $group]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTitlesGroupRequest $request, TitlesGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {
                $inputTitles = $request->input('titles', []);
                $existingTitles = Title::where('titles_group_id', $group->id)->pluck('id', 'title')->toArray();
                
                foreach($inputTitles as $title) {
                    if (!empty($title)) {
                        if (array_key_exists($title, $existingTitles)) {

                            Title::where('titles_group_id', $group->id)
                                ->where('title', $title)
                                ->update([
                                    'title' => $title,
                                    "deleted_at" => null,
                                    "deleted_by" => null,
                                    'updated_at' => now(),
                                    'updated_by' => Auth::user()->id,
                                ]);
                            unset($existingTitles[$title]);
                        } else {
                            
                            Title::create([
                                'title' => $title,
                                'titles_group_id' => $group->id,
                                'created_by' => Auth::user()->id,
                                'updated_by' => Auth::user()->id,
                            ]);
                        }
                    }
                }
                if (!empty($existingTitles)) {
                    Title::where('titles_group_id', $group->id)
                        ->whereIn('title', array_keys($existingTitles))
                        ->update([
                            "deleted_at" => now(),
                            "deleted_by" => Auth::user()->id
                        ]);
                }
                DB::commit();
                return redirect()->route('titles.index')->with('success', 'Group of titles updated successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of titles could not be updated.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating TitlesGroup: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while updating the group of titles.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TitlesGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                "deleted_by" => Auth::id(),
                "deleted_at" => now(),
            ]);

            if ($group) {
                Title::where('titles_group_id', $group->id)->update([
                    "deleted_at" => now(),
                    "deleted_by" => Auth::user()->id
                ]);
                DB::commit();
                return redirect()->route('titles.index')->with('success', 'Group of titles deleted successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of titles could not be deleted.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting TitlesGroup: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while deleting the group of titles.');
        }
    }
}
