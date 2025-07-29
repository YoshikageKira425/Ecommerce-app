<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $table = "orders_items";
    protected $primaryKey = "id";

    protected $fillable = [
        "order_id",
        "product_id",
        "quantity",
        "price"
    ];
}
