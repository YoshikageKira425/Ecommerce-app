<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render("checkout");
    }

    public function store()
    {
        request()->validate([
            "phone_number" => "required|string",
            "city" => "required|string",
            "street" => "required|string"
        ]);

        $user = Auth::user();
        if (!$user) {
            return redirect()->back()->with('error', 'You must be logged in to place an order.');
        }

        $cart = $user->cart; 
        if (!$cart) {
            return redirect()->back()->with('error', 'Your cart is empty or does not exist.');
        }

        $cartItems = $cart->cartItems; 
        if ($cartItems->isEmpty()) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        $totalPrice = 0;
        foreach ($cartItems as $item) {
            $totalPrice += $item->price * $item->quantity;
        }

        $order = Order::create([
            "user_id" => $user->id,
            "total_price" => $totalPrice, 
            "phone_number" => request()->phone_number,
            "city" => request()->city,
            "street" => request()->street,
            "status" => "pending",
        ]);

        foreach ($cartItems as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id, 
                'quantity' => $item->quantity, 
                'discount' => $item->discount ?? 0, 
                'price' => $item->price,
            ]);

            $item->delete();
        }

        $cart->delete();

        return redirect()->route('orders.show', $order)->with('success', 'The order was made!');
    }
}
