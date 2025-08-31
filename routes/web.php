<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\PortfolioController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('profile', function () {
            return Inertia::render('admin/profile');
        })->name('profile');
        
        Route::get('experience', function () {
            return Inertia::render('admin/experience');
        })->name('experience');
        
        Route::get('skills', function () {
            return Inertia::render('admin/skills');
        })->name('skills');
        
        Route::get('projects', function () {
            return Inertia::render('admin/projects');
        })->name('projects');
        
        Route::get('portfolio', function () {
            return Inertia::render('admin/portfolio');
        })->name('portfolio');
        
        Route::get('contact', function () {
            return Inertia::render('admin/contact');
        })->name('contact');
        
        Route::get('analytics', function () {
            return Inertia::render('admin/analytics');
        })->name('analytics');
        
        Route::get('content', function () {
            return Inertia::render('admin/content');
        })->name('content');
        
        Route::get('settings', function () {
            return Inertia::render('admin/settings');
        })->name('settings');
        
        Route::get('database', function () {
            return Inertia::render('admin/database');
        })->name('database');
        
        Route::get('docs', function () {
            return Inertia::render('admin/docs');
        })->name('docs');
    });

    // API routes for admin data
    Route::prefix('api/admin')->name('api.admin.')->group(function () {
        // User management
        Route::get('user', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('user.index');
        Route::post('user', [App\Http\Controllers\Admin\UserController::class, 'store'])->name('user.store');
        Route::put('user/{user}', [App\Http\Controllers\Admin\UserController::class, 'update'])->name('user.update');
        Route::get('user/{user}', [App\Http\Controllers\Admin\UserController::class, 'show'])->name('user.show');
        
        // Profile management
        Route::get('profile', [App\Http\Controllers\Admin\ProfileController::class, 'index'])->name('profile.index');
        Route::post('profile', [App\Http\Controllers\Admin\ProfileController::class, 'store'])->name('profile.store');
        Route::get('profile/{profile}', [App\Http\Controllers\Admin\ProfileController::class, 'show'])->name('profile.show');
        Route::put('profile/{profile}', [App\Http\Controllers\Admin\ProfileController::class, 'update'])->name('profile.update');
        Route::delete('profile/{profile}', [App\Http\Controllers\Admin\ProfileController::class, 'destroy'])->name('profile.destroy');
        
        // Experience management
        Route::get('experiences', [App\Http\Controllers\Admin\ExperienceController::class, 'index'])->name('experiences.index');
        Route::post('experiences', [App\Http\Controllers\Admin\ExperienceController::class, 'store'])->name('experiences.store');
        Route::get('experiences/{experience}', [App\Http\Controllers\Admin\ExperienceController::class, 'show'])->name('experiences.show');
        Route::put('experiences/{experience}', [App\Http\Controllers\Admin\ExperienceController::class, 'update'])->name('experiences.update');
        Route::delete('experiences/{experience}', [App\Http\Controllers\Admin\ExperienceController::class, 'destroy'])->name('experiences.destroy');
        Route::post('experiences/reorder', [App\Http\Controllers\Admin\ExperienceController::class, 'reorder'])->name('experiences.reorder');
        
        // Portfolio management
        Route::get('portfolio', [App\Http\Controllers\Admin\PortfolioController::class, 'index'])->name('portfolio.index');
        Route::post('portfolio', [App\Http\Controllers\Admin\PortfolioController::class, 'store'])->name('portfolio.store');
        Route::get('portfolio/{portfolioItem}', [App\Http\Controllers\Admin\PortfolioController::class, 'show'])->name('portfolio.show');
        Route::put('portfolio/{portfolioItem}', [App\Http\Controllers\Admin\PortfolioController::class, 'update'])->name('portfolio.update');
        Route::delete('portfolio/{portfolioItem}', [App\Http\Controllers\Admin\PortfolioController::class, 'destroy'])->name('portfolio.destroy');
        Route::post('portfolio/reorder', [App\Http\Controllers\Admin\PortfolioController::class, 'reorder'])->name('portfolio.reorder');
        
        // Database management
        Route::get('database/tables', [App\Http\Controllers\Admin\DatabaseController::class, 'getTables'])->name('database.tables');
        Route::get('database/stats', [App\Http\Controllers\Admin\DatabaseController::class, 'getStats'])->name('database.stats');
        Route::get('database/events', [App\Http\Controllers\Admin\DatabaseController::class, 'getEvents'])->name('database.events');
        Route::get('database/events/stream', [App\Http\Controllers\Admin\DatabaseController::class, 'streamEvents'])->name('database.events.stream');
        Route::post('database/backup', [App\Http\Controllers\Admin\DatabaseController::class, 'createBackup'])->name('database.backup');
        Route::post('database/optimize', [App\Http\Controllers\Admin\DatabaseController::class, 'optimize'])->name('database.optimize');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
