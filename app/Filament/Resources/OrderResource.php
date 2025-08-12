<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Filament\Resources\OrderResource\RelationManagers;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('status')
                    ->options([
                        'shipping' => 'Shipping',
                        'delivered' => 'Delivered',
                        'canceled' => 'Canceled'
                    ])
                    ->required(),
                Forms\Components\Placeholder::make('total_price')
                    ->content(fn($record) => $record?->total_price ? '$' . $record->total_price : 'N/A'),
                Forms\Components\Placeholder::make('products')
                    ->content(function ($record) {
                        if (!$record || $record->items->isEmpty()) {
                            return 'No products found.';
                        }

                        $items = $record->items->map(function ($item) {
                            $productName = $item->product->name;
                            $quantity = $item->quantity;
                            $unitPrice = $item->price;
                            $discount = $item->discount;

                            $discountText = "";

                            if ($discount != 0)
                                $discountText = " %{$discount}";

                            return "{$quantity} x {$productName} @ \${$unitPrice}" . $discountText;
                        });

                        return $items->implode('<br>');
                    })
                    ->label('Ordered Products')
                    ->helperText('This is a read-only list of items in the order.')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('Customer')->searchable(),

                Tables\Columns\TextColumn::make('user.name')->label('Customer')->searchable(),

                Tables\Columns\TextColumn::make('total_price')
                    ->money('EUR')
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')->color(fn(string $state): string => match ($state) {
                    'shipping' => 'info',
                    'delivered' => 'success',
                    'canceled' => 'danger',
                })
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->date()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make("status")
                    ->options([
                        "shipping" => "Shipping",
                        "delivered" => "Delivered",
                        "canceled" => "Canceled"
                    ])
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
