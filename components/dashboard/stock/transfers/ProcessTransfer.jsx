'use client'

import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {
    CheckCircleIcon,
    ClipboardDocumentCheckIcon,
    ExclamationTriangleIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";
import {ProgressLoader} from "@/components";
import {formatDescriptionDate} from "@/utils/formatters";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {updateTransferItemQuantities, updateTransferStatus} from "@/lib/stock/queryStockTransfers";

export default function ProcessTransfer({transfer}) {
    const router = useRouter();
    const {id} = useParams();
    const transferItems = transfer.stock_transfer_items;
    const [processing, setProcessing] = useState(false);
    const [currentAction, setCurrentAction] = useState('');
    const [itemQuantities, setItemQuantities] = useState({});
    const [notes, setNotes] = useState(transfer.notes || '');

    useEffect(() => {
        const quantities = {};
        transfer.stock_transfer_items?.forEach(item => {
            if (transfer.status === 'pending') {
                // For approval, use requested quantities as default
                quantities[item.id] = item.quantity_requested;
            } else if (transfer.status === 'in_transit') {
                // For receiving, use shipped quantities as default
                quantities[item.id] = item.quantity_shipped;
            }
        });
        setItemQuantities(quantities);
    }, []);

    const getAvailableActions = () => {
        if (!transfer) return [];

        const actions = [];

        switch (transfer.status) {
            case 'pending':
                actions.push(
                    {
                        key: 'approve',
                        label: 'Approve Transfer',
                        icon: CheckCircleIcon,
                        color: 'bg-green-600 hover:bg-green-700'
                    },
                    {key: 'reject', label: 'Reject Transfer', icon: XMarkIcon, color: 'bg-red-600 hover:bg-red-700'}
                );
                break;
            case 'in_transit':
                actions.push(
                    {
                        key: 'receive',
                        label: 'Mark as Received',
                        icon: ClipboardDocumentCheckIcon,
                        color: 'bg-blue-600 hover:bg-blue-700'
                    }
                );
                break;
        }

        return actions;
    };

    const handleQuantityChange = (itemId, quantity) => {
        setItemQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(0, parseInt(quantity) || 0)
        }));
    };

    const handleProcess = async (action) => {
        if (!transfer) return;

        setProcessing(true);
        try {
            let updateData = {notes};
            let itemUpdates = [];

            switch (action) {
                case 'approve':
                    updateData = {...updateData, status: 'in_transit'};

                    // Update shipped quantities
                    itemUpdates = transferItems.map(item => ({
                        id: item.id,
                        quantity_shipped: itemQuantities[item.id] || 0
                    }));
                    break;

                case 'reject':
                    updateData = {...updateData, status: 'cancelled'};
                    break;

                case 'receive':
                    updateData = {...updateData, status: 'completed'};

                    // Update received quantities
                    itemUpdates = transferItems.map(item => ({
                        id: item.id,
                        quantity_received: itemQuantities[item.id] || 0
                    }));
                    break;
            }

            const updatedTransfer = await updateTransferStatus(transfer.id, updateData.status, {notes: updateData.notes});
            const updatedItems = await updateTransferItemQuantities(itemUpdates);

            if (updatedTransfer && updatedItems) {
                showSuccessToast('Transfer processed successfully!');
                router.push(`/dashboard/stock/transfers/${transfer.id}`);
            }

        } catch (error) {
            console.error('Error processing transfer:', error);
            showErrorToast('Error processing transfer. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const availableActions = getAvailableActions();

    if (availableActions.length === 0) {
        return (
            <div className={`min-h-svh bg-gray-900 flex items-center justify-center`}>
                <div className={`text-center`}>
                    <ExclamationTriangleIcon className={`size-12 text-yellow-400 mx-auto mb-4`}/>
                    <h2 className={`text-xl font-semibold mb-2`}>No actions available</h2>
                    <p className={`text-gray-400 mb-4`}>This transfer cannot be processed at this time.</p>
                    <Link href={`/dashboard/stock/transfers/${id}`} className={`text-teal-400 hover:text-teal-300`}>
                        Return to transfer details
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Current Action Selection */}
            {!currentAction && (
                <CurrentActionSelection availableActions={availableActions} setCurrentAction={setCurrentAction}/>
            )}

            {/* Action Form */}
            {currentAction && (
                <div className={`bg-gray-800 rounded-lg p-6`}>
                    <div className={`flex items-center justify-between mb-6`}>
                        <h2 className={`text-xl font-semibold`}>
                            {availableActions.find(a => a.key === currentAction)?.label}
                        </h2>
                        <button
                            onClick={() => setCurrentAction('')}
                            className={`text-gray-400 hover:text-white`}
                        >
                            <XMarkIcon className={`size-6`}/>
                        </button>
                    </div>

                    {/* Transfer Items with Quantity Inputs */}
                    {(currentAction === 'approve' || currentAction === 'receive') && (
                        <div className={`mb-6`}>
                            <h3 className={`text-lg font-medium text-white mb-4`}>
                                {currentAction === 'approve' ? 'Confirm Quantities to Ship' : 'Confirm Quantities Received'}
                            </h3>
                            <div className={`overflow-x-auto`}>
                                <table className={`w-full text-sm`}>
                                    <thead>
                                    <tr className={`border-b border-gray-700`}>
                                        <th className={`text-left py-3 text-gray-300`}>Product</th>
                                        <th className={`text-center py-3 text-gray-300`}>
                                            {currentAction === 'approve' ? 'Requested' : 'Shipped'}
                                        </th>
                                        <th className={`text-center py-3 text-gray-300`}>
                                            {currentAction === 'approve' ? 'To Ship' : 'Received'}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {transferItems.map((item) => (
                                        <tr key={item.id} className={`border-b border-gray-700/50`}>
                                            <td className={`py-4`}>
                                                <div>
                                                    <div
                                                        className={`font-medium text-white`}>{item.product?.name}</div>
                                                    <div className={`text-gray-400 text-xs`}>
                                                        SKU: {item.product?.sku}
                                                        {item.variant && ` • ${item.variant.name}`}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={`text-center py-4 text-white`}>
                                                {currentAction === 'approve' ? item.quantity_requested : item.quantity_shipped}
                                            </td>
                                            <td className={`text-center py-4`}>
                                                <input
                                                    type={`number`}
                                                    min={0}
                                                    max={currentAction === 'approve' ? item.quantity_requested : item.quantity_shipped}
                                                    value={itemQuantities[item.id] || 0}
                                                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                    className={`w-20 bg-gray-700 border border-gray-600 rounded px-3 py-1 text-text text-center focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:outline-none`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Notes */}
                    <div className={`mb-6`}>
                        <label className={`dashboard-form-label mb-2`}>
                            Notes {currentAction === 'reject' &&
                            <span className={`text-red-400`}>(Required for rejection)</span>}
                        </label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder={`Add notes for this ${currentAction}...`}
                            rows={4}
                            className={`dashboard-form-input border-gray-600`}
                        />
                    </div>

                    {/* Confirmation */}
                    <div className={`bg-gray-700/50 rounded-lg p-4 mb-6`}>
                        <div className={`flex items-start`}>
                            <ExclamationTriangleIcon className={`size-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0`}/>
                            <div>
                                <h4 className={`font-medium mb-1`}>Confirm Action</h4>
                                <p className={`text-gray-300 text-sm`}>
                                    {currentAction === 'approve' && 'This will approve the transfer and mark items as shipped. The transfer status will change to "In Transit".'}
                                    {currentAction === 'reject' && 'This will cancel the transfer. This action cannot be undone.'}
                                    {currentAction === 'receive' && 'This will complete the transfer and mark items as received. The transfer status will change to "Completed".'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex justify-end space-x-4`}>
                        <button
                            onClick={() => setCurrentAction('')}
                            disabled={processing}
                            className={`px-6 py-2 border border-gray-600 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50`}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => handleProcess(currentAction)}
                            disabled={processing || (currentAction === 'reject' && !notes.trim())}
                            className={`px-6 py-2 text-white rounded-lg font-medium flex items-center transition-colors disabled:opacity-50 ${
                                currentAction === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                                    currentAction === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                                        currentAction === 'receive' ? 'bg-blue-600 hover:bg-blue-700' :
                                            'bg-teal-600 hover:bg-teal-700'
                            }`}
                        >
                            {processing && (
                                <ProgressLoader className={`mr-2`}/>
                            )}
                            {processing ? 'Processing...' :
                                currentAction === 'approve' ? 'Approve & Ship' :
                                    currentAction === 'reject' ? 'Reject Transfer' :
                                        currentAction === 'receive' ? 'Complete Transfer' :
                                            'Process'
                            }
                        </button>
                    </div>
                </div>
            )}

            {!currentAction && (
                <TransferSummary transfer={transfer} transferItems={transferItems}/>
            )}
        </div>
    );
}

function CurrentActionSelection({availableActions, setCurrentAction}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 mb-8`}>
            <h2 className={`text-xl font-semibold mb-4`}>Available Actions</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
                {availableActions.map((action) => {
                    const IconComponent = action.icon;
                    return (
                        <button
                            key={action.key}
                            onClick={() => setCurrentAction(action.key)}
                            className={`${action.color} text-white p-4 rounded-lg flex items-center justify-center font-medium transition-colors`}
                        >
                            <IconComponent className={`size-5 mr-2`}/>
                            {action.label}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

function TransferSummary({transfer, transferItems}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6`}>
            <h3 className={`text-lg font-semibold text-white mb-4`}>Transfer Summary</h3>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6`}>
                <div className={`text-center`}>
                    <p className={`text-2xl font-bold text-white`}>
                        {transferItems.reduce((sum, item) => sum + item.quantity_requested, 0)}
                    </p>
                    <p className={`text-sm text-gray-400`}>Items Requested</p>
                </div>
                <div className={`text-center`}>
                    <p className={`text-2xl font-bold text-blue-400`}>
                        {transferItems.reduce((sum, item) => sum + item.quantity_shipped, 0)}
                    </p>
                    <p className={`text-sm text-gray-400`}>Items Shipped</p>
                </div>
                <div className={`text-center`}>
                    <p className={`text-2xl font-bold text-green-400`}>
                        {transferItems.reduce((sum, item) => sum + item.quantity_received, 0)}
                    </p>
                    <p className={`text-sm text-gray-400`}>Items Received</p>
                </div>
                <div className={`text-center`}>
                    <p className={`text-2xl font-bold text-white`}>{transferItems.length}</p>
                    <p className={`text-sm text-gray-400`}>Product Lines</p>
                </div>
            </div>

            <div className={`border-t border-gray-700 pt-4`}>
                <div className={`text-sm text-gray-400 space-y-2`}>
                    <div className={`flex justify-between`}>
                        <span>Created:</span>
                        <span className={`text-text`}>{formatDescriptionDate(transfer.created_at)}</span>
                    </div>
                    {transfer.approved_at && (
                        <div className={`flex justify-between`}>
                            <span>Approved:</span>
                            <span className={`text-text`}>{formatDescriptionDate(transfer.approved_at)}</span>
                        </div>
                    )}
                    {transfer.shipped_at && (
                        <div className={`flex justify-between`}>
                            <span>Shipped:</span>
                            <span className={`text-text`}>{formatDescriptionDate(transfer.shipped_at)}</span>
                        </div>
                    )}
                    {transfer.received_at && (
                        <div className={`flex justify-between`}>
                            <span>Received:</span>
                            <span className={`text-white`}>{formatDescriptionDate(transfer.received_at)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}