'use client'

import {useState} from "react";
import {ProgressLoader} from "@/components";
import {HiOutlineCheck} from "react-icons/hi2";
import {useRouter} from "next/navigation";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {addPaymentMethod, updatePaymentMethod} from "@/lib/sales/queryPaymentMethods";

export default function PaymentMethodsForm({paymentMethod = null}) {
    const isEditing = !!paymentMethod?.id;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: paymentMethod?.name || '',
        type: paymentMethod?.type || 'cash',
        is_active: paymentMethod?.is_active || false,
        processing_fee_percentage: paymentMethod?.processing_fee_percentage || 0,
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await handleEditSubmit();
        } else {
            await handleCreateSubmit();
        }
    };

    const handleEditSubmit = async () => {
        setIsLoading(true);

        try {
            const updatedMethod = await updatePaymentMethod(paymentMethod.id, formData);
            showSuccessToast(`Payment method ${updatedMethod?.name} updated successfully`);
            router.push(`/dashboard/sales/payment-methods`);
        } catch (error) {
            console.error('Error updating payment method: ', error);
            showErrorToast('An error occurred while updating the payment method. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleCreateSubmit = async () => {
        setIsLoading(true);

        const newMethod = {
            ...formData,
            processing_fee_percentage: parseFloat(formData.processing_fee_percentage) || 0
        };


        try {
            const addedMethod = await addPaymentMethod(newMethod);
            showSuccessToast(`Payment method ${addedMethod?.name} created successfully`);
            router.push(`/dashboard/sales/payment-methods`);
        } catch (error) {
            console.error('Error adding payment method:', error);
            showErrorToast('An error occurred while creating the payment method. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`bg-gray-800 rounded-lg border border-gray-700 p-6`}>
            <div className={`space-y-6`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>Method Name *</label>
                    <input
                        type={`text`}
                        name={`name`}
                        value={formData.name}
                        onChange={handleChange}
                        className={`dashboard-form-input border-gray-600`}
                        placeholder={`Enter payment method name`}
                        required
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Payment Type *</label>
                    <select
                        value={formData.type}
                        name={`type`}
                        onChange={handleChange}
                        className={`dashboard-form-input border-gray-600`}
                        required
                    >
                        <option value={`cash`}>Cash</option>
                        <option value={`card`}>Card</option>
                        <option value={`mobile_money`}>Mobile Money</option>
                        <option value={`bank_transfer`}>Bank Transfer</option>
                        <option value={`credit`}>Credit</option>
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Processing Fee Percentage</label>
                    <div className={`relative`}>
                        <input
                            type={`number`}
                            name={`processing_fee_percentage`}
                            value={formData.processing_fee_percentage}
                            onChange={handleChange}
                            className={`dashboard-form-input border-gray-600`}
                            placeholder={`0.00`}
                            step={0.01}
                            min={0}
                            max={100}
                        />
                        <span className={`absolute right-3 top-3 text-gray-400`}>%</span>
                    </div>
                    <p className={`text-sm text-gray-500 mt-1`}>
                        Enter the percentage fee charged for processing this payment type
                    </p>
                </div>

                <div>
                    <label className={`flex items-center gap-3`}>
                        <input
                            type={`checkbox`}
                            name={`is_active`}
                            checked={formData.is_active}
                            onChange={handleChange}
                            className={`size-5 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2`}
                        />
                        <span className={`text-gray-300`}>Active payment method</span>
                    </label>
                    <p className={`text-sm text-gray-500 mt-1 ml-8`}>
                        Only active payment methods will be available for transactions
                    </p>
                </div>
            </div>

            <div className={`flex justify-end gap-4 pt-6 mt-6 border-t border-gray-700`}>
                <button
                    type={`button`}
                    onClick={router.back}
                    disabled={isLoading}
                    className={`dashboard-cancel-btn`}
                >
                    Cancel
                </button>
                <button
                    type={`submit`}
                    disabled={isLoading}
                    className={`dashboard-submit-btn`}
                >
                    {isLoading ? (
                        <>
                            <ProgressLoader/>
                            {isEditing ? 'Updating...' : 'Creating...'}
                        </>
                    ) : (
                        <>
                            <HiOutlineCheck className={`size-5`}/>
                            {isEditing ? 'Update Method' : 'Create Method'}
                        </>
                    )}
                </button>
            </div>
        </form>
    )
};