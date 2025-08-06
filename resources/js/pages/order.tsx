import NavBar from '@/components/nav-bar';
import OrderBlock from '@/components/order-block';
import { usePage } from '@inertiajs/react';

export default function OrderPage() {
    const { orders } = usePage<{ orders: Order[] }>().props;

    return (
        <div className="relative">
            <div className="container relative z-10 mx-auto px-4 py-10">
                <NavBar />

                <h1 className="text-center text-3xl font-bold text-white mb-8">Your Orders</h1>

                <div className="flex flex-col items-center gap-6 mt-12">
                    {orders.length === 0 ? (
                        <p className="text-neutral-400 text-lg">You have no orders yet.</p>
                    ) : (
                        orders.map((order) => (
                            <OrderBlock key={order.id} order={order} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    discount: number;
    price: number;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    user_id: number;
    total_price: number;
    phone_number: string;
    city: string;
    street: string;
    status: string;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
}
