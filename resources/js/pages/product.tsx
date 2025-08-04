import NavBar from '@/components/nav-bar';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { MouseEvent, useState } from 'react';

type ProductType = {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
};

export default function Product() {
    const { product } = usePage<{ product: ProductType }>().props;
    const [quantity, setQuantity] = useState(0);

    const handleAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            await axios.post('/add-to-cart', { product_id: product.id, quantity: quantity });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative">
            <div className="fixed top-0 left-0 w-full h-full z-0">
                {/* Optional: light background effect to match homepage, or remove if not using LightRays here */}
                {/* <LightRays ... /> */}
            </div>

            <div className="relative z-10">
                <div className="container mx-auto px-4 py-10">
                    <NavBar />

                    <div className="mt-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <img
                                src={`/${product.image}`}
                                alt={product.name}
                                className="w-full max-w-md rounded-xl shadow-lg"
                            />
                        </div>

                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white mb-4">
                                {product.name}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>

                            <div className="mb-6">
                                <div className="flex items-center gap-4">
                                    {product.discount > 0 && (
                                        <span className="text-xl font-bold text-red-500">
                                            -{product.discount}%
                                        </span>
                                    )}
                                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                        €{(product.price - product.price * (product.discount / 100)).toFixed(2)}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Base price: €{product.price}</p>
                            </div>

                            <div className="mb-6">
                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Quantity</p>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => quantity > 0 && setQuantity(quantity - 1)}
                                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 border rounded text-gray-800 dark:text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition uppercase text-sm font-semibold"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
