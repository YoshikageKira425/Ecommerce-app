<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;

Route::get('/', function() {return Inertia::render("home");})->name('home');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');

Route::post('/add-to-cart', [CartController::class, 'store'])->name('cart.store');

Route::delete('/remove-from-cart', [CartController::class, 'destroy'])->name('cart.destroy');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

Route::get('/products/{url}', [ProductController::class, 'show'])->name('products.show');

Route::post('/products', [ProductController::class, "store"]);

Route::get('/get-products', function () {
    return Product::all();
});

Route::get('/get-carts-items', function () {
    $cart = Cart::firstWhere('user_id', Auth::id());
    if ($cart) {
        return $cart->items;
    }
});

Route::get('/get-cart-product', function () {
    $cart = Cart::firstWhere('user_id', Auth::id());
    if ($cart) {
        return $cart->items->where('cart_id', $cart->id)->where('product_id', request()->product_id);
    }
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
