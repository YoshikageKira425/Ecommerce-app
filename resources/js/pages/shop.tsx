import NavBar from '@/components/nav-bar';
import ProductItem from '@/components/product-item';
import { usePage } from '@inertiajs/react';

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
    console.log(products);

    return (
        <div className="relative bg-white dark:bg-black min-h-screen">
            <div className="relative z-10">
                <div className="container mx-auto px-4 py-10">
                    <NavBar />

                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mt-10 mb-6">
                        Shop All Products
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
