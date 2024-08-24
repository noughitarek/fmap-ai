<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use App\Models\TagsGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTagsGroupRequest;
use App\Http\Requests\UpdateTagsGroupRequest;

class TagsGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = TagsGroup::with(["createdBy", "updatedBy", "deletedBy", 'tags'])
            ->whereNull('deleted_by')
            ->whereNull('deleted_at')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Tags/Index', [
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
        return Inertia::render('Tags/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTagsGroupRequest $request)
    {
        DB::beginTransaction();
        
        try {
            $group = TagsGroup::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "created_by" => Auth::id(),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {

                foreach($request->input('tags') as $tag) {
                    if (!empty($tag)) {
                        
                        Tag::create([
                            'tag' => $tag,
                            'tags_group_id' => $group->id,
                            "created_by" => Auth::id(),
                            "updated_by" => Auth::id(),
                        ]);
                    }
                }

                DB::commit();
                return redirect()->route('tags.index')->with('success', 'Group of tags created successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of tags could not be created.');
            }
        } catch (\Exception $e) {
            
            DB::rollBack();
            Log::error('Error creating Tags Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while creating the group of tags.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TagsGroup $group)
    {
        $group = TagsGroup::with('tags')
        ->find($group->id);

        $group->string_tags = $group->tags->pluck('tag');

        return Inertia::render('Tags/Edit', ['group' => $group]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTagsGroupRequest $request, TagsGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {
                $inputTags = $request->input('tags', []);
                $existingTags = Tag::where('tags_group_id', $group->id)->pluck('id', 'tag')->toArray();
                
                foreach($inputTags as $tag) {
                    if (!empty($tag)) {
                        if (array_key_exists($tag, $existingTags)) {

                            Tag::where('tags_group_id', $group->id)
                                ->where('tag', $tag)
                                ->update([
                                    'tag' => $tag,
                                    "deleted_at" => null,
                                    "deleted_by" => null,
                                    'updated_at' => now(),
                                    'updated_by' => Auth::user()->id,
                                ]);
                            unset($existingTags[$tag]);
                        } else {
                            
                            Tag::create([
                                'tag' => $tag,
                                'tags_group_id' => $group->id,
                                'created_by' => Auth::user()->id,
                                'updated_by' => Auth::user()->id,
                            ]);
                        }
                    }
                }
                if (!empty($existingTags)) {
                    Tag::where('tags_group_id', $group->id)
                        ->whereIn('tag', array_keys($existingTags))
                        ->update([
                            "deleted_at" => now(),
                            "deleted_by" => Auth::user()->id
                        ]);
                }
                DB::commit();
                return redirect()->route('tags.index')->with('success', 'Group of tags updated successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of tags could not be updated.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating Tags Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while updating the group of tags.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TagsGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                "deleted_by" => Auth::id(),
                "deleted_at" => now(),
            ]);

            if ($group) {
                Tag::where('tags_group_id', $group->id)
                ->update([
                    "deleted_at" => now(),
                    "deleted_by" => Auth::user()->id
                ]);;
                DB::commit();
                return redirect()->route('tags.index')->with('success', 'Group of tags deleted successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of tags could not be deleted.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting tags Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while deleting the group of tags.');
        }
    }
}
