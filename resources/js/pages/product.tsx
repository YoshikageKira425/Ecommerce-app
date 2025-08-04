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
            console.log(error);
        }
    };

    return (
        <>
            <NavBar></NavBar>
            <div className="w-full bg-black px-20">
                <div className="min-h-screen p-6 pt-35">
                    <div className="jusitfy-between flex rounded-lg border-3 border-neutral-600 bg-black py-10 lg:justify-center">
                        <div className="">
                            <img className="mt-2 w-120" src={'/' + product.image} />
                        </div>
                        <div className="jusitfy-end ml-15 flex flex-col">
                            <h2 className="text-4xl font-bold text-white">{product.name}</h2>
                            <p className="w-250 text-lg">{product.description}</p>
                            <div className="mt-4 mb-4 flex flex-col">
                                <div className="mb-1 flex items-center pt-2">
                                    <p className="qty-label text-lg text-neutral-300">Price</p>
                                    <hr className="ml-2 w-full bg-neutral-300" />
                                </div>

                                <div className="flex">
                                    {product.discount > 0 && <p className="mr-3 text-2xl font-bold text-red-500">-{product.discount}%</p>}
                                    <p className="text-2xl font-bold text-white">
                                        {(product.price - product.price * (product.discount / 100)).toFixed(2)}
                                    </p>
                                </div>
                                <p className="text-base text-neutral-100">Base {product.price}</p>
                            </div>
                            <div className="flex w-full flex-col pb-2">
                                <div className="mb-1 flex items-center pt-2">
                                    <p className="qty-label text-lg text-neutral-300">Quantity</p>
                                    <hr className="ml-2 w-full bg-neutral-300" />
                                </div>

                                <div className='flex'>
                                    <button
                                        onClick={() => {
                                            if (quantity > 0) setQuantity(quantity - 1);
                                        }}
                                        className="border border-neutral-400 p-2 duration-300 ease-in-out hover:bg-neutral-700"
                                    >
                                        -
                                    </button>
                                    <p className="border border-neutral-400 p-2 px-5">{quantity}</p>
                                    <button
                                        onClick={() => {
                                            if (quantity < product.stock) setQuantity(quantity + 1);
                                        }}
                                        className="border border-neutral-400 p-2 duration-300 ease-in-out hover:bg-neutral-700"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="mt-5 flex justify-start gap-3">
                                <button
                                    onClick={handleAddToCart}
                                    className="transform rounded-full bg-white px-3 py-2 text-base font-semibold text-black uppercase transition-colors duration-300 hover:bg-neutral-500 focus:bg-neutral-400 focus:outline-none"
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
