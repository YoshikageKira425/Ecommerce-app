export default function ProductItem({ product }) {
    const finalPrice = (product.price - product.price * (product.discount / 100)).toFixed(2);

    return (
        <a
            href={`/products/${product.url_slug}`}
            className="flex flex-col justify-between overflow-hidden rounded-xl bg-neutral-800 shadow-md transition-transform hover:scale-105"
        >
            <img
                src={`http://localhost:8000/storage/${product.image}`}
                alt={product.name} 
                className="w-full h-64 object-cover"
            />

            <div className="px-4 py-4">
                <h2 className="text-lg font-semibold text-white uppercase text-center mb-2">
                    {product.name}
                </h2>

                <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-xl font-bold text-white">€{finalPrice}</span>
                    {product.discount > 0 && (
                        <span className="text-sm font-semibold text-red-500 bg-red-200 px-2 py-0.5 rounded">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                {product.discount > 0 && (
                    <p className="text-center text-sm text-gray-400 line-through">
                        €{product.price}
                    </p>
                )}
            </div>
        </a>
    );
}