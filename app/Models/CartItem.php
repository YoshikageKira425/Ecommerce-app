<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $table = "carts_items";
    protected $primaryKey = "id";

    protected $fillable = [
        "cart_id",
        "product_id",
        "quantity",
        "price"
    ];
}
