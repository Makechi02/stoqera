import {InformationCircleIcon} from '@heroicons/react/24/outline';
import {formatCurrency} from "@/utils/formatters";
import InfoTooltip from "@/components/dashboard/products/InfoTooltip";

export default function PricingTab({formData, updateProduct}) {
    const calculateProfit = () => {
        const cost = parseFloat(formData.cost_price) || 0;
        const selling = parseFloat(formData.selling_price) || 0;
        const profit = selling - cost;
        const margin = cost > 0 ? ((profit / cost) * 100).toFixed(2) : 0;
        return {profit, margin, isProfit: profit >= 0};
    };

    const profit = calculateProfit();

    const guides = [
        {title: 'Minimum Stock', description: 'Safety buffer - alerts when stock is critically low'},
        {title: 'Reorder Point', description: 'Triggers reorder - should be above minimum to account for lead time'},
        {
            title: 'Reorder Quantity',
            description: 'Amount to restock - calculated based on demand and supplier minimums'
        },
        {title: 'Maximum Stock', description: 'Storage capacity limit - prevents overstocking'}
    ];

    return (
        <div className={`space-y-6`}>
            {/* Profit Calculator Card */}
            {(formData.cost_price && formData.selling_price) && (
                <div
                    className={`rounded-lg p-6 border-2 ${profit.isProfit ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'}`}>
                    <div className={`flex flex-wrap items-start justify-between gap-4`}>
                        <div>
                            <h3 className={`text-lg font-semibold text-white mb-1`}>
                                {profit.isProfit ? 'Profit Analysis' : 'Loss Warning'}
                            </h3>
                            <p className={`text-sm text-gray-400`}>Based on current pricing</p>
                        </div>
                        <div className={`flex-1 flex flex-col justify-end text-right`}>
                            <div
                                className={`text-3xl font-bold ${profit.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                                {formatCurrency(Math.abs(profit.profit))}
                            </div>
                            <div className={`text-sm ${profit.isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                {profit.margin}% margin
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>
                            Cost Price *
                            <InfoTooltip text={`The amount you pay to acquire or produce this product`}/>
                        </label>
                        <div className={`relative`}>
                            <span className={`absolute left-2 top-3 text-gray-400 text-sm`}>Ksh.</span>
                            <input
                                type={`number`}
                                step={0.01}
                                required
                                value={formData.cost_price}
                                onChange={(e) => updateProduct('cost_price', e.target.value)}
                                className={`dashboard-form-input-icon border-gray-700`}
                                placeholder={`0.00`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>
                            Selling Price *
                            <InfoTooltip text={`The price at which you sell this product to customers`}/>
                        </label>
                        <div className={`relative`}>
                            <span className={`absolute left-2 top-3 text-gray-400 text-sm`}>Ksh.</span>
                            <input
                                type={`number`}
                                step={0.01}
                                required
                                value={formData.selling_price}
                                onChange={(e) => updateProduct('selling_price', e.target.value)}
                                className={`dashboard-form-input-icon border-gray-700`}
                                placeholder={`0.00`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`flex items-center text-sm font-medium text-gray-300 mb-2`}>
                            Minimum Stock Level
                            <InfoTooltip
                                text={`The lowest quantity you want to maintain in stock before receiving alerts`}/>
                        </label>
                        <input
                            type={`number`}
                            value={formData.min_stock_level}
                            onChange={(e) => updateProduct('min_stock_level', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`0`}
                        />
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>
                            Maximum Stock Level
                            <InfoTooltip
                                text={`The maximum quantity you can or want to store (based on warehouse capacity)`}/>
                        </label>
                        <input
                            type={`number`}
                            value={formData.max_stock_level}
                            onChange={(e) => updateProduct('max_stock_level', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`0`}
                        />
                    </div>

                    <div>
                        <label className={`flex items-center text-sm font-medium text-gray-300 mb-2`}>
                            Reorder Point
                            <InfoTooltip
                                text={`When stock reaches this level, the system will trigger a reorder alert. Set this higher than minimum stock to account for delivery time.`}/>
                        </label>
                        <input
                            type={`number`}
                            value={formData.reorder_point}
                            onChange={(e) => updateProduct('reorder_point', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`0`}
                        />
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>
                            Reorder Quantity
                            <InfoTooltip
                                text={`The standard quantity to order when restocking. This should bring you back to optimal stock levels.`}/>
                        </label>
                        <input
                            type={`number`}
                            value={formData.reorder_quantity}
                            onChange={(e) => updateProduct('reorder_quantity', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`0`}
                        />
                    </div>
                </div>

                <div className={`bg-gray-800 rounded-lg p-4 border border-gray-700`}>
                    <h4 className={`text-sm font-medium text-gray-300 mb-3 flex items-center`}>
                        <InformationCircleIcon className={`size-5 mr-2 text-teal-400`}/>
                        Stock Management Guide
                    </h4>
                    <div className={`space-y-2 text-sm text-gray-400`}>
                        {guides.map((guide, index) => (
                            <div key={index} className={`flex items-start`}>
                                <div className={`size-2 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0`}/>
                                <div>
                                    <span className={`text-teal-400 font-medium`}>{guide.title}:</span>{' '}
                                    {guide.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
