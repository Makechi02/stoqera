import {Cog8ToothIcon, PlusIcon, TagIcon, TrashIcon} from '@heroicons/react/24/outline';
import {generateSKU} from "@/utils/productUtils";
import {formatCurrency} from "@/utils/formatters";

export default function VariantsTab({variants, setVariants}) {
    const addVariant = () => {
        setVariants(prev => [...prev, {
            id: Date.now(),
            sku: '',
            name: '',
            attributes: {color: '', size: ''},
            cost_price: '',
            selling_price: '',
            barcode: '',
            is_active: true
        }]);
    };

    const updateVariant = (id, field, value) => {
        setVariants(prev => prev.map(v =>
            v.id === id ? {...v, [field]: value} : v
        ));
    };

    const updateVariantAttribute = (id, attr, value) => {
        setVariants(prev => prev.map(v =>
            v.id === id ? {...v, attributes: {...v.attributes, [attr]: value}} : v
        ));
    };

    const removeVariant = (id) => {
        setVariants(prev => prev.filter(v => v.id !== id));
    };

    // Calculate variant profit
    const calculateVariantProfit = (variant) => {
        const cost = parseFloat(variant.cost_price) || 0;
        const selling = parseFloat(variant.selling_price) || 0;
        const profit = selling - cost;
        return {profit, isProfit: profit >= 0};
    };

    return (
        <div className={`space-y-6`}>
            <div className={`flex flex-wrap justify-between items-center gap-4`}>
                <div>
                    <h3 className={`text-lg font-semibold`}>Product Variants</h3>
                    <p className={`text-sm text-gray-400 mt-1`}>
                        Add variants like size, color, or material (optional)
                    </p>
                </div>
                <div className={`flex-1 flex justify-end`}>
                    <button
                        type={`button`}
                        onClick={addVariant}
                        className={`flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                    >
                        <PlusIcon className={`size-5`}/>
                        Add Variant
                    </button>
                </div>
            </div>

            {variants.length === 0 ? (
                <div className={`bg-gray-800 rounded-lg p-12 border border-gray-700 text-center`}>
                    <TagIcon className={`size-12 text-gray-600 mx-auto mb-4`}/>
                    <h4 className={`text-lg font-medium text-gray-400 mb-2`}>No variants added yet</h4>
                    <p className={`text-sm text-gray-500 mb-6`}>
                        Add variants to track different versions of this product
                    </p>
                    <button
                        type={`button`}
                        onClick={addVariant}
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                    >
                        <PlusIcon className={`size-5`}/>
                        Add First Variant
                    </button>
                </div>
            ) : (
                <div className={`space-y-4`}>
                    {variants.map((variant, index) => {
                        const variantProfit = calculateVariantProfit(variant);

                        return (
                            <div key={variant.id} className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                                <div className={`flex justify-between items-start mb-4`}>
                                    <div className={`flex-1`}>
                                        <h4 className={`text-md font-semibold mb-1`}>Variant {index + 1}</h4>
                                        {(variant.cost_price && variant.selling_price) && (
                                            <div
                                                className={`text-sm font-medium ${variantProfit.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                                                {variantProfit.isProfit ? 'Profit' : 'Loss'}:{' '}
                                                {formatCurrency(Math.abs(variantProfit.profit))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type={`button`}
                                        onClick={() => removeVariant(variant.id)}
                                        className={`text-red-400 hover:text-red-300 transition-colors`}
                                    >
                                        <TrashIcon className={`size-5`}/>
                                    </button>
                                </div>

                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Variant SKU *</label>
                                        <div className={`relative`}>
                                            <input
                                                type={`text`}
                                                required
                                                value={variant.sku}
                                                onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                                                className={`dashboard-form-input border-gray-700`}
                                                placeholder={`e.g., PROD-001-RED-M`}
                                            />
                                            <button
                                                type={`button`}
                                                onClick={() => {
                                                    const generatedSku = generateSKU();
                                                    updateVariant(variant.id, 'sku', generatedSku);
                                                }}
                                                className={`absolute right-2 top-2 text-sm bg-primary p-1 rounded-lg`}
                                                title={`Generate SKU`}
                                            >
                                                <Cog8ToothIcon className={`size-4`}/>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Variant Name *</label>
                                        <input
                                            type={`text`}
                                            required
                                            value={variant.name}
                                            onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                                            className={`dashboard-form-input border-gray-700`}
                                            placeholder={`e.g., Red - Medium`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Barcode</label>
                                        <input
                                            type={`text`}
                                            value={variant.barcode}
                                            onChange={(e) => updateVariant(variant.id, 'barcode', e.target.value)}
                                            className={`dashboard-form-input border-gray-700`}
                                            placeholder={`Variant barcode`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Color</label>
                                        <input
                                            type={`text`}
                                            value={variant.attributes.color}
                                            onChange={(e) => updateVariantAttribute(variant.id, 'color', e.target.value)}
                                            className={`dashboard-form-input border-gray-700`}
                                            placeholder={`e.g., Red`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Size</label>
                                        <input
                                            type={`text`}
                                            value={variant.attributes.size}
                                            onChange={(e) => updateVariantAttribute(variant.id, 'size', e.target.value)}
                                            className={`dashboard-form-input border-gray-700`}
                                            placeholder={`e.g., M`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Cost Price</label>
                                        <div className={`relative`}>
                                            <span className={`absolute left-3 top-3 text-gray-400 text-sm`}>Ksh.</span>
                                            <input
                                                type={`number`}
                                                step={0.01}
                                                value={variant.cost_price}
                                                onChange={(e) => updateVariant(variant.id, 'cost_price', e.target.value)}
                                                className={`dashboard-form-input-icon border-gray-700`}
                                                placeholder={`0.00`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Selling Price</label>
                                        <div className={`relative`}>
                                            <span className={`absolute left-3 top-3 text-gray-400 text-sm`}>Ksh.</span>
                                            <input
                                                type={`number`}
                                                step={0.01}
                                                value={variant.selling_price}
                                                onChange={(e) => updateVariant(variant.id, 'selling_price', e.target.value)}
                                                className={`dashboard-form-input-icon border-gray-700`}
                                                placeholder={`0.00`}
                                            />
                                        </div>
                                    </div>

                                    <div className={`flex items-end`}>
                                        <label className={`flex items-center cursor-pointer`}>
                                            <input
                                                type={`checkbox`}
                                                checked={variant.is_active}
                                                onChange={(e) => updateVariant(variant.id, 'is_active', e.target.checked)}
                                                className={`size-5 text-teal-600 bg-gray-800 border-gray-700 rounded focus:ring-teal-500 focus:ring-2`}
                                            />
                                            <span className={`ml-2 text-sm text-gray-300`}>Active</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}
