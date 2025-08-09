import CartElement from '@/components/cart-element';
import NavBar from '@/components/nav-bar';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Cart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('/get-carts-items')
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (productId: number) => {
        setProducts((prev) => prev.filter((item) => item.product_id !== productId));
    };

    const emptyCart = () => {
        setProducts([]);
        axios.post('/cart', {
            _method: 'DELETE',
        });
    };

    const [totalPrice, setTotalPrice] = useState(0);

    return (
        <div className="relative min-h-screen bg-white dark:bg-black">
            <div className="relative z-10">
                <div className="container mx-auto px-4 py-10">
                    <NavBar />

                    <div className="mt-10">
                        <div className="overflow-x-auto rounded-lg border border-neutral-300 shadow dark:border-neutral-700">
                            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                                <thead className="bg-neutral-100 dark:bg-neutral-800">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Product</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Amount</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Base Price</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Total</th>
                                        <th className="px-4 py-3 text-center text-sm font-medium text-neutral-600 dark:text-neutral-300">
                                            <button
                                                onClick={emptyCart}
                                                className="rounded bg-blue-600 p-2 transition hover:bg-blue-500"
                                                title="Empty Cart"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="h-6 w-6 fill-white">
                                                    <path d="M232.7 69.9L224 96H128C110.3 96 96 110.3 96 128s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-8.7-26.1C402.9 56.8 390.7 48 376.9 48H263.1c-13.8 0-26 8.8-30.4 21.9zM512 208H128l21.1 323.1C150.7 556.4 171.7 576 197 576h246c25.3 0 46.3-19.6 47.9-44.9L512 208z" />
                                                </svg>
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                                    {products.length > 0 ? (
                                        products.map((product, i) => (
                                            <CartElement
                                                key={i}
                                                cartElement={product}
                                                deleteItself={() => handleDelete(product.product_id)}
                                                setPrice={setTotalPrice}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-gray-500 dark:text-neutral-400">
                                                Your cart is empty.
                                            </td>
                                        </tr>
                                    )}
                                    {products.length > 0 && (
                                        <tr>
                                            <td colSpan={3}></td>
                                            <td colSpan={1} className="py-6 text-left text-gray-500 dark:text-neutral-400">
                                                Total Price: €{totalPrice.toFixed(2)}
                                            </td>
                                            <td></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {products.length > 0 && (
                            <div className='w-full flex justify-end mt-7'>
                                <a href='/checkout' className="rounded border border-blue-600 px-3 py-1 transition hover:bg-blue-500">Checkout</a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
