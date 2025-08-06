import NavBar from '@/components/nav-bar';
import { usePage } from '@inertiajs/react';

export default function Order() {
    const { orders } = usePage().props;
    console.log(orders);

    return (
        <div className="relative">
            <div className="container relative z-10 mx-auto px-4 py-10">
                <NavBar />

                <div className="flex justify-center mt-12">
                    
                </div>
            </div>
        </div>
    );
}