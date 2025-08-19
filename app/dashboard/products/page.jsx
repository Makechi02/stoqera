import {getProductsForCurrentOrganization} from "@/lib/queryProducts";
import {CubeIcon, FunnelIcon, PlusIcon, TagIcon} from "@heroicons/react/24/outline";
import ProductsGrid from "@/components/dashboard/products/ProductsGrid";
import Link from "next/link";
import React from "react";
import {getCategoriesForCurrentOrganization} from "@/lib/queryCategories";
import {formatCurrency} from "@/utils/formatters";

export default async function Page() {
    const products = await getProductsForCurrentOrganization();
    const categories = await getCategoriesForCurrentOrganization();

    return (
        <div className={`min-h-screen`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-8`}>
                <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8`}>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>Products</h1>
                        <p className={`text-gray-400 mt-1`}>Manage your inventory and product catalog</p>
                    </div>
                    <Link
                        href={`/dashboard/products/new`}
                        className={`mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors`}
                    >
                        <PlusIcon className={`size-5 mr-2`}/>
                        Add Product
                    </Link>
                </div>

                <Stats products={products} categories={categories}/>
                <ProductsGrid categories={categories} products={products}/>
            </div>
        </div>
    )
}

function Stats({products, categories}) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8`}>
            <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Total Products</p>
                        <p className={`text-2xl font-bold`}>{products.length}</p>
                    </div>
                    <div className={`p-3 bg-teal-600/20 rounded-full`}>
                        <CubeIcon className={`size-6 text-teal-400`}/>
                    </div>
                </div>
            </div>

            <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Low Stock</p>
                        <p className={`text-2xl font-bold text-red-400`}>
                            {products.filter(p => p.current_stock <= p.reorder_point).length}
                        </p>
                    </div>
                    <div className={`p-3 bg-red-600/20 rounded-full`}>
                        <TagIcon className={`size-6 text-red-400`}/>
                    </div>
                </div>
            </div>

            <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Categories</p>
                        <p className={`text-2xl font-bold text-white`}>{categories.length}</p>
                    </div>
                    <div className={`p-3 bg-blue-600/20 rounded-full`}>
                        <FunnelIcon className={`size-6 text-blue-400`}/>
                    </div>
                </div>
            </div>

            <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Total Value</p>
                        <p className={`text-2xl font-bold text-green-400`}>
                            {formatCurrency(products.reduce((acc, p) => acc + p.selling_price * p.current_stock, 0))}
                        </p>
                    </div>
                    <div className={`p-3 bg-green-600/20 rounded-full`}>
                        <CubeIcon className={`size-6 text-green-400`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
