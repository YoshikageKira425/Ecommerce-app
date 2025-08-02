import NavBar from '@/components/nav-bar';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { MouseEvent } from 'react';

type ProductType = {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    discount: number;
};

export default function Product() {
    const { product } = usePage<{ product: ProductType }>().props;

    const handleAddToCart = async (id: number, e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => 
    {
        try{
           // await axios.post('/add-to-cart', { product_id: id });
            e.target.className = "px-3 py-2 text-base font-semibold text-white uppercase transition-colors duration-300 transform bg-red-600 rounded hover:bg-red-800 focus:bg-neutral-400 focus:outline-none";
            e.target.textContent = "Remove to cart";
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <>
            <NavBar></NavBar>
            <div className="jusitfy-between flex min-h-screen bg-black p-6 text-white lg:justify-center pt-30">
                <div className="">
                    <img className="mt-2 w-80" src={'/' + product.image} />
                </div>
                <div className="flex flex-col ml-5">
                    <h2 className="text-4xl font-bold text-white">{product.name}</h2>
                    <p className='text-lg'>{product.description}</p>
                    <div className="mt-4 mb-4 flex flex-col">
                        <div className='flex'>
                            {product.discount > 0 && <p className="mr-3 text-2xl text-red-500 font-bold">-{product.discount}%</p>}
                            <p className="text-2xl text-white font-bold">{Math.round(product.price - product.price * (product.discount / 100))}</p>
                        </div>
                        <p className="text-base text-neutral-100">Base {product.price}</p>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <button onClick={(e) => handleAddToCart(product.id, e)} className="px-3 py-2 text-base font-semibold text-black uppercase transition-colors duration-300 transform bg-white rounded hover:bg-neutral-500 focus:bg-neutral-400 focus:outline-none">Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}
