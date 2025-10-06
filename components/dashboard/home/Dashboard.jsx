'use client'

import {useState} from 'react';
import {
    BellIcon,
    BuildingStorefrontIcon,
    CreditCardIcon,
    CubeIcon,
    EyeIcon,
    GiftIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    PencilIcon,
    StarIcon,
    TagIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import {
    Area,
    AreaChart,
    CartesianGrid,
    Cell,
    Line,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

export default function Dashboard() {

    // Data from low_stock_alerts table joined with products, categories, and inventory
    const lowStockAlerts = [
        {
            id: 1,
            product_name: 'iPhone 14 Pro',
            sku: 'IPH14P-256-BLK',
            current_stock: 5,
            min_stock: 20,
            category: 'Electronics',
            location: 'Main Warehouse',
            last_updated: '2024-12-28 10:30:00'
        },
        {
            id: 2,
            product_name: 'Nike Air Max 90',
            sku: 'NKE-AM90-WHT-42',
            current_stock: 3,
            min_stock: 15,
            category: 'Footwear',
            location: 'Store Front',
            last_updated: '2024-12-28 09:15:00'
        },
        {
            id: 3,
            product_name: 'Samsung Galaxy Buds Pro',
            sku: 'SAM-GBP-BLK',
            current_stock: 8,
            min_stock: 25,
            category: 'Electronics',
            location: 'Main Warehouse',
            last_updated: '2024-12-28 08:45:00'
        },
        {
            id: 4,
            product_name: 'Office Chair Deluxe',
            sku: 'OFC-CHR-DLX-BLK',
            current_stock: 2,
            min_stock: 10,
            category: 'Furniture',
            location: 'Warehouse B',
            last_updated: '2024-12-28 07:20:00'
        }
    ];

    // Data from sales table joined with customers
    const recentSales = [
        {
            id: '#SAL-001',
            customer_name: 'Acme Corp',
            customer_group: 'Wholesale',
            total_amount: 2450.99,
            payment_status: 'paid',
            channel: 'B2B Portal',
            created_at: '2024-12-28 14:30:00',
            items_count: 12
        },
        {
            id: '#SAL-002',
            customer_name: 'John Smith',
            customer_group: 'Retail',
            total_amount: 89.50,
            payment_status: 'pending',
            channel: 'POS',
            created_at: '2024-12-28 14:15:00',
            items_count: 3
        },
        {
            id: '#SAL-003',
            customer_name: 'Tech Solutions Ltd',
            customer_group: 'Corporate',
            total_amount: 1567.75,
            payment_status: 'paid',
            channel: 'Online Store',
            created_at: '2024-12-28 13:45:00',
            items_count: 8
        },
        {
            id: '#SAL-004',
            customer_name: 'Sarah Johnson',
            customer_group: 'Retail',
            total_amount: 324.20,
            payment_status: 'paid',
            channel: 'Mobile App',
            created_at: '2024-12-28 13:20:00',
            items_count: 5
        }
    ];

    // Data from purchase_orders table joined with suppliers
    const pendingPurchaseOrders = [
        {
            id: '#PO-2024-001',
            supplier_name: 'Global Tech Supplies',
            total_amount: 15750.00,
            status: 'pending_approval',
            expected_date: '2024-12-30',
            items_count: 25
        },
        {
            id: '#PO-2024-002',
            supplier_name: 'Fashion Wholesale Co',
            total_amount: 8920.50,
            status: 'ordered',
            expected_date: '2025-01-05',
            items_count: 45
        }
    ];

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-300';
            case 'paid':
                return 'bg-green-500/20 text-green-300';
            case 'overdue':
                return 'bg-red-500/20 text-red-300';
            case 'partial':
                return 'bg-blue-500/20 text-blue-300';
            default:
                return 'bg-gray-500/20 text-gray-300';
        }
    };

    const getPOStatusColor = (status) => {
        switch (status) {
            case 'pending_approval':
                return 'bg-yellow-500/20 text-yellow-300';
            case 'ordered':
                return 'bg-blue-500/20 text-blue-300';
            case 'received':
                return 'bg-green-500/20 text-green-300';
            case 'cancelled':
                return 'bg-red-500/20 text-red-300';
            default:
                return 'bg-gray-500/20 text-gray-300';
        }
    };

    const formatDateTime = (dateStr) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);

        if (minutes < 60) return `${minutes} mins ago`;
        if (hours < 24) return `${hours} hours ago`;
        return date.toLocaleDateString();
    };

    return (
        <div>
            {/* TODO: Add Header */}
            {/*<Header/>*/}

            <div className={`space-y-6`}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                    <SalesPerformanceChart/>
                    <InventoryByCategoryChart/>
                </div>

                {/* Data Tables Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Low Stock Alerts */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Low Stock Alerts</h3>
                            <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                {lowStockAlerts.length} alerts
              </span>
                        </div>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {lowStockAlerts.map((item) => (
                                <div key={item.id}
                                     className="flex items-start justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{item.product_name}</p>
                                        <p className="text-gray-400 text-xs">SKU: {item.sku}</p>
                                        <p className="text-gray-400 text-xs">{item.category} • {item.location}</p>
                                        <p className="text-gray-500 text-xs mt-1">{formatDateTime(item.last_updated)}</p>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-red-300 font-medium">{item.current_stock}</p>
                                        <p className="text-gray-400 text-xs">min: {item.min_stock}</p>
                                    </div>
                                    <div className="flex flex-col space-y-1 ml-3">
                                        <button className="p-1 text-gray-400 hover:text-teal-400 transition-colors">
                                            <EyeIcon className="w-4 h-4"/>
                                        </button>
                                        <button className="p-1 text-gray-400 hover:text-teal-400 transition-colors">
                                            <PencilIcon className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Sales */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Sales</h3>
                            <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                                View all sales
                            </button>
                        </div>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {recentSales.map((sale) => (
                                <div key={sale.id}
                                     className="flex items-start justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-white font-medium">{sale.id}</p>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(sale.payment_status)}`}>
                        {sale.payment_status}
                      </span>
                                        </div>
                                        <p className="text-gray-400 text-sm truncate">{sale.customer_name}</p>
                                        <p className="text-gray-500 text-xs">{sale.customer_group} • {sale.channel}</p>
                                        <p className="text-gray-500 text-xs">{formatDateTime(sale.created_at)}</p>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className="text-white font-medium">${sale.total_amount}</p>
                                        <p className="text-gray-400 text-xs">{sale.items_count} items</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Purchase Orders & System Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pending Purchase Orders */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Pending Purchase Orders</h3>
                            <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                                Manage POs
                            </button>
                        </div>
                        <div className="space-y-3">
                            {pendingPurchaseOrders.map((po) => (
                                <div key={po.id}
                                     className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <p className="text-white font-medium">{po.id}</p>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPOStatusColor(po.status)}`}>
                        {po.status.replace('_', ' ')}
                      </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{po.supplier_name}</p>
                                        <p className="text-gray-500 text-xs">Expected: {po.expected_date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-medium">${po.total_amount.toLocaleString()}</p>
                                        <p className="text-gray-400 text-xs">{po.items_count} items</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <h3 className="text-lg font-semibold text-white mb-4">System Overview</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <MapPinIcon className="w-5 h-5 text-teal-400"/>
                                    <span className="text-gray-300">Active Locations</span>
                                </div>
                                <span className="text-white font-medium">4</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <BuildingStorefrontIcon className="w-5 h-5 text-teal-400"/>
                                    <span className="text-gray-300">Suppliers</span>
                                </div>
                                <span className="text-white font-medium">67</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <TagIcon className="w-5 h-5 text-teal-400"/>
                                    <span className="text-gray-300">Product Categories</span>
                                </div>
                                <span className="text-white font-medium">12</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <CreditCardIcon className="w-5 h-5 text-teal-400"/>
                                    <span className="text-gray-300">Payment Methods</span>
                                </div>
                                <span className="text-white font-medium">5</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <GiftIcon className="w-5 h-5 text-teal-400"/>
                                    <span className="text-gray-300">Active Promotions</span>
                                </div>
                                <span className="text-white font-medium">3</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <StarIcon className="w-5 h-5 text-teal-400"/>
                                    <span className="text-gray-300">Loyalty Programs</span>
                                </div>
                                <span className="text-white font-medium">2</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stock Movements & Notifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Stock Movements */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Recent Stock Movements</h3>
                            <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                                View all movements
                            </button>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {[
                                {
                                    id: 1,
                                    product_name: "MacBook Pro 13\"",
                                    sku: "MBP-13-256-SLV",
                                    movement_type: "sale",
                                    quantity: -1,
                                    location: "Store Front",
                                    created_at: "2024-12-28 14:30:00",
                                    reference: "SAL-001"
                                },
                                {
                                    id: 2,
                                    product_name: "Samsung Galaxy S24",
                                    sku: "SAM-S24-128-BLK",
                                    movement_type: "purchase",
                                    quantity: +25,
                                    location: "Main Warehouse",
                                    created_at: "2024-12-28 13:45:00",
                                    reference: "PO-2024-001"
                                },
                                {
                                    id: 3,
                                    product_name: "Nike Air Jordan 1",
                                    sku: "NKE-AJ1-RED-42",
                                    movement_type: "transfer",
                                    quantity: -5,
                                    location: "Warehouse B → Store Front",
                                    created_at: "2024-12-28 12:20:00",
                                    reference: "TRF-001"
                                },
                                {
                                    id: 4,
                                    product_name: "Coffee Beans Premium",
                                    sku: "COF-PRM-1KG",
                                    movement_type: "adjustment",
                                    quantity: -2,
                                    location: "Main Warehouse",
                                    created_at: "2024-12-28 11:15:00",
                                    reference: "ADJ-005"
                                }
                            ].map((movement) => (
                                <div key={movement.id}
                                     className="flex items-start justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{movement.product_name}</p>
                                        <p className="text-gray-400 text-xs">SKU: {movement.sku}</p>
                                        <p className="text-gray-400 text-xs">{movement.location}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          movement.movement_type === 'sale' ? 'bg-blue-500/20 text-blue-300' :
                              movement.movement_type === 'purchase' ? 'bg-green-500/20 text-green-300' :
                                  movement.movement_type === 'transfer' ? 'bg-purple-500/20 text-purple-300' :
                                      'bg-orange-500/20 text-orange-300'
                      }`}>
                        {movement.movement_type}
                      </span>
                                            <span className="text-gray-500 text-xs">{movement.reference}</span>
                                        </div>
                                    </div>
                                    <div className="text-right ml-3">
                                        <p className={`font-medium ${movement.quantity > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                                        </p>
                                        <p className="text-gray-500 text-xs">{formatDateTime(movement.created_at)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Notifications */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">System Notifications</h3>
                            <button className="text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors">
                                Mark all read
                            </button>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {[
                                {
                                    id: 1,
                                    type: "stock_alert",
                                    title: "Low Stock Alert",
                                    message: "iPhone 14 Pro is running low (5 units remaining)",
                                    priority: "high",
                                    created_at: "2024-12-28 14:30:00",
                                    read: false
                                },
                                {
                                    id: 2,
                                    type: "purchase_order",
                                    title: "Purchase Order Approved",
                                    message: "PO-2024-001 has been approved and sent to supplier",
                                    priority: "medium",
                                    created_at: "2024-12-28 13:15:00",
                                    read: false
                                },
                                {
                                    id: 3,
                                    type: "sale",
                                    title: "Large Sale Completed",
                                    message: "Sale #SAL-001 completed - $2,450.99 from Acme Corp",
                                    priority: "low",
                                    created_at: "2024-12-28 12:45:00",
                                    read: true
                                },
                                {
                                    id: 4,
                                    type: "system",
                                    title: "Backup Completed",
                                    message: "Daily database backup completed successfully",
                                    priority: "low",
                                    created_at: "2024-12-28 02:00:00",
                                    read: true
                                }
                            ].map((notification) => (
                                <div key={notification.id}
                                     className={`flex items-start space-x-3 p-3 rounded-lg border ${
                                         notification.read
                                             ? 'bg-gray-700/20 border-gray-600/30'
                                             : 'bg-gray-700/40 border-gray-600/50'
                                     }`}>
                                    <div className={`w-2 h-2 rounded-full mt-2 ${
                                        notification.priority === 'high' ? 'bg-red-500' :
                                            notification.priority === 'medium' ? 'bg-yellow-500' :
                                                'bg-green-500'
                                    }`}></div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`font-medium text-sm ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                                            {notification.title}
                                        </p>
                                        <p className={`text-xs mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {notification.message}
                                        </p>
                                        <p className="text-gray-600 text-xs mt-1">{formatDateTime(notification.created_at)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Header() {
    const [selectedLocation, setSelectedLocation] = useState('all');

    const locations = ['All Locations', 'Main Warehouse', 'Store Front', 'Warehouse B', 'Distribution Center'];

    return (
        <header className="bg-gray-800/30 backdrop-blur-md border-b border-gray-700/50 sticky top-0 z-40">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <CubeIcon className="w-8 h-8 text-teal-400"/>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                Stoqera
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-1 text-sm text-gray-400">
                            <span>/</span>
                            <span>Dashboard</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <MagnifyingGlassIcon
                                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"/>
                            <input
                                type="text"
                                placeholder="Search products, SKU, customers..."
                                className="bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
                            />
                        </div>

                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            {locations.map((location) => (
                                <option key={location} value={location.toLowerCase().replace(' ', '_')}>
                                    {location}
                                </option>
                            ))}
                        </select>

                        <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                            <BellIcon className="w-6 h-6"/>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-teal-500 rounded-full"></span>
                        </button>

                        <div className="flex items-center space-x-3">
                            <div
                                className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                                <UserIcon className="w-5 h-5 text-white"/>
                            </div>
                            <div className="hidden md:block">
                                <p className="text-sm font-medium">Admin User</p>
                                <p className="text-xs text-gray-400">admin@stoqera.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

function SalesPerformanceChart() {
    const salesData = [
        {name: 'Mon', revenue: 4200, orders: 24, items_sold: 89},
        {name: 'Tue', revenue: 3800, orders: 18, items_sold: 67},
        {name: 'Wed', revenue: 5200, orders: 32, items_sold: 124},
        {name: 'Thu', revenue: 4800, orders: 28, items_sold: 98},
        {name: 'Fri', revenue: 6200, orders: 45, items_sold: 167},
        {name: 'Sat', revenue: 7800, orders: 52, items_sold: 203},
        {name: 'Sun', revenue: 5600, orders: 38, items_sold: 145}
    ];

    return (
        <div className={`bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50`}>
            <h3 className={`text-lg font-semibold text-white mb-4`}>Sales Performance</h3>
            <div className={`h-64`}>
                <ResponsiveContainer width={`100%`} height={`100%`}>
                    <AreaChart data={salesData}>
                        <defs>
                            <linearGradient id={`revenueGradient`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
                                <stop offset={`5%`} stopColor={`#14b8a6`} stopOpacity={0.3}/>
                                <stop offset={`95%`} stopColor={`#14b8a6`} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray={`3 3`} stroke={`#374151`}/>
                        <XAxis dataKey={`name`} stroke={`#9ca3af`}/>
                        <YAxis stroke={`#9ca3af`}/>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px'
                            }}
                            formatter={(value, name) => [
                                name === 'revenue' ? `$${value}` : value,
                                name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'Items Sold'
                            ]}
                        />
                        <Area
                            type={`monotone`}
                            dataKey={`revenue`}
                            stroke={`#14b8a6`}
                            fillOpacity={1}
                            fill={`url(#revenueGradient)`}
                        />
                        <Line type={`monotone`} dataKey={`orders`} stroke={`#06b6d4`} strokeWidth={2}/>
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

function InventoryByCategoryChart() {

    const categoryData = [
        {name: 'Electronics', value: 35, color: '#14b8a6', products: 245},
        {name: 'Clothing', value: 25, color: '#06b6d4', products: 178},
        {name: 'Food & Beverages', value: 20, color: '#8b5cf6', products: 134},
        {name: 'Health & Beauty', value: 12, color: '#f59e0b', products: 89},
        {name: 'Home & Garden', value: 8, color: '#ef4444', products: 67}
    ];

    return (
        <div className={`bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50`}>
            <h3 className={`text-lg font-semibold text-white mb-4`}>Inventory Distribution</h3>
            <div className={`h-64`}>
                <ResponsiveContainer width={`100%`} height={`100%`}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx={`50%`}
                            cy={`50%`}
                            outerRadius={80}
                            dataKey={`value`}
                        >
                            {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color}/>
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px'
                            }}
                            formatter={(value, name) => [`${value}%`, 'Share']}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className={`mt-4 space-y-2`}>
                {categoryData.map((category, index) => (
                    <div key={index} className={`flex items-center justify-between text-sm`}>
                        <div className={`flex items-center space-x-2`}>
                            <div className={`size-3 rounded-full`} style={{backgroundColor: category.color}}/>
                            <span className={`text-gray-300`}>{category.name}</span>
                        </div>
                        <div className={`text-right`}>
                            <span className={`text-white font-medium`}>{category.value}%</span>
                            <span className={`text-gray-400 text-xs ml-2`}>({category.products} items)</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}