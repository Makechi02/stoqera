'use client'

import {useEffect, useState} from 'react';
import {CubeIcon, EyeIcon, MagnifyingGlassIcon, PencilIcon, PhotoIcon, PlusIcon} from '@heroicons/react/24/outline';
import {formatCurrency} from "@/utils/formatters";
import Link from "next/link";
import Image from "next/image";
import {getStockStatus} from "@/utils/productUtils";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function ProductsGrid({categories, products}) {
    const [viewMode, setViewMode] = useState('grid');

    return (
        <>
            <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8`}>
                <FiltersBar categories={categories}/>

                <div className={`mt-4 flex items-center justify-end`}>
                    <div className={`flex items-center gap-2`}>
                        <span className={`text-gray-400 text-sm`}>View:</span>
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-teal-600 text-text' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
                        >
                            <svg className={`size-4`} fill={`currentColor`} viewBox={`0 0 20 20`}>
                                <path
                                    fillRule={`evenodd`}
                                    clipRule={`evenodd`}
                                    d={`M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zM10 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zM10 10a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3z`}
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-teal-600 text-text' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
                        >
                            <svg className={`size-4`} fill={`currentColor`} viewBox={`0 0 20 20`}>
                                <path
                                    fillRule={`evenodd`}
                                    clipRule={`evenodd`}
                                    d={`M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM6 4a1 1 0 000 2h11a1 1 0 100-2H6zM3 10a1 1 0 100 2h.01a1 1 0 100-2H3zM6 10a1 1 0 100 2h11a1 1 0 100-2H6zM3 16a1 1 0 100 2h.01a1 1 0 100-2H3zM6 16a1 1 0 100 2h11a1 1 0 100-2H6z`}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            {viewMode === 'grid' ? (
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {products.map(product => (
                        <GridProductCard key={product.id} product={product}/>
                    ))}
                </div>
            ) : (
                <div className={`space-y-4`}>
                    {products.map(product => (
                        <ListProductCard key={product.id} product={product}/>
                    ))}
                </div>
            )}

            {products.length === 0 && (
                <div className={`text-center py-12`}>
                    <CubeIcon className={`size-16 text-gray-500 mx-auto mb-4`}/>
                    <h3 className={`text-xl font-semibold text-gray-300 mb-2`}>No products found</h3>
                    <p className={`text-gray-500`}>Try adjusting your search criteria or add a new product.</p>
                    <Link
                        href={`/dashboard/products/new`}
                        className={`mt-4 bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center mx-auto`}
                    >
                        <PlusIcon className={`size-5 mr-2`}/>
                        Add Product
                    </Link>
                </div>
            )}
        </>
    );
};

function FiltersBar({categories}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [category, setCategory] = useState(searchParams.get('category') || 'all');

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        if (category !== 'all') {
            params.set('category', category);
        } else {
            params.delete('category');
        }

        router.replace(`?${params.toString()}`);
    }, [router, searchParams, debouncedSearch, category]);

    return (
        <div className={`flex flex-col lg:flex-row gap-4`}>

            <div className={`flex-1`}>
                <div className={`relative`}>
                    <MagnifyingGlassIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                    <input
                        type={`text`}
                        placeholder={`Search products by name, SKU, or description...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`dashboard-form-input-icon border-gray-600`}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className={`flex flex-col sm:flex-row gap-4`}>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`dashboard-form-input border-gray-600`}
                >
                    <option value={`all`}>All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <select
                    // value={`${sortBy}-${sortOrder}`}
                    // onChange={(e) => {
                    //     const [field, order] = e.target.value.split('-');
                    //     setSortBy(field);
                    //     setSortOrder(order);
                    // }}
                    className={`px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500`}
                >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="selling_price-asc">Price (Low-High)</option>
                    <option value="selling_price-desc">Price (High-Low)</option>
                    <option value="current_stock-asc">Stock (Low-High)</option>
                    <option value="current_stock-desc">Stock (High-Low)</option>
                    <option value="created_at-desc">Newest First</option>
                    <option value="created_at-asc">Oldest First</option>
                </select>
            </div>
        </div>
    )
}

