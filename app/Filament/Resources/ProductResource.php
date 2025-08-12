<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Category;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Support\Enums\MaxWidth;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\QueryBuilder;
use Filament\Tables\Filters\QueryBuilder\Constraints\NumberConstraint;
use Filament\Tables\Filters\SelectFilter;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('image')
                    ->image()
                    ->required()
                    ->disk('public')
                    ->directory('images/products'),

                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn(string $operation, $state, Forms\Set $set) => $operation === 'create' ? $set('url_slug', Str::slug($state)) : null),

                TextInput::make('url_slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),

                Select::make('category_id')
                    ->options(Category::all()->pluck("category", "id"))
                    ->placeholder('Select a category')
                    ->label("Chose Category:"),

                Textarea::make('description')
                    ->maxLength(65535)
                    ->columnSpan('full'),

                TextInput::make('price')
                    ->numeric()
                    ->prefix('€')
                    ->required(),

                TextInput::make('discount')
                    ->numeric()
                    ->prefix('%')
                    ->required(),

                TextInput::make('stock')
                    ->numeric()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')
                    ->width(50)
                    ->height(50),

                TextColumn::make('name')
                    ->searchable(),

                TextColumn::make('category.category')
                    ->label('Category')
                    ->sortable(),

                TextColumn::make('price')
                    ->money('EUR')
                    ->sortable(),

                TextColumn::make('discount')
                    ->prefix("%")
                    ->sortable(),

                TextColumn::make('stock')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make("category_id")
                    ->placeholder('Select a category')
                    ->label("Chose Category:")
                    ->options(Category::all()->pluck("category", "id")),

                QueryBuilder::make()
                    ->constraints([
                        NumberConstraint::make('stock'),
                        NumberConstraint::make('price'),
                        NumberConstraint::make('discount'),
                    ]),
            ])
            ->filtersFormWidth(MaxWidth::FourExtraLarge)
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
