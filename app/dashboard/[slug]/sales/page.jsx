'use client'

import {useState} from "react";
import Link from "next/link";

export default function Page() {
    const [sales, setSales] = useState([
        { id: 'sale-1', itemId: 'item-1', quantity: 2, price: 999.99, total: 1999.98, date: '2024-01-15', customer: 'John Doe', tenantId: 'tenant-1', locationId: 'location-1' },
        { id: 'sale-2', itemId: 'item-2', quantity: 5, price: 29.99, total: 149.95, date: '2024-01-16', customer: 'Jane Smith', tenantId: 'tenant-1', locationId: 'location-1' }
    ])

    const [items] = useState([
        { id: 'item-1', name: 'Laptop', sku: 'LAP001', categoryId: 'cat-1', quantity: 50, price: 999.99, minStock: 10, tenantId: 'tenant-1', locationId: 'location-1' },
        { id: 'item-2', name: 'T-Shirt', sku: 'TSH001', categoryId: 'cat-2', quantity: 200, price: 29.99, minStock: 20, tenantId: 'tenant-1', locationId: 'location-1' },
        { id: 'item-3', name: 'Programming Book', sku: 'BOK001', categoryId: 'cat-3', quantity: 75, price: 49.99, minStock: 5, tenantId: 'tenant-1', locationId: 'location-2' }
    ])

    const [searchTerm, setSearchTerm] = useState('')

    const filteredSales = sales.filter(sale => {
        const item = items.find(i => i.id === sale.itemId)
        return (
            sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sale.date.includes(searchTerm)
        )
    })

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this sale?')) {
            setSales(prev => prev.filter(sale => sale.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-3xl font-bold text-gray-100">Sales</h2>
                <Link
                    href={`/app/dashboard/%5Bslug%5D/sales/new`}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Add Sale
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search sales..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden w-full">
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {filteredSales.map((sale) => {
                            const item = items.find(i => i.id === sale.itemId)
                            return (
                                <tr key={sale.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sale.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{item?.name || 'Unknown Item'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sale.customer}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{sale.quantity}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${sale.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400">${sale.total}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/dashboard/sales/${sale.id}/edit`}
                                                className="text-teal-400 hover:text-teal-300"
                                            >
                                                ✏️
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(sale.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}