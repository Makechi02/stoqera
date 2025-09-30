'use client'

import {CubeIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';

export default function TransferItemsForm({formData, setFormData, setShowProductSearch, errors}) {
    const updateItemQuantity = (index, quantity) => {
        if (quantity <= 0) {
            removeTransferItem(index);
            return;
        }

        const updatedItems = [...formData.items];
        updatedItems[index].quantity = parseInt(quantity) || 0;
        setFormData(prev => ({
            ...prev,
            items: updatedItems
        }));
    };

    const removeTransferItem = (index) => {
        setFormData(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className={`bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700`}>
            <div className={`flex items-center justify-between mb-6`}>
                <h2 className={`text-lg font-medium`}>Items to Transfer</h2>
                <button
                    type={`button`}
                    onClick={() => setShowProductSearch(true)}
                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                >
                    <PlusIcon className={`size-4 mr-2`}/>
                    Add Item
                </button>
            </div>

            {errors.items && (
                <div className={`mb-4 p-3 bg-red-900/20 border border-red-500 rounded-md`}>
                    <p className={`text-red-400 text-sm`}>{errors.items}</p>
                </div>
            )}

            {/* Items List */}
            {formData.items.length > 0 ? (
                <div className={`space-y-4`}>
                    {formData.items.map((item, index) => (
                        <TransferItem
                            key={`${item.product_id}-${item.variant_id}`}
                            item={item}
                            index={index}
                            updateItemQuantity={updateItemQuantity}
                            removeTransferItem={removeTransferItem}
                            errors={errors}
                        />
                    ))}
                </div>
            ) : (
                <div className={`text-center py-12 border-2 border-dashed border-gray-600 rounded-lg`}>
                    <CubeIcon className={`mx-auto h-12 w-12 text-gray-500`}/>
                    <h3 className={`mt-2 text-sm font-medium text-gray-300`}>No items added</h3>
                    <p className={`mt-1 text-sm text-gray-500`}>Add products to transfer between locations</p>
                </div>
            )}
        </div>
    )
}

function TransferItem({item, updateItemQuantity, removeTransferItem, index, errors}) {
    return (
        <div className={`bg-gray-700 rounded-lg p-4`}>
            <div className={`flex flex-wrap items-center justify-between gap-4`}>
                <div className={`flex items-center flex-1`}>
                    <CubeIcon className={`size-8 text-teal-400 mr-3`}/>
                    <div className={`flex-1`}>
                        <h3 className={`font-medium`}>{item.product_name}</h3>
                        <p className={`text-gray-400 text-sm`}>{item.variant_name}</p>
                        <p className={`text-gray-500 text-xs`}>Available: {item.current_stock}</p>
                    </div>
                </div>

                <div className={`flex items-center space-x-4`}>
                    <div>
                        <label className={`block text-xs text-gray-400 mb-1`}>Quantity</label>
                        <input
                            type={`number`}
                            min={1}
                            max={item.current_stock}
                            value={item.quantity}
                            onChange={(e) => updateItemQuantity(index, e.target.value)}
                            className={`w-20 px-2 py-1 border rounded bg-gray-600 text-white text-center focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                errors[`item_${index}`] ? 'border-red-500' : 'border-gray-500'
                            }`}
                        />
                        {errors[`item_${index}`] && (
                            <p className={`text-red-400 text-xs mt-1`}>{errors[`item_${index}`]}</p>
                        )}
                    </div>

                    <button
                        type={`button`}
                        onClick={() => removeTransferItem(index)}
                        className={`text-red-400 hover:text-red-300 p-1`}
                    >
                        <TrashIcon className={`size-4`}/>
                    </button>
                </div>
            </div>
        </div>
    )
}