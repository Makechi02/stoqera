'use client'

import {
    BanknotesIcon,
    BuildingLibraryIcon,
    CheckCircleIcon,
    CreditCardIcon,
    DevicePhoneMobileIcon,
    PencilIcon,
    TrashIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";
import {useState} from "react";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {deletePaymentMethod} from "@/lib/sales/queryPaymentMethods";
import {DeleteModal} from "@/components/ui/modal";

export default function PaymentMethodsGrid({paymentMethods}) {

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [deleteModal, setDeleteModal] = useState({open: false, data: null});

    const handleDelete = async (paymentMethodId) => {
        setLoadingDelete(true);

        try {
            await deletePaymentMethod(paymentMethodId);

            setDeleteModal({open: false, data: null});
            showSuccessToast('Payment method deleted successfully.');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting payment method:', error);
            showErrorToast('Error deleting payment method. Please try again later.');
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <div>
            {paymentMethods.length === 0 && (
                <div className={`text-center py-12`}>
                    <CreditCardIcon className={`size-16 text-gray-600 mx-auto mb-4`}/>
                    <h3 className={`text-xl font-semibold text-gray-400 mb-2`}>No payment methods found</h3>
                    <p className={`text-gray-500 mb-6`}>Get started by adding your first payment method</p>
                    <Link
                        href={`/dashboard/sales/payment-methods/create`}
                        className={`bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-lg`}
                    >
                        Add Payment Method
                    </Link>
                </div>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                {paymentMethods.map((method) => (
                    <PaymentMethodCard key={method.id} method={method} setDeleteModal={setDeleteModal}/>
                ))}
            </div>

            {deleteModal.open && (
                <DeleteModal
                    setDeleteModal={setDeleteModal}
                    deleteModal={deleteModal}
                    handleDelete={handleDelete}
                    isLoading={loadingDelete}
                    title={`Delete Payment Method`}/>
            )}
        </div>
    );
};

function PaymentMethodCard({method, setDeleteModal}) {
    const getPaymentMethodIcon = (type) => {
        switch (type) {
            case 'cash':
                return BanknotesIcon;
            case 'card':
                return CreditCardIcon;
            case 'mobile_money':
                return DevicePhoneMobileIcon;
            case 'bank_transfer':
                return BuildingLibraryIcon;
            case 'credit':
                return CreditCardIcon;
            default:
                return CreditCardIcon;
        }
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'cash':
                return 'Cash';
            case 'card':
                return 'Card';
            case 'mobile_money':
                return 'Mobile Money';
            case 'bank_transfer':
                return 'Bank Transfer';
            case 'credit':
                return 'Credit';
            default:
                return type;
        }
    };

    const IconComponent = getPaymentMethodIcon(method.type);

    return (
        <div
            className={`bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-teal-500 transition-colors`}
        >
            <div className={`flex justify-between items-start mb-4`}>
                <div className={`flex items-center gap-3`}>
                    <div className={`p-2 bg-teal-600 rounded-lg`}><IconComponent className={`size-6`}/></div>
                    <div>
                        <h3 className={`font-semibold`}>{method.name}</h3>
                        <p className={`text-sm text-gray-400`}>{getTypeLabel(method.type)}</p>
                    </div>
                </div>
                <div className={`flex items-center gap-1`}>
                    {method.is_active ? (
                        <CheckCircleIcon className={`size-5 text-green-500`}/>
                    ) : (
                        <XCircleIcon className={`size-5 text-red-500`}/>
                    )}
                </div>
            </div>

            <div className={`space-y-2 mb-4`}>
                <div className={`flex justify-between`}>
                    <span className={`text-gray-400`}>Processing Fee:</span>
                    <span>{method.processing_fee_percentage}%</span>
                </div>
                <div className={`flex justify-between`}>
                    <span className={`text-gray-400`}>Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                        method.is_active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                    }`}>
                      {method.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            <div className={`flex gap-2`}>
                <Link
                    href={`/dashboard/sales/payment-methods/${method.id}`}
                    className={`flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded text-sm transition-colors`}
                >
                    View Details
                </Link>
                <Link
                    href={`/dashboard/sales/payment-methods/${method.id}/edit`}
                    className={`flex items-center justify-center bg-teal-600 hover:bg-teal-700 p-2 rounded transition-colors`}
                >
                    <PencilIcon className={`size-4`}/>
                </Link>
                <button
                    onClick={() => setDeleteModal({open: true, data: method})}
                    className={`bg-red-600 hover:bg-red-700 p-2 rounded transition-colors`}
                >
                    <TrashIcon className={`size-4`}/>
                </button>
            </div>
        </div>
    )
}