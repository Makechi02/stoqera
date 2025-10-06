'use client'

import {CubeIcon, MagnifyingGlassIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function ProductSearchModal({products, formData, setFormData, setShowProductSearch}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [productSearchTerm, setProductSearchTerm] = useState(searchParams.get('productSearch') || '');

    const debouncedSearch = useDebounce(productSearchTerm, 500);

    const addTransferItem = (product, variant = null) => {
        const existingItemIndex = formData
            .items
            .findIndex(item => item.product_id === product.id && item.variant_id === variant?.id);

        if (existingItemIndex >= 0) {
            // Update existing item quantity
            const updatedItems = [...formData.items];

            const existingItem = updatedItems[existingItemIndex];
            if (existingItem.quantity < existingItem.current_stock) {
                existingItem.quantity += 1;
                setFormData(prev => ({...prev, items: updatedItems}));
            }
        } else {
            // Add new item
            const newItem = {
                product_id: product.id,
                variant_id: variant?.id,
                product_name: product.name,
                variant_name: variant?.name,
                current_stock: product.inventory[0]?.quantity_available || 0,
                quantity: 1
            };
            setFormData(prev => ({...prev, items: [...prev.items, newItem]}));
        }
        setShowProductSearch(false);
        setProductSearchTerm('');
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('productSearch', debouncedSearch);
        } else {
            params.delete('productSearch');
        }

        router.push(`?${params.toString()}`);
    }, [debouncedSearch, searchParams, router]);

    return (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50`}>
            <div className={`bg-gray-800 rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto`}>
                <div className={`p-6`}>
                    <div className={`flex items-center justify-between mb-6`}>
                        <h3 className={`text-lg font-medium`}>Add Products</h3>
                        <button
                            onClick={() => {
                                setShowProductSearch(false);
                                setProductSearchTerm('');
                            }}
                            className={`text-gray-400 hover:text-white`}
                        >
                            <XMarkIcon className={`size-6`}/>
                        </button>
                    </div>

                    {/* Search Input */}
                    <div className={`relative mb-6`}>
                        <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                            <MagnifyingGlassIcon className={`size-5 text-gray-400`}/>
                        </div>
                        <input
                            type={`text`}
                            value={productSearchTerm}
                            onChange={(e) => setProductSearchTerm(e.target.value)}
                            className={`block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                            placeholder={`Search products...`}
                            autoFocus
                        />
                    </div>

                    {/* Products List */}
                    <div className={`space-y-4 max-h-96 overflow-y-auto`}>
                        {products.map(product => (
                            <div key={product.id} className={`bg-gray-700 rounded-lg p-4`}>
                                <h4 className={`font-medium mb-2`}>{product.name}</h4>
                                <p className={`text-gray-400 text-sm mb-3`}>SKU: {product.sku}</p>

                                {!product.variants && (
                                    <button
                                        onClick={() => addTransferItem(product)}
                                        disabled={product.current_stock === 0}
                                        className={`px-3 py-1 rounded text-sm font-medium ${
                                            product.current_stock === 0
                                                ? 'bg-gray-500 text-gray-400 cursor-not-allowed'
                                                : 'bg-teal-600 text-white hover:bg-teal-700'
                                        }`}
                                    >
                                        {product?.current_stock === 0 ? 'Out of Stock' : 'Add'}
                                    </button>
                                )}

                                <div className={`space-y-2`}>
                                    {product?.variants?.map(variant => (
                                        <div key={variant.id}
                                             className={`flex items-center justify-between bg-gray-600 rounded p-3`}>
                                            <div>
                                                <p className={`text-white text-sm`}>{variant.name}</p>
                                                <p className={`text-gray-400 text-xs`}>Stock: {variant.current_stock}</p>
                                            </div>
                                            <button
                                                onClick={() => addTransferItem(product, variant)}
                                                disabled={variant.current_stock === 0}
                                                className={`px-3 py-1 rounded text-sm font-medium ${
                                                    variant.current_stock === 0
                                                        ? 'bg-gray-500 text-gray-400 cursor-not-allowed'
                                                        : 'bg-teal-600 text-white hover:bg-teal-700'
                                                }`}
                                            >
                                                {variant.current_stock === 0 ? 'Out of Stock' : 'Add'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {products.length === 0 && (
                            <div className={`text-center py-8`}>
                                <CubeIcon className={`mx-auto size-12 text-gray-500`}/>
                                <h3 className={`mt-2 text-sm font-medium text-gray-300`}>No products found</h3>
                                <p className={`mt-1 text-sm text-gray-500`}>Try adjusting your search terms</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}