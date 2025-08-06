<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        return Inertia::render("cart");
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'nullable|integer|min:1'
        ]);

        $user = Auth::user();
        $quantity = $request->input('quantity', 1);
        $productId = $request->input('product_id');
        $maxQuanitity = \App\Models\Product::findOrFail($productId)->stock;
        $price = \App\Models\Product::findOrFail($productId)->price;
        $discount = \App\Models\Product::findOrFail($productId)->discount;

        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $productId)
            ->first();

        if ($item) {
            if ($item->quantity + $quantity <= $maxQuanitity) {
                $item->quantity += $quantity;
                $item->save();
            }
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $productId,
                'quantity' => $quantity,
                'discount' => $discount,
                'price' => $price,
            ]);
        }

        return redirect()->back()->with('success', 'Item added to cart!');
    }

    public function removeFromCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'nullable|integer|min:1'
        ]);

        $user = Auth::user();
        $productId = $request->input('product_id');
        $quantity = $request->input('quantity', 1);

        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return redirect()->back()->with('error', 'Cart not found.');
        }

        $item = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $productId)
            ->first();

        if (!$item) {
            return redirect()->back()->with('error', 'Item not found in cart.');
        }

        if ($item->quantity > $quantity) {
            $item->quantity -= $quantity;
            $item->save();
        } else {
            $item->delete();
        }

        return redirect()->back()->with('success', 'Item removed from cart.');
    }

    public function emptyCart()
    {
        $user = Auth::user();

        $cart = Cart::where('user_id', $user->id)->first();

        CartItem::where('cart_id', $cart->id)->delete();

        return redirect()->back()->with('success', 'The cart is empty.');
    }
}
