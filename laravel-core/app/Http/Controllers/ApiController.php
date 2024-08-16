<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use App\Models\Video;
use App\Models\Listing;
use App\Models\Posting;
use App\Models\PhotosGroup;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function get_listings(){
        $listings = Listing::with("posting", "account", "title", "postingsPrice", "description", "photos.photo")
        ->where("post_at", "<", now())
        ->whereNull("posted_at")
        ->orderBy("account_id", "desc")
        ->get()
        ->toArray();

        foreach($listings as &$listing){
            $listing["category"]["category"] = "Tools";
            $listing["condition"]["condition"] = "Like New";
            $listing["availability"]["availability"] = "List as Single Item";
            $listing["tags"]["tags"] = "Test, test2,";
        }
        return response()
        ->json([
            'listings' => $listings,
            'lastLocation' => Listing::whereNotNull('posted_at')
                ->orderBy("posted_at", "desc")
                ->first()
                ->commune_id
        ])
        ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function remove_listings()
    {
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
        return response()
        ->json($accountsToRemove)
        ->header('Content-Type', 'application/json; charset=utf-8');
    }
    
    public function add_photo(Request $request, PhotosGroup $group)
    {
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

    public function get_videos()
    {
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
