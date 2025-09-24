'use client'

import React, {useState} from 'react';
import {
    ArrowLeftIcon,
    BanknotesIcon,
    CalculatorIcon,
    CheckIcon,
    CreditCardIcon,
    DevicePhoneMobileIcon,
    MagnifyingGlassIcon,
    MinusIcon,
    PlusIcon,
    TrashIcon,
    UserPlusIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {ShoppingCartIcon, UserIcon} from '@heroicons/react/24/solid';

const AddSalePage = () => {
    const [saleItems, setSaleItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [customer, setCustomer] = useState(null);
    const [customerType, setCustomerType] = useState('walk_in');
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [showProductSearch, setShowProductSearch] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [discountType, setDiscountType] = useState('amount');
    const [discountValue, setDiscountValue] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(0);
    const [notes, setNotes] = useState('');
    const [amountReceived, setAmountReceived] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Mock data - replace with Supabase queries
    const mockProducts = [
        {
            id: '1',
            name: 'Wireless Headphones',
            sku: 'WH-001',
            price: 99.99,
            stock: 25,
            image: null,
            category: 'Electronics'
        },
        {
            id: '2',
            name: 'Coffee Mug',
            sku: 'MG-002',
            price: 12.50,
            stock: 50,
            image: null,
            category: 'Kitchen'
        },
        {
            id: '3',
            name: 'Notebook',
            sku: 'NB-003',
            price: 8.99,
            stock: 100,
            image: null,
            category: 'Stationery'
        },
        {
            id: '4',
            name: 'Bluetooth Speaker',
            sku: 'BS-004',
            price: 149.99,
            stock: 15,
            image: null,
            category: 'Electronics'
        }
    ];

    const mockCustomers = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1234567890',
            type: 'regular'
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1234567891',
            type: 'premium'
        }
    ];

    const paymentMethods = [
        {id: 'cash', name: 'Cash', icon: BanknotesIcon},
        {id: 'card', name: 'Credit/Debit Card', icon: CreditCardIcon},
        {id: 'mobile', name: 'Mobile Payment', icon: DevicePhoneMobileIcon},
        {id: 'bank', name: 'Bank Transfer', icon: CreditCardIcon}
    ];

    const addProductToSale = (product) => {
        const existingItem = saleItems.find(item => item.product_id === product.id);

        if (existingItem) {
            setSaleItems(items =>
                items.map(item =>
                    item.product_id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                )
            );
        } else {
            setSaleItems(items => [
                ...items,
                {
                    id: Date.now().toString(),
                    product_id: product.id,
                    name: product.name,
                    sku: product.sku,
                    unit_price: product.price,
                    quantity: 1,
                    discount_amount: 0,
                    tax_amount: 0
                }
            ]);
        }
        setShowProductSearch(false);
        setSearchQuery('');
    };

    const updateItemQuantity = (itemId, change) => {
        setSaleItems(items =>
            items.map(item => {
                if (item.id === itemId) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return {...item, quantity: newQuantity};
                }
                return item;
            })
        );
    };

    const removeItem = (itemId) => {
        setSaleItems(items => items.filter(item => item.id !== itemId));
    };

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

    const calculateChange = () => {
        const total = calculateTotal();
        const received = parseFloat(amountReceived) || 0;
        return Math.max(0, received - total);
    };

    const filteredProducts = mockProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCompleteSale = () => {
        // Here you would save to Supabase
        console.log('Sale completed:', {
            customer,
            customerType,
            items: saleItems,
            subtotal: calculateSubtotal(),
            discount: calculateDiscount(),
            tax: calculateTax(),
            total: calculateTotal(),
            paymentMethod,
            notes,
            amountReceived: parseFloat(amountReceived)
        });

        // Reset form or redirect
        alert('Sale completed successfully!');
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            {/* Header */}
            <div className="bg-slate-800 border-b border-slate-700">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                                <ArrowLeftIcon className="w-5 h-5"/>
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">New Sale</h1>
                                <p className="text-slate-400">Create a new sales transaction</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                                Save Draft
                            </button>
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                disabled={saleItems.length === 0}
                                className="px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-2"
                            >
                                <CheckIcon className="w-5 h-5"/>
                                <span>Complete Sale</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* Left Column - Products and Cart */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Product Search */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Add Products</h2>
                            <button
                                onClick={() => setShowProductSearch(!showProductSearch)}
                                className="p-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                            >
                                <MagnifyingGlassIcon className="w-5 h-5"/>
                            </button>
                        </div>

                        {showProductSearch && (
                            <div className="mb-4">
                                <div className="relative">
                                    <MagnifyingGlassIcon
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"/>
                                    <input
                                        type="text"
                                        placeholder="Search products by name or SKU..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>

                                {searchQuery && (
                                    <div
                                        className="mt-2 max-h-64 overflow-y-auto bg-slate-700 rounded-lg border border-slate-600">
                                        {filteredProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                onClick={() => addProductToSale(product)}
                                                className="p-3 hover:bg-slate-600 cursor-pointer border-b border-slate-600 last:border-b-0"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-white">{product.name}</p>
                                                        <p className="text-sm text-slate-400">SKU: {product.sku} •
                                                            Stock: {product.stock}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-teal-400">${product.price}</p>
                                                        <p className="text-xs text-slate-400">{product.category}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {filteredProducts.length === 0 && (
                                            <div className="p-4 text-center text-slate-400">
                                                No products found matching "{searchQuery}"
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quick Product Buttons */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {mockProducts.slice(0, 4).map((product) => (
                                <button
                                    key={product.id}
                                    onClick={() => addProductToSale(product)}
                                    className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left"
                                >
                                    <p className="font-medium text-sm text-white truncate">{product.name}</p>
                                    <p className="text-teal-400 font-bold">${product.price}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Shopping Cart */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700">
                        <div className="p-6 border-b border-slate-700">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <ShoppingCartIcon className="w-6 h-6 text-teal-500"/>
                                    <h2 className="text-lg font-semibold">Cart ({saleItems.length})</h2>
                                </div>
                                {saleItems.length > 0 && (
                                    <button
                                        onClick={() => setSaleItems([])}
                                        className="text-red-400 hover:text-red-300 text-sm"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </div>

                        {saleItems.length === 0 ? (
                            <div className="p-8 text-center text-slate-400">
                                <ShoppingCartIcon className="w-12 h-12 mx-auto mb-3 text-slate-600"/>
                                <p>No items added yet</p>
                                <p className="text-sm">Search and add products to get started</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-700">
                                {saleItems.map((item) => (
                                    <div key={item.id} className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-medium text-white">{item.name}</h3>
                                                <p className="text-sm text-slate-400">SKU: {item.sku}</p>
                                                <p className="text-sm text-teal-400">${item.unit_price} each</p>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-2 bg-slate-700 rounded-lg">
                                                    <button
                                                        onClick={() => updateItemQuantity(item.id, -1)}
                                                        className="p-1 hover:bg-slate-600 rounded-l-lg transition-colors"
                                                    >
                                                        <MinusIcon className="w-4 h-4"/>
                                                    </button>
                                                    <span
                                                        className="px-3 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateItemQuantity(item.id, 1)}
                                                        className="p-1 hover:bg-slate-600 rounded-r-lg transition-colors"
                                                    >
                                                        <PlusIcon className="w-4 h-4"/>
                                                    </button>
                                                </div>

                                                <div className="text-right min-w-[4rem]">
                                                    <p className="font-bold text-white">
                                                        ${(item.unit_price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <TrashIcon className="w-4 h-4"/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Customer and Summary */}
                <div className="space-y-6">
                    {/* Customer Selection */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold flex items-center space-x-2">
                                <UserIcon className="w-5 h-5 text-teal-500"/>
                                <span>Customer</span>
                            </h2>
                            <button
                                onClick={() => setShowCustomerModal(true)}
                                className="p-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                            >
                                <UserPlusIcon className="w-4 h-4"/>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Customer Type</label>
                                <select
                                    value={customerType}
                                    onChange={(e) => setCustomerType(e.target.value)}
                                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="walk_in">Walk-in Customer</option>
                                    <option value="registered">Registered Customer</option>
                                </select>
                            </div>

                            {customer ? (
                                <div className="p-3 bg-slate-700 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-white">{customer.name}</p>
                                            <p className="text-sm text-slate-400">{customer.email}</p>
                                            <p className="text-sm text-slate-400">{customer.phone}</p>
                                        </div>
                                        <button
                                            onClick={() => setCustomer(null)}
                                            className="text-slate-400 hover:text-white"
                                        >
                                            <XMarkIcon className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </div>
                            ) : customerType === 'registered' ? (
                                <button
                                    onClick={() => setShowCustomerModal(true)}
                                    className="w-full p-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors"
                                >
                                    Select Customer
                                </button>
                            ) : (
                                <div className="p-3 bg-slate-700 rounded-lg text-center text-slate-400">
                                    Walk-in Customer
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                            <CalculatorIcon className="w-5 h-5 text-teal-500"/>
                            <span>Order Summary</span>
                        </h2>

                        <div className="space-y-4">
                            <div className="flex justify-between text-slate-300">
                                <span>Subtotal:</span>
                                <span>${calculateSubtotal().toFixed(2)}</span>
                            </div>

                            {/* Discount */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={discountType}
                                        onChange={(e) => setDiscountType(e.target.value)}
                                        className="text-xs bg-slate-700 border border-slate-600 rounded px-2 py-1"
                                    >
                                        <option value="amount">$ Discount</option>
                                        <option value="percentage">% Discount</option>
                                    </select>
                                    <input
                                        type="number"
                                        value={discountValue}
                                        onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                                        className="flex-1 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Discount:</span>
                                    <span>-${calculateDiscount().toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Tax */}
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-slate-400">Tax %:</span>
                                    <input
                                        type="number"
                                        value={taxPercentage}
                                        onChange={(e) => setTaxPercentage(parseFloat(e.target.value) || 0)}
                                        className="w-16 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="flex justify-between text-slate-300">
                                    <span>Tax:</span>
                                    <span>${calculateTax().toFixed(2)}</span>
                                </div>
                            </div>

                            <hr className="border-slate-700"/>

                            <div className="flex justify-between text-xl font-bold text-white">
                                <span>Total:</span>
                                <span className="text-teal-400">${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-slate-300 mb-2">Notes</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Add notes for this sale..."
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Selection Modal */}
            {showCustomerModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full mx-4">
                        <div className="p-6 border-b border-slate-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Select Customer</h3>
                                <button
                                    onClick={() => setShowCustomerModal(false)}
                                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {mockCustomers.map((cust) => (
                                    <button
                                        key={cust.id}
                                        onClick={() => {
                                            setCustomer(cust);
                                            setShowCustomerModal(false);
                                        }}
                                        className="w-full p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left"
                                    >
                                        <p className="font-medium text-white">{cust.name}</p>
                                        <p className="text-sm text-slate-400">{cust.email}</p>
                                        <p className="text-sm text-slate-400">{cust.phone}</p>
                                    </button>
                                ))}
                            </div>

                            <button
                                className="w-full mt-4 p-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors">
                                + Add New Customer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-lg w-full mx-4">
                        <div className="p-6 border-b border-slate-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Complete Payment</h3>
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Total Summary */}
                            <div className="bg-slate-700 rounded-lg p-4">
                                <div className="text-center">
                                    <p className="text-slate-400">Total Amount</p>
                                    <p className="text-3xl font-bold text-teal-400">${calculateTotal().toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-3">Payment Method</label>
                                <div className="grid grid-cols-2 gap-3">
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
                                            <method.icon className="w-5 h-5"/>
                                            <span className="text-sm font-medium">{method.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Amount Received */}
                            {paymentMethod === 'cash' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Amount
                                        Received</label>
                                    <input
                                        type="number"
                                        value={amountReceived}
                                        onChange={(e) => setAmountReceived(e.target.value)}
                                        placeholder={calculateTotal().toFixed(2)}
                                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    {amountReceived && parseFloat(amountReceived) >= calculateTotal() && (
                                        <p className="mt-2 text-sm text-emerald-400">
                                            Change: ${calculateChange().toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCompleteSale}
                                    disabled={paymentMethod === 'cash' && (!amountReceived || parseFloat(amountReceived) < calculateTotal())}
                                    className="flex-1 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center space-x-2"
                                >
                                    <CheckIcon className="w-5 h-5"/>
                                    <span>Complete Sale</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddSalePage;