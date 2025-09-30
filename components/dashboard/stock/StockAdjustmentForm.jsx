'use client'

import {
    BanknotesIcon,
    CalendarIcon,
    CubeIcon,
    DocumentTextIcon,
    MapPinIcon,
    PlusIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import {useState} from "react";
import {formatCurrency} from "@/utils/formatters";
import {useRouter} from "next/navigation";
import {adjustStock} from "@/lib/stock/queryStock";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";

// TODO: Handle product variants
// TODO: Handle stock transfers

export default function StockAdjustmentForm({locations, products}) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        movementType: 'in',
        transactionType: 'purchase',
        locationId: '',
        fromLocationId: '', // For transfers
        toLocationId: '',   // For transfers
        referenceType: 'purchase_order',
        referenceId: '',
        notes: '',
        performedAt: new Date().toISOString().slice(0, 16)
    });

    const [stockItems, setStockItems] = useState([
        {
            id: 1,
            productId: '',
            variantId: '',
            quantity: '',
            unitCost: '',
            productName: '',
            variantName: '',
            sku: ''
        }
    ]);

    const variants = {
        'prod-1': [
            {id: 'var-1', name: '128GB Space Black', sku: 'IPH15P-128-SB'},
            {id: 'var-2', name: '256GB Natural Titanium', sku: 'IPH15P-256-NT'}
        ],
        'prod-2': [
            {id: 'var-3', name: '256GB Silver', sku: 'MBA13-M3-256-SL'},
            {id: 'var-4', name: '512GB Space Gray', sku: 'MBA13-M3-512-SG'}
        ],
        'prod-3': [
            {id: 'var-5', name: '256GB Space Gray', sku: 'IPP129-256-SG'},
            {id: 'var-6', name: '512GB Silver', sku: 'IPP129-512-SL'}
        ],
        'prod-4': [
            {id: 'var-7', name: 'USB-C', sku: 'APP2-USBC'}
        ]
    };

    const movementTypes = [
        {value: 'in', label: 'Stock In', description: 'Adding inventory'},
        {value: 'out', label: 'Stock Out', description: 'Removing inventory'},
        {value: 'adjustment', label: 'Adjustment', description: 'Inventory correction'},
        {value: 'transfer', label: 'Transfer', description: 'Moving between locations'}
    ];

    const transactionTypes = {
        'in': [
            {value: 'purchase', label: 'Purchase Order'},
            {value: 'return', label: 'Customer Return'},
            {value: 'adjustment', label: 'Positive Adjustment'}
        ],
        'out': [
            {value: 'sale', label: 'Sale'},
            {value: 'return', label: 'Return to Supplier'},
            {value: 'adjustment', label: 'Negative Adjustment'}
        ],
        'adjustment': [
            {value: 'adjustment', label: 'Stock Adjustment'}
        ],
        'transfer': [
            {value: 'transfer', label: 'Location Transfer'}
        ]
    };

    const referenceTypes = [
        {value: 'purchase_order', label: 'Purchase Order'},
        {value: 'sale_order', label: 'Sales Order'},
        {value: 'transfer_order', label: 'Transfer Order'},
        {value: 'adjustment', label: 'Stock Adjustment'},
        {value: 'manual', label: 'Manual Entry'}
    ];

    const addStockItem = () => {
        setStockItems([...stockItems, {
            id: Date.now(),
            productId: '',
            variantId: '',
            quantity: '',
            unitCost: '',
            productName: '',
            variantName: '',
            sku: ''
        }]);
    };

    const removeStockItem = (id) => {
        setStockItems(stockItems.filter(item => item.id !== id));
    };

    const updateStockItem = (id, field, value) => {
        setStockItems(stockItems.map(item => {
            if (item.id === id) {
                const updated = {...item, [field]: value};

                // Auto-populate product details when product is selected
                if (field === 'productId') {
                    const product = products.find(p => p.id === value);
                    updated.productName = product?.name || '';
                    updated.variantId = '';
                    updated.variantName = '';
                    updated.sku = '';
                }

                // Auto-populate variant details when variant is selected
                if (field === 'variantId') {
                    const productVariants = variants[item.productId] || [];
                    const variant = productVariants.find(v => v.id === value);
                    updated.variantName = variant?.name || '';
                    updated.sku = variant?.sku || '';
                }

                return updated;
            }
            return item;
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.movementType === 'transfer') {
            if (!formData.fromLocationId || !formData.toLocationId) {
                showErrorToast('Please select both from and to locations for transfer');
                return;
            }
            if (formData.fromLocationId === formData.toLocationId) {
                showErrorToast('From and To locations cannot be the same');
                return;
            }
        } else if (!formData.locationId) {
            showErrorToast('Please select a location');
            return;
        }

        if (stockItems.some(item => !item.productId || !item.quantity)) {
            showErrorToast('Please complete all required fields for each stock item');
            return;
        }

        if (formData.movementType === 'transfer') {
            // For transfers - create transfer record and two stock movements
            // 1. Create transfer record in your transfers table
            // 2. Create 'out' stock_movement for source location
            // 3. Create 'in' stock_movement for destination location
            // 4. Update inventory for both locations
        } else {
            const submitData = {
                ...formData,
                items: stockItems
            };

            try {
                const adjustedStockCount = await adjustStock(submitData);

                if (adjustedStockCount === 0) {
                    console.error('Error adjusting stock');
                    showErrorToast('An error occurred while adjusting stock');
                    return;
                }

                showSuccessToast(`Stock adjusted successfully`);

                router.push(`/dashboard/stock/levels`);
            } catch (error) {
                console.error('Error adjusting stock:', error);
                showErrorToast('An error occurred while adjusting stock');
            }
        }
    };

    const totalItems = stockItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
    const totalValue = stockItems.reduce((sum, item) => sum + ((parseFloat(item.unitCost) || 0) * (parseInt(item.quantity) || 0)), 0);

    return (
        <div className={`flex flex-col h-full`}>
            <div className={`flex-1 overflow-y-auto p-6 space-y-6`}>
                {/* Movement Details */}
                <div className={`bg-gray-900 rounded-lg p-4 border border-gray-700`}>
                    <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2`}>
                        <DocumentTextIcon className={`size-5 text-teal-400`}/>
                        Movement Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className={`dashboard-form-label mb-2`}>Movement Type *</label>
                            <select
                                value={formData.movementType}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    movementType: e.target.value,
                                    transactionType: '',
                                    locationId: '',
                                    fromLocationId: '',
                                    toLocationId: ''
                                })}
                                required
                                className={`dashboard-form-input border-gray-600`}
                            >
                                {movementTypes.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                            <p className={`text-xs text-gray-500 mt-1`}>
                                {movementTypes.find(t => t.value === formData.movementType)?.description}
                            </p>
                        </div>

                        <div>
                            <label className={`dashboard-form-label mb-2`}>Transaction Type *</label>
                            <select
                                value={formData.transactionType}
                                onChange={(e) => setFormData({...formData, transactionType: e.target.value})}
                                className={`dashboard-form-input border-gray-600`}
                                required
                            >
                                <option value="">Select transaction type</option>
                                {(transactionTypes[formData.movementType] || []).map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Location fields - conditional based on the movement type */}
                        {formData.movementType === 'transfer' ? (
                            // Transfer: Show From and To locations
                            <>
                                <div>
                                    <label className={`dashboard-form-label mb-2`}>
                                        <MapPinIcon className={`size-4 inline mr-1`}/>
                                        From Location *
                                    </label>
                                    <select
                                        value={formData.fromLocationId}
                                        onChange={(e) => setFormData({...formData, fromLocationId: e.target.value})}
                                        className={`dashboard-form-input border-gray-600`}
                                        required
                                    >
                                        <option value={``}>Select source location</option>
                                        {locations.map(location => (
                                            <option key={location.id} value={location.id}>{location.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={`dashboard-form-label mb-2`}>
                                        <MapPinIcon className={`size-4 inline mr-1`}/>
                                        To Location *
                                    </label>
                                    <select
                                        value={formData.toLocationId}
                                        onChange={(e) => setFormData({...formData, toLocationId: e.target.value})}
                                        className={`dashboard-form-input border-gray-600`}
                                        required
                                    >
                                        <option value={``}>Select destination location</option>
                                        {locations.filter(loc => loc.id !== formData.fromLocationId).map(location => (
                                            <option key={location.id} value={location.id}>{location.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        ) : (
                            // Regular movement: Show single location
                            <div>
                                <label className={`dashboard-form-label mb-2`}>
                                    <MapPinIcon className={`size-4 inline mr-1`}/>
                                    Location *
                                </label>
                                <select
                                    value={formData.locationId}
                                    onChange={(e) => setFormData({...formData, locationId: e.target.value})}
                                    className={`dashboard-form-input border-gray-600`}
                                    required
                                >
                                    <option value={``}>Select location</option>
                                    {locations.map(location => (
                                        <option key={location.id} value={location.id}>{location.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div>
                            <label className={`dashboard-form-label mb-2`}>Reference Type</label>
                            <select
                                value={formData.referenceType}
                                onChange={(e) => setFormData({...formData, referenceType: e.target.value})}
                                className={`dashboard-form-input border-gray-600`}
                            >
                                {referenceTypes.map(type => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={`dashboard-form-label mb-2`}>Reference ID</label>
                            <input
                                type={`text`}
                                value={formData.referenceId}
                                onChange={(e) => setFormData({...formData, referenceId: e.target.value})}
                                placeholder={`PO-2024-001`}
                                className={`dashboard-form-input border-gray-600`}
                            />
                        </div>

                        <div>
                            <label className={`dashboard-form-label mb-2`}>
                                <CalendarIcon className={`size-4 inline mr-1`}/>
                                Date & Time
                            </label>
                            <input
                                type={`datetime-local`}
                                value={formData.performedAt}
                                onChange={(e) => setFormData({...formData, performedAt: e.target.value})}
                                className={`dashboard-form-input border-gray-600`}
                            />
                        </div>
                    </div>

                    <div className={`mt-4`}>
                        <label className={`dashboard-form-label mb-2`}>Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            placeholder={`Additional notes about this stock movement...`}
                            rows={3}
                            className={`dashboard-form-input border-gray-600`}
                        />
                    </div>
                </div>

                {/* Stock Items */}
                <div className={`bg-gray-900 rounded-lg p-4 border border-gray-700`}>
                    <div className={`flex items-center justify-between mb-4`}>
                        <h3 className={`text-lg font-semibold text-white flex items-center gap-2`}>
                            <CubeIcon className={`size-5 text-teal-400`}/>
                            Stock Items
                        </h3>
                        <button
                            type={`button`}
                            onClick={addStockItem}
                            className={`bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-lg flex items-center gap-2 text-sm transition-colors`}
                        >
                            <PlusIcon className={`size-4`}/>
                            Add Item
                        </button>
                    </div>

                    <div className={`space-y-4 max-h-64 overflow-y-auto`}>
                        {stockItems.map((item, index) => (
                            <div key={item.id} className={`bg-gray-800 rounded-lg p-4 border border-gray-700`}>
                                <div className={`flex items-center justify-between mb-3`}>
                                    <span className={`text-sm font-medium text-gray-300`}>Item #{index + 1}</span>
                                    {stockItems.length > 1 && (
                                        <button
                                            type={`button`}
                                            onClick={() => removeStockItem(item.id)}
                                            className={`text-red-400 hover:text-red-300 transition-colors`}
                                        >
                                            <TrashIcon className={`size-4`}/>
                                        </button>
                                    )}
                                </div>

                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3`}>
                                    <div>
                                        <label className={`dashboard-form-label mb-1`}>Product *</label>
                                        <select
                                            value={item.productId}
                                            onChange={(e) => updateStockItem(item.id, 'productId', e.target.value)}
                                            className={`dashboard-form-input text-sm border-gray-600`}
                                            required
                                        >
                                            <option value={``}>Select product</option>
                                            {products.map(product => (
                                                <option key={product.id} value={product.id}>{product.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-1`}>Variant</label>
                                        <select
                                            value={item.variantId}
                                            onChange={(e) => updateStockItem(item.id, 'variantId', e.target.value)}
                                            className={`dashboard-form-input text-sm border-gray-600`}
                                            disabled={!item.productId}
                                        >
                                            <option value="">Select variant</option>
                                            {(variants[item.productId] || []).map(variant => (
                                                <option key={variant.id} value={variant.id}>{variant.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-1`}>Quantity *</label>
                                        <input
                                            type={`number`}
                                            value={item.quantity}
                                            onChange={(e) => updateStockItem(item.id, 'quantity', e.target.value)}
                                            min={1}
                                            className={`dashboard-form-input border-gray-600`}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-1`}>Unit Cost</label>
                                        <input
                                            type={`number`}
                                            value={item.unitCost}
                                            onChange={(e) => updateStockItem(item.id, 'unitCost', e.target.value)}
                                            step={0.01}
                                            min={0}
                                            placeholder={`0.00`}
                                            className={`dashboard-form-input border-gray-600`}
                                        />
                                    </div>
                                </div>

                                {item.sku && (
                                    <div className={`mt-2 text-xs text-gray-400`}>SKU: {item.sku}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                {stockItems.some(item => item.quantity || item.unitCost) && (
                    <div className={`bg-gray-900 rounded-lg p-4 border border-gray-700`}>
                        <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2`}>
                            <BanknotesIcon className={`size-5 text-teal-400`}/>
                            Summary
                        </h3>
                        <div className={`grid grid-cols-2 gap-4`}>
                            <div>
                                <p className={`text-sm text-gray-400`}>Total Items</p>
                                <p className={`text-xl font-semibold`}>{totalItems}</p>
                            </div>
                            <div>
                                <p className={`text-sm text-gray-400`}>Total Value</p>
                                <p className={`text-xl font-semibold`}>{formatCurrency(totalValue)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className={`px-6`}>
                <div className={`flex flex-wrap gap-4 items-center justify-between`}>
                    <div className={`text-sm text-gray-400`}>* Required fields</div>
                    <div className={`flex gap-3`}>
                        <button
                            type={`button`}
                            className={`px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors`}
                        >
                            Cancel
                        </button>
                        <button
                            type={`submit`}
                            onClick={handleSubmit}
                            className={`px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors`}
                        >
                            Adjust Stock
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}