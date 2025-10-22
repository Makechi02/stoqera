'use client'

import {useEffect, useState} from 'react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {AnimatePresence, motion} from 'framer-motion';
import {ProgressLoader} from "@/components";
import {formatCurrency} from "@/utils/formatters";
import {getPaymentMethodsForSale} from "@/lib/sales/querySales";
import {showErrorToast} from "@/utils/toastUtil";

export default function SalesPaymentModal({isOpen, onClose, onAddPayment, maxAmount, currentPayment, setCurrentPayment}) {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen) {
            loadPaymentMethods();
        }
    }, [isOpen]);

    const loadPaymentMethods = async () => {
        setLoading(true);
        setError(null);

        try {
            const methods = await getPaymentMethodsForSale();
            setPaymentMethods(methods);

            // Set first method as default
            if (methods.length > 0) {
                setCurrentPayment(prev => ({
                    ...prev,
                    method: methods[0]
                }));
            }
        } catch (err) {
            setError('Failed to load payment methods');
            console.error('Error fetching payment methods:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddPayment = () => {
        if (!currentPayment.method) {
            showErrorToast('Please select a payment method');
            return;
        }

        if (currentPayment.amount <= 0) {
            showErrorToast('Please enter a valid payment amount');
            return;
        }

        if (currentPayment.amount > maxAmount) {
            showErrorToast('Payment amount cannot exceed the amount due');
            return;
        }

        onAddPayment({
            id: Date.now().toString(),
            method: currentPayment.method,
            amount: currentPayment.amount,
            reference: currentPayment.reference,
            date: new Date().toISOString()
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.2}}
                    className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4`}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{scale: 0.95, y: 20, opacity: 0}}
                        animate={{scale: 1, y: 0, opacity: 1}}
                        exit={{scale: 0.95, y: 20, opacity: 0}}
                        transition={{
                            type: "spring",
                            duration: 0.3,
                            bounce: 0.3
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className={`bg-gray-800 rounded-xl border border-gray-700 max-w-md w-full p-6`}
                    >
                        <div className={`flex items-center justify-between mb-6`}>
                            <h3 className={`text-xl font-semibold text-gray-100`}>Add Payment</h3>
                            <button
                                onClick={onClose}
                                className={`p-1 hover:bg-gray-700 rounded transition-colors`}
                            >
                                <XMarkIcon className={`size-6 text-gray-400`}/>
                            </button>
                        </div>

                        {loading ? (
                            // Loading State
                            <motion.div
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 0.3}}
                                className={`space-y-4`}
                            >
                                <div className={`text-center py-8`}>
                                    <div className={`inline-flex mb-4`}>
                                        <ProgressLoader size={'lg'}/>
                                    </div>
                                    <p className={`text-gray-400`}>Loading payment methods...</p>
                                </div>
                            </motion.div>
                        ) : error ? (
                            // Error State
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.3}}
                                className={`space-y-4`}
                            >
                                <div
                                    className={`bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-4 text-center`}>
                                    <p className={`text-red-400 mb-3`}>{error}</p>
                                    <button
                                        onClick={loadPaymentMethods}
                                        className={`px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition-colors text-sm`}
                                    >
                                        Retry
                                    </button>
                                </div>
                                <button
                                    onClick={onClose}
                                    className={`w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors`}
                                >
                                    Close
                                </button>
                            </motion.div>
                        ) : (
                            // Form
                            <motion.div
                                initial={{opacity: 0, y: 10}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.3, delay: 0.1}}
                                className={`space-y-4`}
                            >
                                {/* Payment Method */}
                                <div>
                                    <label className={`dashboard-form-label mb-2`}>Payment Method</label>
                                    <select
                                        value={currentPayment.method?.id || ''}
                                        onChange={(e) => {
                                            const selected = paymentMethods.find(pm => pm.id === e.target.value);
                                            setCurrentPayment({...currentPayment, method: selected});
                                        }}
                                        className={`dashboard-form-input border-gray-600`}
                                    >
                                        {paymentMethods.map(pm => (
                                            <option key={pm.id} value={pm.id}>{pm.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Amount */}
                                <div>
                                    <label className={`dashboard-form-label mb-2`}>Amount</label>
                                    <input
                                        type={`number`}
                                        min={`0`}
                                        step={`0.01`}
                                        max={maxAmount}
                                        value={currentPayment.amount || ''}
                                        onChange={(e) => setCurrentPayment({
                                            ...currentPayment,
                                            amount: parseFloat(e.target.value) || 0
                                        })}
                                        className={`dashboard-form-input border-gray-600`}
                                        placeholder={`0.00`}
                                    />
                                    <p className={`text-xs text-gray-400 mt-1`}>Maximum: {formatCurrency(maxAmount)}</p>
                                </div>

                                {/* Reference Number */}
                                <div>
                                    <label className={`dashboard-form-label mb-2`}>Reference Number (Optional)</label>
                                    <input
                                        type={`text`}
                                        value={currentPayment.reference}
                                        onChange={(e) => setCurrentPayment({
                                            ...currentPayment,
                                            reference: e.target.value
                                        })}
                                        className={`dashboard-form-input border-gray-600`}
                                        placeholder={`Transaction ID, Check #, etc.`}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className={`flex gap-3 pt-4`}>
                                    <button
                                        onClick={onClose}
                                        className={`dashboard-cancel-btn w-full justify-center`}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddPayment}
                                        className={`dashboard-submit-btn w-full justify-center`}
                                    >
                                        Add Payment
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}