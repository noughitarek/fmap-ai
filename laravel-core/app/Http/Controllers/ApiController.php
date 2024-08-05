<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Posting;
use Illuminate\Http\Request;

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
        ->json($listings)
        ->header('Content-Type', 'application/json; charset=utf-8');
    }

    public function change_status(Listing $listing, Request $request){
        $listing = Listing::with("posting", "account", "title", "postingsPrice", "description", "photos.photo")
        ->find($listing->id);
        if($request->state == "published")
        {
            $listing->posted_at = now();
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
        }
        return response()->json(['status' => 'success', 'message' => 'Listing status updated successfully']);
    }
}
