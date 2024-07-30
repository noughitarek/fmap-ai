<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RemarketingsCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "description",
        "created_by",
        "updated_by",
        "deleted_by",
        "deleted_at",
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
    public function remarketings()
    {
        return $this->hasMany(Remarketing::class, 'category')
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderby('id', 'desc');
    }
}
