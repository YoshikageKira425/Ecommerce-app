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
        Schema::create("orders", function(Blueprint $table)
        {
            $table->id();
            $table->integer("user_id");
            $table->decimal("total_price", 12);
            $table->string("phone_number", 14);
            $table->string("city", 255);
            $table->string("street", 255);
            $table->enum("status", ["shipping", "delivered", "canceled"]);
            $table->timestamps();

            $table->foreign("user_id")->references("id")->on("users");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop("orders");
    }
};
