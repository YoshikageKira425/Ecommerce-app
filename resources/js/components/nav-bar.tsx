import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function NavBar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <nav className="flex flex-row justify-between bg-[#0a0a0a] p-3 text-white">
            <h1 className="text-2xl">Shopping</h1>
            <input type="text" placeholder="Search..." className="rounded-lg bg-neutral-600 pl-2 w-[40%]" />
            {auth.user ? (
                <a
                    href="/login"
                    className="rounded-sm border border-transparent px-5 py-1.5 text-lg leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                >
                    Log In
                </a>
            ) : (
                <a
                    href="/login"
                    className="rounded-sm border border-transparent px-5 py-1.5 text-lg leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                >
                    Log Out
                </a>
            )}
        </nav>
    );
}
