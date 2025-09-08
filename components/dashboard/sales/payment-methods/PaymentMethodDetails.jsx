'use client'

import {
    BanknotesIcon,
    BuildingLibraryIcon,
    CreditCardIcon,
    DevicePhoneMobileIcon,
    PencilIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/24/solid";
import Link from "next/link";
import {formatDescriptionDate} from "@/utils/formatters";
import {useState} from "react";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {deletePaymentMethod} from "@/lib/sales/queryPaymentMethods";
import {useRouter} from "next/navigation";
import {DeleteModal} from "@/components/ui/modal";

export default function PaymentMethodDetails({paymentMethod}) {
    const router = useRouter();
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [deleteModal, setDeleteModal] = useState({open: false, data: null});

    const handleDelete = async (paymentMethodId) => {
        setLoadingDelete(true);

        try {
            await deletePaymentMethod(paymentMethodId);

            setDeleteModal({open: false, data: null});
            showSuccessToast('Payment method deleted successfully.');
            router.push('/dashboard/sales/payment-methods');
        } catch (error) {
            console.error('Error deleting payment method:', error);
            showErrorToast('Error deleting payment method. Please try again later.');
        } finally {
            setLoadingDelete(false);
        }
    };

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

    const IconComponent = getPaymentMethodIcon(paymentMethod.type);

    return (
        <div className={`bg-gray-800 rounded-lg border border-gray-700`}>
            <div className={`p-6 border-b border-gray-700`}>
                <div className={`flex items-center gap-4`}>
                    <div className={`p-3 bg-teal-600 rounded-lg`}>
                        <IconComponent className={`size-8`}/>
                    </div>
                    <div>
                        <h2 className={`text-2xl font-semibold`}>{paymentMethod.name}</h2>
                        <p className={`text-gray-400`}>{getTypeLabel(paymentMethod.type)}</p>
                    </div>
                </div>
            </div>

            <div className={`p-6`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8`}>
                    <div className={`space-y-6`}>
                        <div>
                            <h3 className={`text-lg font-semibold mb-4`}>Basic Information</h3>
                            <div className={`space-y-4`}>
                                <div>
                                    <p className={`block text-sm font-medium text-gray-400 mb-1`}>Method Name</p>
                                    <p>{paymentMethod.name}</p>
                                </div>
                                <div>
                                    <p className={`block text-sm font-medium text-gray-400 mb-1`}>Payment Type</p>
                                    <p>{getTypeLabel(paymentMethod.type)}</p>
                                </div>
                                <div>
                                    <p className={`block text-sm font-medium text-gray-400 mb-1`}>Processing Fee</p>
                                    <p>{paymentMethod.processing_fee_percentage}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`space-y-6`}>
                        <div>
                            <h3 className={`text-lg font-semibold mb-4`}>Status & Metadata</h3>
                            <div className={`space-y-4`}>
                                <div>
                                    <label className={`block text-sm font-medium text-gray-400 mb-1`}>Status</label>
                                    <div className={`flex items-center gap-2`}>
                                        {paymentMethod.is_active ? (
                                            <>
                                                <CheckCircleIcon className={`size-5 text-green-500`}/>
                                                <span className={`text-green-400`}>Active</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircleIcon className={`size-5 text-red-500`}/>
                                                <span className={`text-red-400`}>Inactive</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className={`block text-sm font-medium text-gray-400 mb-1`}>Created Date</p>
                                    <p>{formatDescriptionDate(paymentMethod.created_at)}</p>
                                </div>
                                <div>
                                    <p className={`block text-sm font-medium text-gray-400 mb-1`}>Method ID</p>
                                    <p className={`text-gray-300 font-mono text-sm`}>{paymentMethod.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`mt-8 pt-6 border-t border-gray-700`}>
                    <div className={`flex flex-wrap items-center justify-end gap-4`}>
                        <Link
                            href={`/dashboard/sales/payment-methods/${paymentMethod.id}/edit`}
                            className={`bg-teal-600 hover:bg-teal-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                        >
                            <PencilIcon className={`size-4`}/>
                            Edit
                        </Link>
                        <button
                            onClick={() => setDeleteModal({open: true, data: paymentMethod})}
                            className={`bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                        >
                            <TrashIcon className={`size-4`}/>
                            Delete
                        </button>
                    </div>
                </div>
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