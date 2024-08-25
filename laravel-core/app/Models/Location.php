<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    protected $fillable = [
        'commune_id',
        'locations_group_id',
        'total_listings',
        'total_messages',
        'total_orders',
        'created_by',
        'updated_by',
        'deleted_by',
        'deleted_at'
    ];
    
    public function commune()
    {
        return $this->belongsTo(Commune::class);
    }
}
