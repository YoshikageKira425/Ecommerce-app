<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use App\Models\Category;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Facades\DB;

class CategoryChart extends ChartWidget
{
    protected static ?string $heading = 'Products by Category';

    protected function getData(): array
    {
        $categoryCounts = Product::select('category_id', DB::raw('count(*) as count'))
            ->groupBy('category_id')
            ->pluck('count', 'category_id');

        $categories = Category::whereIn('id', $categoryCounts->keys())->get()->keyBy('id');

        $labels = [];
        $data = [];

        foreach ($categoryCounts as $categoryId => $count) {
            $categoryName = $categories->get($categoryId)->category ?? 'Unknown';

            $labels[] = $categoryName;
            $data[] = $count;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Number of Products',
                    'data' => $data,
                    'backgroundColor' => [
                        '#00FFFF',
                        '#FF00FF',
                        '#FFFF00',
                        '#B0E0E6',
                        '#DDA0DD',
                        '#E6E6FA',
                    ],
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'polarArea';
    }
}
