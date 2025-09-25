import {MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon} from '@heroicons/react/24/outline';
import {formatCurrency} from "@/utils/formatters";

export default function SalesCart({saleItems, setSaleItems}) {
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

    const updateItemQuantityDirect = (itemId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent negative or zero quantities
        setSaleItems(items =>
            items.map(item =>
                item.id === itemId
                    ? {...item, quantity: newQuantity}
                    : item
            )
        );
    };

    const updateItemPrice = (itemId, newPrice) => {
        if (newPrice < 0) return; // Prevent negative prices
        setSaleItems(items =>
            items.map(item =>
                item.id === itemId
                    ? {...item, unit_price: newPrice}
                    : item
            )
        );
    };

    const removeItem = (itemId) => {
        setSaleItems(items => items.filter(item => item.id !== itemId));
    };

    const clearAllItems = () => {
        setSaleItems([]);
    };

    return (
        <div className={`bg-slate-800 rounded-xl border border-slate-700`}>
            {/* Cart Header */}
            <div className={`p-4 border-b border-slate-700`}>
                <div className={`flex items-center justify-between`}>
                    <div className={`flex items-center space-x-2`}>
                        <ShoppingCartIcon className="w-6 h-6 text-teal-500"/>
                        <h2 className={`text-lg font-semibold`}>Cart ({saleItems.length})</h2>
                    </div>
                    {saleItems.length > 0 && (
                        <button
                            onClick={clearAllItems}
                            className={`text-red-400 hover:text-red-300 text-sm transition-colors`}
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Cart Content */}
            {saleItems.length === 0 ? (
                // Empty Cart State
                <div className={`p-8 text-center text-slate-400`}>
                    <ShoppingCartIcon className={`size-12 mx-auto mb-3 text-slate-600`}/>
                    <p>No items added yet</p>
                    <p className={`text-sm`}>Search and add products to get started</p>
                </div>
            ) : (
                // Cart Items
                <div className={`divide-y divide-slate-700 max-h-96 overflow-y-auto`}>
                    {saleItems.map((item) => (
                        <div key={item.id} className={`p-4`}>
                            <div className={`space-y-4`}>
                                {/* Product Info */}
                                <div className={`flex-1`}>
                                    <h3 className={`font-medium`}>{item.name}</h3>
                                    <p className={`text-sm text-slate-400`}>
                                        SKU: {item.sku} •
                                        Original: {formatCurrency(item.original_price || item.unit_price)}
                                    </p>
                                    {item.original_price && item.unit_price !== item.original_price && (
                                        <p className={`text-xs text-amber-400 mt-1 flex items-center space-x-1`}>
                                            <span>{item.unit_price > item.original_price ? '↗️' : '↘️'}</span>
                                            <span>Price modified from original</span>
                                        </p>
                                    )}
                                </div>

                                {/* Controls */}
                                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end`}>
                                    {/* Quantity Controls */}
                                    <div className={`space-y-2`}>
                                        <label className={`block text-xs font-medium text-slate-400`}>Quantity</label>
                                        <div className={`flex items-center bg-slate-700 rounded-lg overflow-hidden`}>
                                            <button
                                                onClick={() => updateItemQuantity(item.id, -1)}
                                                className={`p-2 hover:bg-slate-600 transition-colors flex-shrink-0`}
                                                disabled={item.quantity <= 1}
                                            >
                                                <MinusIcon className={`size-4`}/>
                                            </button>
                                            <input
                                                type={`number`}
                                                value={item.quantity}
                                                onChange={(e) => updateItemQuantityDirect(item.id, parseInt(e.target.value) || 1)}
                                                className={`flex-1 px-3 py-2 bg-transparent text-center text-white border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset min-w-0`}
                                                min={1}
                                            />
                                            <button
                                                onClick={() => updateItemQuantity(item.id, 1)}
                                                className={`p-2 hover:bg-slate-600 transition-colors flex-shrink-0`}
                                            >
                                                <PlusIcon className={`size-4`}/>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price Controls */}
                                    <div className={`space-y-2`}>
                                        <label className={`block text-xs font-medium text-slate-400`}>Unit Price</label>
                                        <div className={`flex items-center bg-slate-700 rounded-lg px-3 py-2`}>
                                            <span className={`text-slate-400 mr-1`}>Ksh</span>
                                            <input
                                                type={`number`}
                                                value={item.unit_price}
                                                onChange={(e) => updateItemPrice(item.id, parseFloat(e.target.value) || 0)}
                                                className={`flex-1 bg-transparent text-white border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset min-w-0`}
                                                min={0}
                                                step={0.01}
                                                placeholder={`0.00`}
                                            />
                                        </div>
                                    </div>

                                    {/* Line Total and Actions */}
                                    <div className={`space-y-2`}>
                                        <label className={`block text-xs font-medium text-slate-400`}>Line Total</label>
                                        <div
                                            className={`flex items-center justify-between bg-slate-700/50 rounded-lg px-3 py-2`}>
                                            <span className={`font-bold text-teal-400 text-lg`}>
                                                {formatCurrency(item.unit_price * item.quantity)}
                                            </span>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className={`p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors ml-2`}
                                                title={`Remove item`}
                                            >
                                                <TrashIcon className={`size-4`}/>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions (Mobile friendly) */}
                                <div className={`flex items-center justify-between pt-2 border-t border-slate-700/50`}>
                                    <div className={`flex items-center space-x-4 text-sm text-slate-400`}>
                                        <button
                                            onClick={() => updateItemQuantityDirect(item.id, 10)}
                                            className={`hover:text-teal-400 transition-colors`}
                                        >
                                            Set 10
                                        </button>
                                        <button
                                            onClick={() => updateItemQuantityDirect(item.id, 50)}
                                            className={`hover:text-teal-400 transition-colors`}
                                        >
                                            Set 50
                                        </button>
                                        <button
                                            onClick={() => updateItemQuantityDirect(item.id, 100)}
                                            className={`hover:text-teal-400 transition-colors`}
                                        >
                                            Set 100
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => updateItemPrice(item.id, item.original_price || item.unit_price)}
                                        className={`text-sm text-slate-400 hover:text-teal-400 transition-colors`}
                                    >
                                        Reset Price
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Cart Summary Footer */}
            {saleItems.length > 0 && (
                <div className={`p-4 border-t border-slate-700 bg-slate-700/30`}>
                    <div className={`flex items-center justify-between`}>
                        <div className={`text-sm text-slate-400`}>
                            {saleItems.reduce((total, item) => total + item.quantity, 0)} items total
                        </div>
                        <div className={`text-right`}>
                            <p className={`text-sm text-slate-400`}>Cart Subtotal</p>
                            <p className={`text-xl font-bold text-teal-400`}>
                                {formatCurrency(saleItems.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0))}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
