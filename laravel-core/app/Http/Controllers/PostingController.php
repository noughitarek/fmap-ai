<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Posting;
use App\Models\PhotosGroup;
use App\Models\TitlesGroup;
use App\Models\AccountsGroup;
use App\Models\PostingsPrices;
use App\Models\PostingsCategory;
use App\Models\DescriptionsGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePostingRequest;
use App\Http\Requests\UpdatePostingRequest;

class PostingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = PostingsCategory::with("createdBy", "updatedBy", "deletedBy", 'postings.postingsCategory', 'postings.postingPrices', 'postings.createdBy', 'postings.updatedBy')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        return Inertia::render('Postings/Index', [
            'categories' => $categories,
            'from' => 1,
            'to' => count($categories),
            'total' => count($categories),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = PostingsCategory::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $accounts = AccountsGroup::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $titles = TitlesGroup::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $photos = PhotosGroup::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $descriptions = DescriptionsGroup::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        return Inertia::render('Postings/CreatePosting', [
            'categories' => $categories,
            'accounts' => $accounts,
            'titles' => $titles,
            'photos' => $photos,
            'descriptions' => $descriptions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostingRequest $request)
    {
        DB::beginTransaction();
        
        try {
            $posting = Posting::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                
                'postings_category_id' => $request->input('postings_category_id'),

                'accounts_group_id' => $request->input('accounts_group_id'),
                'titles_group_id' => $request->input('titles_group_id'),
                'photos_group_id' => $request->input('photos_group_id'),
                'descriptions_group_id' => $request->input('descriptions_group_id'),

                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
            ]);
                
            if ($posting) {
                foreach($request->input('posting_prices') as $price) {
                    if (!empty($price)) {
                        
                        PostingsPrices::create([
                            'price' => $price,
                            'posting_id' => $posting->id,
                        ]);
                    }
                }

                DB::commit();
                return redirect()->route('postings.index')->with('success', 'Posting created successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Posting could not be created.');
            }

        } catch (\Exception $e) {
            
            DB::rollBack();
            Log::error('Error creating posting: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while creating the posting.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Posting $posting)
    {
        $posting = Posting::with('postingsCategory', 'postingPrices')->find($posting->id);
        $posting->posting_prices_numbers = $posting->postingPrices->pluck('price')->toArray();
        $categories = PostingsCategory::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $accounts = AccountsGroup::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $titles = TitlesGroup::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $photos = PhotosGroup::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();

        $descriptions = DescriptionsGroup::with("createdBy", "updatedBy", "deletedBy")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderBy('id', 'desc')
        ->get()->toArray();
        
        return Inertia::render('Postings/EditPosting', [
            'categories' => $categories,
            'accounts' => $accounts,
            'titles' => $titles,
            'photos' => $photos,
            'descriptions' => $descriptions,
            'posting' => $posting,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostingRequest $request, Posting $posting)
    {
        DB::beginTransaction();
        try {
            $posting->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'postings_category_id' => $request->input('postings_category_id'),
                'accounts_group_id' => $request->input('accounts_group_id'),
                'titles_group_id' => $request->input('titles_group_id'),
                'photos_group_id' => $request->input('photos_group_id'),
                'descriptions_group_id' => $request->input('descriptions_group_id'),
                'updated_by' => Auth::user()->id,
            ]);
            if ($posting) {
                PostingsPrices::where('posting_id', $posting->id)->delete();

                foreach($request->input('posting_prices') as $price) {
                    if (!empty($price)) {
                        
                        PostingsPrices::create([
                            'price' => $price,
                            'posting_id' => $posting->id,
                        ]);
                    }
                }

                DB::commit();
                return redirect()->route('postings.index')->with('success', 'Posting created successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Posting could not be created.');
            }

        } catch (\Exception $e) {
            
            DB::rollBack();
            Log::error('Error creating posting: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while creating the posting.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Posting $posting)
    {
        $posting->update([
            'deleted_by' => Auth::user()->id,
            'deleted_at' => now(),
        ]);
        if ($posting->wasChanged()) {
            return redirect()->route('postings.index')->with('success', 'Posting deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Posting could not be deleted.');
        }
    }
}