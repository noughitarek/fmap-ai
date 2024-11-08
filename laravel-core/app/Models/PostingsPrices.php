<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostingsPrices extends Model
{
    use HasFactory;
    protected $fillable = [
        "price",
        "posting_id",
        "created_by",
        "updated_by",
        "deleted_by",
        "deleted_at"
    ];
}
