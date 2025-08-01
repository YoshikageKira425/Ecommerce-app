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

    public function store()
    {
        $validate = request()->validate("");
    }

    public function show(string $url)
    {
        $product = Product::where("url_slug", $url)->firstOrFail();

        return Inertia::render("product", [
            "product" => $product
        ]);
    }

    public function edit(int $id)
    {
        
    }

    public function update(int $id)
    {
        
    }

    public function destroy(int $id)
    {
        
    }
}
