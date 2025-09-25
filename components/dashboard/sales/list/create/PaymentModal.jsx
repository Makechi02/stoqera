'use client'

import {BanknotesIcon, CheckIcon, CreditCardIcon, DevicePhoneMobileIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {useState} from "react";
import {formatCurrency} from "@/utils/formatters";

export default function PaymentModal({setShowPaymentModal, calculateTotal}) {
    const [amountReceived, setAmountReceived] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const paymentMethods = [
        {id: 'cash', name: 'Cash', icon: BanknotesIcon},
        {id: 'card', name: 'Credit/Debit Card', icon: CreditCardIcon},
        {id: 'mobile', name: 'Mobile Payment', icon: DevicePhoneMobileIcon},
        {id: 'bank', name: 'Bank Transfer', icon: CreditCardIcon}
    ];

    const calculateChange = () => {
        const total = calculateTotal();
        const received = parseFloat(amountReceived) || 0;
        return Math.max(0, received - total);
    };

    const handleCompleteSale = () => {
        // Here you would save to Supabase
        // console.log('Sale completed:', {
        //     customer,
        //     customerType,
        //     items: saleItems,
        //     subtotal: calculateSubtotal(),
        //     discount: calculateDiscount(),
        //     tax: calculateTax(),
        //     total: calculateTotal(),
        //     paymentMethod,
        //     notes,
        //     amountReceived: parseFloat(amountReceived)
        // });

        // Reset form or redirect
        alert('Sale completed successfully!');
    };

    return (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50`}>
            <div className={`bg-slate-800 rounded-xl border border-slate-700 max-w-lg w-full mx-4`}>
                <div className={`p-6 border-b border-slate-700`}>
                    <div className={`flex items-center justify-between`}>
                        <h3 className={`text-lg font-semibold`}>Complete Payment</h3>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className={`p-2 hover:bg-slate-700 rounded-lg transition-colors`}
                        >
                            <XMarkIcon className={`size-5`}/>
                        </button>
                    </div>
                </div>

                <div className={`p-6 space-y-6`}>
                    {/* Total Summary */}
                    <div className={`bg-slate-700 rounded-lg p-4`}>
                        <div className={`text-center`}>
                            <p className={`text-slate-400`}>Total Amount</p>
                            <p className={`text-3xl font-bold text-teal-400`}>{formatCurrency(calculateTotal())}</p>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                        <label className={`block text-sm font-medium text-slate-300 mb-3`}>Payment Method</label>
                        <div className={`grid grid-cols-2 gap-3`}>
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setPaymentMethod(method.id)}
                                    className={`p-3 rounded-lg border-2 transition-colors flex items-center space-x-2 ${
                                        paymentMethod === method.id
                                            ? 'border-teal-500 bg-teal-500/10 text-teal-400'
                                            : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500'
                                    }`}
                                >
                                    <method.icon className={`size-5`}/>
                                    <span className={`text-sm font-medium`}>{method.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount Received */}
                    {paymentMethod === 'cash' && (
                        <div>
                            <label className={`dashboard-form-label mb-2`}>Amount Received</label>
                            <input
                                type={`number`}
                                value={amountReceived}
                                onChange={(e) => setAmountReceived(e.target.value)}
                                placeholder={calculateTotal().toFixed(2)}
                                className={`dashboard-form-input border-slate-600`}
                            />
                            {amountReceived && parseFloat(amountReceived) >= calculateTotal() && (
                                <p className={`mt-2 text-sm text-emerald-400`}>
                                    Change: {formatCurrency(calculateChange())}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className={`flex space-x-3`}>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className={`flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCompleteSale}
                            disabled={paymentMethod === 'cash' && (!amountReceived || parseFloat(amountReceived) < calculateTotal())}
                            className={`flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center space-x-2`}
                        >
                            <CheckIcon className={`size-5`}/>
                            <span>Complete Sale</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}