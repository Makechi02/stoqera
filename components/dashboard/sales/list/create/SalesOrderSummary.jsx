'use client'

import {useState} from "react";
import {CalculatorIcon} from "@heroicons/react/24/outline";
import {formatCurrency} from "@/utils/formatters";

export default function SalesOrderSummary({
                                              calculateSubtotal,
                                              calculateDiscount,
                                              calculateTax,
                                              calculateTotal,
                                              discountType,
                                              setDiscountType,
                                              discountValue,
                                              setDiscountValue,
                                              taxPercentage,
                                              setTaxPercentage,
                                          }) {

    const [notes, setNotes] = useState('');

    return (
        <div className={`bg-slate-800 rounded-xl border border-slate-700 p-6`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center space-x-2`}>
                <CalculatorIcon className={`size-5 text-teal-500`}/>
                <span>Order Summary</span>
            </h2>

            <div className={`space-y-4`}>
                <div className={`flex justify-between text-slate-300`}>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(calculateSubtotal())}</span>
                </div>

                {/* Discount */}
                <div className={`space-y-2`}>
                    <div className={`flex items-center space-x-2`}>
                        <select
                            value={discountType}
                            onChange={(e) => setDiscountType(e.target.value)}
                            className={`dashboard-form-input text-xs border-slate-600`}
                        >
                            <option value={`amount`}>$ Discount</option>
                            <option value={`percentage`}>% Discount</option>
                        </select>
                        <input
                            type={`number`}
                            value={discountValue}
                            onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                            className={`dashboard-form-input border-slate-600 text-sm`}
                            placeholder={`0`}
                        />
                    </div>
                    <div className={`flex justify-between text-slate-300`}>
                        <span>Discount:</span>
                        <span>-{formatCurrency(calculateDiscount())}</span>
                    </div>
                </div>

                {/* Tax */}
                <div className={`space-y-2`}>
                    <div className={`flex items-center space-x-2`}>
                        <span className={`text-sm text-slate-400`}>Tax %:</span>
                        <input
                            type={`number`}
                            value={taxPercentage}
                            onChange={(e) => setTaxPercentage(parseFloat(e.target.value) || 0)}
                            className={`w-16 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm`}
                            placeholder={`0`}
                        />
                    </div>
                    <div className={`flex justify-between text-slate-300`}>
                        <span>Tax:</span>
                        <span>{formatCurrency(calculateTax())}</span>
                    </div>
                </div>

                <hr className={`border-slate-700`}/>

                <div className={`flex justify-between text-xl font-bold`}>
                    <span>Total:</span>
                    <span className={`text-teal-400`}>{formatCurrency(calculateTotal())}</span>
                </div>
            </div>

            {/* Notes */}
            <div className={`mt-4`}>
                <label className={`dashboard-form-label mb-2`}>Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={`Add notes for this sale...`}
                    className={`dashboard-form-input border-slate-600 resize-none`}
                    rows={3}
                />
            </div>
        </div>
    )
}