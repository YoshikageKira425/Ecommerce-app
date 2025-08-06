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
        "discount",
        "price"
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
