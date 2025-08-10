<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => fake()->numberBetween(1, 5),
            "total_price" => fake()->randomFloat(2, 10, 999),
            "phone_number" => fake()->phoneNumber(),
            "city" => fake()->city(),
            "street" => fake()->streetAddress(),
            "status" => fake()->randomElement(["shipping", "delivered", "canceled"])
        ];
    }
}
