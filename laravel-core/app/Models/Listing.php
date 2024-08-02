<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;
    protected $fillable = [
        "posting_id",
        "account_id",
        "title_id",
        "postings_price_id",
        "description_id",
        "post_at",
        "posted_at",
    ];
}
