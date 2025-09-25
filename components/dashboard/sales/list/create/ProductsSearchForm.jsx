'use client'

import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {formatCurrency} from "@/utils/formatters";

export default function ProductsSearchForm({saleItems, setSaleItems}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showProductSearch, setShowProductSearch] = useState(false);

    const mockProducts = [
        {
            id: '1',
            name: 'Wireless Headphones',
            sku: 'WH-001',
            price: 99.99,
            stock: 25,
            image: null,
            category: 'Electronics'
        },
        {
            id: '2',
            name: 'Coffee Mug',
            sku: 'MG-002',
            price: 12.50,
            stock: 50,
            image: null,
            category: 'Kitchen'
        },
        {
            id: '3',
            name: 'Notebook',
            sku: 'NB-003',
            price: 8.99,
            stock: 100,
            image: null,
            category: 'Stationery'
        },
        {
            id: '4',
            name: 'Bluetooth Speaker',
            sku: 'BS-004',
            price: 149.99,
            stock: 15,
            image: null,
            category: 'Electronics'
        }
    ];

    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const addProductToSale = (product) => {
        const existingItem = saleItems.find(item => item.product_id === product.id);

        if (existingItem) {
            setSaleItems(items =>
                items.map(item =>
                    item.product_id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            );
        } else {
            setSaleItems(items => [
                ...items,
                {
                    id: Date.now().toString(),
                    product_id: product.id,
                    name: product.name,
                    sku: product.sku,
                    original_price: product.price,
                    unit_price: product.price,
                    quantity: 1,
                    discount_amount: 0,
                    tax_amount: 0
                }
            ]);
        }
        setShowProductSearch(false);
        setSearchQuery('');
    };

    return (
        <div className={`bg-slate-800 rounded-xl border border-slate-700 p-4`}>
            <div className={`flex items-center justify-between mb-4`}>
                <h2 className={`text-lg font-semibold`}>Add Products</h2>
                <button
                    onClick={() => setShowProductSearch(!showProductSearch)}
                    className={`p-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors`}
                >
                    <MagnifyingGlassIcon className={`size-5`}/>
                </button>
            </div>

            {showProductSearch && (
                <div className={`mb-4`}>
                    <div className={`relative`}>
                        <MagnifyingGlassIcon
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400`}/>
                        <input
                            type={`text`}
                            placeholder={`Search products by name or SKU...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`dashboard-form-input-icon border-slate-600`}
                        />
                    </div>

                    {searchQuery && (
                        <div
                            className={`mt-2 max-h-64 overflow-y-auto bg-slate-700 rounded-lg border border-slate-600`}>
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => addProductToSale(product)}
                                    className={`p-3 hover:bg-slate-600 cursor-pointer border-b border-slate-600 last:border-b-0`}
                                >
                                    <div className={`flex items-center justify-between`}>
                                        <div>
                                            <p className={`font-medium`}>{product.name}</p>
                                            <p className={`text-sm text-slate-400`}>
                                                SKU: {product.sku} • Stock: {product.stock}
                                            </p>
                                        </div>
                                        <div className={`text-right`}>
                                            <p className={`font-bold text-teal-400`}>
                                                {formatCurrency(product.price)}
                                            </p>
                                            <p className={`text-xs text-slate-400`}>{product.category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredProducts.length === 0 && (
                                <div className={`p-4 text-center text-slate-400`}>
                                    No products found matching "{searchQuery}"
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Quick Product Buttons */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-2`}>
                {mockProducts.slice(0, 4).map((product) => (
                    <button
                        key={product.id}
                        onClick={() => addProductToSale(product)}
                        className={`p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left`}
                    >
                        <p className={`font-medium text-sm truncate`}>{product.name}</p>
                        <p className={`text-teal-400 font-bold`}>{formatCurrency(product.price)}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}