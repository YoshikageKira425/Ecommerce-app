export default function CartElement() {
    return (
        <tr>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                <div>
                    <h2 className="font-medium text-neutral-800 dark:text-white">Catalog</h2>
                </div>
            </td>

            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                <div className="flex flex-row text-white">
                    <button className="border border-neutral-400 p-2 duration-300 ease-in-out hover:bg-neutral-700">-</button>
                    <p className="border border-neutral-400 p-2 px-5">4</p>
                    <button className="border border-neutral-400 p-2 duration-300 ease-in-out hover:bg-neutral-700">+</button>
                </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div>
                    <h4 className="text-neutral-700 dark:text-neutral-200">70</h4>
                    <p className="text-neutral-500 dark:text-neutral-400">you saved 5</p>
                </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div>
                    <h4 className="text-neutral-700 dark:text-neutral-200">280</h4>
                </div>
            </td>

            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <button className="rounded-lg px-1 py-1 text-gray-500 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300">
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
