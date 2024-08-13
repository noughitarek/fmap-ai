<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;
    protected $fillable = [
        'video',
        'photos_group_id',
        'total_listings',
        'total_messages',
        'total_orders',
        "created_by",
        "updated_by",
        "deleted_by",
        "deleted_at"
    ];
}
