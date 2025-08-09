<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->name(),
            "url_slug" => fake()->slug(),
            "description" => fake()->paragraph(),
            "price" => fake()->randomFloat(2, 1, 99),
            "discount" => fake()->randomFloat(2, 1, 99),
            "stock" => fake()->numberBetween(1, 100),
            "category_id" => null,
            "image" => "images/image.png",
            "category_id" => fake()->numberBetween(1, 10)
        ];
    }
}
