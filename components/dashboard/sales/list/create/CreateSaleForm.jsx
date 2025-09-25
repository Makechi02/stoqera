'use client'

import {useState} from 'react';
import {CheckIcon} from '@heroicons/react/24/outline';
import {BackBtn} from "@/components/ui/buttons";
import ProductsSearchForm from "@/components/dashboard/sales/list/create/ProductsSearchForm";
import SalesCart from "@/components/dashboard/sales/list/create/SalesCart";
import PaymentModal from "@/components/dashboard/sales/list/create/PaymentModal";
import CustomerSelectionForm from "@/components/dashboard/sales/list/create/CustomerSelectionForm";
import SalesOrderSummary from "@/components/dashboard/sales/list/create/SalesOrderSummary";

export default function CreateSaleForm() {
    const [saleItems, setSaleItems] = useState([]);
    const [discountType, setDiscountType] = useState('amount');
    const [discountValue, setDiscountValue] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const calculateSubtotal = () => {
        return saleItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    };

    const calculateDiscount = () => {
        const subtotal = calculateSubtotal();
        if (discountType === 'percentage') {
            return (subtotal * discountValue) / 100;
        }
        return discountValue;
    };

    const calculateTax = () => {
        const subtotalAfterDiscount = calculateSubtotal() - calculateDiscount();
        return (subtotalAfterDiscount * taxPercentage) / 100;
    };

    const calculateTotal = () => {
        return calculateSubtotal() - calculateDiscount() + calculateTax();
    };

    return (
        <div>
            <div className={`border-b border-slate-700`}>
                <div className={`py-4`}>
                    <div className={`flex flex-wrap items-center justify-between gap-4`}>
                        <div className={`flex items-center`}>
                            <BackBtn/>
                            <div>
                                <h1 className={`text-3xl font-bold font-heading`}>New Sale</h1>
                                <p className={`text-slate-400`}>Create a new sales transaction</p>
                            </div>
                        </div>
                        <div className={`flex-1 flex items-center justify-end gap-2`}>
                            <button
                                className={`px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors`}
                            >
                                Save Draft
                            </button>
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                disabled={saleItems.length === 0}
                                className={`px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2`}
                            >
                                <CheckIcon className={`size-5`}/>
                                <span>Complete Sale</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 py-6`}>
                <div className={`lg:col-span-2 space-y-6`}>
                    <ProductsSearchForm saleItems={saleItems} setSaleItems={setSaleItems}/>
                    <SalesCart saleItems={saleItems} setSaleItems={setSaleItems}/>
                </div>

                <div className={`space-y-6`}>
                    <CustomerSelectionForm/>
                    <SalesOrderSummary
                        calculateSubtotal={calculateSubtotal}
                        calculateDiscount={calculateDiscount}
                        calculateTax={calculateTax}
                        calculateTotal={calculateTotal}
                        discountType={discountType}
                        setDiscountType={setDiscountType}
                        discountValue={discountValue}
                        setDiscountValue={setDiscountValue}
                        taxPercentage={taxPercentage}
                        setTaxPercentage={setTaxPercentage}
                    />
                </div>
            </div>

            {showPaymentModal && (
                <PaymentModal setShowPaymentModal={setShowPaymentModal} calculateTotal={calculateTotal}/>
            )}
        </div>
    );
};
