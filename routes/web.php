<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function() {
    return Inertia::render("home");
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('/checkout', [OrderController::class, 'checkout'])->name('order.checkout');
    Route::post('/finished-checkout', [OrderController::class, 'store'])->name('order.store');
    Route::resource('orders', OrderController::class)->only(['index']);

    Route::prefix('cart')->name('cart.')->group(function () {
        Route::get('/', [CartController::class, 'index'])->name('index');
        Route::post('/', [CartController::class, 'store'])->name('store');
        Route::delete('/{product_id}', [CartController::class, 'removeFromCart'])->name('destroy');
        Route::delete('/', [CartController::class, 'emptyCart'])->name('empty');
    });

    Route::get('/get-carts-items', [CartController::class, 'getCartItems'])->name('api.cart.items');
    Route::get('/get-cart-product', [CartController::class, 'getCartProduct'])->name('api.cart.product');
    Route::get('/get-product', [ProductController::class, 'getProduct'])->name('api.product.get');
});


Route::resource('products', ProductController::class)->only(['index', 'show']);
Route::resource('categories', CategoryController::class)->only(['index', 'show']);
Route::get('/get-categories', [CategoryController::class, 'getCategories'])->name('api.categories.get');
Route::get('/get-products', [ProductController::class, 'getProducts'])->name('api.products.get');

Route::get('/csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

require __DIR__ . '/auth.php';