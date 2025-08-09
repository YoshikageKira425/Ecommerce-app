<?php

namespace App\Filament\Widgets;

use App\Models\Order; // <-- Make sure to import your model
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB; // <-- Import the DB facade

class OrderChart extends ChartWidget
{
    protected static ?string $heading = 'Order Statuses';

    protected function getData(): array
    {
        $data = Order::query()
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status'); 

        $backgroundColors = [
            'shipping' => '#36A2EB',   
            'delivered' => '#4CAF50', 
            'canceled' => '#F44336' 
        ];

        return [
            'datasets' => [
                [
                    'label' => 'Orders', 
                    'data' => $data->values()->toArray(),
                    'backgroundColor' => $data->keys()->map(fn ($status) => $backgroundColors[$status] ?? '#9BD0F5')->toArray(),
                ],
            ],
            'labels' => $data->keys()->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }
}