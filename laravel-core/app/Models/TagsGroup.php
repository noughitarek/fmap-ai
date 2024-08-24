<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagsGroup extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'total_listings',
        'total_messages',
        'total_orders',
        'created_by',
        'updated_by',
        'deleted_by',
        'deleted_at'
    ];
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function deletedBy()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }
    public function tags()
    {
        return $this->hasMany(Tag::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by")
        ->orderby('id', 'asc');
    }
}
