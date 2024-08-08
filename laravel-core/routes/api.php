<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::prefix('v1')->group(function () {
    Route::get('/listings/get', [ApiController::class, 'get_listings'])->name('get_listings');
    
    Route::get('/listings/{listing}/published', [ApiController::class, 'published'])->name('published');
    Route::get('/listings/{listing}/unpublished', [ApiController::class, 'published'])->name('unpublished');
});