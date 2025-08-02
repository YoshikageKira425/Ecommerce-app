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

    return (
        <div className='bg-black'>
            <NavBar></NavBar>
            <div className="flex items-center min-h-screen bg-[#0a0a0a] p-6 text-[#1b1b18] lg:justify-center dark:bg-[#FDFDFC] pt-30">
                <div className='grid grid-cols-3 gap-4'>
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}