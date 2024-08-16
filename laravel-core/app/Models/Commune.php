<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'name', 'name_ar', 'wilaya_id'];
    public function wilaya()
    {
        return $this->belongsTo(Wilaya::class);
    }
}
