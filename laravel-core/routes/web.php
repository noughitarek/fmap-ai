<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\PostingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TagsGroupController;
use App\Http\Controllers\PhotosGroupController;
use App\Http\Controllers\TitlesGroupController;
use App\Http\Controllers\AccountsGroupController;
use App\Http\Controllers\PostingsCategoryController;
use App\Http\Controllers\DescriptionsGroupController;


Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('accounts')->name('accounts.')->group(function() {
        Route::prefix('groups')->name('groups.')->group(function() {
            Route::get('/create', [AccountsGroupController::class, 'create'])->name('create');
            Route::post('/create', [AccountsGroupController::class, 'store'])->name('store');
            Route::get('/{group}/edit', [AccountsGroupController::class, 'edit'])->name('edit');
            Route::put('/{group}/update', [AccountsGroupController::class, 'update'])->name('update');
            Route::delete('/{group}/delete', [AccountsGroupController::class, 'destroy'])->name('destroy');
        });
    
        Route::get('/', [AccountController::class, 'index'])->name('index');
        Route::get('/create', [AccountController::class, 'create'])->name('create');
        Route::post('/create', [AccountController::class, 'store'])->name('store');
        Route::get('/{account}/edit', [AccountController::class, 'edit'])->name('edit');
        Route::post('/{account}/update', [AccountController::class, 'update'])->name('update');
        Route::delete('/{account}/delete', [AccountController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('titles')->name('titles.')->group(function() {
        Route::get('/', [TitlesGroupController::class, 'index'])->name('index');
        Route::get('/create', [TitlesGroupController::class, 'create'])->name('create');
        Route::post('/create', [TitlesGroupController::class, 'store'])->name('store');
        Route::get('/{group}/edit', [TitlesGroupController::class, 'edit'])->name('edit');
        Route::post('/{group}/update', [TitlesGroupController::class, 'update'])->name('update');
        Route::delete('/{group}/delete', [TitlesGroupController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('photos')->name('photos.')->group(function() {
        Route::get('/', [PhotosGroupController::class, 'index'])->name('index');
        Route::get('/create', [PhotosGroupController::class, 'create'])->name('create');
        Route::post('/create', [PhotosGroupController::class, 'store'])->name('store');
        Route::get('/import', [PhotosGroupController::class, 'import'])->name('import');
        Route::post('/import/save', [PhotosGroupController::class, 'import_save'])->name('import.save');
        Route::get('/{group}/edit', [PhotosGroupController::class, 'edit'])->name('edit');
        Route::post('/{group}/update', [PhotosGroupController::class, 'update'])->name('update');
        Route::delete('/{group}/delete', [PhotosGroupController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('descriptions')->name('descriptions.')->group(function() {
        Route::get('/', [DescriptionsGroupController::class, 'index'])->name('index');
        Route::get('/create', [DescriptionsGroupController::class, 'create'])->name('create');
        Route::post('/create', [DescriptionsGroupController::class, 'store'])->name('store');
        Route::get('/{group}/edit', [DescriptionsGroupController::class, 'edit'])->name('edit');
        Route::post('/{group}/update', [DescriptionsGroupController::class, 'update'])->name('update');
        Route::delete('/{group}/delete', [DescriptionsGroupController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('tags')->name('tags.')->group(function() {
        Route::get('/', [TagsGroupController::class, 'index'])->name('index');
        Route::get('/create', [TagsGroupController::class, 'create'])->name('create');
        Route::post('/create', [TagsGroupController::class, 'store'])->name('store');
        Route::get('/{group}/edit', [TagsGroupController::class, 'edit'])->name('edit');
        Route::post('/{group}/update', [TagsGroupController::class, 'update'])->name('update');
        Route::delete('/{group}/delete', [TagsGroupController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('postings')->name('postings.')->group(function() {
        Route::prefix('categories')->name('categories.')->group(function() {
            Route::get('/create', [PostingsCategoryController::class, 'create'])->name('create');
            Route::post('/create', [PostingsCategoryController::class, 'store'])->name('store');
            Route::get('/{category}/edit', [PostingsCategoryController::class, 'edit'])->name('edit');
            Route::put('/{category}/update', [PostingsCategoryController::class, 'update'])->name('update');
            Route::delete('/{category}/delete', [PostingsCategoryController::class, 'destroy'])->name('destroy');
        });
    
        Route::get('/', [PostingController::class, 'index'])->name('index');
        Route::get('/create', [PostingController::class, 'create'])->name('create');
        Route::post('/create', [PostingController::class, 'store'])->name('store');
        Route::get('/{posting}/edit', [PostingController::class, 'edit'])->name('edit');
        Route::post('/{posting}/update', [PostingController::class, 'update'])->name('update');
        Route::delete('/{posting}/delete', [PostingController::class, 'destroy'])->name('destroy');
        Route::post('/{posting}/toggle-status', [PostingController::class, 'toggle_status'])->name('toggle.status');
   
    });

    Route::prefix('users')->name('users.')->group(function() {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/create', [UserController::class, 'store'])->name('store');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::post('/{user}/update', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}/delete', [UserController::class, 'destroy'])->name('destroy');
    });

    Route::get('/settings', [SettingController::class, 'index'])->name('settings');
    Route::post('/settings', [SettingController::class, 'store'])->name('settings.save');
});

/*
Route::get('/', function () {
    return Inertia::render('Test', []);
})->name('dashboard');

Route::get('/side-menu-light-dashboard-overview-2.html', function () {
    return Inertia::render('Test', []);
});
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

*/
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
