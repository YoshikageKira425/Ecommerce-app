import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import NavBar from '@/components/nav-bar';

export default function Welcome() {

    return (
        <>
            <NavBar></NavBar>
            <div className="flex min-h-screen flex-col items-center bg-[#0a0a0a] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#FDFDFC]"></div>
        </>
    );
}
