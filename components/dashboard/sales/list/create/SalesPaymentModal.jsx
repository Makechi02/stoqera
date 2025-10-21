'use client'

import CreateSalesModal from "@/components/dashboard/sales/list/create/CreateSalesModal";
import {useEffect, useState} from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {CheckCircleIcon} from "@heroicons/react/24/solid";
import {formatCurrency} from "@/utils/formatters";
import {showErrorToast} from "@/utils/toastUtil";
import {getPaymentMethodsForSales} from "@/lib/sales/querySales";
import {ProgressLoader} from "@/components";

export default function SalesPaymentModal({completeSale, setShowPaymentModal, total, isCreatingSale}) {
    const [loading, setLoading] = useState(true);
    const [paymentMethods, setPaymentMethods] = useState([]);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [payments, setPayments] = useState([]);
    const [notes, setNotes] = useState('');

    const amountPaid = payments.reduce((sum, p) => sum + parseFloat(p.amount), 0);
    const balance = total - amountPaid;

    // Add payment
    const addPayment = () => {
        if (selectedPaymentMethod && paymentAmount && parseFloat(paymentAmount) > 0) {
            const amount = parseFloat(paymentAmount);
            if (amount > balance) {
                showErrorToast('Payment amount cannot exceed balance');
                return;
            }
            setPayments([...payments, {
                id: Date.now(),
                method: selectedPaymentMethod,
                amount: amount,
                reference: ''
            }]);
            setPaymentAmount('');
            setSelectedPaymentMethod(null);
        }
    };

    // Remove payment
    const removePayment = (paymentId) => {
        setPayments(payments.filter(p => p.id !== paymentId));
    };

    // Quick pay full amount
    const quickPay = (method) => {
        setPayments([{
            id: Date.now(),
            method: method,
            amount: total,
            reference: ''
        }]);
    };

    // Complete sale
    const handleCompleteSale = () => {
        let saleData = {
            notes,
            type: 'sale',
            amount_paid: amountPaid,
            payments
        }

        if (balance <= 0.01) {
            saleData = {
                ...saleData,
                status: 'completed',
                payment_status: 'paid'
            }
        } else {
            saleData = {
                ...saleData,
                status: 'confirmed',
                payment_status: 'partial'
            }
        }

        completeSale(saleData);
        handleReset();
    };

    const handleReset = () => {
        setPayments([]);
        setNotes('');
        setSelectedPaymentMethod(null);
        setPaymentAmount('');
    }

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setLoading(true);

            try {
                return await getPaymentMethodsForSales();
            } catch (error) {
                console.error('Error fetching payment methods:', error);
                showErrorToast('Error fetching payment methods');
            } finally {
                setLoading(false);
            }
        }

        fetchPaymentMethods()
            .then(response => setPaymentMethods(response));
    }, []);

    return (
        <CreateSalesModal onClose={() => setShowPaymentModal(false)} title={`Payment`} size={`large`}>
            <div className={`space-y-6`}>
                {/* Summary */}
                <div className={`bg-gray-700 rounded-lg p-4`}>
                    <div className={`flex justify-between text-lg mb-2`}>
                        <p className={`text-gray-400`}>Total Amount</p>
                        <p className={`font-bold text-teal-400`}>{formatCurrency(total)}</p>
                    </div>
                    <div className={`flex justify-between text-sm mb-1`}>
                        <p className={`text-gray-400`}>Amount Paid</p>
                        <p>{formatCurrency(amountPaid)}</p>
                    </div>
                    <div className={`flex justify-between text-xl font-bold pt-2 border-t border-gray-600`}>
                        <p>Balance</p>
                        <p className={balance > 0 ? 'text-yellow-400' : 'text-green-400'}>
                            {formatCurrency(Math.max(0, balance))}
                        </p>
                    </div>
                </div>

                {/* Quick Pay Buttons */}
                {payments.length === 0 && (
                    <div>
                        <p className={`text-sm text-gray-400 mb-3`}>Quick Pay Full Amount</p>
                        {loading ? (<PaymentCardsSkeleton/>) : (
                            <div className={`grid grid-cols-3 gap-3`}>
                                {paymentMethods.map(method => (
                                    <button
                                        key={method.id}
                                        onClick={() => quickPay(method)}
                                        className={`p-4 bg-gray-700 hover:bg-gray-600 rounded-lg flex flex-col items-center gap-2 transition`}
                                    >
                                        <span className={`text-sm font-semibold`}>{method.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Add Payment */}
                {balance > 0.01 && (
                    <div>
                        <p className={`text-sm text-gray-400 mb-3`}>Add Payment</p>
                        {loading ? (<PaymentCardsSkeleton/>) : (
                            <div className={`grid grid-cols-3 gap-3 mb-4`}>
                                {paymentMethods.map(method => (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedPaymentMethod(method)}
                                        className={`p-4 rounded-lg flex flex-col items-center gap-2 transition ${
                                            selectedPaymentMethod?.id === method.id ? 'bg-teal-600' : 'bg-gray-700 hover:bg-gray-600'
                                        }`}
                                    >
                                        <span className={`text-sm font-semibold`}>{method.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {selectedPaymentMethod && (
                            <div className={`flex gap-3`}>
                                <input
                                    type={`number`}
                                    value={paymentAmount}
                                    onChange={(e) => setPaymentAmount(e.target.value)}
                                    placeholder={`Enter amount`}
                                    className={`flex-1 bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg`}
                                />
                                <button
                                    onClick={addPayment}
                                    className={`bg-teal-600 hover:bg-teal-500 px-6 rounded-lg font-semibold transition`}
                                >
                                    Add
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Payments List */}
                {payments.length > 0 && (
                    <div>
                        <p className={`text-sm text-gray-400 mb-3`}>Payments Added</p>
                        <div className={`space-y-2`}>
                            {payments.map(payment => (
                                <div
                                    key={payment.id}
                                    className={`flex items-center justify-between bg-gray-700 rounded-lg p-4`}
                                >
                                    <div className={`flex items-center gap-3`}>
                                        <div>
                                            <p className={`font-semibold`}>{payment.method.name}</p>
                                            <p className={`text-sm text-gray-400`}>
                                                {formatCurrency(payment.amount)}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removePayment(payment.id)}
                                        className={`text-red-400 hover:text-red-300 p-2`}
                                    >
                                        <TrashIcon className={`size-5`}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Complete Button */}
                <button
                    onClick={handleCompleteSale}
                    disabled={!isCreatingSale && (amountPaid < 0.01)}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition flex items-center justify-center gap-2 disabled:bg-gray-600 disabled:cursor-not-allowed bg-green-600 hover:bg-green-500`}
                >
                    {isCreatingSale ? (
                        <>
                            <ProgressLoader />
                            <span>Creating Sale...</span>
                        </>
                    ) : (
                        <>
                            <CheckCircleIcon className={`size-6`}/>
                            <span>Complete Sale</span>
                        </>
                    )}
                </button>
            </div>
        </CreateSalesModal>
    )
}

function PaymentCardsSkeleton() {
    return (
        <div className={`grid grid-cols-3 gap-3`}>
            {[1, 2, 3].map((i) => (
                <div key={i} className={`bg-gray-700 rounded-lg shadow py-6 animate-pulse`}/>
            ))}
        </div>
    )
}