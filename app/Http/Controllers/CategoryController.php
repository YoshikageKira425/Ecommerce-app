<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request, string $category)
    {
        $categoryModel = Category::firstWhere("category", $category);

        if (!$categoryModel) {
            return Inertia::render("shop", [
                "products" => [],
                "categoryName" => $category,
            ]);
        }

        $products = $categoryModel->products()->paginate(9);

        return Inertia::render("shop", [
            "products" => $products
        ]);
    }

    public function getCategories()
    {
        return Category::all();
    }
}
