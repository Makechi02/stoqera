import React from "react";
import {QrCodeIcon, ScaleIcon} from "@heroicons/react/24/outline";

export default function PhysicalForm({formData, onChange}) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weight (kg)
                </label>
                <div className="relative">
                    <ScaleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <input
                        type="number"
                        step="0.001"
                        min="0"
                        value={formData.weight}
                        onChange={(e) => onChange('weight', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="0.000"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                    Dimensions (cm)
                </label>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Length</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={formData.dimensions.length}
                            onChange={(e) => onChange('dimensions.length', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="0.0"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Width</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={formData.dimensions.width}
                            onChange={(e) => onChange('dimensions.width', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="0.0"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Height</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={formData.dimensions.height}
                            onChange={(e) => onChange('dimensions.height', e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="0.0"
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    QR Code
                </label>
                <div className="relative">
                    <QrCodeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"/>
                    <input
                        type="text"
                        value={formData.qr_code}
                        onChange={(e) => onChange('qr_code', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="QR code data"
                    />
                </div>
            </div>
        </div>
    );
};
