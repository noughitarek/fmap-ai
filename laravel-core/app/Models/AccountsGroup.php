<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountsGroup extends Model
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
    public function accounts()
    {
        return $this->hasMany(Account::class)
        ->whereNull('deleted_by')
        ->whereNull('deleted_at')
        ->orderby('id', 'desc');
    }
}