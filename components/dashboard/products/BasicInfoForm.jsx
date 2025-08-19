import React from "react";
import {units} from "@/data/constants/constants";

export default function BasicInfoForm({formData, errors, onChange, categories}) {
    return (
        <div className={`space-y-6`}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        SKU <span className={`text-red-400`}>*</span>
                    </label>
                    <input
                        type={`text`}
                        value={formData.sku}
                        placeholder={`e.g., LAPTOP001`}
                        onChange={(e) => onChange('sku', e.target.value)}
                        className={`dashboard-form-input ${errors.sku ? 'border-red-500' : 'border-gray-600'}`}
                    />
                    {errors.sku && <p className={`text-red-400 text-sm mt-1`}>{errors.sku}</p>}
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Product Name <span className={`text-red-400`}>*</span>
                    </label>
                    <input
                        type={`text`}
                        value={formData.name}
                        placeholder={`e.g., MacBook Pro 16 inch`}
                        onChange={(e) => onChange('name', e.target.value)}
                        className={`dashboard-form-input ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                    />
                    {errors.name && <p className={`text-red-400 text-sm mt-1`}>{errors.name}</p>}
                </div>
            </div>

            <div>
                <label className={`dashboard-form-label mb-2`}>Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => onChange('description', e.target.value)}
                    rows={4}
                    placeholder={`Describe your product features and specifications...`}
                    className={`dashboard-form-input border-gray-600`}
                />
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Category <span className={`text-red-400`}>*</span>
                    </label>
                    <select
                        value={formData.category_id}
                        onChange={(e) => onChange('category_id', e.target.value)}
                        className={`dashboard-form-input ${errors.category_id ? 'border-red-500' : 'border-gray-600'}`}
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && <p className={`text-red-400 text-sm mt-1`}>{errors.category_id}</p>}
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Brand</label>
                    <input
                        type={`text`}
                        value={formData.brand}
                        placeholder={`e.g., Apple`}
                        onChange={(e) => onChange('brand', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    />
                </div>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>Unit of Measure</label>
                    <select
                        value={formData.unit_of_measure}
                        onChange={(e) => onChange('unit_of_measure', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    >
                        {units.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Barcode</label>
                    <input
                        type={`text`}
                        value={formData.barcode}
                        placeholder={`e.g., 1234567890123`}
                        onChange={(e) => onChange('barcode', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    />
                </div>
            </div>
        </div>
    );
};