function GridProductCard({product}) {
    const stockStatus = getStockStatus(product);

    return (
        <div
            className={`bg-gray-800 rounded-xl border border-gray-700 hover:border-teal-500/50 transition-all duration-200 group`}
        >
            <div className={`relative`}>
                <div className={`aspect-video bg-gray-700 rounded-t-xl overflow-hidden`}>
                    {product.images && product.images.length > 0 ? (
                        <div className={`relative`}>
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill={true}
                                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-200`}
                            />
                        </div>
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center`}>
                            <PhotoIcon className={`size-12 text-gray-500`}/>
                        </div>
                    )}
                </div>

                <div className={`absolute top-3 left-3`}>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.text}
                    </span>
                </div>
            </div>

            <div className={`p-4`}>
                <div className={`flex items-start justify-between mb-2`}>
                    <div>
                        <h3 className={`font-semibold text-lg group-hover:text-teal-400 transition-colors`}>
                            {product.name}
                        </h3>
                        <p className={`text-gray-400 text-sm`}>
                            SKU: <span className={`font-mono`}>{product.sku}</span>
                        </p>
                    </div>
                </div>

                <p className={`text-gray-300 text-sm mb-3 line-clamp-2`}>{product.description}</p>

                <div className={`text-sm mb-3`}>
                    <span className={`text-gray-400`}>Brand: </span>
                    <span className={`text-teal-400`}>{product.brand}</span>
                </div>

                <div className={`flex items-center justify-between mb-4`}>
                    <div>
                        <span className={`text-gray-400 text-sm`}>Cost: </span>
                        <span>{formatCurrency(product.cost_price)}</span>
                    </div>
                    <div>
                        <span className={`text-gray-400 text-sm`}>Price: </span>
                        <span className={`text-teal-400 font-semibold`}>{formatCurrency(product.selling_price)}</span>
                    </div>
                </div>

                {product.tags && product.tags.length > 0 && (
                    <div className={`flex flex-wrap gap-1 mb-4`}>
                        {product.tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs`}
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className={`flex gap-2`}>
                    <Link
                        href={`/dashboard/products/${product.id}/edit`}
                        className={`block text-center flex-1 px-3 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm font-medium transition-colors`}
                    >
                        <PencilIcon className={`size-4 inline mr-1`}/>
                        Edit
                    </Link>
                    <Link
                        href={`/dashboard/products/${product.id}`}
                        className={`px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors`}
                    >
                        <EyeIcon className={`size-4`}/>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function ListProductCard({product}) {
    const stockStatus = getStockStatus(product);

    return (
        <div className={`bg-gray-800 rounded-xl border border-gray-700 p-6 hover:border-teal-500/50 transition-all`}>
            <div className={`flex flex-wrap items-center gap-6`}>
                <div className={`size-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0`}>
                    {product.images && product.images.length > 0 ? (
                        <div className={`relative`}>
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill={true}
                                className={`size-full object-cover`}
                            />
                        </div>
                    ) : (
                        <div className={`size-full flex items-center justify-center`}>
                            <PhotoIcon className={`size-8 text-gray-500`}/>
                        </div>
                    )}
                </div>

                <div className={`flex-1 min-w-0`}>
                    <div
                        className={`flex flex-wrap flex-col sm:flex-row items-start sm:items-center sm:justify-between`}>
                        <div>
                            <h3 className={`text-lg font-semibold`}>{product.name}</h3>
                            <p className={`text-gray-400 text-sm`}>SKU: {product.sku}</p>
                            <p className={`text-gray-300 text-sm mt-1`}>{product.description}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                            {stockStatus.text}
                        </span>
                    </div>
                </div>

                <div className={`w-full sm:w-auto flex items-center gap-8 text-sm`}>
                    <div>
                        <span className={`text-gray-400`}>Stock: </span>
                        <span className={`font-medium`}>{product.inventory[0].quantity_available}</span>
                    </div>
                    <div>
                        <span className={`text-gray-400`}>Price: </span>
                        <span
                            className={`text-teal-400 font-semibold`}>{formatCurrency(product.selling_price)}</span>
                    </div>
                    <div className={`flex-1 flex gap-2 justify-end`}>
                        <Link
                            href={`/dashboard/products/${product.id}/edit`}
                            className={`p-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors`}
                        >
                            <PencilIcon className={`size-4`}/>
                        </Link>
                        <Link
                            href={`/dashboard/products/${product.id}`}
                            className={`p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors`}
                        >
                            <EyeIcon className={`size-4`}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
