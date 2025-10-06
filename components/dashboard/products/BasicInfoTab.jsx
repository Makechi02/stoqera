import {useState} from "react";
import {generateSKU, unitsOfMeasure} from "@/utils/productUtils";
import {XMarkIcon} from "@heroicons/react/24/outline";
import InfoTooltip from "@/components/dashboard/products/InfoTooltip";

export default function BasicInfoTab({formData, updateFormData, setFormData, categories}) {
    const [newTag, setNewTag] = useState('');

    const updateDimension = (field, value) => {
        setFormData(prev => ({
            ...prev,
            dimensions: {...prev.dimensions, [field]: value}
        }));
    };

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        <div className={`space-y-6 bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>Product Name *</label>
                    <input
                        type={`text`}
                        required
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Enter product name`}
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        SKU *
                        <InfoTooltip
                            text={`Stock Keeping Unit - A unique identifier for this product in your inventory system`}/>
                    </label>
                    <div className={`flex gap-2`}>
                        <input
                            type={`text`}
                            required
                            value={formData.sku}
                            onChange={(e) => updateFormData('sku', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`e.g., PROD-001`}
                        />
                        <button
                            type={`button`}
                            onClick={() => {
                                const generatedSku = generateSKU();
                                updateFormData('sku', generatedSku);
                            }}
                            className={`px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                            title={`Generate SKU`}
                        >
                            Generate
                        </button>
                    </div>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Category
                        <InfoTooltip text={`Select a category to organize and group similar products together`}/>
                    </label>
                    <select
                        value={formData.category_id}
                        onChange={(e) => updateFormData('category_id', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Brand</label>
                    <input
                        type={`text`}
                        value={formData.brand}
                        onChange={(e) => updateFormData('brand', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Enter brand name`}
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Unit of Measure
                        <InfoTooltip
                            text={`The standard unit used to measure this product (pieces, kilograms, liters, etc.)`}/>
                    </label>
                    <select
                        value={formData.unit_of_measure}
                        onChange={(e) => updateFormData('unit_of_measure', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                    >
                        {unitsOfMeasure.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Barcode
                        <InfoTooltip text={`The barcode number for scanning this product at point of sale`}/>
                    </label>
                    <input
                        type={`text`}
                        value={formData.barcode}
                        onChange={(e) => updateFormData('barcode', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Enter barcode`}
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        QR Code
                        <InfoTooltip text={`QR code data for quick product identification and tracking`}/>
                    </label>
                    <input
                        type={`text`}
                        value={formData.qr_code}
                        onChange={(e) => updateFormData('qr_code', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Enter QR code`}
                    />
                </div>
            </div>

            <div>
                <label className={`dashboard-form-label mb-2`}>Description</label>
                <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className={`dashboard-form-input border-gray-700`}
                    placeholder={`Enter product description`}
                />
            </div>

            {/* Tags */}
            <div>
                <label className={`dashboard-form-label mb-2`}>
                    Tags
                    <InfoTooltip text={`Add tags to categorize and easily search for this product`}/>
                </label>
                <div className={`flex gap-2 mb-3`}>
                    <input
                        type={`text`}
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Add a tag`}
                    />
                    <button
                        type={`button`}
                        onClick={addTag}
                        className={`px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                    >
                        Add
                    </button>
                </div>
                <div className={`flex flex-wrap gap-2`}>
                    {formData.tags.map((tag, index) => (
                        <span
                            key={index}
                            className={`inline-flex items-center gap-1 px-3 py-1 bg-teal-900/30 border border-teal-700 rounded-full text-sm text-teal-300`}
                        >
                            {tag}
                            <button
                                type={`button`}
                                onClick={() => removeTag(tag)}
                                className={`hover:text-teal-100`}
                            >
                                <XMarkIcon className={`size-4`}/>
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Dimensions */}
            <div>
                <label className={`dashboard-form-label mb-2`}>
                    Dimensions (cm)
                    <InfoTooltip text={`Product dimensions for shipping and storage calculations`}/>
                </label>
                <div className={`grid grid-cols-3 gap-4`}>
                    <input
                        type={`number`}
                        step={0.01}
                        value={formData.dimensions.length}
                        onChange={(e) => updateDimension('length', e.target.value)}
                        placeholder={`Length`}
                        className={`dashboard-form-input border-gray-700`}
                    />
                    <input
                        type={`number`}
                        step={0.01}
                        value={formData.dimensions.width}
                        onChange={(e) => updateDimension('width', e.target.value)}
                        placeholder={`Width`}
                        className={`dashboard-form-input border-gray-700`}
                    />
                    <input
                        type={`number`}
                        step={0.01}
                        value={formData.dimensions.height}
                        onChange={(e) => updateDimension('height', e.target.value)}
                        placeholder={`Height`}
                        className={`dashboard-form-input border-gray-700`}
                    />
                </div>
            </div>

            <div>
                <label className={`dashboard-form-label mb-2`}>Weight (kg)</label>
                <input
                    type={`number`}
                    step={0.001}
                    value={formData.weight}
                    onChange={(e) => updateFormData('weight', e.target.value)}
                    className={`dashboard-form-input border-gray-700`}
                    placeholder={`0.000`}
                />
            </div>

            {/* Toggles */}
            <div className={`flex gap-6`}>
                <label className={`flex items-center cursor-pointer`}>
                    <input
                        type={`checkbox`}
                        checked={formData.is_active}
                        onChange={(e) => updateFormData('is_active', e.target.checked)}
                        className={`size-5 text-teal-600 bg-gray-800 border-gray-700 rounded focus:ring-teal-500 focus:ring-2`}
                    />
                    <span className={`ml-2 text-sm text-gray-300`}>Active</span>
                </label>
                <label className={`flex items-center cursor-pointer`}>
                    <input
                        type={`checkbox`}
                        checked={formData.is_trackable}
                        onChange={(e) => updateFormData('is_trackable', e.target.checked)}
                        className={`size-5 text-teal-600 bg-gray-800 border-gray-700 rounded focus:ring-teal-500 focus:ring-2`}
                    />
                    <span className={`ml-2 text-sm text-gray-300`}>Track Inventory</span>
                </label>
            </div>
        </div>
    )
}