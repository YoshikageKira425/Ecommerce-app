<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product_id = fake()->randomNumber(1, 30);
        $quantity = fake()->randomNumber(1, 5);

        $product = Product::where("id", $product_id);

        $price = $product->price;
        $discount = $product->discount;

        return [
            "order_id" => fake()->randomNumber(1, 10),
            "product_id" => $product_id,
            "quantity" => $quantity,
            "price" => $price,
            "discount" => $discount
        ];
    }
}
