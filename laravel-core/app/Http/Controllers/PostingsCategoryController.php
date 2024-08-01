<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\PostingsCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePostingsCategoryRequest;
use App\Http\Requests\UpdatePostingsCategoryRequest;

class PostingsCategoryController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Postings/CreateCategory');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostingsCategoryRequest $request)
    {
        $category = PostingsCategory::create([
            "name" => $request->input('name'), 
            "description" => $request->input('description'), 
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ]);
        if ($category) {
            return redirect()->route('postings.index')->with('success', 'Category of postings created successfully.');
        } else {
            return redirect()->back()->with('error', 'Category of postings could not be created.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PostingsCategory $category)
    {
        return Inertia::render('Postings/EditCategory', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostingsCategoryRequest $request, PostingsCategory $category)
    {
        $category->update([
            "name" => $request->input('name'), 
            "description" => $request->input('description'), 
            'updated_by' => Auth::user()->id,
        ]);
    
        if ($category->wasChanged()) {
            return redirect()->route('postings.index')->with('success', 'Category of postings edited successfully.');
        } else {
            return redirect()->back()->with('error', 'Category of postings could not be edited.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostingsCategory $category)
    {
        $category->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        Posting::where('postings_category_id', $category->id)->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        if ($category->wasChanged()) {
            return redirect()->route('postings.index')->with('success', 'Category of postings deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Category of postings could not be deleted.');
        }
    }
}
