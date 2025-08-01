import NavBar from '@/components/nav-bar';

export default function Product({ product }) {
    return (
        <>
            <NavBar></NavBar>
            <div className="jusitfy-between flex min-h-screen bg-[#0a0a0a] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#FDFDFC]">
                <div className="">
                    <img className="mt-2 w-80" src={'/' + product.image} />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-black">{product.name}</h2>
                    <p className='text-base'>{product.description}</p>
                    <div className="mt-4 mb-4 flex flex-col">
                        <div className='flex'>
                            {product.discount > 0 && <p className="mr-3 text-xl text-red-500 font-bold">-{product.discount}%</p>}
                            <p className="text-xl text-black font-bold">{Math.round(product.price - product.price * (product.discount / 100))}</p>
                        </div>
                        <p className="text-sm text-neutral-700">Base {product.price}</p>
                    </div>
                    <div className='flex justify-end gap-3'>
                        <button className="px-3 py-2 text-base font-semibold text-white uppercase transition-colors duration-300 transform bg-black rounded hover:bg-neutral-700 focus:bg-neutral-400 focus:outline-none">Add to cart</button>
                        <button className="px-3 py-2 text-base font-semibold text-white uppercase transition-colors duration-300 transform bg-black rounded hover:bg-neutral-700 focus:bg-neutral-400 focus:outline-none">Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}
