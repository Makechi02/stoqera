'use client'

import {ShoppingCartIcon, TrashIcon} from '@heroicons/react/24/outline';
import {formatCurrency} from "@/utils/formatters";

export default function SaleItemsCart({saleItems, setSaleItems}) {

    const updateItemQuantity = (productId, newQuantity) => {
        const parsedQuantity = newQuantity === '' ? '' : parseInt(newQuantity);

        setSaleItems(saleItems.map(item =>
            item.product_id === productId ? {...item, quantity: parsedQuantity} : item
        ));
    };

    const updateItemPrice = (productId, newPrice) => {
        setSaleItems(saleItems.map(item =>
            item.product_id === productId ? {...item, unit_price: parseFloat(newPrice) || 0} : item
        ));
    };

    const removeItem = (productId) => {
        setSaleItems(saleItems.filter(item => item.product_id !== productId));
    };


    const calculateItemMetrics = (item) => {
        const quantity = typeof item.quantity === 'number' ? item.quantity : (parseInt(item.quantity) || 0);
        const lineTotal = quantity * item.unit_price;
        const lineCost = quantity * item.cost_price;
        const lineProfit = lineTotal - lineCost;
        const profitMargin = lineCost > 0 ? ((lineProfit / lineCost) * 100) : 0;

        return {lineTotal, lineCost, lineProfit, profitMargin};
    };

    return (
        <div className={`bg-gray-800 rounded-xl border border-gray-700 overflow-hidden`}>
            <div className={`px-4 sm:px-6 py-4 border-b border-gray-700 flex items-center gap-2`}>
                <ShoppingCartIcon className={`size-5 text-teal-400`}/>
                <h2 className={`text-lg font-semibold`}>Sale Items ({saleItems.length})</h2>
            </div>

            {saleItems.length === 0 ? (
                <div className={`px-6 py-12 text-center text-gray-400`}>
                    <ShoppingCartIcon className={`size-16 mx-auto mb-4 text-gray-600`}/>
                    <p>No items added yet</p>
                    <p className={`text-sm mt-1`}>Search and add products to start the sale</p>
                </div>
            ) : (
                <div className={`divide-y divide-gray-700`}>
                    {saleItems.map(item => {
                        const {lineTotal, lineProfit, profitMargin} = calculateItemMetrics(item);

                        return (
                            <div key={item.product_id} className={`p-4 hover:bg-gray-750`}>
                                {/* Mobile Layout */}
                                <div className={`block md:hidden space-y-3`}>
                                    {/* Product Info & Remove */}
                                    <div className={`flex items-start justify-between gap-3`}>
                                        <div className={`flex-1 min-w-0`}>
                                            <p className={`font-medium text-gray-100 truncate`}>{item.name}</p>
                                            <p className={`text-sm text-gray-400`}>SKU: {item.sku}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.product_id)}
                                            className={`p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors flex-shrink-0`}
                                        >
                                            <TrashIcon className={`size-5`}/>
                                        </button>
                                    </div>

                                    {/* Quantity & Price */}
                                    <div className={`grid grid-cols-2 gap-3`}>
                                        <div>
                                            <label className={`text-xs text-gray-400 block mb-1`}>Quantity</label>
                                            <input
                                                type={`number`}
                                                min={1}
                                                max={item.stock}
                                                step={1}
                                                value={item.quantity}
                                                onChange={(e) => updateItemQuantity(item.product_id, e.target.value)}
                                                className={`dashboard-form-input border-gray-600 text-center`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`text-xs text-gray-400 block mb-1`}>Unit Price</label>
                                            <input
                                                type={`number`}
                                                step={0.01}
                                                value={item.unit_price}
                                                onChange={(e) => updateItemPrice(item.product_id, e.target.value)}
                                                className={`dashboard-form-input border-gray-600`}
                                            />
                                        </div>
                                    </div>

                                    {/* Price Modified Indicator */}
                                    {item.unit_price !== item.original_price && (
                                        <p className={`text-xs text-yellow-400`}>
                                            Original price: {formatCurrency(item.original_price)}
                                        </p>
                                    )}

                                    {/* Line Total & Profit */}
                                    <div className={`flex items-center justify-between pt-2 border-t border-gray-700`}>
                                        <div>
                                            <p className={`text-xs text-gray-400`}>Profit</p>
                                            <p
                                                className={`text-sm font-semibold ${lineProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}
                                            >
                                                {formatCurrency(lineProfit)} ({profitMargin.toFixed(1)}%)
                                            </p>
                                        </div>
                                        <div className={`text-right`}>
                                            <p className={`text-xs text-gray-400`}>Line Total</p>
                                            <p className={`text-lg font-bold text-teal-400`}>
                                                {formatCurrency(lineTotal)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Layout */}
                                <div className={`hidden md:flex items-start gap-4`}>
                                    <div className={`flex-1 min-w-0`}>
                                        <p className={`font-medium text-gray-100`}>{item.name}</p>
                                        <p className={`text-sm text-gray-400 mt-1`}>SKU: {item.sku}</p>

                                        {/* Profit/Loss Indicator */}
                                        <div className={`mt-2 flex items-center gap-2 text-sm`}>
                                            <p className={`text-gray-400`}>Profit:</p>
                                            <p className={lineProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                                                {formatCurrency(lineProfit)} ({profitMargin.toFixed(1)}%)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Quantity */}
                                    <div className={`w-24`}>
                                        <label className={`text-xs text-gray-400 block mb-1`}>Qty</label>
                                        <input
                                            type={`number`}
                                            min={1}
                                            step={1}
                                            max={item.stock}
                                            value={item.quantity}
                                            onChange={(e) => updateItemQuantity(item.product_id, e.target.value)}
                                            className={`dashboard-form-input border-gray-600 text-center`}
                                        />
                                    </div>

                                    {/* Unit Price */}
                                    <div className={`w-32`}>
                                        <label className={`text-xs text-gray-400 block mb-1`}>Unit Price</label>
                                        <input
                                            type={`number`}
                                            step={0.01}
                                            value={item.unit_price}
                                            onChange={(e) => updateItemPrice(item.product_id, e.target.value)}
                                            className={`dashboard-form-input border-gray-600`}
                                        />
                                        {item.unit_price !== item.original_price && (
                                            <div className={`text-xs text-yellow-400 mt-1`}>
                                                Original: {item.original_price.toFixed(2)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Line Total */}
                                    <div className={`w-32 text-right`}>
                                        <label className={`text-xs text-gray-400 block mb-1`}>Total</label>
                                        <p className={`text-lg font-semibold text-teal-400`}>
                                            {formatCurrency(lineTotal)}
                                        </p>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeItem(item.product_id)}
                                        className={`p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded transition-colors`}
                                    >
                                        <TrashIcon className={`size-5`}/>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}