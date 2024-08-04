<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListingsPhoto extends Model
{
    use HasFactory;
    protected $fillable = [
        "photo_id",
        "listing_id"
    ];
    public function photo()
    {
        return $this->belongsTo(Photo::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by");
    }
}
