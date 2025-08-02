import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function NavBar() {
    const { auth } = usePage<SharedData>().props;
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get('/get-products')
            .then((res) => {
                const result = res.data.filter((product: any) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
                );
                setProducts(result.slice(0, 5));
            })
            .catch((err) => console.error(err));
    }, [search]);

    return (
        <nav className="fixed z-10 flex w-full justify-center">
            <div className="mt-5 flex w-[80%] flex-row justify-between rounded-full border border-2 border-white/30 bg-neutral-600/50 p-3 text-white">
                <a href="/" className="py-1.5 text-center text-2xl">
                    Shopping
                </a>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    name="search"
                    type="text"
                    placeholder="Searching..."
                    className="w-[40%] rounded-lg bg-neutral-600/70 pl-2 text-center text-lg"
                />
                {!auth.user ? (
                    <div className="flex flex-row">
                        <a
                            href="/register"
                            className="rounded-sm border border-transparent px-5 py-1.5 text-lg leading-normal font-semibold text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Sign up
                        </a>
                        <a
                            href="/login"
                            className="rounded-sm border border-transparent px-5 py-1.5 text-lg leading-normal font-semibold text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                        >
                            Log In
                        </a>
                    </div>
                ) : (
                    <a
                        href="/login"
                        className="rounded-sm border border-transparent px-5 py-1.5 text-lg leading-normal font-semibold text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                    >
                        Log Out
                    </a>
                )}
            </div>
            {search && (
                <div className="absolute top-25 w-[40%] text-black rounded shadow-lg flex flex-col gap-2 bg-neutral-800">
                    {products.length > 0 ? (
                        products.map((product: any) => (
                            <a href={"/products/" + product.url_slug} key={product.id} className="p-2 border-b flex items-center bg-neutral-100 hover:bg-neutral-400 ease-in-out duration-300 rounded">
                                <img src={product.image} className='w-10' alt="" />
                                {product.name}
                            </a>
                        ))
                    ) : (
                        <div className="p-2">No products found.</div>
                    )}
                </div>
            )}
        </nav>
    );
}
