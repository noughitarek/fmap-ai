<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RemarketingController;
use App\Http\Controllers\ProgramsGroupController;
use App\Http\Controllers\TemplatesGroupController;
use App\Http\Controllers\RemarketingsCategoryController;



Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('pages')->name('pages.')->group(function() {
        Route::get('/', [PageController::class, 'index'])->name('index');
        Route::get('{page}/conversations', [PageController::class, 'conversations'])->name('conversations');
        Route::get('{page}/conversations/{conversation}/assignments', [PageController::class, 'assignments'])->name('assignments');
    });

    Route::prefix('templates')->name('templates.')->group(function() {
        Route::prefix('groups')->name('groups.')->group(function() {
            Route::get('/create', [TemplatesGroupController::class, 'create'])->name('create');
            Route::post('/create', [TemplatesGroupController::class, 'store'])->name('store');
            Route::get('/{group}/edit', [TemplatesGroupController::class, 'edit'])->name('edit');
            Route::put('/{group}/update', [TemplatesGroupController::class, 'update'])->name('update');
            Route::delete('/{group}/delete', [TemplatesGroupController::class, 'destroy'])->name('destroy');
        });
    
        Route::get('/', [TemplateController::class, 'index'])->name('index');
        Route::get('/create', [TemplateController::class, 'create'])->name('create');
        Route::post('/create', [TemplateController::class, 'store'])->name('store');
        Route::get('/{template}/edit', [TemplateController::class, 'edit'])->name('edit');
        Route::post('/{template}/update', [TemplateController::class, 'update'])->name('update');
        Route::delete('/{template}/delete', [TemplateController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('programs')->name('programs.')->group(function() {
        Route::prefix('groups')->name('groups.')->group(function() {
            Route::get('/create', [ProgramsGroupController::class, 'create'])->name('create');
            Route::post('/create', [ProgramsGroupController::class, 'store'])->name('store');
            Route::get('/{group}/edit', [ProgramsGroupController::class, 'edit'])->name('edit');
            Route::put('/{group}/update', [ProgramsGroupController::class, 'update'])->name('update');
            Route::delete('/{group}/delete', [ProgramsGroupController::class, 'destroy'])->name('destroy');
        });
    
        Route::get('/', [ProgramController::class, 'index'])->name('index');
        Route::get('/create', [ProgramController::class, 'create'])->name('create');
        Route::post('/create', [ProgramController::class, 'store'])->name('store');
        Route::get('/{program}/edit', [ProgramController::class, 'edit'])->name('edit');
        Route::post('/{program}/update', [ProgramController::class, 'update'])->name('update');
        Route::delete('/{program}/delete', [ProgramController::class, 'destroy'])->name('destroy');
    });
    Route::prefix('remarketings')->name('remarketings.')->group(function() {
        Route::prefix('categories')->name('categories.')->group(function() {
            Route::get('/create', [RemarketingsCategoryController::class, 'create'])->name('create');
            Route::post('/create', [RemarketingsCategoryController::class, 'store'])->name('store');
            Route::get('/{category}/edit', [RemarketingsCategoryController::class, 'edit'])->name('edit');
            Route::put('/{category}/update', [RemarketingsCategoryController::class, 'update'])->name('update');
            Route::delete('/{category}/delete', [RemarketingsCategoryController::class, 'destroy'])->name('destroy');
        });
    
        Route::get('/', [RemarketingController::class, 'index'])->name('index');
        Route::get('/create', [RemarketingController::class, 'create'])->name('create');
        Route::post('/create', [RemarketingController::class, 'store'])->name('store');
        Route::get('/{remarketing}/edit', [RemarketingController::class, 'edit'])->name('edit');
        Route::post('/{remarketing}/update', [RemarketingController::class, 'update'])->name('update');
        Route::delete('/{remarketing}/delete', [RemarketingController::class, 'destroy'])->name('destroy');

        Route::post('/{remarketing}/toggle-status', [RemarketingController::class, 'toggle_status'])->name('toggle.status');
    });

    Route::prefix('users')->name('users.')->group(function() {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::post('/create', [UserController::class, 'store'])->name('store');
        Route::get('/{user}/edit', [UserController::class, 'edit'])->name('edit');
        Route::post('/{user}/update', [UserController::class, 'update'])->name('update');
        Route::delete('/{user}/delete', [UserController::class, 'destroy'])->name('destroy');
    });

    Route::controller(SettingController::class)->group(function(){
        Route::get('oauth/facebook', 'redirectToFacebook')->name('facebook_reconnect');
        Route::get('oauth/facebook/callback', 'handleFacebookCallback')->withoutMiddleware('access_token');
        Route::get('oauth/facebook/logout', 'logout');
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
