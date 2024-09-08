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
        "category_id",
        "tags_group_id",
        "post_at",
        "posted_at",
    ];
    
    public function posting()
    {
        return $this->belongsTo(Posting::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by");
    }
    public function account()
    {
        return $this->belongsTo(Account::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by");;
    }
    public function title()
    {
        return $this->belongsTo(Title::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by");;
    }
    public function description()
    {
        return $this->belongsTo(Description::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by");;
    }
    public function postingsPrice()
    {
        return $this->belongsTo(PostingsPrices::class, "postings_price_id");
    }
    public function photos()
    {
        return $this->hasMany(ListingsPhoto::class);
    }
    public function category()
    {
        return $this->belongsTo(Category::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by");;
    }
    public function tagsGroup()
    {
        return $this->belongsTo(TagsGroup::class)
        ->whereNull("deleted_at")
        ->whereNull("deleted_by");;
    }
}
