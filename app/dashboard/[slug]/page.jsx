'use client'

import {useState} from "react";
import {formatCurrency} from "@/utils/formatters";

export default function Page() {
    const [categories] = useState([
        {id: 'cat-1', name: 'Electronics', description: 'Electronic devices and components'},
        {id: 'cat-2', name: 'Clothing', description: 'Apparel and accessories'},
        {id: 'cat-3', name: 'Books', description: 'Books and publications'}
    ])

    const [items] = useState([
        {
            id: 'item-1',
            name: 'Laptop',
            sku: 'LAP001',
            categoryId: 'cat-1',
            quantity: 5,
            price: 999.99,
            minStock: 10,
            tenantId: 'tenant-1',
            locationId: 'location-1'
        },
        {
            id: 'item-2',
            name: 'T-Shirt',
            sku: 'TSH001',
            categoryId: 'cat-2',
            quantity: 200,
            price: 29.99,
            minStock: 20,
            tenantId: 'tenant-1',
            locationId: 'location-1'
        },
        {
            id: 'item-3',
            name: 'Programming Book',
            sku: 'BOK001',
            categoryId: 'cat-3',
            quantity: 75,
            price: 49.99,
            minStock: 5,
            tenantId: 'tenant-1',
            locationId: 'location-2'
        }
    ])

    const [sales] = useState([
        {
            id: 'sale-1',
            itemId: 'item-1',
            quantity: 2,
            price: 999.99,
            total: 1999.98,
            date: '2024-01-15',
            customer: 'John Doe',
            tenantId: 'tenant-1',
            locationId: 'location-1'
        },
        {
            id: 'sale-2',
            itemId: 'item-2',
            quantity: 5,
            price: 29.99,
            total: 149.95,
            date: '2024-01-16',
            customer: 'Jane Smith',
            tenantId: 'tenant-1',
            locationId: 'location-1'
        }
    ])

    const [purchases] = useState([
        {
            id: 'purchase-1',
            itemId: 'item-1',
            quantity: 10,
            price: 800.00,
            total: 8000.00,
            date: '2024-01-10',
            supplier: 'Tech Supplier Inc',
            tenantId: 'tenant-1',
            locationId: 'location-1'
        },
        {
            id: 'purchase-2',
            itemId: 'item-3',
            quantity: 25,
            price: 35.00,
            total: 875.00,
            date: '2024-01-12',
            supplier: 'Book Distributor',
            tenantId: 'tenant-1',
            locationId: 'location-2'
        }
    ])

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.total, 0);
    const lowStockItems = items.filter(item => item.quantity <= item.minStock);

    const stats = [
        {name: 'Total Items', value: totalItems.toLocaleString(), icon: '📦', color: 'text-blue-400'},
        {name: 'Total Sales', value: `${formatCurrency(totalSales)}`, icon: '💰', color: 'text-green-400'},
        {name: 'Total Purchases', value: `${formatCurrency(totalPurchases)}`, icon: '🛒', color: 'text-purple-400'},
        {name: 'Categories', value: categories.length.toString(), icon: '🏷️', color: 'text-yellow-400'},
    ];

    return (
        <div className={`space-y-6`}>
            <div className={`flex items-center justify-between`}>
                <h2 className={`text-3xl font-bold text-gray-100 font-heading`}>Dashboard</h2>
            </div>

            <StatsGrid stats={stats}/>

            {lowStockItems.length > 0 && (
                <LowStockNotification lowStockItems={lowStockItems}/>
            )}

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                <RecentSales sales={sales} items={items}/>
                <RecentPurchases purchases={purchases} items={items}/>
            </div>
        </div>
    )
}

function StatsGrid({stats}) {
    return (
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
            {stats.map((stat) => (
                <div key={stat.name} className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                    <div className={`flex items-center justify-between`}>
                        <div>
                            <p className={`text-sm font-medium text-gray-400`}>{stat.name}</p>
                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                        <span className={`text-3xl`}>{stat.icon}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

function LowStockNotification({lowStockItems}) {
    return (
        <div className={`bg-error/20 border border-error rounded-lg p-6`}>
            <h3 className={`text-lg font-semibold text-red-400 mb-4`}>⚠️ Low Stock Alert</h3>
            <div className={`space-y-2`}>
                {lowStockItems.map((item) => (
                    <div key={item.id} className={`flex justify-between items-center text-sm`}>
                        <span className={`text-gray-300`}>{item.name} (SKU: {item.sku})</span>
                        <span className={`text-error`}>Only {item.quantity} left (Min: {item.minStock})</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function RecentSales({sales, items}) {
    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Sales</h3>
            <div className="space-y-3">
                {sales.slice(-5).reverse().map((sale) => {
                    const item = items.find(i => i.id === sale.itemId)
                    return (
                        <div key={sale.id} className="flex justify-between items-center text-sm">
                            <div>
                                <p className="text-gray-300">{item?.name || 'Unknown Item'}</p>
                                <p className="text-gray-500">{sale.customer} • {sale.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-green-400">{formatCurrency(sale.total)}</p>
                                <p className="text-gray-500">Qty: {sale.quantity}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function RecentPurchases({purchases, items}) {
    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Purchases</h3>
            <div className="space-y-3">
                {purchases.slice(-5).reverse().map((purchase) => {
                    const item = items.find(i => i.id === purchase.itemId)
                    return (
                        <div key={purchase.id} className="flex justify-between items-center text-sm">
                            <div>
                                <p className="text-gray-300">{item?.name || 'Unknown Item'}</p>
                                <p className="text-gray-500">{purchase.supplier} • {purchase.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-purple-400">{formatCurrency(purchase.total)}</p>
                                <p className="text-gray-500">Qty: {purchase.quantity}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
