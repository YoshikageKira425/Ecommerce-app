import NavBar from '@/components/nav-bar';
import ProductItem from '@/components/product-item';

export default function Shop({ products }) {
    console.log(products);
    return (
        <>
            <NavBar></NavBar>
            <div className="flex items-center min-h-screen bg-[#0a0a0a] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#FDFDFC]">
                <div className='grid grid-cols-3 gap-4'>
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}
