<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;
    protected $fillable = ["name", "description", "group_id", "photos", "videos", "audios", "message", "total_used", "total_orders", "total_responses", "created_by", "updated_by", "deleted_by", "deleted_at"];
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
    public function group()
    {
        return $this->belongsTo(TemplatesGroup::class, 'group_id');
    }
}
