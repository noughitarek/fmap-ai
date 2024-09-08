<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Wilaya;
use App\Models\Location;
use App\Models\LocationsGroup;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreLocationsGroupRequest;
use App\Http\Requests\UpdateLocationsGroupRequest;

class LocationsGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $groups = LocationsGroup::with(["createdBy", "updatedBy", "deletedBy", 'locations.commune'])
            ->whereNull('deleted_by')
            ->whereNull('deleted_at')
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Locations/Index', [
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
        $wilayas = Wilaya::with('communes')->get();
        return Inertia::render('Locations/Create', [
            'wilayas' => $wilayas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationsGroupRequest $request)
    {
        DB::beginTransaction();
        
        try {
            $group = LocationsGroup::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "created_by" => Auth::id(),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {

                foreach($request->input('communes') as $commune) {
                    if (!empty($commune)) {
                        
                        Location::create([
                            'commune_id' => $commune,
                            'locations_group_id' => $group->id,
                            "created_by" => Auth::id(),
                            "updated_by" => Auth::id(),
                        ]);
                    }
                }

                DB::commit();
                return redirect()->route('locations.index')->with('success', 'Group of locations created successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of locations could not be created.');
            }
        } catch (\Exception $e) {
            
            DB::rollBack();
            Log::error('Error creating Locations Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while creating the group of locations.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LocationsGroup $group)
    {
        $group = LocationsGroup::with('locations.commune')->find($group->id);
        $group->communes = $group->locations->pluck('commune_id');
        
        $wilayas = Wilaya::with('communes')->get();

        return Inertia::render('Locations/Edit', [
            'group' => $group,
            'wilayas' => $wilayas
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationsGroupRequest $request, LocationsGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                "updated_by" => Auth::id(),
            ]);

            if ($group) {
                $inputLocations = $request->input('communes', []);
                $existingLocations = Location::where('locations_group_id', $group->id)->pluck('id', 'commune_id')->toArray();
                
                foreach($inputLocations as $location) {
                    if (!empty($location)) {
                        if (array_key_exists($location, $existingLocations)) {

                            Location::where('locations_group_id', $group->id)
                                ->where('commune_id', $location)
                                ->update([
                                    'commune_id' => $location,
                                    "deleted_at" => null,
                                    "deleted_by" => null,
                                    'updated_at' => now(),
                                    'updated_by' => Auth::user()->id,
                                ]);
                            unset($existingLocations[$location]);
                        } else {
                            
                            Location::create([
                                'commune_id' => $location,
                                'locations_group_id' => $group->id,
                                'created_by' => Auth::user()->id,
                                'updated_by' => Auth::user()->id,
                            ]);
                        }
                    }
                }
                if (!empty($existingLocations)) {
                    Location::where('locations_group_id', $group->id)
                        ->whereIn('commune_id', array_keys($existingLocations))
                        ->update([
                            "deleted_at" => now(),
                            "deleted_by" => Auth::user()->id
                        ]);
                }
                DB::commit();
                return redirect()->route('locations.index')->with('success', 'Group of locations updated successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of locations could not be updated.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error updating locations Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while updating the group of locations.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LocationsGroup $group)
    {
        DB::beginTransaction();
        
        try {
            $group->update([
                "deleted_by" => Auth::id(),
                "deleted_at" => now(),
            ]);

            if ($group) {
                Location::where('locations_group_id', $group->id)
                ->update([
                    "deleted_at" => now(),
                    "deleted_by" => Auth::user()->id
                ]);;
                DB::commit();
                return redirect()->route('locations.index')->with('success', 'Group of locations deleted successfully.');
            } else {
                DB::rollBack();
                return redirect()->back()->with('error', 'Group of locations could not be deleted.');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting locations Group: ' . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while deleting the group of locations.');
        }
    }
}
