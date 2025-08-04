import NavBar from '@/components/nav-bar';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { MouseEvent, useEffect, useState } from 'react';

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
            <div className="jusitfy-between mx-10 flex min-h-screen bg-black p-6 pt-35 text-white lg:justify-center">
                <div className="">
                    <img className="mt-2 w-80" src={'/' + product.image} />
                </div>
                <div className="ml-5 flex flex-col">
                    <h2 className="text-4xl font-bold text-white">{product.name}</h2>
                    <p className="text-lg">{product.description}</p>
                    <div className="mt-4 mb-4 flex flex-col">
                        <div className="flex">
                            {product.discount > 0 && <p className="mr-3 text-2xl font-bold text-red-500">-{product.discount}%</p>}
                            <p className="text-2xl font-bold text-white">{(product.price - product.price * (product.discount / 100)).toFixed(2)}</p>
                        </div>
                        <p className="text-base text-neutral-100">Base {product.price}</p>
                    </div>
                    <div className="flex justify-end gap-3">
                        <div className="flex flex-row text-white">
                            <button onClick={() => { if (quantity > 0) setQuantity(quantity - 1); }} className="border border-neutral-400 p-2 duration-300 ease-in-out hover:bg-neutral-700">-</button>
                            <p className="border border-neutral-400 p-2 px-5">{quantity}</p>
                            <button onClick={() => { if (quantity < product.stock) setQuantity(quantity + 1); }} className="border border-neutral-400 p-2 duration-300 ease-in-out hover:bg-neutral-700">+</button>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="transform rounded bg-white px-3 py-2 text-base font-semibold text-black uppercase transition-colors duration-300 hover:bg-neutral-500 focus:bg-neutral-400 focus:outline-none"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
