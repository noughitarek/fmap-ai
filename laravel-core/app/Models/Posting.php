<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Posting extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "description",
        "max_per_day",
        "photo_per_listing",
        "postings_category_id",
        "accounts_group_id",
        "titles_group_id",
        "photos_group_id",
        "descriptions_group_id",
        "total_listings",
        "total_messages",
        "total_orders",
        "is_active",
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
    public function postingPrices()
    {
        return $this->hasMany(PostingsPrices::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by")
        ->orderby('id', 'asc');
    }
    public function postingsCategory()
    {
        return $this->belongsTo(PostingsCategory::class);
    }
    public function accountsGroup()
    {
        return $this->belongsTo(AccountsGroup::class);
    }

    public function accounts()
    {
        
        return $this->hasManyThrough(
            AccountsGroup::class,  // The final model we want to access
            Account::class,        // The intermediate model
            'accounts_group_id',   // Foreign key on the intermediate model (Account)
            'id',                  // Foreign key on the final model (AccountsGroup)
            'accounts_group_id',   // Local key on this model (Posting)
            'accounts_group_id'    // Local key on the intermediate model (Account)
        );
    }
    public function photosGroup()
    {
        return $this->belongsTo(PhotosGroup::class);
    }
    public function titlesGroup()
    {
        return $this->belongsTo(TitlesGroup::class);
    }
    public function descriptionsGroup()
    {
        return $this->belongsTo(DescriptionsGroup::class);
    }
}
