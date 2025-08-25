'use client'

import {useEffect, useState} from 'react';
import {
    BuildingOfficeIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    CurrencyDollarIcon,
    DocumentTextIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    TrashIcon,
    TruckIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {formatCurrency} from "@/utils/formatters";
import {useRouter} from "next/navigation";
import {addPurchaseOrder} from "@/lib/queryPurchaseOrders";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";

export default function PurchaseOrderForm({suppliers, locations, products}) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        po_number: '',
        supplier_id: '',
        location_id: '',
        status: 'draft',
        order_date: new Date().toISOString().split('T')[0],
        expected_date: '',
        subtotal: 0,
        tax_amount: 0,
        shipping_cost: 0,
        total_amount: 0,
        notes: ''
    });

    const [orderItems, setOrderItems] = useState([
        {
            id: Date.now(),
            product_id: '',
            variant_id: '',
            quantity_ordered: 1,
            unit_cost: 0,
            total_cost: 0
        }
    ]);

    useEffect(() => {
        const subtotal = orderItems.reduce((sum, item) => sum + (item.quantity_ordered * item.unit_cost), 0);
        const total = subtotal + parseFloat(formData.tax_amount || 0) + parseFloat(formData.shipping_cost || 0);

        setFormData(prev => ({
            ...prev,
            subtotal: subtotal.toFixed(2),
            total_amount: total.toFixed(2)
        }));
    }, [orderItems, formData.tax_amount, formData.shipping_cost]);

    const handleFormChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        console.log('Order Items:', orderItems);

        const orderItemsData = orderItems.map(item => ({
            product_id: item.product_id,
            variant_id: item.variant_id,
            quantity_ordered: item.quantity_ordered,
            unit_cost: item.unit_cost,
        }));

        try {
            const addedOrder = await addPurchaseOrder(formData, orderItemsData);

            if (!addedOrder) {
                showErrorToast('Error adding purchase order');
                return;
            }

            showSuccessToast('Purchase order added successfully');
            router.push(`/dashboard/purchases`);
        } catch (error) {
            console.error('Error adding purchase order:', error);
            showErrorToast('Error adding purchase order');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={`space-y-8`}>
            <BasicInformationForm
                formData={formData}
                handleFormChange={handleFormChange}
                locations={locations}
                suppliers={suppliers}
            />

            <OrderItemsForm setOrderItems={setOrderItems} orderItems={orderItems} products={products}/>

            {/* Summary and Additional Costs */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8`}>
                {/* Notes */}
                <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
                    <h3 className={`text-lg font-semibold mb-4`}>Notes</h3>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => handleFormChange('notes', e.target.value)}
                        rows={6}
                        className={`dashboard-form-input border-gray-600`}
                        placeholder={`Add any additional notes or special instructions...`}
                    />
                </div>

                {/* Order Summary */}
                <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
                    <h3 className={`text-lg font-semibold mb-4`}>Order Summary</h3>
                    <div className={`space-y-4`}>
                        <div className={`flex justify-between items-center`}>
                            <span className={`text-gray-300`}>Subtotal:</span>
                            <span className={`text-white font-semibold`}>
                                {formatCurrency(parseFloat(formData.subtotal || 0))}
                            </span>
                        </div>

                        <div className={`space-y-3`}>
                            <div className={`flex items-center space-x-3`}>
                                <label className={`text-gray-300 flex-shrink-0`}>Tax:</label>
                                <div className={`relative flex-1`}>
                                    <CurrencyDollarIcon className={`size-4 text-gray-400 absolute left-2 top-3`}/>
                                    <input
                                        type={`number`}
                                        step={0.01}
                                        min={0}
                                        value={formData.tax_amount}
                                        onChange={(e) => handleFormChange('tax_amount', e.target.value)}
                                        className={`dashboard-form-input-icon border-gray-600`}
                                    />
                                </div>
                            </div>

                            <div className={`flex items-center space-x-3`}>
                                <label className={`text-gray-300 flex-shrink-0`}>Shipping:</label>
                                <div className={`relative flex-1`}>
                                    <CurrencyDollarIcon className={`size-4 text-gray-400 absolute left-2 top-3`}/>
                                    <input
                                        type={`number`}
                                        step={0.01}
                                        min={0}
                                        value={formData.shipping_cost}
                                        onChange={(e) => handleFormChange('shipping_cost', e.target.value)}
                                        className={`dashboard-form-input-icon border-gray-600`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`border-t border-gray-600 pt-4`}>
                            <div className={`flex justify-between items-center`}>
                                <span className={`text-lg font-semibold`}>Total:</span>
                                <span className={`text-xl font-bold text-teal-400`}>
                                    {formatCurrency(parseFloat(formData.total_amount || 0))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`flex item-center justify-end space-x-3`}>
                <button
                    type={`button`}
                    onClick={router.back}
                    className={`px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 hover:text-white transition-colors`}
                >
                    <XMarkIcon className={`size-4 inline mr-2`}/>
                    Cancel
                </button>
                <button
                    type={`submit`}
                    className={`px-6 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors`}
                >
                    <CheckCircleIcon className={`size-4 inline mr-2`}/>
                    Save Order
                </button>
            </div>
        </form>
    );
}

function BasicInformationForm({formData, handleFormChange, locations, suppliers}) {
    const statusOptions = [
        {value: 'draft', label: 'Draft', color: 'text-gray-400'},
        {value: 'sent', label: 'Sent', color: 'text-blue-400'},
        {value: 'confirmed', label: 'Confirmed', color: 'text-yellow-400'},
        {value: 'received', label: 'Received', color: 'text-green-400'},
        {value: 'cancelled', label: 'Cancelled', color: 'text-red-400'}
    ];

    return (
        <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
            <div className={`flex items-center mb-6`}>
                <DocumentTextIcon className={`size-5 text-teal-400 mr-3`}/>
                <h2 className={`text-xl font-semibold`}>Order Information</h2>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>PO Number</label>
                    <input
                        type={`text`}
                        value={formData.po_number}
                        onChange={(e) => handleFormChange('po_number', e.target.value)}
                        placeholder={`PO-2025-001`}
                        className={`dashboard-form-input border-gray-600`}
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => handleFormChange('status', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Order Date</label>
                    <div className={`relative`}>
                        <CalendarDaysIcon
                            className={`size-4 text-gray-400 absolute left-3 top-3 pointer-events-none`}/>
                        <input
                            type={`date`}
                            value={formData.order_date}
                            onChange={(e) => handleFormChange('order_date', e.target.value)}
                            className={`dashboard-form-input-icon border-gray-600`}
                        />
                    </div>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Expected Date</label>
                    <div className={`relative`}>
                        <CalendarDaysIcon
                            className={`size-4 text-gray-400 absolute left-3 top-3 pointer-events-none`}/>
                        <input
                            type={`date`}
                            value={formData.expected_date}
                            onChange={(e) => handleFormChange('expected_date', e.target.value)}
                            className={`dashboard-form-input-icon border-gray-600`}
                        />
                    </div>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Supplier</label>
                    <div className={`relative`}>
                        <BuildingOfficeIcon
                            className={`size-4 text-gray-400 absolute left-3 top-3 pointer-events-none`}/>
                        <select
                            value={formData.supplier_id}
                            onChange={(e) => handleFormChange('supplier_id', e.target.value)}
                            className={`dashboard-form-input-icon border-gray-600`}
                        >
                            <option value={``}>Select Supplier</option>
                            {suppliers.map(supplier => (
                                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Location</label>
                    <div className={`relative`}>
                        <TruckIcon
                            className={`size-4 text-gray-400 absolute left-3 top-3 pointer-events-none`}/>
                        <select
                            value={formData.location_id}
                            onChange={(e) => handleFormChange('location_id', e.target.value)}
                            className={`dashboard-form-input-icon border-gray-600`}
                        >
                            <option value={``}>Select Location</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

function OrderItemsForm({products, orderItems, setOrderItems}) {
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...orderItems];
        updatedItems[index] = {...updatedItems[index], [field]: value};

        // Calculate the total cost for the item
        if (field === 'quantity_ordered' || field === 'unit_cost') {
            const quantity = field === 'quantity_ordered' ? parseFloat(value) || 0 : updatedItems[index].quantity_ordered;
            const cost = field === 'unit_cost' ? parseFloat(value) || 0 : updatedItems[index].unit_cost;
            updatedItems[index].total_cost = (quantity * cost).toFixed(2);
        }

        setOrderItems(updatedItems);
    };

    const addOrderItem = () => {
        setOrderItems([...orderItems, {
            id: Date.now(),
            product_id: '',
            variant_id: '',
            quantity_ordered: 1,
            unit_cost: 0,
            total_cost: 0
        }]);
    };

    const removeOrderItem = (index) => {
        if (orderItems.length > 1) {
            setOrderItems(orderItems.filter((_, i) => i !== index));
        }
    };

    const getSelectedProduct = (productId) => {
        return products.find(p => p.id === productId);
    };


    return (
        <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700`}>
            <div className={`flex items-center justify-between mb-6`}>
                <div className={`flex items-center`}>
                    <MagnifyingGlassIcon className={`size-5 text-teal-400 mr-3`}/>
                    <h2 className={`text-xl font-semibold`}>Order Items</h2>
                </div>
                <button
                    type={`button`}
                    onClick={addOrderItem}
                    className={`px-4 py-2 text-sm font-medium bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors`}
                >
                    <PlusIcon className={`size-4 inline mr-2`}/>
                    Add Item
                </button>
            </div>

            <div className={`space-y-4`}>
                {orderItems.map((item, index) => (
                    <div key={item.id} className={`bg-gray-700 rounded-lg p-4 border border-gray-600`}>
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end`}>
                            <div className={`lg:col-span-2`}>
                                <label className={`dashboard-form-label mb-2`}>Product</label>
                                <select
                                    value={item.product_id}
                                    onChange={(e) => handleItemChange(index, 'product_id', e.target.value)}
                                    className={`w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring focus:ring-teal-500 focus:border-teal-500 focus:outline-none`}
                                >
                                    <option value={``}>Select Product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name} ({product.sku})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={`dashboard-form-label mb-2`}>Variant</label>
                                <select
                                    value={item.variant_id}
                                    onChange={(e) => handleItemChange(index, 'variant_id', e.target.value)}
                                    className={`w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring focus:ring-teal-500 focus:border-teal-500 focus:outline-none`}
                                    disabled={!item.product_id}
                                >
                                    <option value={``}>No Variant</option>
                                    {item.product_id && getSelectedProduct(item.product_id)?.variants?.map(variant => (
                                        <option key={variant.id} value={variant.id}>{variant.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className={`dashboard-form-label mb-2`}>Quantity</label>
                                <input
                                    type={`number`}
                                    min={1}
                                    value={item.quantity_ordered}
                                    onChange={(e) => handleItemChange(index, 'quantity_ordered', e.target.value)}
                                    className={`w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg focus:ring focus:ring-teal-500 focus:border-teal-500 focus:outline-none`}
                                />
                            </div>

                            <div>
                                <label className={`dashboard-form-label mb-2`}>Unit Cost</label>
                                <div className={`relative`}>
                                    <CurrencyDollarIcon
                                        className={`size-4 text-gray-400 absolute left-2 top-3`}/>
                                    <input
                                        type={`number`}
                                        step={0.01}
                                        min={0}
                                        value={item.unit_cost}
                                        onChange={(e) => handleItemChange(index, 'unit_cost', e.target.value)}
                                        className={`w-full px-3 py-2 pl-7 bg-gray-600 border border-gray-500 rounded-lg text-white focus:ring focus:ring-teal-500 focus:border-teal-500 focus:outline-none`}
                                    />
                                </div>
                            </div>

                            <div className={`flex items-center justify-between`}>
                                <div>
                                    <label className={`dashboard-form-label mb-2`}>Total</label>
                                    <div className={`text-lg font-semibold text-teal-400`}>
                                        {formatCurrency(parseFloat(item.total_cost || 0))}
                                    </div>
                                </div>
                                {orderItems.length > 1 && (
                                    <button
                                        type={`button`}
                                        onClick={() => removeOrderItem(index)}
                                        className={`p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors`}
                                    >
                                        <TrashIcon className={`size-4`}/>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}