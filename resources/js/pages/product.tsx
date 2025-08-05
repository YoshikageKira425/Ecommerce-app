import NavBar from '@/components/nav-bar';
import { type SharedData } from '@/types';
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
    const { auth } = usePage<SharedData>().props;

    const handleAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
        try {
            await axios.post('/add-to-cart', { product_id: product.id, quantity: quantity });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative">
            <div className="fixed top-0 left-0 z-0 h-full w-full">
                {/* Optional: light background effect to match homepage, or remove if not using LightRays here */}
                {/* <LightRays ... /> */}
            </div>

            <div className="relative z-10">
                <div className="container mx-auto px-4 py-10">
                    <NavBar />

                    <div className="mt-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
                        <div className="flex w-full justify-center lg:w-1/2">
                            <img src={`/${product.image}`} alt={product.name} className="w-full max-w-md rounded-xl shadow-lg" />
                        </div>

                        <div className="w-full lg:w-1/2">
                            <h2 className="mb-4 text-3xl font-semibold text-gray-800 lg:text-4xl dark:text-white">{product.name}</h2>

                            <p className="mb-6 text-gray-600 dark:text-gray-400">{product.description}</p>

                            <div className="mb-6">
                                <div className="flex items-center gap-4">
                                    {product.discount > 0 && <span className="text-xl font-bold text-red-500">-{product.discount}%</span>}
                                    <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                        €{(product.price - product.price * (product.discount / 100)).toFixed(2)}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Base price: €{product.price}</p>
                            </div>

                            {auth.user ? (
                                <>
                                    <div className="mb-6">
                                        <p className="mb-2 text-lg text-gray-700 dark:text-gray-300">Quantity</p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => quantity > 0 && setQuantity(quantity - 1)}
                                                className="rounded bg-blue-600 px-3 py-1 hover:bg-blue-500"
                                            >
                                                -
                                            </button>
                                            <span className="rounded border px-4 py-1 text-gray-800 dark:text-white">{quantity}</span>
                                            <button
                                                onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                                                className="rounded bg-blue-600 px-3 py-1 hover:bg-blue-500"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleAddToCart}
                                        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white uppercase transition hover:bg-blue-500"
                                    >
                                        Add to cart
                                    </button>
                                </>
                            ) : (
                                <div className='flex space-x-4'>
                                    <a
                                        href="/register"
                                        className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
                                    >
                                        Sign up
                                    </a>
                                    <a
                                        href="/login"
                                        className="rounded-md border border-blue-600 px-5 py-2 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                                    >
                                        Log In
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
