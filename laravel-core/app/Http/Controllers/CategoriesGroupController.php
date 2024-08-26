<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\CategoriesGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreCategoriesGroupRequest;
use App\Http\Requests\UpdateCategoriesGroupRequest;

class CategoriesGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = CategoriesGroup::with(["createdBy", "updatedBy", "deletedBy", 'categories'])
            ->whereNull('deleted_by')
            ->whereNull('deleted_at')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Categories/Index', [
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
        $facebookCategories = config('settings.categories');
        return Inertia::render('Categories/Create', [
            'facebookCategories' => $facebookCategories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoriesGroupRequest $request)
    {
        DB::beginTransaction();
        
        try {
            $group = CategoriesGroup::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "created_by" => Auth::id(),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {

                foreach($request->input('categories') as $category) {
                    if (!empty($category)) {
                        
                        Category::create([
                            'category' => $category,
                            'categories_group_id' => $group->id,
                            "created_by" => Auth::id(),
                            "updated_by" => Auth::id(),
                        ]);
                    }
                }

                DB::commit();
                return redirect()->route('categories.index')->with('success', 'Group of categories created successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of categories could not be created.');
            }
        } catch (\Exception $e) {
            
            DB::rollBack();
            Log::error('Error creating categories Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while creating the group of categories.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CategoriesGroup $group)
    {
        $group = CategoriesGroup::with('categories')->find($group->id);
        $group->string_categories = $group->categories->pluck('category');
        
        $facebookCategories = config('settings.categories');

        return Inertia::render('Categories/Edit', [
            'group' => $group,
            'facebookCategories' => $facebookCategories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoriesGroupRequest $request, CategoriesGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {
                $inputCategories = $request->input('categories', []);
                $existingCategories = Category::where('categories_group_id', $group->id)->pluck('id', 'category')->toArray();
                
                foreach($inputCategories as $category) {
                    if (!empty($category)) {
                        if (array_key_exists($category, $existingCategories)) {

                            Category::where('categories_group_id', $group->id)
                                ->where('category', $category)
                                ->update([
                                    'category' => $category,
                                    "deleted_at" => null,
                                    "deleted_by" => null,
                                    'updated_at' => now(),
                                    'updated_by' => Auth::user()->id,
                                ]);
                            unset($existingCategories[$category]);
                        } else {
                            
                            Category::create([
                                'category' => $category,
                                'categories_group_id' => $group->id,
                                'created_by' => Auth::user()->id,
                                'updated_by' => Auth::user()->id,
                            ]);
                        }
                    }
                }
                if (!empty($existingCategories)) {
                    Category::where('categories_group_id', $group->id)
                        ->whereIn('category', array_keys($existingCategories))
                        ->update([
                            "deleted_at" => now(),
                            "deleted_by" => Auth::user()->id
                        ]);
                }
                DB::commit();
                return redirect()->route('categories.index')->with('success', 'Group of categories updated successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of categories could not be updated.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating categories Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while updating the group of categories.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CategoriesGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                "deleted_by" => Auth::id(),
                "deleted_at" => now(),
            ]);

            if ($group) {
                Category::where('categories_group_id', $group->id)
                ->update([
                    "deleted_at" => now(),
                    "deleted_by" => Auth::user()->id
                ]);;
                DB::commit();
                return redirect()->route('categories.index')->with('success', 'Group of categories deleted successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of categories could not be deleted.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting categories Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while deleting the group of categories.');
        }
    }
}
