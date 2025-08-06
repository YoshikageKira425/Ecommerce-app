import LightRays from '@/components/light-rays';
import NavBar from '@/components/nav-bar';
import ErrorList from '@/components/errors-list';
import { usePage } from '@inertiajs/react';

export default function Checkout() {
    const { errors } = usePage().props;

    return (
        <div className="relative">
            <div className="container relative z-10 mx-auto px-4 py-10">
                <NavBar />

                <div className="flex justify-center mt-12">
                    <form
                        action="/finished-checkout" method='post'
                        className="w-full max-w-lg space-y-6 rounded-xl border border-neutral-700 bg-neutral-900 p-8 shadow-lg"
                    >
                        <input type="hidden" name="_token" value={usePage().props.csrf_token} />
                        
                        <h2 className="text-2xl font-bold text-center text-white">Checkout Details</h2>

                        <ErrorList errors={Object.values(errors)} />

                        <div className="flex flex-col">
                            <label htmlFor="phone_number" className="mb-1 text-sm font-semibold text-neutral-300">
                                Phone Number
                            </label>
                            <input
                                name="phone_number"
                                type="text" required
                                className="rounded-md border border-neutral-600 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                placeholder="e.g. +1234567890"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="city" className="mb-1 text-sm font-semibold text-neutral-300">
                                City
                            </label>
                            <input
                                name="city"
                                type="text" required
                                className="rounded-md border border-neutral-600 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                placeholder="e.g. New York"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="street" className="mb-1 text-sm font-semibold text-neutral-300">
                                Street
                            </label>
                            <input
                                name="street" 
                                type="text" required
                                className="rounded-md border border-neutral-600 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                placeholder="e.g. 123 Main St"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full font-bold rounded-md border border-blue-600 px-3 py-1 transition hover:bg-blue-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}