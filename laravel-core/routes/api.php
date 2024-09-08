<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::prefix('v1')->group(function () {
    Route::get('/listings/get', [ApiController::class, 'get_listings']);
    Route::get('/listings/remove', [ApiController::class, 'remove_listings']);
    Route::post('/listings/{account}/droped', [ApiController::class, 'droped_listings']);
    Route::post('/listings/{listing}/published', [ApiController::class, 'listings_published']);
    Route::post('/listings/{listing}/unpublished', [ApiController::class, 'listings_unpublished']);

    Route::get('/accounts/toupdate', [ApiController::class, 'update_results']);
    Route::post('/accounts/{account}/update', [ApiController::class, 'update_accounts_results']);
    
    
    Route::get('/locations/{posting}/get', [ApiController::class, 'get_locations']);
    Route::post('/logs/add', [ApiController::class, 'add_logs']);

    Route::get('/videos/get', [ApiController::class, 'get_videos']);
    Route::post('/videos/{video}/published', [ApiController::class, 'videos_published']);

    Route::post('/photos/{group}/add', [ApiController::class, 'add_photo']);
});

