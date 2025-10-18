'use client'

import {MagnifyingGlassIcon, ShoppingCartIcon} from "@heroicons/react/24/outline";
import {formatCurrency} from "@/utils/formatters";
import useDebounce from "@/hooks/useDebounce";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default function SalesProductsGrid({products, addToCart}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, searchParams, router]);

    return (
        <>
            <div className={`mb-6`}>
                <div className={`relative`}>
                    <MagnifyingGlassIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                    <input
                        type={`search`}
                        placeholder={`Search products...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`dashboard-form-input-icon border-none`}
                    />
                </div>
            </div>

            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 2xl:grid-cols-5 gap-3 md:gap-4`}>
                {products.map(product => (
                    <button
                        key={product.id}
                        onClick={() => addToCart(product)}
                        className={`bg-gray-800 rounded-lg p-3 md:p-4 hover:bg-gray-750 transition text-left group`}
                    >
                        <div
                            className={`aspect-square bg-gray-700 rounded-lg mb-3 flex items-center justify-center`}
                        >
                            <ShoppingCartIcon
                                className={`size-8 md:w-12 md:h-12 text-gray-600 group-hover:text-teal-400 transition`}/>
                        </div>
                        <h3 className={`font-semibold mb-1 text-sm md:text-base truncate`}>{product.name}</h3>
                        <p className={`text-teal-400 font-bold text-base`}>{formatCurrency(product.selling_price)}</p>
                        <p className={`text-xs text-gray-400`}>Stock: {product.stock}</p>
                    </button>
                ))}
            </div>
        </>
    )
}