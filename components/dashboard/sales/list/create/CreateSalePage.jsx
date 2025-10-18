'use client'

import {useState} from 'react';
import {
    MinusIcon,
    PlusIcon,
    ReceiptPercentIcon,
    ShoppingCartIcon,
    TrashIcon,
    UserIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {BackBtn} from "@/components/ui/buttons";
import CustomerSelectionModal from "@/components/dashboard/sales/list/create/CustomerSelectionModal";
import {getCustomerDisplayName} from "@/utils/customerUtils";
import SalesProductsGrid from "@/components/dashboard/sales/list/create/SalesProductsGrid";
import {formatCurrency} from "@/utils/formatters";
import SalesDiscountModal from "@/components/dashboard/sales/list/create/SalesDiscountModal";
import SalesPaymentModal from "@/components/dashboard/sales/list/create/SalesPaymentModal";
import {createSale} from "@/lib/sales/querySales";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";

export default function CreateSalePage({products, saleNumber, currentLocation}) {
    // Sale state
    const [isCreatingSale, setIsCreatingSale] = useState(false);
    const [saleItems, setSaleItems] = useState([]);
    const [customerType, setCustomerType] = useState('walk_in');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [discount, setDiscount] = useState({type: 'percentage', value: 0});

    // UI state
    const [showCart, setShowCart] = useState(false);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showDiscountModal, setShowDiscountModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Calculations
    const subtotal = saleItems.reduce((sum, item) => sum + (item.selling_price * item.quantity), 0);
    const discountAmount = discount.type === 'percentage' ? (subtotal * discount.value / 100) : discount.value;
    const total = subtotal - discountAmount;

    // Add product to the cart
    const addToCart = (product) => {
        const existingItem = saleItems.find(item => item.id === product.id);
        if (existingItem) {
            setSaleItems(saleItems.map(item =>
                item.id === product.id ? {...item, quantity: item.quantity + 1} : item
            ));
        } else {
            setSaleItems([...saleItems, {...product, quantity: 1}]);
        }
        setShowCart(true);
    };

    // Update quantity
    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            setSaleItems(saleItems.filter(item => item.id !== itemId));
        } else {
            setSaleItems(saleItems.map(item =>
                item.id === itemId ? {...item, quantity: newQuantity} : item
            ));
        }
    };

    // Remove item
    const removeItem = (itemId) => {
        setSaleItems(saleItems.filter(item => item.id !== itemId));
    };

    const completeSale = async (saleData) => {
        const submitData = {
            sale_number: saleNumber,
            customer_id: selectedCustomer?.id || null,
            customer_type: customerType,
            status: saleData.status || 'draft',
            type: saleData.type || 'sale',
            sales_channel_id: saleData.sales_channel_id,
            subtotal: subtotal,
            discount_amount: discount.type === 'amount' ? discount.value : 0,
            discount_percentage: discount.type === 'percentage' ? discount.value : 0,
            tax_amount: saleData.tax_amount || 0,
            tax_percentage: saleData.tax_percentage || 0,
            total_amount: total,
            payment_status: saleData.payment_status || 'paid',
            amount_paid: saleData.amount_paid,
            notes: saleData.notes,
            internal_notes: saleData.internal_notes,
            items: saleItems,
            payments: saleData.payments
        }

        console.log(submitData);

        setIsCreatingSale(true);

        try {
            const createdSale = await createSale(submitData);
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
        setShowCart(false);
    }

    return (
        <div>
            {/* Header */}
            <div className={`border-b border-gray-700 py-4`}>
                <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center`}>
                        <BackBtn/>
                        <div className={`flex items-center gap-3`}>
                            <ShoppingCartIcon className={`size-6 md:size-8 text-teal-400`}/>
                            <div>
                                <h1 className={`text-2xl md:text-3xl font-bold font-heading`}>New Sale</h1>
                                <p className={`text-xs md:text-sm text-gray-400`}>Sale #{saleNumber}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`flex items-center gap-3`}>
                        <div className={`hidden md:block text-right`}>
                            <p className={`text-sm text-gray-400`}>{currentLocation.name}</p>
                        </div>
                        <button
                            onClick={() => setShowCart(!showCart)}
                            className={`lg:hidden relative p-2 bg-teal-600 rounded-lg`}
                        >
                            <ShoppingCartIcon className={`size-6`}/>
                            {saleItems.length > 0 && (
                                <span
                                    className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center`}
                                >
                                    {saleItems.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className={`flex h-[calc(100vh-88px)]`}>
                {/* Left side - Products */}
                <div className={`flex-1 p-4 md:p-6 overflow-y-auto`}>
                    {/* Customer Selection Button */}
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

                    <SalesProductsGrid products={products} addToCart={addToCart}/>
                </div>

                {/* Right side - Cart (Desktop) */}
                <div className={`hidden lg:flex w-96 bg-gray-800 border-l border-gray-700 flex-col`}>
                    <CartContent
                        saleItems={saleItems}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                        subtotal={subtotal}
                        discountAmount={discountAmount}
                        total={total}
                        onDiscountClick={() => setShowDiscountModal(true)}
                        onPaymentClick={() => setShowPaymentModal(true)}
                    />
                </div>
            </div>

            {/* Mobile Cart Drawer */}
            {showCart && (
                <div
                    className={`lg:hidden fixed inset-0 z-50 bg-black/50`}
                    onClick={() => setShowCart(false)}
                >
                    <div
                        className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-gray-800 shadow-xl flex flex-col`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`p-4 border-b border-gray-700 flex items-center justify-between`}>
                            <h2 className={`font-bold text-lg`}>Cart ({saleItems.length})</h2>
                            <button onClick={() => setShowCart(false)} className={`p-2`}>
                                <XMarkIcon className={`size-6`}/>
                            </button>
                        </div>

                        <CartContent
                            saleItems={saleItems}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                            subtotal={subtotal}
                            discountAmount={discountAmount}
                            total={total}
                            onDiscountClick={() => setShowDiscountModal(true)}
                            onPaymentClick={() => setShowPaymentModal(true)}
                        />
                    </div>
                </div>
            )}

            {showCustomerModal && (
                <CustomerSelectionModal
                    customerType={customerType}
                    setCustomerType={setCustomerType}
                    setSelectedCustomer={setSelectedCustomer}
                    setShowCustomerModal={setShowCustomerModal}
                />
            )}

            {/* Discount Modal */}
            {showDiscountModal && (
                <SalesDiscountModal
                    setShowDiscountModal={setShowDiscountModal}
                    discount={discount}
                    setDiscount={setDiscount}
                    subtotal={subtotal}
                />
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
                <SalesPaymentModal
                    completeSale={completeSale}
                    setShowPaymentModal={setShowPaymentModal}
                    total={total}
                    isCreatingSale={isCreatingSale}
                />
            )}
        </div>
    );
}

// Cart Content Component
function CartContent({
                         saleItems,
                         updateQuantity,
                         removeItem,
                         subtotal,
                         discountAmount,
                         total,
                         onDiscountClick,
                         onPaymentClick
                     }) {
    return (
        <>
            <div className={`flex-1 overflow-y-auto p-4 md:p-6`}>
                <h2 className={`font-bold text-lg mb-4 lg:block hidden`}>Cart ({saleItems.length})</h2>

                {saleItems.length === 0 ? (
                    <div className={`text-center py-12 text-gray-400`}>
                        <ShoppingCartIcon className={`size-16 mx-auto mb-4 text-gray-600`}/>
                        <p>No items in cart</p>
                        <p className={`text-sm mt-2`}>Add products to start a sale</p>
                    </div>
                ) : (
                    <div className={`space-y-3`}>
                        {saleItems.map(item => (
                            <div key={item.id} className={`bg-gray-700 rounded-lg p-3`}>
                                <div className={`flex justify-between items-start mb-3`}>
                                    <h3 className={`font-semibold flex-1 text-sm md:text-base`}>{item.name}</h3>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className={`text-red-400 hover:text-red-300 p-1`}
                                    >
                                        <TrashIcon className={`size-4`}/>
                                    </button>
                                </div>
                                <div className={`flex items-center justify-between`}>
                                    <div className={`flex items-center gap-2`}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className={`size-8 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500`}
                                        >
                                            <MinusIcon className={`size-4`}/>
                                        </button>
                                        <span className={`w-10 text-center font-semibold`}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className={`size-8 bg-teal-600 rounded flex items-center justify-center hover:bg-teal-500`}
                                        >
                                            <PlusIcon className={`size-4`}/>
                                        </button>
                                    </div>
                                    <div className={`text-right`}>
                                        <p className={`text-xs text-gray-400`}>
                                            @ {formatCurrency(item.selling_price)}
                                        </p>
                                        <p className={`font-bold text-teal-400`}>
                                            {formatCurrency(item.selling_price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {saleItems.length > 0 && (
                <div className={`border-t border-gray-700 p-4 md:p-6 space-y-4`}>
                    {/* Discount Button */}
                    <button
                        onClick={onDiscountClick}
                        className={`w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex items-center justify-between transition`}
                    >
                        <div className={`flex items-center gap-2`}>
                            <ReceiptPercentIcon className={`size-5 text-teal-400`}/>
                            <span className={`font-semibold`}>Discount</span>
                        </div>
                        <p className={`text-teal-400`}>
                            {discountAmount > 0 ? `${formatCurrency(discountAmount)}` : 'Add'}
                        </p>
                    </button>

                    {/* Summary */}
                    <div className={`space-y-2`}>
                        <div className={`flex justify-between text-sm`}>
                            <p className={`text-gray-400`}>Subtotal</p>
                            <p>{formatCurrency(subtotal)}</p>
                        </div>
                        {discountAmount > 0 && (
                            <div className={`flex justify-between text-sm text-teal-400`}>
                                <p>Discount</p>
                                <p>- {formatCurrency(discountAmount)}</p>
                            </div>
                        )}
                        <div className={`flex justify-between text-xl font-bold pt-2 border-t border-gray-700`}>
                            <p>Total</p>
                            <p className={`text-teal-400`}>{formatCurrency(total)}</p>
                        </div>
                    </div>

                    <button
                        onClick={onPaymentClick}
                        className={`w-full bg-teal-600 hover:bg-teal-500 py-4 rounded-lg font-bold text-lg transition`}
                    >
                        Proceed to Payment
                    </button>
                </div>
            )}
        </>
    );
}
