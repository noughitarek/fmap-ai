<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Data;
use App\Models\Photo;
use App\Models\Video;
use App\Models\Account;
use App\Models\Commune;
use App\Models\Listing;
use App\Models\Posting;
use App\Models\Setting;
use App\Models\Location;
use App\Models\PhotosGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function update_results(){
        
        $accounts = Account::whereNull('deleted_at')
        ->whereNull('deleted_by')
        ->orderBy('id', 'desc')
        ->get();

        $accountsToUpdate = [];
        foreach($accounts as $account){
            $settingPath = 'updateResultsAccount' . $account->id;

            $setting = Setting::where('path', $settingPath)
            ->first();

            if((!$setting) || ($setting && $setting->updated_at >= now()->addDay())){
                Data::where('account_id', $account->id)->delete();
                $accountsToUpdate[] = $account->toArray();
            }
        }
        
        return response()
        ->json($accountsToUpdate)
        ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function update_accounts_results(Request $request, Account $account)
    {
        $title = $request->title;
        $locationParts = explode('·', $request->location);
        
        if (count($locationParts) < 2) {
            return response()
                ->json(['status' => 'error', 'message' => 'Invalid location format'])
                ->header('Content-Type', 'application/json; charset=utf-8');
        }
        
        $price = (int)preg_replace('/\D/', '',$locationParts[0]);
        $location = $locationParts[1];
        $clicks = (int)preg_replace('/\D/', '', $request->clicks);
        
        $data = Data::where('account_id', $account->id)
            ->where('location', $location)
            ->where('title', $title)
            ->where('price', $price)
            ->first();
        
        if ($data) {
            $data->clicks += $clicks;
            $data->save();
        } else {
            Data::create([
                'account_id' => $account->id,
                'location' => $location,
                'clicks' => $clicks,
                'title' => $title,
                'price' => $price,
            ]);
        }
        
        $settingPath = 'updateResultsAccount' . $account->id;
        $setting = Setting::create([
            'path' => $settingPath,
            'content' => 0
        ]);
        return response()
            ->json(['status' => 'success'])
            ->header('Content-Type', 'application/json; charset=utf-8');
        
    }

    public function get_listings(){
        $listings = Listing::with("posting", "account", "title", "postingsPrice", "description", "photos.photo", "category", "tagsGroup.tags")
        ->where("post_at", "<", now())
        ->whereNull("posted_at")
        ->orderBy("account_id", "desc")
        ->get()->toArray();

        
        foreach($listings as &$listing){
            $listing["tags"] = implode(',', $listing['tags_group']['tags']);
            $listing["condition"]["condition"] = "Like New";
            $listing["availability"]["availability"] = "List as Single Item";
            $listing["tags"]["tags"] = "Test, test2,";
        }
        
        $lastListings = Listing::whereNotNull('posted_at')
        ->orderBy("posted_at", "desc")
        ->first();

        return response()
        ->json([
            'listings' => $listings,
            'lastLocation' => $lastListings->commune_id ?? 1 
        ])
        ->header('Content-Type', 'application/json; charset=utf-8');
    }
    
    public function get_locations(Posting $posting, $iter = 0){
        // Load the posting with related locations
        $posting = Posting::with('locationsToInclude.locations', 'locationsToExclude.locations')->find($posting->id);

        // Get included locations or default to all communes
        $includedLocations = $posting->locations_to_include_id 
            ? $posting->locationsToInclude->locations->pluck('commune_id')->flatten() 
            : Commune::orderBy('id', 'asc')->pluck('id');

        // Get excluded locations or default to an empty collection
        $excludedLocations = $posting->locations_to_exclude_id 
            ? $posting->locationsToExclude->locations->pluck('commune_id')->flatten() 
            : collect();

        // Filter and get unique locations based on commune_id
        $posloc = Commune::whereIn('id', $includedLocations)
            ->whereNotIn('id', $excludedLocations)
            ->get();

        // Return an empty response if no locations are found
        if ($posloc->isEmpty()) {
            return response()
                ->json([])
                ->header('Content-Type', 'application/json; charset=utf-8');
        }

        // Retrieve or create the setting for the current location index
        $settingPath = 'currentLocationIndexPosting' . $posting->id;
        $setting = Setting::firstOrCreate(['path' => $settingPath], ['content' => 0]);

        // Reset the index if it exceeds the number of locations
        if ($setting->content >= $posloc->count()) {
            $setting->content = 0;
            $setting->save();
        }

        // Retrieve the location based on the current index
        $location = Commune::with('wilaya')->find($posloc[$setting->content]['id']);

        // Increment the location index
        $setting->increment('content');

        if ($location) {
            return response()
                ->json($location)
                ->header('Content-Type', 'application/json; charset=utf-8');
        } elseif ($iter < 10) {
            return $this->get_locations($posting, $iter + 1);
        } else {
            return response()
                ->json(['error' => 'No more locations found.'], 404)
                ->header('Content-Type', 'application/json; charset=utf-8');
        }
    }

    public function get_locations0($iter = 0){
        $setting = Setting::where('path', 'currentLocationIndex')->first();
        
        if (!$setting) {
            $setting = Setting::create([
                'path' => 'currentLocationIndex',
                'content' => 1
            ]);
        }
    
        $location = Commune::with('wilaya')->find($setting->content);
        
        $setting->increment('content');

        if ($location) {
            return response()
                ->json($location)
                ->header('Content-Type', 'application/json; charset=utf-8');
        } elseif ($iter < 10) {
            return $this->get_locations($iter + 1);
        } else {
            // Handle the case when no location is found after 10 iterations
            return response()
                ->json(['error' => 'No more locations found.'], 404)
                ->header('Content-Type', 'application/json; charset=utf-8');
        }
    }

    public function add_logs(Request $request){
        $log = Log::create([
            'type' => $request->input('type'),
            'content' => $request->input('content'),
            'logged_at' => $request->input('logged_at')
        ]);

        return response()
        ->json([
            'status' => 'success',
            'message' => 'Log record has been created successfully'
        ], 201)
        ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function remove_listings(){
        $postings = Posting::with("accounts")
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->get();

        $accountsToRemove = [];
        foreach($postings as $posting){
            if($posting->expire_after > 0)
            {
                $accountsgroups = $posting->accounts;
                foreach($accountsgroups as $group){
                    
                    foreach($group->accounts as $account){
                        $latestPostedAt = Listing::where('account_id', $account->id)
                        ->max('posted_at');

                        if($latestPostedAt && $latestPostedAt < now()->addSeconds($posting->expire_after)){
                            $accountsToRemove[] = $account->toArray();
                        }
                    }
                }
                
            }
        }
        
        $accounts = Account::whereNull('deleted_at')
            ->whereNull('deleted_by')
            ->where('drop_listings_at', '<', now())
            ->get();
    
        foreach ($accounts as $account) {
            if (!in_array($account->toArray(), $accountsToRemove)) {
                $accountsToRemove[] = $account->toArray();
            }
        }

        return response()
        ->json($accountsToRemove)
        ->header('Content-Type', 'application/json; charset=utf-8');
    }
    
    public function droped_listings(Account $account){
        $account->update([
            'drop_listings_at' => null,
        ]);
        return response()->json(['status' => 'success', 'message' => 'Listing status updated successfully']);
    }

    public function add_photo(Request $request, PhotosGroup $group)    {
        $request->validate([
            'photo' => 'required|file|mimes:jpg,png,pdf|max:2048',
        ]);

        if ($group) {
            if ($request->hasFile('photo')) {

                $photo = $request->file('photo');
                $filename = time() . '_' . $this->generateRandomUniqueName(12) . '.' . $photo->getClientOriginalExtension();
                $photo->move(public_path('storage/photos'), $filename);

                Photo::create([
                    'photo' => asset('storage/photos/' . $filename),
                    'photos_group_id' => $group->id,
                    "created_by" => $group->created_by,
                    "updated_by" => $group->created_by,
                ]);
                return response()->json(['message' => 'File uploaded successfully', 'filename' => $filename], 200);
            }
            return response()->json(['message' => 'No file uploaded'], 400);
        }
        return response()->json(['message' => 'Photos group not found'], 404);
    }

    public function get_videos(){
        $videos = Video::whereNull("extracted_at")
        ->whereNull("deleted_at")
        ->whereNull("deleted_by")
        ->get()
        ->toArray();
        
        return response()
        ->json($videos)
        ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function listings_published(Request $request, Listing $listing){

        $listing = Listing::with("posting", "account", "title", "postingsPrice", "description", "photos.photo")
        ->find($listing->id);

        $listing->posted_at = now();
        $listing->commune_id = $request->input('location');
        
        if ($listing->posting) {
            $listing->posting->increment('total_listings');
        }
        if ($listing->account) {
            $listing->account->increment('total_listings');
        }
        if ($listing->title) {
            $listing->title->increment('total_listings');
        }
        if ($listing->description) {
            $listing->description->increment('total_listings');
        }
        foreach ($listing->photos as $photo) {
            if ($photo->photo) {
                $photo->photo->increment('total_listings');
            }
        }
        $listing->save();
        return response()->json(['status' => 'success', 'message' => 'Listing status updated successfully']);
    }

    public function videos_published(Video $video){
        $video->extracted_at = now();
        $video->save();
        return response()->json(['status' => 'success', 'message' => 'Video status updated successfully']);
    }
    
    private function generateRandomUniqueName($length = 8) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $randomName = '';
        
        for ($i = 0; $i < $length; $i++) {
            $randomName .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $randomName;
    }
}
