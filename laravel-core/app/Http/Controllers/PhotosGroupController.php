<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Photo;
use App\Models\PhotosGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePhotosGroupRequest;
use App\Http\Requests\UpdatePhotosGroupRequest;

class PhotosGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = PhotosGroup::with(["createdBy", "updatedBy", "deletedBy", 'photos'])
            ->whereNull('deleted_by')
            ->whereNull('deleted_at')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Photos/Index', [
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
        return Inertia::render('Photos/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePhotosGroupRequest $request)
    {
        DB::beginTransaction();
        
        try {
            $photosPaths = [];
            if ($request->hasFile('photos')) {
                foreach ($request->file('photos') as $photo) {
                    $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $photo->getClientOriginalExtension();
                    $photo->move(public_path('storage/photos'), $filename);
                    $photosPaths[] = asset('storage/photos/' . $filename);
                }
            }

            $group = PhotosGroup::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "created_by" => Auth::id(),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {

                foreach($photosPaths as $photo) {
                    if (!empty($photo)) {
                        
                        Photo::create([
                            'photo' => $photo,
                            'photos_group_id' => $group->id,
                        ]);
                    }
                }

                DB::commit();
                return redirect()->route('photos.index')->with('success', 'Group of photos created successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of photos could not be created.');
            }
        } catch (\Exception $e) {
            
            DB::rollBack();
            Log::error('Error creating PhotosGroup: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while creating the group of photos.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PhotosGroup $group)
    {
        $group = PhotosGroup::with('photos')
        ->find($group->id);


        $group->old_photos = $group->photos->pluck('photo');
        return Inertia::render('Photos/Edit', ['group' => $group]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePhotosGroupRequest $request, PhotosGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $photosPaths = [];
            if ($request->hasFile('photos')) {
                foreach ($request->file('photos') as $photo) {
                    $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $photo->getClientOriginalExtension();
                    $photo->move(public_path('storage/photos'), $filename);
                    $photosPaths[] = asset('storage/photos/' . $filename);
                }
            }
            if ($request->has('old_photos')) {
                foreach ($request->input('old_photos') as $photo) {
                    $photosPaths[] = $photo;
                }
            }
            
            $group->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {
                Photo::where('photos_group_id', $group->id)->delete();
                
                foreach($photosPaths as $photo) {
                    if (!empty($photo)) {
                        Photo::create([
                            'photo' => $photo,
                            'photos_group_id' => $group->id,
                        ]);
                    }
                }
                DB::commit();
                return redirect()->route('photos.index')->with('success', 'Group of photos updated successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of photos could not be updated.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating PhotosGroup: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while updating the group of photos.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PhotosGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                "deleted_by" => Auth::id(),
                "deleted_at" => now(),
            ]);

            if ($group) {
                Photo::where('photos_group_id', $group->id)->delete();
                DB::commit();
                return redirect()->route('photos.index')->with('success', 'Group of photos deleted successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of photos could not be deleted.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting PhotosGroup: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while deleting the group of photos.');
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
