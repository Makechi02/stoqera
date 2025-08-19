import {CurrencyDollarIcon} from "@heroicons/react/24/outline";
import {formatCurrency} from "@/utils/formatters";

export default function PricingForm({formData, errors, onChange}) {
    return (
        <div className={`space-y-6`}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Cost Price <span className={`text-red-400`}>*</span>
                    </label>
                    <div className={`relative`}>
                        <CurrencyDollarIcon
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                        <input
                            type={`number`}
                            step={0.01}
                            min={0}
                            value={formData.cost_price}
                            placeholder={`0.00`}
                            onChange={(e) => onChange('cost_price', e.target.value)}
                            className={`dashboard-form-input-icon ${errors.cost_price ? 'border-red-500' : 'border-gray-600'}`}
                        />
                    </div>
                    {errors.cost_price && <p className={`text-red-400 text-sm mt-1`}>{errors.cost_price}</p>}
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Selling Price <span className={`text-red-400`}>*</span>
                    </label>
                    <div className={`relative`}>
                        <CurrencyDollarIcon
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                        <input
                            type={`number`}
                            step={0.01}
                            min={0}
                            value={formData.selling_price}
                            placeholder={`0.00`}
                            onChange={(e) => onChange('selling_price', e.target.value)}
                            className={`dashboard-form-input-icon ${errors.selling_price ? 'border-red-500' : 'border-gray-600'}`}
                        />
                    </div>
                    {errors.selling_price && <p className={`text-red-400 text-sm mt-1`}>{errors.selling_price}</p>}
                </div>
            </div>

            {formData.cost_price && formData.selling_price && (
                <div className={`bg-gray-800 p-4 rounded-lg border border-gray-700`}>
                    <div className={`flex items-center justify-between`}>
                        <span className={`text-gray-300`}>Profit Margin:</span>
                        <span className={`text-teal-400 font-semibold`}>
                            {formatCurrency((parseFloat(formData.selling_price) - parseFloat(formData.cost_price)))}
                            ({(((parseFloat(formData.selling_price) - parseFloat(formData.cost_price)) / parseFloat(formData.selling_price)) * 100).toFixed(1)}%)
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
