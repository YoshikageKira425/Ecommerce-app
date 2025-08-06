import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    const [count, setCount] = useState(0);

    useEffect(() => {
        axios
            .get('/get-carts-items')
            .then((res) => setCount(res.data.length))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (!search.trim()) {
            setProducts([]);
            return;
        }

        axios
            .get('/get-products')
            .then((res) => {
                const filtered = res.data.filter((product: any) => product.name.toLowerCase().includes(search.toLowerCase()));
                setProducts(filtered.slice(0, 5));
            })
            .catch(console.error);
    }, [search]);

    return (
        <nav className="relative w-full text-white">
            <div className="container mx-auto flex items-center justify-between px-6 py-3">
                <a href="/" className="text-2xl font-bold tracking-wide hover:text-blue-500">
                    Shopping
                </a>

                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-[50%] rounded-md bg-neutral-700 px-4 py-2 text-white placeholder-neutral-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    autoComplete="off"
                />

                <div className="flex space-x-4">
                    {!auth.user ? (
                        <>
                            <a href="/register" className="rounded-md bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                                Sign up
                            </a>
                            <a
                                href="/login"
                                className="rounded-md border border-blue-600 px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                            >
                                Log In
                            </a>
                        </>
                    ) : (
                        <>
                            <a
                                href="/logout"
                                className="rounded-md border border-gray-600 px-5 py-3 font-semibold text-gray-300 transition hover:bg-gray-700"
                            >
                                Log Out
                            </a>
                            <a
                                href="/cart"
                                className="rounded-md border border-gray-600 px-5 py-2 font-semibold text-gray-300 transition hover:bg-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-8">
                                    <path
                                        fill="white"
                                        d="M24 48C10.7 48 0 58.7 0 72C0 85.3 10.7 96 24 96L69.3 96C73.2 96 76.5 98.8 77.2 102.6L129.3 388.9C135.5 423.1 165.3 448 200.1 448L456 448C469.3 448 480 437.3 480 424C480 410.7 469.3 400 456 400L200.1 400C188.5 400 178.6 391.7 176.5 380.3L171.4 352L475 352C505.8 352 532.2 330.1 537.9 299.8L568.9 133.9C572.6 114.2 557.5 96 537.4 96L124.7 96L124.3 94C119.5 67.4 96.3 48 69.2 48L24 48zM208 576C234.5 576 256 554.5 256 528C256 501.5 234.5 480 208 480C181.5 480 160 501.5 160 528C160 554.5 181.5 576 208 576zM432 576C458.5 576 480 554.5 480 528C480 501.5 458.5 480 432 480C405.5 480 384 501.5 384 528C384 554.5 405.5 576 432 576z"
                                    />
                                </svg>
                                {count > 0 && (
                                    <span className="absolute top-3 right-8 h-6 w-6 rounded-full bg-blue-500 text-center text-white">{count}</span>
                                )}
                            </a>
                            <a
                                href="/orders"
                                className="rounded-md border border-gray-600 px-5 py-3 font-semibold text-gray-300 transition hover:bg-gray-700"
                            >
                                Orders
                            </a>
                        </>
                    )}
                </div>
            </div>

            {search.trim() && (
                <div className="absolute top-14 left-25 z-50 max-h-60 w-[40%] translate-x-1/2 overflow-auto rounded-b-md bg-neutral-800 shadow-lg">
                    {products.length > 0 ? (
                        products.map((product: any) => (
                            <a
                                key={product.id}
                                href={`/products/${product.url_slug}`}
                                className="flex items-center gap-3 px-4 py-2 text-white transition hover:bg-neutral-700"
                            >
                                <img src={product.image} alt={product.name} className="h-10 w-10 rounded object-cover" />
                                <span className="truncate">{product.name}</span>
                            </a>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-neutral-400">No products found.</div>
                    )}
                </div>
            )}
        </nav>
    );
}
