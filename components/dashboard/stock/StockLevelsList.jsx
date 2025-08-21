'use client'

import {useState} from 'react';
import {
    AdjustmentsHorizontalIcon,
    ChevronDownIcon,
    EyeIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PencilIcon
} from '@heroicons/react/24/outline';
import {formatDate} from "@/utils/formatters";

export default function StockLevelsList({locations, inventory}) {
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    return (
        <>
            <div className={`mb-8`}>
                <SearchBar locations={locations}/>
            </div>

            <InventoryTable
                products={inventory}
                handleSort={handleSort}
                sortBy={sortBy}
                sortOrder={sortOrder}
            />
        </>
    );
};

function SearchBar({locations}) {
    return (
        <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6`}>
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Search products, variants, or SKU..."
                            // value={searchTerm}
                            // onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Location Filter */}
                <div className="relative">
                    <select
                        // value={selectedLocation}
                        // onChange={(e) => setSelectedLocation(e.target.value)}
                        className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                        <option value={`all`}>All</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                    </select>
                    <ChevronDownIcon
                        className="w-5 h-5 absolute right-2 top-2.5 text-gray-400 pointer-events-none"/>
                </div>

                {/* Stock Filter */}
                <div className="relative">
                    <select
                        // value={stockFilter}
                        // onChange={(e) => setStockFilter(e.target.value)}
                        className="appearance-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                        <option value="all">All Stock Levels</option>
                        <option value="in_stock">In Stock</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                    </select>
                    <ChevronDownIcon
                        className="w-5 h-5 absolute right-2 top-2.5 text-gray-400 pointer-events-none"/>
                </div>

                <button
                    className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <FunnelIcon className="w-4 h-4"/>
                    More Filters
                </button>
            </div>
        </div>
    )
}

function InventoryTable({products, handleSort, sortOrder, sortBy}) {
    const getStatusBadge = (status) => {
        const statusConfig = {
            in_stock: {color: 'bg-green-900/20 text-green-300 border-green-700', label: 'In Stock'},
            low_stock: {color: 'bg-yellow-900/20 text-yellow-300 border-yellow-700', label: 'Low Stock'},
            out_of_stock: {color: 'bg-red-900/20 text-red-300 border-red-700', label: 'Out of Stock'}
        };

        const config = statusConfig[status] || statusConfig.in_stock;

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className={`mb-10`}>
            <div className={`bg-gray-800 border border-gray-700 rounded-xl overflow-hidden`}>
                <div className={`overflow-x-auto`}>
                    <table className={`w-full`}>
                        <thead className={`bg-gray-750 border-b border-gray-700`}>
                        <tr>
                            <th
                                className={`px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-text transition-colors`}
                                onClick={() => handleSort('name')}
                            >
                                <div className="flex items-center gap-1">
                                    Product
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform ${sortBy === 'name' && sortOrder === 'desc' ? 'rotate-180' : ''}`}/>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                SKU / Location
                            </th>
                            <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                onClick={() => handleSort('onHand')}
                            >
                                <div className="flex items-center gap-1">
                                    On Hand
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform ${sortBy === 'onHand' && sortOrder === 'desc' ? 'rotate-180' : ''}`}/>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Reserved
                            </th>
                            <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                onClick={() => handleSort('available')}
                            >
                                <div className="flex items-center gap-1">
                                    Available
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform ${sortBy === 'available' && sortOrder === 'desc' ? 'rotate-180' : ''}`}/>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th
                                className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                                onClick={() => handleSort('lastMovement')}
                            >
                                <div className="flex items-center gap-1">
                                    Last Movement
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform ${sortBy === 'lastMovement' && sortOrder === 'desc' ? 'rotate-180' : ''}`}/>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                        {products.map((item) => {
                            if (item.quantity_on_hand <= item.product.min_stock_level) {
                                item.status = 'out_of_stock';
                            } else if (item.quantity_on_hand > item.product.min_stock_level && item.quantity_on_hand <= item.product.reorder_point) {
                                item.status = 'low_stock';
                                item.status = 'low_stock';
                            } else {
                                item.status = 'in_stock';
                            }

                            return (
                                <tr key={item.id} className="hover:bg-gray-750 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-white">{item.product.name}</div>
                                            <div className="text-sm text-gray-400">{item.variant?.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm text-white font-mono">
                                                {item.variant ? item.variant.sku : item.product.sku}
                                            </div>
                                            <div className="text-sm text-gray-400">{item.location.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-white">{item.quantity_on_hand}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-orange-400">{item.quantity_reserved}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`text-sm font-semibold ${
                                            item.quantity_available < 0 ? 'text-red-400' :
                                                item.quantity_available <= item.product.reorder_point ? 'text-yellow-400' :
                                                    'text-green-400'
                                        }`}>
                                            {item.quantity_available}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-300">{formatDate(item.last_movement_at)}</div>
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium`}>
                                        <div className={`flex items-center gap-2`}>
                                            <button className={`text-gray-400 hover:text-teal-400 transition-colors`}>
                                                <EyeIcon className={`size-4`}/>
                                            </button>
                                            <button className={`text-gray-400 hover:text-teal-400 transition-colors`}>
                                                <PencilIcon className={`size-4`}/>
                                            </button>
                                            <button className={`text-gray-400 hover:text-teal-400 transition-colors`}>
                                                <AdjustmentsHorizontalIcon className={`size-4`}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && (
                    <div className={`text-center py-12`}>
                        <div className={`text-gray-400 text-lg mb-2`}>No inventory items found</div>
                        <p className={`text-gray-500`}>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {/*TODO: Add Pagination*/}
            {/*{products.length > 0 && (*/}
            {/*    <div className="mt-6 flex items-center justify-between">*/}
            {/*        <div className="text-sm text-gray-400">*/}
            {/*            Showing {products.length} of {products.length} items*/}
            {/*        </div>*/}
            {/*        <div className="flex gap-2">*/}
            {/*            <button*/}
            {/*                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white rounded text-sm transition-colors">*/}
            {/*                Previous*/}
            {/*            </button>*/}
            {/*            <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm">*/}
            {/*                1*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white rounded text-sm transition-colors">*/}
            {/*                2*/}
            {/*            </button>*/}
            {/*            <button*/}
            {/*                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white rounded text-sm transition-colors">*/}
            {/*                Next*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}
