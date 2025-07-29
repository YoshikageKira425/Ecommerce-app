<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = "orders";
    protected $primaryKey = "id";

    protected $fillable = [
        "user_id",
        "total_price",
        "status"
    ];
}
