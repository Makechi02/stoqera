'use client'

import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {formatCurrency} from "@/utils/formatters";
import {getProductsForCurrentOrganization} from "@/lib/queryProducts";
import {ProgressLoader} from "@/components";

export default function ProductsSearchForm({saleItems, setSaleItems}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showProductSearch, setShowProductSearch] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            return await getProductsForCurrentOrganization();
        };

        fetchProducts()
            .then(response => setProducts(response))
            .catch(error => console.error('Error fetching products:', error))
            .finally(() => setLoading(false));

    }, []);

    const filteredProducts = products.filter(product =>
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
                    original_price: product.selling_price,
                    unit_price: product.selling_price,
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
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-slate-400`}/>
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
                                                {formatCurrency(product.selling_price)}
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
            {loading ? (
                <div className={`flex justify-center items-center h-20`}>
                    <ProgressLoader size={`lg`}/>
                </div>
            ) : (
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-2`}>
                    {products.slice(0, 4).map((product) => (
                        <button
                            key={product.id}
                            onClick={() => addProductToSale(product)}
                            className={`p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left`}
                        >
                            <p className={`font-medium text-sm truncate`}>{product.name}</p>
                            <p className={`text-teal-400 font-bold`}>{formatCurrency(product.selling_price)}</p>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}