<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [ProductController::class, 'index'])->name('products.index');

Route::get('/products/{url}', [ProductController::class, 'show'])->name('products.show');

Route::get('/dashboard', function() {return Inertia::render("dashboard");})->name('products.show');

Route::post('/products', [ProductController::class, "store"]);

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
