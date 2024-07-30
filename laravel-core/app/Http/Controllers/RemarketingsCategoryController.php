<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Remarketing;
use App\Http\Controllers\Controller;
use App\Models\RemarketingsCategory;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreRemarketingsCategoryRequest;
use App\Http\Requests\UpdateRemarketingsCategoryRequest;

class RemarketingsCategoryController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Remarketings/CreateCategory');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRemarketingsCategoryRequest $request)
    {
        $category = RemarketingsCategory::create([
            "name" => $request->input('name'), 
            "description" => $request->input('description'), 
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ]);
        if ($category) {
            return redirect()->route('programs.index')->with('success', 'Category of remarketings created successfully.');
        } else {
            return redirect()->back()->with('error', 'Category of remarketings could not be created.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RemarketingsCategory $category)
    {
        return Inertia::render('Remarketings/EditCategory', ["category" => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRemarketingsCategoryRequest $request, RemarketingsCategory $category)
    {
        $category->update([
            "name" => $request->input('name'), 
            "description" => $request->input('description'), 
            'updated_by' => Auth::user()->id,
        ]);
    
        if ($category->wasChanged()) {
            return redirect()->route('programs.index')->with('success', 'Category of remarketings edited successfully.');
        } else {
            return redirect()->back()->with('error', 'Category of remarketings could not be edited.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RemarketingsCategory $category)
    {
        $category->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        Remarketing::where('category', $category->id)->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        if ($category ->wasChanged()) {
            return redirect()->route('programs.index')->with('success', 'Category of remarketings deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Category of remarketings could not be deleted.');
        }
    }
}
