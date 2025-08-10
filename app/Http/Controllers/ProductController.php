<?php

namespace App\Http\Controllers;

use App\Models\Category;
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
            "product" => $product,
            "category" => Category::firstWhere("id", $product->category_id)->category
        ]);
    }

    public function getAllProducts()
    {
        return response()->json(Product::all());
    }

    public function getProduct()
    {
        return Product::firstWhere('id', request()->product_id);
    }
}
