'use client'

import {useState} from "react";
import Link from "next/link";
import {AddBtn} from "@/components/ui/buttons";
import SearchBar from "@/components/ui/SearchBar";

export default function Page() {

    const [items, setItems] = useState([
        { id: 'item-1', name: 'Laptop', sku: 'LAP001', categoryId: 'cat-1', quantity: 50, price: 999.99, minStock: 10, tenantId: 'tenant-1', locationId: 'location-1' },
        { id: 'item-2', name: 'T-Shirt', sku: 'TSH001', categoryId: 'cat-2', quantity: 200, price: 29.99, minStock: 20, tenantId: 'tenant-1', locationId: 'location-1' },
        { id: 'item-3', name: 'Programming Book', sku: 'BOK001', categoryId: 'cat-3', quantity: 75, price: 49.99, minStock: 5, tenantId: 'tenant-1', locationId: 'location-2' }
    ]);

    const [categories] = useState([
        { id: 'cat-1', name: 'Electronics', description: 'Electronic devices and components' },
        { id: 'cat-2', name: 'Clothing', description: 'Apparel and accessories' },
        { id: 'cat-3', name: 'Books', description: 'Books and publications' }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            setItems(prev => prev.filter(item => item.id !== id))
        }
    }

    return (
        <div className={`space-y-6`}>
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
                <h2 className={`text-3xl font-bold text-gray-100 font-heading`}>Items</h2>
                <AddBtn href={`/dashboard/items/new`} text={`Add Item`}/>
            </div>

            <SearchBar placeholder={`Search items...`}/>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => {
                    const category = categories.find(c => c.id === item.categoryId)
                    const isLowStock = item.quantity <= item.minStock

                    return (
                        <div key={item.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-100">{item.name}</h3>
                                    <p className="text-gray-400 text-sm">SKU: {item.sku}</p>
                                    <p className="text-gray-400 text-sm">Category: {category?.name || 'Unknown'}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link
                                        href={`/dashboard/items/${item.id}/edit`}
                                        className="text-teal-400 hover:text-teal-300"
                                    >
                                        ✏️
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Price:</span>
                                    <span className="text-gray-100">${item.price}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Quantity:</span>
                                    <span className={`${isLowStock ? 'text-red-400' : 'text-gray-100'}`}>
                    {item.quantity}
                                        {isLowStock && ' ⚠️'}
                  </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Min Stock:</span>
                                    <span className="text-gray-100">{item.minStock}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}