import axios from 'axios';
import { useEffect, useState } from 'react';

export default function OrderElement({ orderElement }) {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        axios
            .get('/get-product', { params: { product_id: orderElement.product_id } })
            .then((res) => {
                setProduct(res.data);
                setQuantity(orderElement.quantity);
            })
            .catch(console.error);
    }, []);

    if (!product) return null;

    const unitPrice = orderElement.price - orderElement.price * (orderElement.discount / 100);
    const totalPrice = unitPrice * quantity;
    const savedAmount = orderElement.price * (orderElement.discount / 100);

    return (
        <tr className="text-white dark:text-neutral-200">
            <td className="px-6 py-4 text-lg font-semibold whitespace-nowrap"><a href={`/products/${product.url_slug}`}>{product.name}</a></td>

            <td className="px-8 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-3">
                    {quantity}
                </div>
            </td>

            <td className="px-6 py-4 text-lg whitespace-nowrap">
                <div>
                    <span>€{unitPrice.toFixed(2)}</span>
                    {product.discount > 0 && <p className="mt-1 text-sm text-neutral-400">You saved €{savedAmount.toFixed(2)}</p>}
                </div>
            </td>

            <td className="px-6 py-4 text-lg font-semibold whitespace-nowrap">€{totalPrice.toFixed(2)}</td>
        </tr>
    );
}
