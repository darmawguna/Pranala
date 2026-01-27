<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GuestController;
use App\Http\Controllers\WishController;


Route::get('metatah-tjikra-family/to/{slug}', [InvitationController::class, 'show'])->name('invitation.show');
Route::get('/', [InvitationController::class, 'index'])->name('invitation.index');

// Wishes Routes
Route::get('wishes', [WishController::class, 'index'])->name('wishes.index');
Route::post('wishes/send', [WishController::class, 'store'])->name('wishes.store');




// Admin Routes (Protected by auth middleware)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Guest Management
    Route::get('/guests', [GuestController::class, 'index'])->name('guests.index');
    Route::post('/guests', [GuestController::class, 'store'])->name('guests.store');
    Route::put('/guests/{guest}', [GuestController::class, 'update'])->name('guests.update');
    Route::delete('/guests/{guest}', [GuestController::class, 'destroy'])->name('guests.destroy');

    // Bulk Operations
    Route::post('/guests/import', [GuestController::class, 'bulkImport'])->name('guests.import');
    Route::get('/guests/export', [GuestController::class, 'export'])->name('guests.export');
    Route::get('/guests/export/links', [GuestController::class, 'exportLinks'])->name('guests.export.links');
    Route::get('/guests/export/full', [GuestController::class, 'exportFullData'])->name('guests.export.full');

    // Wishes Admin
    Route::delete('/wishes/{wish}', [WishController::class, 'destroy'])->name('wishes.destroy');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
