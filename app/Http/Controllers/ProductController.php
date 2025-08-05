<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render("shop", [
            "products" => Product::all()
        ]);
    }

    public function show(string $url)
    {
        $product = Product::where("url_slug", $url)->firstOrFail();

        return Inertia::render("product", [
            "product" => $product
        ]);
    }
}
