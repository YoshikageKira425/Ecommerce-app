import CartElement from '@/components/cart-element';
import NavBar from '@/components/nav-bar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('/get-carts-items')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (productId: number) => {
        setProducts((prev) => prev.filter((item) => item.product_id !== productId));
    };

    const emptyCart = () => {
        setProducts([]);
        axios.post('/empty-cart', {
            _method: 'DELETE',
        });
    };

    return (
        <>
            <NavBar></NavBar>
            <section className="flex min-h-screen flex-col items-center bg-black p-8 pt-25">
                <div className="container mx-auto px-4">
                    <div className="mt-3 flex flex-col">
                        <div className="mx-4 my-2 overflow-x-auto sm:mx-6 lg:mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-neutral-200 md:rounded-lg dark:border-neutral-700">
                                    <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                                        <thead className="bg-neutral-50 dark:bg-neutral-800">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-neutral-500 rtl:text-right dark:text-neutral-400"
                                                >
                                                    <span>Product</span>
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-12 py-3.5 text-left text-sm font-normal text-neutral-500 rtl:text-right dark:text-neutral-400"
                                                >
                                                    Amount
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-neutral-500 rtl:text-right dark:text-neutral-400"
                                                >
                                                    Base Price
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-neutral-500 rtl:text-right dark:text-neutral-400"
                                                >
                                                    Total
                                                </th>

                                                <th
                                                    scope="col"
                                                    className="px-4 py-3.5 text-left text-sm font-normal text-neutral-500 rtl:text-right dark:text-neutral-400"
                                                >
                                                    <button
                                                        onClick={emptyCart}
                                                        className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-8">
                                                            <path
                                                                fill="gray"
                                                                d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                                            {products.map((product, i) => (
                                                <CartElement key={i} cartElement={product} deleteItself={() => handleDelete(product.product_id)} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
