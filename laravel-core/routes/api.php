<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::prefix('v1')->group(function () {
    Route::get('/listings/get', [ApiController::class, 'get_listings'])->name('get_listings');
    Route::post('/listings/{listing}', [ApiController::class, 'change_status'])->name('change_status');
});