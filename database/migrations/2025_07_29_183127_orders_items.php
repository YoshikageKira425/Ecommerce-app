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
        Schema::create("orders_items", function(Blueprint $table)
        {
            $table->id();
            $table->integer("order_id");
            $table->integer("product_id");
            $table->enum("status", ["pending", "paid", "shipping", "cancelled"]);
            $table->timestamps();

            $table->foreign("order_id")->references("id")->on("orders");
            $table->foreign("product_id")->references("id")->on("products");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop("orders_items");
    }
};
