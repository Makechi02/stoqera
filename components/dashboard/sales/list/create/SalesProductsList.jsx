'use client'

import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {formatCurrency} from "@/utils/formatters";
import useDebounce from "@/hooks/useDebounce";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default function SalesProductsList({products, addToCart}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [showProductSearch, setShowProductSearch] = useState(false);

    const debouncedSearch = useDebounce(searchQuery, 100);

    const handleAddToCart = (product) => {
        addToCart(product);

        setSearchQuery('');
        setShowProductSearch(false);
    }

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
        <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
            <label className={`dashboard-form-label mb-2`}>Add Products</label>
            <div className={`relative`}>
                <MagnifyingGlassIcon className={`absolute left-3 top-3 size-5 text-gray-400`}/>
                <input
                    type={`search`}
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowProductSearch(true);
                    }}
                    onFocus={() => setShowProductSearch(true)}
                    className={`dashboard-form-input-icon border-gray-600`}
                    placeholder={`Search products by name or SKU...`}
                />

                {/* Product Search Results */}
                {showProductSearch && (
                    <div
                        className={`absolute z-10 w-full mt-2 bg-gray-700 border border-gray-600 rounded-lg shadow-xl max-h-64 overflow-y-auto`}
                    >
                        {products.length > 0 ? (
                            products.map(product => (
                                <button
                                    key={product.id}
                                    onClick={() => handleAddToCart(product)}
                                    className={`w-full px-4 py-3 hover:bg-gray-600 flex flex-wrap items-center justify-between gap-2 text-left transition-colors border-b border-gray-600 last:border-b-0`}
                                >
                                    <div>
                                        <p className={`font-medium text-gray-100`}>{product.name}</p>
                                        <p className={`text-sm text-gray-400`}>
                                            SKU: {product.sku} • Stock: {product.stock}
                                        </p>
                                    </div>
                                    <p className={`text-teal-400 font-semibold`}>
                                        {formatCurrency(product.selling_price)}
                                    </p>
                                </button>
                            ))
                        ) : (
                            <div className={`px-4 py-6 text-center text-gray-400`}>No products found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}