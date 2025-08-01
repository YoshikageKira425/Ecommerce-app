export default function ProductItem({ product }) {
    return (
        <div className="flex max-w-xs flex-col justify-between overflow-hidden rounded-lg bg-neutral-900 shadow-2xl">
            <div className="px-4 py-2">
                <h1 className="text-xl font-bold text-white uppercase">{product.name}</h1>
                <p className="mt-1 text-sm text-neutral-400">{product.description}</p>
            </div>

            <a href={`/products/${product.url_slug}`}>
                <img className="mt-2 w-80" src={product.image} />
            </a>

            <div className="flex items-center justify-between bg-neutral-900 px-4 py-2">
                <div className="flex">
                    {product.discount > 0 && <p className="mr-3 text-xl font-bold text-red-500">-{product.discount}%</p>}
                    <p className="text-xl font-bold text-white">{Math.round(product.price - product.price * (product.discount / 100))}</p>
                </div>
                <button className="transform rounded bg-white px-2 py-1 text-xs font-semibold text-neutral-900 uppercase transition-colors duration-300 hover:bg-neutral-200 focus:bg-neutral-400 focus:outline-none">
                    Add to cart
                </button>
            </div>
        </div>
    );
}
