<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Product;

Route::get('/', function() {return Inertia::render("home");})->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

Route::get('/products/{url}', [ProductController::class, 'show'])->name('products.show');

Route::post('/products', [ProductController::class, "store"]);

Route::get('/get-products', function () {
    return Product::all();
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
