<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::prefix('v1')->group(function () {
    Route::get('/', [ApiController::class, 'index'])->name('index');
});