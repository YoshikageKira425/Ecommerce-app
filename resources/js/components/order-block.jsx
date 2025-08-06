import OrderElement from '@/components/order-element';

export default function OrderBlock({ order }) {
    console.log(order);

    return (
        <div className="w-full max-w-2xl space-y-6 rounded-xl border border-neutral-700 bg-neutral-900 p-8 shadow-lg">
            <div>
                <h1 className="text-left text-2xl font-bold">Order</h1>
                <hr className="border-t-3 text-black" />
            </div>
            <div className="space-y-2 text-lg text-white">
                <p>
                    <span className="font-semibold">Total Price:</span> ${order.total_price.toFixed(2)}
                </p>
                <p>
                    <span className="font-semibold">Phone Number:</span> {order.phone_number}
                </p>
                <p>
                    <span className="font-semibold">City:</span> {order.city}
                </p>
                <p>
                    <span className="font-semibold">Street:</span> {order.street}
                </p>
            </div>

            <div className="overflow-x-auto rounded-lg border border-neutral-300 shadow dark:border-neutral-700">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                    <thead className="bg-neutral-100 dark:bg-neutral-800">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Product</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Amount</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Base Price</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-neutral-600 dark:text-neutral-300">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
                        {order.items.map((product, i) => (
                            <OrderElement
                                key={i}
                                orderElement={product}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
