<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index($category)
    {
        return Inertia::render("shop", [
            "products" => Category::firstWhere("category", $category)->products ?? []
        ]);
    }
}
