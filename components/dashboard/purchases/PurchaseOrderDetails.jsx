'use client'

import {useState} from 'react';
import {
    CheckIcon,
    ClockIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    PaperAirplaneIcon,
    PencilIcon,
    PrinterIcon,
    TruckIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {formatCurrency, formatDate, formatDescriptionDate} from "@/utils/formatters";
import {BackBtn} from "@/components/ui/buttons";
import Link from "next/link";
import {updatePurchaseOrderStatus} from "@/lib/queryPurchaseOrders";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {useRouter} from "next/navigation";

export default function PurchaseOrderDetails({purchaseOrder}) {
    const getStatusColor = (status) => {
        const colors = {
            draft: 'bg-gray-700 text-gray-300 border-gray-600',
            sent: 'bg-blue-900 text-blue-300 border-blue-700',
            confirmed: 'bg-yellow-900 text-yellow-300 border-yellow-700',
            received: 'bg-teal-900 text-teal-300 border-teal-700',
            cancelled: 'bg-red-900 text-red-300 border-red-700'
        };
        return colors[status] || 'bg-gray-700 text-gray-300 border-gray-600';
    };

    const getStatusIcon = (status) => {
        const icons = {
            draft: DocumentTextIcon,
            sent: PaperAirplaneIcon,
            confirmed: CheckIcon,
            received: TruckIcon,
            cancelled: XMarkIcon
        };
        const IconComponent = icons[status] || ClockIcon;
        return <IconComponent className={`size-5`}/>;
    };

    const canEdit = () => {
        return purchaseOrder?.status === 'draft' || purchaseOrder?.status === 'sent';
    };

    return (
        <div>
            {/* Header */}
            <div className={`pb-4 border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto px-4`}>
                    <div className={`flex flex-wrap gap-4 justify-between items-center min-h-16`}>
                        <div className={`flex items-center`}>
                            <BackBtn/>
                            <div>
                                <h1 className={`text-2xl font-bold font-heading`}>{purchaseOrder.po_number}</h1>
                                <p className={`text-sm text-gray-400`}>Purchase Order Details</p>
                            </div>
                        </div>

                        <div className={`flex-1 flex justify-end items-center space-x-3`}>
                            {/* Status Badge */}
                            <div
                                className={`px-4 py-2 rounded-lg border flex items-center space-x-2 ${getStatusColor(purchaseOrder.status)}`}>
                                {getStatusIcon(purchaseOrder.status)}
                                <span className={`capitalize font-medium`}>{purchaseOrder.status}</span>
                            </div>

                            {/* Action Buttons */}
                            <div className={`flex space-x-2`}>
                                <button
                                    className={`bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors`}
                                >
                                    <PrinterIcon className={`size-4`}/>
                                    <span>Print</span>
                                </button>

                                {canEdit() && (
                                    <Link
                                        href={`/dashboard/purchases/${purchaseOrder.id}/edit`}
                                        className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors`}
                                    >
                                        <PencilIcon className={`size-4`}/>
                                        <span>Edit</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                    {/* Main Content */}
                    <div className={`lg:col-span-2 space-y-8`}>
                        {/* Purchase Order Details */}
                        <div className={`bg-gray-800 rounded-xl border border-gray-700`}>
                            <div className={`p-6`}>
                                <h3 className={`text-lg font-semibold text-white mb-6 flex items-center`}>
                                    <DocumentTextIcon className={`size-5 mr-2 text-teal-400`}/>
                                    Order Information
                                </h3>

                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                                    <div>
                                        <p className={`block text-sm font-medium text-gray-400 mb-1`}>Supplier</p>
                                        <div>
                                            <p className={`font-medium`}>{purchaseOrder.supplier.name}</p>
                                            <p className={`text-sm text-gray-400`}>{purchaseOrder.supplier.email}</p>
                                            <p className={`text-sm text-gray-400`}>{purchaseOrder.supplier.phone}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className={`block text-sm font-medium text-gray-400 mb-1`}>
                                            Delivery Location
                                        </p>
                                        <div>
                                            <p className={`font-medium`}>{purchaseOrder.location.name}</p>
                                            <p className={`text-sm text-gray-400`}>{purchaseOrder.location.address}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className={`block text-sm font-medium text-gray-400 mb-1`}>Order Date</p>
                                        <p>{formatDescriptionDate(purchaseOrder.order_date)}</p>
                                    </div>

                                    <div>
                                        <p className={`block text-sm font-medium text-gray-400 mb-1`}>
                                            Expected Delivery
                                        </p>
                                        <p>
                                            {purchaseOrder.expected_date ? formatDate(purchaseOrder.expected_date) : 'Not specified'}
                                        </p>
                                    </div>

                                    {purchaseOrder.received_date && (
                                        <div>
                                            <p className={`block text-sm font-medium text-gray-400 mb-1`}>
                                                Received Date
                                            </p>
                                            <p className={`text-teal-400 font-medium`}>
                                                {formatDate(purchaseOrder.received_date)}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <p className={`block text-sm font-medium text-gray-400 mb-1`}>
                                            Created By
                                        </p>
                                        <p>{purchaseOrder.created_by.full_name}</p>
                                    </div>
                                </div>

                                {purchaseOrder.notes && (
                                    <div className={`mt-6`}>
                                        <p className={`block text-sm font-medium text-gray-400 mb-2`}>Notes</p>
                                        <p className={`bg-gray-750 p-4 rounded-lg border border-gray-600`}>
                                            {purchaseOrder.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className={`bg-gray-800 rounded-xl border border-gray-700`}>
                            <div className={`p-6`}>
                                <h3 className={`text-lg font-semibold mb-6`}>Order Items</h3>

                                <div className={`space-y-4`}>
                                    {purchaseOrder.items.map((item) => (
                                        <div key={item.id}
                                             className={`bg-gray-750 p-4 rounded-lg border border-gray-600`}>
                                            <div className={`flex justify-between items-start mb-3`}>
                                                <div>
                                                    <h4 className={`font-medium`}>
                                                        {item.product.name}
                                                        {item.variant && ` - ${item.variant.name}`}
                                                    </h4>
                                                    <p className={`text-sm text-gray-400`}>
                                                        SKU: {item.variant?.sku || item.product.sku}
                                                    </p>
                                                </div>
                                                <div className={`text-right`}>
                                                    <p className={`text-teal-400 font-semibold`}>{formatCurrency(item.total_cost)}</p>
                                                    <p className={`text-sm text-gray-400`}>{formatCurrency(item.unit_cost)} each</p>
                                                </div>
                                            </div>

                                            <div className={`grid grid-cols-3 gap-4`}>
                                                <div>
                                                    <span className={`text-sm text-gray-400`}>Ordered:</span>
                                                    <p className={`font-medium`}>{item.quantity_ordered}</p>
                                                </div>
                                                <div>
                                                    <span className={`text-sm text-gray-400`}>Received:</span>
                                                    <p className={`font-medium`}>{item.quantity_received}</p>
                                                </div>
                                                <div>
                                                    <span className={`text-sm text-gray-400`}>Remaining:</span>
                                                    <p className={`text-yellow-400 font-medium`}>
                                                        {item.quantity_ordered - item.quantity_received}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={`space-y-6`}>
                        <QuickActions purchaseOrder={purchaseOrder}/>
                        <OrderSummary purchaseOrder={purchaseOrder}/>
                        <OrderTimeline purchaseOrder={purchaseOrder}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickActions({purchaseOrder}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const canCancel = () => {
        return ['draft', 'sent', 'resend', 'confirmed'].includes(purchaseOrder?.status);
    };

    const canConfirm = () => {
        return ['sent', 'resend'].includes(purchaseOrder?.status);
    };

    const canReceive = () => {
        return purchaseOrder?.status === 'confirmed';
    };

    const canResend = () => {
        return ['sent', 'resend', 'confirmed'].includes(purchaseOrder?.status);
    };

    const handleStatusChange = async (newStatus) => {
        if (!purchaseOrder) return;

        setLoading(true);
        try {

            const updatedOrder = await updatePurchaseOrderStatus(purchaseOrder.id, newStatus);

            if (!updatedOrder) {
                showErrorToast('Error updating purchase order status');
            }

            const statusMessages = {
                sent: 'Purchase order sent to supplier successfully!',
                confirmed: 'Purchase order confirmed successfully!',
                received: 'Purchase order marked as received successfully!',
                cancelled: 'Purchase order cancelled successfully!',
                resend: 'Purchase order resent to supplier successfully!'
            };
            showSuccessToast(statusMessages[newStatus]);

            router.push(`/dashboard/purchases/`);
        } catch (error) {
            console.error('Error updating purchase order status: ', error);
            showErrorToast('Error updating purchase order status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
            <h3 className={`text-lg font-semibold text-white mb-4`}>Actions</h3>

            <div className={`space-y-3`}>
                {purchaseOrder.status === 'draft' && (
                    <button
                        onClick={() => handleStatusChange('sent')}
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                    >
                        {loading ? (
                            <div
                                className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white`}/>
                        ) : (
                            <PaperAirplaneIcon className={`size-4`}/>
                        )}
                        <span>Send to Supplier</span>
                    </button>
                )}

                {canConfirm() && (
                    <button
                        onClick={() => handleStatusChange('confirmed')}
                        disabled={loading}
                        className={`w-full bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-text px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                    >
                        {loading ? (
                            <div
                                className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white`}/>
                        ) : (
                            <CheckIcon className={`size-4`}/>
                        )}
                        <span>Mark as Confirmed</span>
                    </button>
                )}

                {canReceive() && (
                    <button
                        onClick={() => handleStatusChange('received')}
                        disabled={loading}
                        className={`w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-text px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                    >
                        {loading ? (
                            <div
                                className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white`}/>
                        ) : (
                            <TruckIcon className={`size-4`}/>
                        )}
                        <span>Mark as Received</span>
                    </button>
                )}

                {canResend() && (
                    <button
                        onClick={() => handleStatusChange('resend')}
                        disabled={loading}
                        className={`w-full bg-gray-600 hover:bg-gray-500 text-text px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                    >
                        {loading ? (
                            <div
                                className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white`}/>
                        ) : (
                            <PaperAirplaneIcon className={`size-4`}/>
                        )}
                        <span>Resend to Supplier</span>
                    </button>
                )}

                {canCancel() && (
                    <button
                        onClick={() => {
                            if (confirm('Are you sure you want to cancel this purchase order?')) {
                                handleStatusChange('cancelled');
                            }
                        }}
                        disabled={loading}
                        className={`w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-text px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                    >
                        {loading ? (
                            <div
                                className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white`}/>
                        ) : (
                            <XMarkIcon className={`size-4`}/>
                        )}
                        <span>Cancel Order</span>
                    </button>
                )}
            </div>

            {/* Warning for status changes */}
            {(canConfirm() || canReceive() || canCancel()) && (
                <div className={`mt-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg`}>
                    <div className={`flex items-start space-x-2`}>
                        <ExclamationTriangleIcon
                            className={`size-5 text-yellow-500 flex-shrink-0 mt-0.5`}/>
                        <div>
                            <p className={`text-yellow-300 text-sm font-medium`}>Status Change Notice</p>
                            <p className={`text-yellow-200 text-xs mt-1`}>
                                Status changes cannot be undone. Please confirm all details before
                                proceeding.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function OrderSummary({purchaseOrder}) {
    return (
        <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
            <h3 className={`text-lg font-semibold mb-4`}>Order Summary</h3>

            <div className={`space-y-3`}>
                <div className={`flex justify-between text-gray-300`}>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(purchaseOrder.subtotal)}</span>
                </div>

                <div className={`flex justify-between text-gray-300`}>
                    <span>Tax:</span>
                    <span>{formatCurrency(purchaseOrder.tax_amount)}</span>
                </div>

                <div className={`flex justify-between text-gray-300`}>
                    <span>Shipping:</span>
                    <span>{formatCurrency(purchaseOrder.shipping_cost)}</span>
                </div>

                <hr className={`border-gray-600`}/>

                <div className={`flex justify-between font-semibold text-lg`}>
                    <span>Total:</span>
                    <span className={`text-teal-400`}>{formatCurrency(purchaseOrder.total_amount)}</span>
                </div>
            </div>

            {/* Order Stats */}
            <div className={`grid grid-cols-2 gap-4 mt-6`}>
                <div className={`text-center p-3 bg-gray-750 rounded-lg`}>
                    <div className={`text-2xl font-bold text-teal-400`}>{purchaseOrder.items.length}</div>
                    <div className={`text-xs text-gray-400`}>Items</div>
                </div>
                <div className={`text-center p-3 bg-gray-750 rounded-lg`}>
                    <div className={`text-2xl font-bold text-teal-400`}>
                        {purchaseOrder.items.reduce((sum, item) => sum + item.quantity_ordered, 0)}
                    </div>
                    <div className={`text-xs text-gray-400`}>Total Qty</div>
                </div>
            </div>
        </div>
    )
}

function OrderTimeline({purchaseOrder}) {
    return (
        <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
            <h3 className={`text-lg font-semibold mb-4`}>Activity Timeline</h3>

            <div className={`space-y-4`}>
                <div className={`flex items-start space-x-3`}>
                    <div className={`flex-shrink-0 size-8 bg-teal-600 rounded-full flex items-center justify-center`}>
                        <DocumentTextIcon className={`size-4`}/>
                    </div>
                    <div>
                        <p className={`text-white text-sm font-medium`}>Purchase order created</p>
                        <p className={`text-gray-400 text-xs`}>{formatDescriptionDate(purchaseOrder.created_at)}</p>
                        <p className={`text-gray-400 text-xs`}>by {purchaseOrder.created_by.full_name}</p>
                    </div>
                </div>

                {purchaseOrder.status !== 'draft' && (
                    <div className={`flex items-start space-x-3`}>
                        <div
                            className={`flex-shrink-0 size-8 bg-blue-600 rounded-full flex items-center justify-center`}>
                            <PaperAirplaneIcon className={`size-4`}/>
                        </div>
                        <div>
                            <p className={`text-sm font-medium`}>Sent to supplier</p>
                            <p className={`text-gray-400 text-xs`}>{formatDescriptionDate(purchaseOrder.updated_at)}</p>
                        </div>
                    </div>
                )}

                {['confirmed', 'received'].includes(purchaseOrder.status) && (
                    <div className={`flex items-start space-x-3`}>
                        <div
                            className={`flex-shrink-0 size-8 bg-yellow-600 rounded-full flex items-center justify-center`}>
                            <CheckIcon className={`size-4`}/>
                        </div>
                        <div>
                            <p className={`text-white text-sm font-medium`}>Order confirmed</p>
                            <p className={`text-gray-400 text-xs`}>{formatDescriptionDate(purchaseOrder.updated_at)}</p>
                        </div>
                    </div>
                )}

                {purchaseOrder.status === 'received' && (
                    <div className={`flex items-start space-x-3`}>
                        <div
                            className={`flex-shrink-0 size-8 bg-teal-600 rounded-full flex items-center justify-center`}>
                            <TruckIcon className={`size-4`}/>
                        </div>
                        <div>
                            <p className={`text-white text-sm font-medium`}>Order received</p>
                            <p className={`text-gray-400 text-xs`}>
                                {formatDescriptionDate(purchaseOrder.received_date)}
                            </p>
                        </div>
                    </div>
                )}

                {purchaseOrder.status === 'cancelled' && (
                    <div className={`flex items-start space-x-3`}>
                        <div
                            className={`flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center`}>
                            <XMarkIcon className={`size-4`}/>
                        </div>
                        <div>
                            <p className={`text-white text-sm font-medium`}>Order cancelled</p>
                            <p className={`text-gray-400 text-xs`}>{formatDescriptionDate(purchaseOrder.updated_at)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}