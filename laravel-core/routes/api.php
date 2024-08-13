<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::prefix('v1')->group(function () {
<<<<<<< HEAD
    Route::get('/listings/get', [ApiController::class, 'get_listings']);
    Route::post('/listings/{listing}', [ApiController::class, 'change_status']);
    Route::get('/videos/get', [ApiController::class, 'get_videos']);
=======
    Route::get('/listings/get', [ApiController::class, 'get_listings'])->name('get_listings');
    
    Route::get('/listings/{listing}/published', [ApiController::class, 'published'])->name('published');
    Route::get('/listings/{listing}/unpublished', [ApiController::class, 'published'])->name('unpublished');
>>>>>>> 484b1227fc7899f0a40c5ef8bfb2f97a1e058f5d
});