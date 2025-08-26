'use client'

import Link from 'next/link';
import {
    CheckCircleIcon,
    ClockIcon,
    DocumentTextIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    TruckIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import {formatCurrency, formatDate} from "@/utils/formatters";

export default function PurchasesGrid({purchaseOrders}) {
    return (
        <div>
            <div className={`max-w-7xl mx-auto py-8`}>

                {purchaseOrders.length === 0 ? (<EmptyState/>) : (
                    <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6`}>
                        {purchaseOrders.map((order) => (<PurchaseOrderCard key={order.id} order={order}/>))}
                    </div>
                )}
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className={`bg-gray-800 rounded-xl p-12 text-center border border-gray-700`}>
            <DocumentTextIcon className={`size-16 text-gray-600 mx-auto mb-4`}/>
            <h3 className={`text-xl font-semibold text-gray-400 mb-2`}>No purchase orders found</h3>
            <p className={`text-gray-500 mb-6`}>Get started by creating your first purchase order.</p>
            <Link
                href={`/dashboard/purchases/create`}
                className={`bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors`}
            >
                Create Purchase Order
            </Link>
        </div>
    )
}

function PurchaseOrderCard({order}) {
    const getStatusColor = (status) => {
        const colors = {
            draft: 'bg-gray-700 text-gray-300',
            sent: 'bg-blue-900 text-blue-300',
            confirmed: 'bg-yellow-900 text-yellow-300',
            received: 'bg-teal-900 text-teal-300',
            cancelled: 'bg-red-900 text-red-300'
        };
        return colors[status] || 'bg-gray-700 text-gray-300';
    };

    const getStatusIcon = (status) => {
        const icons = {
            draft: DocumentTextIcon,
            sent: TruckIcon,
            confirmed: CheckCircleIcon,
            received: CheckCircleIcon,
            cancelled: XCircleIcon
        };
        const IconComponent = icons[status] || ClockIcon;
        return <IconComponent className={`size-4`}/>;
    };

    return (
        <div className={`bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors`}>
            <div className={`p-6`}>
                {/* Header */}
                <div className={`flex justify-between items-start mb-4`}>
                    <div>
                        <h3 className={`text-lg font-semibold`}>{order.po_number}</h3>
                        <p className={`text-gray-400 text-sm`}>{order.supplier.name}</p>
                    </div>
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className={`capitalize`}>{order.status}</span>
                    </div>
                </div>

                {/* Details */}
                <div className={`space-y-3 mb-6`}>
                    <div className={`flex justify-between`}>
                        <span className={`text-gray-400`}>Order Date:</span>
                        <span className={`text-white`}>{formatDate(order.order_date)}</span>
                    </div>
                    <div className={`flex justify-between`}>
                        <span className={`text-gray-400`}>Expected:</span>
                        <span className={`text-white`}>{formatDate(order.expected_date)}</span>
                    </div>
                    <div className={`flex justify-between`}>
                        <span className={`text-gray-400`}>Items:</span>
                        <span className={`text-white`}>{order.items_count}</span>
                    </div>
                    <div className={`flex justify-between`}>
                        <span className={`text-gray-400`}>Total:</span>
                        <span
                            className={`text-teal-400 font-semibold`}>{formatCurrency(order.total_amount)}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className={`flex space-x-2`}>
                    <Link
                        href={`/dashboard/purchases/${order.id}`}
                        className={`flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                    >
                        <EyeIcon className={`size-4`}/>
                        <span>View</span>
                    </Link>
                    <Link
                        href={`/dashboard/purchases/${order.id}/edit`}
                        className={`flex-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                    >
                        <PencilIcon className={`size-4`}/>
                        <span>Edit</span>
                    </Link>
                    <button
                        className={`bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center justify-center transition-colors`}
                    >
                        <TrashIcon className={`size-4`}/>
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className={`px-6 py-3 bg-gray-750 rounded-b-xl border-t border-gray-700`}>
                <p className={`text-xs text-gray-400`}>Created by {order.created_by.name}</p>
            </div>
        </div>
    )
}