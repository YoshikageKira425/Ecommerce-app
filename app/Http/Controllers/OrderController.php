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
        $orders = Order::where("user_id", Auth::user()->id)
            ->with('items') 
            ->get();

        return Inertia::render("order", [
            "orders" => $orders
        ]);
    }

    public function checkout()
    {
        return Inertia::render("checkout", [
            'csrf_token' => csrf_token()
        ]);
    }

    public function store()
    {
        request()->validate([
            "phone_number" => "required|string",
            "city" => "required|string",
            "street" => "required|string"
        ]);

        $user = Auth::user();

        $cart = Cart::firstWhere("user_id", $user->id);
        if (!$cart) {
            return redirect()->back()->with('error', 'Your cart is empty or does not exist.');
        }

        $cartItems = CartItem::where("cart_id", $cart->id)->get();
        if (!$cartItems || $cartItems->isEmpty()) {
            return redirect()->back()->with('error', 'Your cart is empty.');
        }

        $totalPrice = 0;
        foreach ($cartItems as $item) {
            $totalPrice += ($item->price - ($item->price * ($item->discount / 100))) * $item->quantity;
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
            $item->product->decrement('stock', $item->quantity);
        }

        return redirect()->route('order.index', $order);
    }
}
