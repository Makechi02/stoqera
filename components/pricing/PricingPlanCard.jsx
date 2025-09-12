import {formatPlanCurrency} from "@/utils/formatters";
import {BuildingStorefrontIcon, CloudIcon, CubeIcon, UserGroupIcon} from "@heroicons/react/24/outline";
import {PaymentButton} from "@/components/ui/buttons";

export default function PricingPlanCard({plan, index, isYearly}) {
    const getPrice = (plan) => {
        return isYearly ? plan.price_yearly : plan.price_monthly
    }

    const getSavings = (plan) => {
        const monthlyTotal = plan.price_monthly * 12
        const yearlySavings = monthlyTotal - plan.price_yearly
        return Math.round((yearlySavings / monthlyTotal) * 100)
    }

    return (
        <div
            className={`bg-white p-8 relative rounded-2xl ${
                index === 1 ? 'ring-2 ring-teal-600 shadow-xl scale-105' : 'ring-1 ring-gray-200'
            }`}
        >
            {index === 1 && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2`}>
                    <span
                        className={`inline-flex items-center rounded-full bg-teal-600 px-4 py-1 text-sm font-medium text-white`}
                    >
                        Most Popular
                    </span>
                </div>
            )}

            <div className={`text-center`}>
                <h3 className={`text-2xl font-bold text-gray-900`}>{plan.display_name}</h3>
                <p className={`mt-2 text-gray-600`}>{plan.description}</p>

                <div className={`mt-6`}>
                    <span className={`text-4xl font-bold text-gray-900`}>{formatPlanCurrency(getPrice(plan))}</span>
                    <span className={`text-gray-600`}>/{isYearly ? 'year' : 'month'}</span>
                </div>

                {isYearly && (
                    <p className={`mt-2 text-sm text-teal-600 font-medium`}>Save {getSavings(plan)}% annually</p>
                )}
            </div>

            {/* Plan Limits */}
            <div className={`mt-8 grid grid-cols-2 gap-4 text-sm`}>
                <div className={`text-center p-3 bg-gray-50 rounded-lg`}>
                    <UserGroupIcon className={`size-6 mx-auto text-teal-600 mb-1`}/>
                    <div className={`font-semibold text-background`}>{plan.max_users} Users</div>
                </div>
                <div className={`text-center p-3 bg-gray-50 rounded-lg`}>
                    <BuildingStorefrontIcon className={`size-6 mx-auto text-teal-600 mb-1`}/>
                    <div
                        className={`font-semibold text-background`}>{plan.max_locations} Location{plan.max_locations > 1 ? 's' : ''}</div>
                </div>
                <div className={`text-center p-3 bg-gray-50 rounded-lg`}>
                    <CubeIcon className={`size-6 mx-auto text-teal-600 mb-1`}/>
                    <div
                        className={`font-semibold text-background`}>{plan.max_products.toLocaleString()} Products
                    </div>
                </div>
                <div className={`text-center p-3 bg-gray-50 rounded-lg`}>
                    <CloudIcon className={`size-6 mx-auto text-teal-600 mb-1`}/>
                    <div className={`font-semibold text-background`}>{plan.storage_limit_gb}GB Storage</div>
                </div>
            </div>

            <div className={`mt-8`}>
                <PaymentButton
                    plan={plan}
                    billingType={isYearly ? 'yearly' : 'monthly'}
                    className={`w-full`}
                />
            </div>
        </div>
    )
}