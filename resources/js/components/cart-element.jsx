import axios from 'axios';
import { useEffect, useState } from 'react';

export default function CartElement({ cartElement, deleteItself }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    axios
      .get('/get-product', { params: { product_id: cartElement.product_id } })
      .then((res) => {
        setProduct(res.data);
        setQuantity(cartElement.quantity);
      })
      .catch(console.error);
  }, []);

  if (!product) return null;

  const unitPrice = product.price - product.price * (product.discount / 100);
  const totalPrice = unitPrice * quantity;
  const savedAmount = product.price * (product.discount / 100);

  const raiseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((q) => q + 1);
      axios.post('/add-to-cart', { product_id: product.id, quantity: 1 });
    }
  };

  const deincreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
      axios.post('/remove-from-cart', {
        _method: 'DELETE',
        product_id: product.id,
        quantity: 1,
      });
    } else if (quantity === 1) {
      deleteTheProduct();
    }
  };

  const deleteTheProduct = () => {
    deleteItself();
    axios.post('/remove-from-cart', {
      _method: 'DELETE',
      product_id: product.id,
      quantity,
    });
  };

  return (
    <tr className="text-white dark:text-neutral-200">
      <td className="px-6 py-4 whitespace-nowrap font-semibold text-lg">{product.name}</td>

      <td className="px-8 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <button
            onClick={deincreaseQuantity}
            className="rounded border border-blue-600 px-3 py-1 hover:bg-blue-500 transition"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-6 py-1 border border-neutral-600 rounded text-center min-w-[2rem]">{quantity}</span>
          <button
            onClick={raiseQuantity}
            className="rounded border border-blue-600 px-3 py-1 hover:bg-blue-500 transition"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-lg">
        <div>
          <span>€{unitPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <p className="text-sm text-neutral-400 mt-1">You saved €{savedAmount.toFixed(2)}</p>
          )}
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-lg font-semibold">€{totalPrice.toFixed(2)}</td>

      <td className="px-6 py-4 whitespace-nowrap text-center">
        <button
          onClick={deleteTheProduct}
          className="rounded p-2 bg-blue-600 hover:bg-blue-500 transition"
          title="Remove item"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-6 h-6 fill-white"
          >
            <path d="M232.7 69.9L224 96H128C110.3 96 96 110.3 96 128s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-8.7-26.1C402.9 56.8 390.7 48 376.9 48H263.1c-13.8 0-26 8.8-30.4 21.9zM512 208H128l21.1 323.1C150.7 556.4 171.7 576 197 576h246c25.3 0 46.3-19.6 47.9-44.9L512 208z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}