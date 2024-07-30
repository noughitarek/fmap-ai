<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Remarketing extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "category",
        "facebook_page_id", 
        "programs_group_id", 
        "templates_group_id", 
        "is_active",
        "created_by", 
        "updated_by", 
        "deleted_by", 
        "deleted_at"
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
    public function category()
    {
        return $this->belongsTo(RemarketingsCategory::class, 'category');
    }

    public function templatesGroup()
    {
        return $this->belongsTo(TemplatesGroup::class, 'templates_group_id');
    }
    public function programsGroup()
    {
        return $this->belongsTo(ProgramsGroup::class, 'programs_group_id');
    }
    public function facebookPage()
    {
        return $this->belongsTo(FacebookPage::class, 'facebook_page_id');

    }
}
