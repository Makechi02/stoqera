import React from "react";

export default function InventoryForm({formData, onChange}) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Minimum Stock Level
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={formData.min_stock_level}
                        onChange={(e) => onChange('min_stock_level', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="0"
                    />
                    <p className="text-gray-400 text-sm mt-1">Alert when stock falls below this level</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Maximum Stock Level
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={formData.max_stock_level}
                        onChange={(e) => onChange('max_stock_level', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="100"
                    />
                    <p className="text-gray-400 text-sm mt-1">Maximum stock to maintain</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Reorder Point
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={formData.reorder_point}
                        onChange={(e) => onChange('reorder_point', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="10"
                    />
                    <p className="text-gray-400 text-sm mt-1">Trigger automatic reorder</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Reorder Quantity
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={formData.reorder_quantity}
                        onChange={(e) => onChange('reorder_quantity', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="50"
                    />
                    <p className="text-gray-400 text-sm mt-1">Quantity to reorder automatically</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => onChange('is_active', e.target.checked)}
                        className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500"
                    />
                    <span className="ml-2 text-gray-300">Product is active</span>
                </label>

                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.is_trackable}
                        onChange={(e) => onChange('is_trackable', e.target.checked)}
                        className="w-4 h-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500"
                    />
                    <span className="ml-2 text-gray-300">Track inventory</span>
                </label>
            </div>
        </div>
    );
};
