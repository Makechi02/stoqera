'use client'

import {useState} from "react";

export default function Page() {
    const [formData, setFormData] = useState({
        itemId: '',
        quantity: 1,
        price: 0,
        customer: '',
        date: new Date().toISOString().split('T')[0]
    })

    const [items] = useState([
        { id: 'item-1', name: 'Laptop', sku: 'LAP001', categoryId: 'cat-1', quantity: 50, price: 999.99, minStock: 10, tenantId: 'tenant-1', locationId: 'location-1' },
        { id: 'item-2', name: 'T-Shirt', sku: 'TSH001', categoryId: 'cat-2', quantity: 200, price: 29.99, minStock: 20, tenantId: 'tenant-1', locationId: 'location-1' },
        { id: 'item-3', name: 'Programming Book', sku: 'BOK001', categoryId: 'cat-3', quantity: 75, price: 49.99, minStock: 5, tenantId: 'tenant-1', locationId: 'location-2' }
    ])

    const selectedItem = items.find(item => item.id === formData.itemId)
    const total = formData.quantity * formData.price

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleItemChange = (itemId) => {
        const item = items.find(i => i.id === itemId)
        setFormData(prev => ({
            ...prev,
            itemId,
            price: item ? item.price : 0
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Item</label>
                <select
                    required
                    value={formData.itemId}
                    onChange={(e) => handleItemChange(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="">Select an item</option>
                    {items.map(item => (
                        <option key={item.id} value={item.id}>{item.name} (${item.price})</option>
                    ))}
                </select>
            </div>

            {selectedItem && (
                <div className="bg-gray-700 p-3 rounded-md">
                    <p className="text-sm text-gray-300">Available quantity: {selectedItem.quantity}</p>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Customer</label>
                <input
                    type="text"
                    required
                    value={formData.customer}
                    onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                    <input
                        type="number"
                        required
                        min="1"
                        max={selectedItem?.quantity || 999999}
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                    <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            <div className="bg-gray-700 p-3 rounded-md">
                <p className="text-lg font-semibold text-teal-400">Total: ${total.toFixed(2)}</p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Create
                </button>
            </div>
        </form>
    )
}