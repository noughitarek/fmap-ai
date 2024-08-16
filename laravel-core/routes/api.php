<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::prefix('v1')->group(function () {
    Route::get('/listings/get', [ApiController::class, 'get_listings']);
    Route::get('/listings/remove', [ApiController::class, 'remove_listings']);
    Route::post('/listings/{listing}/published', [ApiController::class, 'listings_published']);
    Route::post('/listings/{listing}/unpublished', [ApiController::class, 'listings_unpublished']);
    
    Route::get('/locations/get', [ApiController::class, 'get_locations']);

    Route::get('/videos/get', [ApiController::class, 'get_videos']);
    Route::post('/videos/{video}/published', [ApiController::class, 'videos_published']);

    Route::post('/photos/{group}/add', [ApiController::class, 'add_photo']);
});

