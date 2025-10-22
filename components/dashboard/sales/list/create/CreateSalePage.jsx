'use client'

import {useState} from 'react';
import {BanknotesIcon, CalculatorIcon, CheckIcon, PlusIcon, UserIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {getCustomerDisplayName} from "@/utils/customerUtils";
import CustomerSelectionModal from "@/components/dashboard/sales/list/create/CustomerSelectionModal";
import SalesProductsList from "@/components/dashboard/sales/list/create/SalesProductsList";
import SaleItemsCart from "@/components/dashboard/sales/list/create/SaleItemsCart";
import SalesDiscountModal from "@/components/dashboard/sales/list/create/SalesDiscountModal";
import {formatCurrency} from "@/utils/formatters";
import {ReceiptPercentIcon} from "@heroicons/react/16/solid";
import SalesPaymentModal from "@/components/dashboard/sales/list/create/SalesPaymentModal";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {createSale} from "@/lib/sales/querySales";
import {ProgressLoader} from "@/components";
import {useRouter} from "next/navigation";

export default function CreateSalePage({generatedSaleNumber, products}) {
    const router = useRouter();

    const [saleItems, setSaleItems] = useState([]);
    const [isCreatingSale, setIsCreatingSale] = useState(false);

    const [showProductSearch, setShowProductSearch] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showDiscountModal, setShowDiscountModal] = useState(false);

    const [discount, setDiscount] = useState({type: 'percentage', value: 0});
    const [customerType, setCustomerType] = useState('walk_in');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Sale details
    const [saleNumber, setSaleNumber] = useState(generatedSaleNumber);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [notes, setNotes] = useState('');

    // Payment tracking
    const [payments, setPayments] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [currentPayment, setCurrentPayment] = useState({
        method: null,
        amount: 0,
        reference: ''
    });

    // Add a product to sale
    const addProductToSale = (product) => {
        const existingItem = saleItems.find(item => item.product_id === product.id);

        if (existingItem) {
            setSaleItems(saleItems.map(item =>
                item.product_id === product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            ));
        } else {
            setSaleItems([...saleItems, {
                product_id: product.id,
                name: product.name,
                sku: product.sku,
                quantity: 1,
                unit_price: product.selling_price,
                original_price: product.selling_price,
                cost_price: product.cost_price,
                stock: product.stock
            }]);
        }
    };

    // Calculate totals
    const calculateTotals = () => {
        const subtotal = saleItems.reduce((sum, item) =>
            sum + (item.quantity * item.unit_price), 0
        );

        let discountAmount;
        if (discount.type === 'percentage') {
            discountAmount = (subtotal * discount.value) / 100;
        } else {
            discountAmount = discount.value;
        }

        const afterDiscount = subtotal - discountAmount;
        const taxAmount = (afterDiscount * taxPercentage) / 100;
        const total = afterDiscount + taxAmount;

        const totalCost = saleItems.reduce((sum, item) =>
            sum + (item.quantity * item.cost_price), 0
        );
        const profit = total - totalCost;

        const amountPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
        const amountDue = total - amountPaid;

        return {subtotal, discountAmount, taxAmount, total, totalCost, profit, amountPaid, amountDue};
    };

    const totals = calculateTotals();

    const handleAddPayment = (payment) => {
        setPayments([...payments, payment]);
        handleClosePaymentModal();
    }

    const handleClosePaymentModal = () => {
        setCurrentPayment({
            method: null,
            amount: 0,
            reference: ''
        });

        setShowPaymentModal(false);
    }

    // Remove payment
    const removePayment = (paymentId) => {
        setPayments(payments.filter(p => p.id !== paymentId));
    };

    // Quick pay the remaining amount
    const payRemainingAmount = () => {
        setCurrentPayment({
            ...currentPayment,
            amount: totals.amountDue
        });
        setShowPaymentModal(true);
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (totals.amountDue > 0) {
            const confirm = window.confirm(
                `There is an outstanding balance of ${formatCurrency(totals.amountDue)}. Do you want to continue?`
            );
            if (!confirm) return;
        }

        const paymentStatus = totals.amountDue === 0 ? 'paid' :
            totals.amountPaid > 0 ? 'partial' : 'pending';

        const saleData = {
            sale_number: saleNumber,
            status: paymentStatus === 'paid' ? 'completed' : 'confirmed',
            customer_id: selectedCustomer?.id,
            customer_type: customerType,
            subtotal: totals.subtotal,
            discount_amount: totals.discountAmount,
            tax_amount: totals.taxAmount,
            total_amount: totals.total,
            payment_status: paymentStatus,
            amount_paid: totals.amountPaid,
            notes: notes,
            items: saleItems,
            payments: payments
        };

        setIsCreatingSale(true);

        try {
            const createdSale = await createSale(saleData);
            if (createdSale) {
                showSuccessToast('Sale created successfully.');
                handleReset();
            }
        } catch (error) {
            console.error('Error creating sale:', error);
            showErrorToast('Error creating sale. Please try again later.');
        } finally {
            setIsCreatingSale(false);
        }
    };

    const handleReset = () => {
        setSaleItems([]);
        setDiscount({type: 'percentage', value: 0});
        setShowPaymentModal(false);
        setCustomerType('walk_in');
        setSelectedCustomer(null);
    };

    const handleCancel = () => {
        handleReset();

        router.back();
    }

    return (
        <div>
            <div className={`max-w-7xl mx-auto py-6`}>
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6`}>
                    {/* Main Sale Area */}
                    <div className={`lg:col-span-2 space-y-6`}>
                        <button
                            onClick={() => setShowCustomerModal(true)}
                            className={`w-full bg-gray-800 rounded-lg p-4 mb-6 text-left hover:bg-gray-750 transition`}
                        >
                            <div className={`flex items-center justify-between`}>
                                <div className={`flex items-center gap-3`}>
                                    <UserIcon className={`size-5 text-teal-400`}/>
                                    <div>
                                        <p className={`text-sm text-gray-400`}>Customer</p>
                                        <p className={`font-semibold`}>
                                            {customerType === 'walk_in' ? 'Walk-in Customer' : getCustomerDisplayName(selectedCustomer) || 'Select Customer'}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-teal-400`}>Change</span>
                            </div>
                        </button>

                        {/* Sale Number & Customer */}
                        <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
                            {/* Sale Number */}
                            <div>
                                <label className={`dashboard-form-label mb-2`}>Sale Number</label>
                                <input
                                    type={`text`}
                                    value={saleNumber}
                                    onChange={(e) => setSaleNumber(e.target.value)}
                                    className={`dashboard-form-input border-gray-600`}
                                    placeholder={`INV-2025-001`}
                                />
                            </div>
                        </div>

                        <SalesProductsList products={products} addToCart={addProductToSale}/>
                        <SaleItemsCart saleItems={saleItems} setSaleItems={setSaleItems}/>
                    </div>

                    {/* Summary Panel - Sticky */}
                    <div className={`lg:col-span-1`}>
                        <div className={`bg-gray-800 rounded-xl border border-gray-700 lg:sticky lg:top-6`}>
                            <div className={`p-4 border-b border-gray-700 flex items-center gap-2`}>
                                <CalculatorIcon className={`size-5 text-teal-400`}/>
                                <h2 className={`text-lg font-semibold`}>Summary</h2>
                            </div>

                            <div className={`p-4 space-y-4`}>
                                <button
                                    onClick={() => setShowDiscountModal(true)}
                                    className={`w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex items-center justify-between transition`}
                                >
                                    <div className={`flex items-center gap-2`}>
                                        <ReceiptPercentIcon className={`size-5 text-teal-400`}/>
                                        <span className={`font-semibold`}>Discount</span>
                                    </div>
                                    <p className={`text-teal-400`}>
                                        {totals.discountAmount > 0 ? `${formatCurrency(totals.discountAmount)}` : 'Add'}
                                    </p>
                                </button>

                                {/* Tax */}
                                <div>
                                    <label className={`dashboard-form-label mb-2`}>Tax (%)</label>
                                    <input
                                        type={`number`}
                                        min={0}
                                        step={0.01}
                                        value={taxPercentage}
                                        onChange={(e) => setTaxPercentage(parseFloat(e.target.value) || 0)}
                                        className={`dashboard-form-input border-gray-600`}
                                        placeholder={`0.00`}
                                    />
                                </div>

                                {/* Divider */}
                                <div className={`border-t border-gray-700 pt-4 space-y-3`}>
                                    <div className={`flex justify-between text-sm`}>
                                        <p className={`text-gray-400`}>Subtotal</p>
                                        <p className={`text-gray-100`}>{formatCurrency(totals.subtotal)}</p>
                                    </div>

                                    {totals.discountAmount > 0 && (
                                        <div className={`flex justify-between text-sm`}>
                                            <p className={`text-gray-400`}>Discount</p>
                                            <p className={`text-red-400`}>-{formatCurrency(totals.discountAmount)}</p>
                                        </div>
                                    )}

                                    {totals.taxAmount > 0 && (
                                        <div className={`flex justify-between text-sm`}>
                                            <p className={`text-gray-400`}>Tax ({taxPercentage}%)</p>
                                            <p className={`text-gray-100`}>{formatCurrency(totals.taxAmount)}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Total */}
                                <div className={`border-t border-gray-700 pt-4`}>
                                    <div className={`flex justify-between items-center`}>
                                        <p className={`text-lg font-semibold`}>Total</p>
                                        <p className={`text-2xl font-bold text-teal-400`}>
                                            {formatCurrency(totals.total)}
                                        </p>
                                    </div>
                                </div>

                                {/* Payments Section */}
                                <div className={`border-t border-gray-700 pt-4`}>
                                    <div className={`flex items-center justify-between mb-3`}>
                                        <h3 className={`text-sm font-medium text-gray-300 flex items-center gap-2`}>
                                            <BanknotesIcon className={`size-4`}/>
                                            Payments
                                        </h3>
                                        <button
                                            onClick={() => setShowPaymentModal(true)}
                                            disabled={saleItems.length === 0 || totals.amountDue <= 0}
                                            className={`text-sm px-3 py-1 bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1`}
                                        >
                                            <PlusIcon className={`size-4`}/>
                                            Add Payment
                                        </button>
                                    </div>

                                    {/* Payment List */}
                                    {payments.length > 0 && (
                                        <div className={`space-y-2 mb-3`}>
                                            {payments.map(payment => (
                                                <div
                                                    key={payment.id}
                                                    className={`bg-gray-700 rounded-lg p-3 flex items-center justify-between`}
                                                >
                                                    <div className={`flex-1`}>
                                                        <p className={`text-sm font-medium text-gray-100`}>
                                                            {payment.method.name}
                                                        </p>
                                                        {payment.reference && (
                                                            <p className={`text-xs text-gray-400`}>
                                                                Ref: {payment.reference}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className={`flex items-center gap-2`}>
                                                        <p className={`text-sm font-semibold text-green-400`}>
                                                            {formatCurrency(payment.amount)}
                                                        </p>
                                                        <button
                                                            onClick={() => removePayment(payment.id)}
                                                            className={`p-1 text-gray-400 hover:text-red-400 transition-colors`}
                                                        >
                                                            <XMarkIcon className={`size-4`}/>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Payment Summary */}
                                    <div className={`bg-gray-750 rounded-lg p-3 space-y-2`}>
                                        <div className={`flex justify-between text-sm`}>
                                            <p className={`text-gray-400`}>Amount Paid</p>
                                            <p className={`text-green-400 font-semibold`}>
                                                {formatCurrency(totals.amountPaid)}
                                            </p>
                                        </div>
                                        <div className={`flex justify-between text-sm`}>
                                            <p className={`text-gray-400`}>Amount Due</p>
                                            <p
                                                className={`font-semibold ${totals.amountDue > 0 ? 'text-yellow-400' : 'text-gray-400'}`}
                                            >
                                                {formatCurrency(totals.amountDue)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quick Pay Remaining */}
                                    {totals.amountDue > 0 && (
                                        <button
                                            onClick={payRemainingAmount}
                                            className={`w-full mt-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 rounded-lg transition-colors text-sm font-medium`}
                                        >
                                            Pay Remaining {formatCurrency(totals.amountDue)}
                                        </button>
                                    )}
                                </div>

                                {/* Profit Summary */}
                                {saleItems.length > 0 && (
                                    <div className={`bg-gray-750 rounded-lg p-4 border border-gray-600`}>
                                        <p className={`text-sm text-gray-400 mb-2`}>Expected Profit</p>
                                        <p
                                            className={`text-xl font-bold ${totals.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}
                                        >
                                            {formatCurrency(totals.profit)}
                                        </p>
                                        <p className={`text-xs text-gray-400 mt-1`}>
                                            Cost: {formatCurrency(totals.totalCost)}
                                        </p>
                                    </div>
                                )}

                                {/* Notes */}
                                <div>
                                    <label className={`dashboard-form-label mb-2`}>Notes (Optional)</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={3}
                                        className={`dashboard-form-input border-gray-600 resize-none`}
                                        placeholder={`Add any notes about this sale...`}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className={`border-t border-gray-700 pt-4 space-y-3`}>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isCreatingSale || saleItems.length === 0}
                                        className={`dashboard-submit-btn justify-center w-full`}
                                    >
                                        {isCreatingSale ? (
                                            <>
                                                <ProgressLoader/>
                                                <span>Creating sale...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CheckIcon className={`size-5`}/>
                                                Complete Sale
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className={`dashboard-cancel-btn justify-center w-full`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showCustomerModal && (
                <CustomerSelectionModal
                    customerType={customerType}
                    setCustomerType={setCustomerType}
                    setSelectedCustomer={setSelectedCustomer}
                    setShowCustomerModal={setShowCustomerModal}
                />
            )}

            {showDiscountModal && (
                <SalesDiscountModal
                    setShowDiscountModal={setShowDiscountModal}
                    discount={discount}
                    setDiscount={setDiscount}
                    subtotal={totals.subtotal}
                />
            )}

            {/* Payment Modal */}
            <SalesPaymentModal
                isOpen={showPaymentModal}
                onClose={handleClosePaymentModal}
                onAddPayment={handleAddPayment}
                maxAmount={totals.amountDue}
                currentPayment={currentPayment}
                setCurrentPayment={setCurrentPayment}
            />

            {/* Click outside to close search */}
            {showProductSearch && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setShowProductSearch(false)}
                />
            )}
        </div>
    );
}
