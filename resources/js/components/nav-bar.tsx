import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const { auth } = usePage<SharedData>().props;
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!search.trim()) {
      setProducts([]);
      return;
    }

    axios
      .get('/get-products')
      .then((res) => {
        const filtered = res.data.filter((product: any) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        );
        setProducts(filtered.slice(0, 5));
      })
      .catch(console.error);
  }, [search]);

  return (
    <nav className="relative w-full text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        <a href="/" className="text-2xl font-bold tracking-wide hover:text-blue-500">
          Shopping
        </a>

        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-[50%] rounded-md bg-neutral-700 px-4 py-2 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoComplete="off"
        />

        <div className="flex space-x-4">
          {!auth.user ? (
            <>
              <a
                href="/register"
                className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 transition"
              >
                Sign up
              </a>
              <a
                href="/login"
                className="rounded-md border border-blue-600 px-5 py-2 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Log In
              </a>
            </>
          ) : (
            <>
              <a
                href="/logout"
                className="rounded-md border border-gray-600 px-5 py-2 font-semibold text-gray-300 hover:bg-gray-700 transition"
              >
                Log Out
              </a>
              <a
                href="/cart"
                className="rounded-md border border-gray-600 px-5 py-2 font-semibold text-gray-300 hover:bg-gray-700 transition"
              >
                Cart
              </a>
            </>
          )}
        </div>
      </div>

      {search.trim() && (
        <div className="absolute top-14 left-25 w-[40%] translate-x-1/2 rounded-b-md bg-neutral-800 shadow-lg z-50 max-h-60 overflow-auto">
          {products.length > 0 ? (
            products.map((product: any) => (
              <a
                key={product.id}
                href={`/products/${product.url_slug}`}
                className="flex items-center gap-3 px-4 py-2 text-white hover:bg-neutral-700 transition"
              >
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                <span className="truncate">{product.name}</span>
              </a>
            ))
          ) : (
            <div className="px-4 py-2 text-neutral-400">No products found.</div>
          )}
        </div>
      )}
    </nav>
  );
}
