<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use App\Models\Posting;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index(){
        $postings = Listing::with("posting", "account", "title", "postingsPrice", "description", "photos.photo")
        ->where("post_at", "<", now())
        ->whereNull("posted_at")
        ->orderBy("account_id", "desc")
        ->get()
        ->toArray();

        return response()->json($postings);
    }
}
