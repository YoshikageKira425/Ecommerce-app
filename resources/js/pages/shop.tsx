import NavBar from '@/components/nav-bar';
import ProductItem from '@/components/product-item';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

type ProductType = {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    discount: number;
};

export default function Shop() {
    const { products } = usePage<{ products: ProductType[] }>().props;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get('/get-categories')
            .then((res) => setCategories(res.data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative min-h-screen bg-white dark:bg-black">
            <div className="relative z-10">
                <div className="container mx-auto px-4 py-10">
                    <NavBar />

                    <h1 className="mt-10 mb-6 text-3xl font-semibold text-neutral-800 dark:text-white">Shop All Products</h1>

                    <div className="relative inline-block" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:ring-opacity-40 dark:focus:ring-opacity-40 relative z-10 mb-5 block rounded-md border border-transparent bg-white p-2 text-neutral-700 hover:bg-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none dark:bg-neutral-800 dark:text-white dark:focus:ring-blue-400"
                        >
                            Categories
                        </button>

                        {isOpen && (
                            <div
                                className="absolute left-0 z-20 mt-2 w-64 origin-top-right overflow-hidden rounded-md bg-white shadow-lg sm:w-80 dark:bg-neutral-800"
                                style={{ transition: 'all 0.1s ease-out' }}
                            >
                                <div className="py-2">
                                    {categories.map((category, index) => (
                                        <a
                                            href={`/category/${category.category}`}
                                            key={index}
                                            className="mx-2 flex transform items-center rounded-md border-b border-b-2 border-blue-700 px-4 py-3 transition-colors duration-300 hover:bg-blue-500"
                                        >
                                            {category.category}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products && products.map((product) => <ProductItem key={product.id} product={product} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}
