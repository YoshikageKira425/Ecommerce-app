<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("carts_items", function(Blueprint $table)
        {
            $table->id();
            $table->integer("cart_id");
            $table->integer("product_id");
            $table->integer("quantity");
            $table->decimal("price");
            $table->timestamps();

            $table->foreign("cart_id")->references("id")->on("carts");
            $table->foreign("product_id")->references("id")->on("products");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop("carts_items");
    }
};
