'use client'

import CreateSalesModal from "@/components/dashboard/sales/list/create/CreateSalesModal";
import {formatCurrency} from "@/utils/formatters";
import {useState} from "react";

export default function SalesDiscountModal({setShowDiscountModal, discount, setDiscount, subtotal}) {
    const [discountType, setDiscountType] = useState(discount.type || 'percentage');
    const [discountValue, setDiscountValue] = useState(discount.value || 0);

    const currentDiscount = discountType === 'percentage' ? (subtotal * discountValue / 100) : discountValue;
    const currentTotal = subtotal - currentDiscount;

    const handleApplyDiscount = () => {
        const newDiscount = {
            ...discount,
            type: discountType,
            value: Number(discountValue) || 0,
        }

        setDiscount(newDiscount);

        setShowDiscountModal(false);
    }

    return (
        <CreateSalesModal onClose={() => setShowDiscountModal(false)} title={`Add Discount`}>
            <div className={`space-y-4`}>
                <div className={`grid grid-cols-2 gap-3`}>
                    <button
                        onClick={() => setDiscountType('percentage')}
                        className={`py-3 rounded-lg font-semibold ${discountType === 'percentage' ? 'bg-teal-600' : 'bg-gray-700'}`}
                    >
                        Percentage (%)
                    </button>
                    <button
                        onClick={() => setDiscountType('amount')}
                        className={`py-3 rounded-lg font-semibold ${discountType === 'amount' ? 'bg-teal-600' : 'bg-gray-700'}`}
                    >
                        Amount (KES)
                    </button>
                </div>

                <div>
                    <label className={`block text-sm text-gray-400 mb-2`}>
                        {discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                    </label>
                    <input
                        type={`number`}
                        value={discountValue}
                        onChange={(event) => setDiscountValue(event.target.value)}
                        placeholder={`0`}
                        className={`w-full bg-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg`}
                    />
                </div>

                <div className={`bg-gray-700 rounded-lg p-3`}>
                    <div className={`flex justify-between text-sm mb-1`}>
                        <p className={`text-gray-400`}>Subtotal</p>
                        <p>{formatCurrency(subtotal)}</p>
                    </div>
                    <div className={`flex justify-between text-sm mb-1`}>
                        <p className={`text-gray-400`}>Discount</p>
                        <p className={`text-teal-400`}>- {formatCurrency(currentDiscount)}</p>
                    </div>
                    <div className={`flex justify-between font-bold text-lg pt-2 border-t border-gray-600`}>
                        <p>Total</p>
                        <span className={`text-teal-400`}>{formatCurrency(currentTotal)}</span>
                    </div>
                </div>

                <button
                    onClick={handleApplyDiscount}
                    className={`w-full bg-teal-600 hover:bg-teal-500 py-3 rounded-lg font-semibold transition`}
                >
                    Apply Discount
                </button>
            </div>
        </CreateSalesModal>
    )
}