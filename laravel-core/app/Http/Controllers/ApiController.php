<?php

namespace App\Http\Controllers;

use App\Models\Posting;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function index(){
        $postings = Posting::with("postingsCategory", "accountsGroup", "photosGroup", "descriptionsGroup", "postingPrices")
        ->whereNull("deleted_at")
        ->whereNull("deleted_by")
        ->where("is_active", 1)
        ->get()->toArray();

        print_r($postings);
        exit;

        return response()->json([]);
    }
}
