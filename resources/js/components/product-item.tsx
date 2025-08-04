export default function ProductItem({ product }) {
    return (
        <a href={`/products/${product.url_slug}`} className="flex max-w-xs flex-col border-2 border-neutral-600 justify-between overflow-hidden rounded-lg bg-neutral-800">
            <img className="w-80" src={product.image} />

            <h1 className="text-xl px-2 text-center font-bold text-white uppercase">{product.name}</h1>

            <div className="flex items-center justify-between px-4 py-2">
                <div className="flex">
                    <p className="text-lg p-1 font-bold text-white">{(product.price - product.price * (product.discount / 100)).toFixed(2)}</p>
                    {product.discount > 0 && <p className="ml-3 p-1 rounded bg-red-300 text-lg font-bold text-red-500">-{product.discount}%</p>}
                </div>
            </div>
            {product.discount > 0 && <p className="text-base px-5 mb-2 font-bold text-neutral-400 line-through">{product.price}</p> }
        </a>
    );
}
