import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CartElement({ cartElement, deleteItself }) {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        axios
            .get('/get-product', {
                params: { product_id: cartElement.product_id },
            })
            .then((res) => {
                setProduct(res.data);
                setQuantity(cartElement.quantity);
            })
            .catch((err) => console.error(err));
    }, []);

    const raiseQuantity = () => {
        if (quantity < product.stock) 
            setQuantity(quantity + 1);

        axios.post('/add-to-cart', { product_id: product.id, quantity: 1 });
    };

    const deincreaseQuantity = () => {
        if (quantity > 0) 
            setQuantity(quantity - 1);

        if (quantity == 0)
            deleteItself();

        axios.post('/remove-from-cart', {
            _method: 'DELETE',
            product_id: product.id,
            quantity: 1,
        });
    };

    const deleteTheProduct = () => {
        deleteItself();

        axios.post('/remove-from-cart', {
            _method: 'DELETE',
            product_id: product.id,
            quantity: quantity,
        });
    };

    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                <div>
                    <h2 className="font-medium text-neutral-800 dark:text-white">{product.name}</h2>
                </div>
            </td>

            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                <div className="flex flex-row text-white">
                    <button onClick={deincreaseQuantity} className="border border-neutral-400 p-2 duration-300 ease-in-out hover:bg-neutral-700">
                        -
                    </button>
                    <p className="border border-neutral-400 p-2 px-5">{quantity}</p>
                    <button onClick={raiseQuantity} className="border border-neutral-400 p-2 duration-300 ease-in-out hover:bg-neutral-700">
                        +
                    </button>
                </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div>
                    <h4 className="text-neutral-700 dark:text-neutral-200">
                        {(cartElement.price - cartElement.price * (product.discount / 100)).toFixed(2)}
                    </h4>
                    <p className="text-neutral-500 dark:text-neutral-400">You saved {(cartElement.price * (product.discount / 100)).toFixed(2)}</p>
                </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div>
                    <h4 className="text-neutral-700 dark:text-neutral-200">
                        {((cartElement.price - cartElement.price * (product.discount / 100)) * cartElement.quantity).toFixed(2)}
                    </h4>
                </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <button onClick={deleteTheProduct} className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-8">
                        <path
                            fill="gray"
                            d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"
                        />
                    </svg>
                </button>
            </td>
        </tr>
    );
}
