import React from 'react'
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/solid'
import {
    BuildingStorefrontIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    CloudIcon,
    CreditCardIcon,
    CubeIcon,
    PhoneIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'

export default function FeatureComparisonTable({plans}) {
    const featureCategories = [
        {
            name: 'Core Features',
            features: [
                {key: 'product_management', label: 'Product Management', icon: CubeIcon},
                {key: 'stock_tracking', label: 'Stock In/Out Tracking', icon: ChartBarIcon},
                {key: 'basic_pos', label: 'Point of Sale', icon: CreditCardIcon},
                {key: 'mobile_app', label: 'Mobile App Access', icon: BuildingStorefrontIcon},
                {key: 'customer_records', label: 'Customer Management', icon: UserGroupIcon}
            ]
        },
        {
            name: 'Reports & Analytics',
            features: [
                {key: 'basic_reports', label: 'Basic Sales Reports', icon: ChartBarIcon},
                {key: 'advanced_reports', label: 'Advanced Analytics', icon: ChartBarIcon},
                {key: 'profit_tracking', label: 'Profit Margin Tracking', icon: ChartBarIcon}
            ]
        },
        {
            name: 'Business Operations',
            features: [
                {key: 'barcode_scanning', label: 'Barcode Scanning', icon: CubeIcon},
                {key: 'multi_location', label: 'Multi-Location Management', icon: BuildingStorefrontIcon},
                {key: 'purchase_orders', label: 'Purchase Order Management', icon: CubeIcon},
                {key: 'supplier_management', label: 'Supplier Management', icon: UserGroupIcon}
            ]
        },
        {
            name: 'Support & Integration',
            features: [
                {key: 'whatsapp_support', label: 'WhatsApp Support', icon: ChatBubbleLeftRightIcon},
                {key: 'priority_support', label: 'Priority Support', icon: ChatBubbleLeftRightIcon},
                {key: 'phone_support', label: 'Phone Support', icon: PhoneIcon},
                {key: 'mpesa_integration', label: 'M-Pesa Integration', icon: CreditCardIcon},
                {key: 'api_access', label: 'API Access', icon: CloudIcon}
            ]
        },
        {
            name: 'Advanced Features',
            features: [
                {key: 'custom_branding', label: 'Custom Branding', icon: BuildingStorefrontIcon},
                {key: 'multi_currency', label: 'Multi-Currency Support', icon: CreditCardIcon},
                {key: 'batch_tracking', label: 'Batch/Expiry Tracking', icon: CubeIcon}
            ]
        }
    ]

    return (
        <div className={`mt-24`}>
            <h2 className={`text-3xl font-bold text-gray-900 text-center mb-12`}>Compare All Features</h2>

            <div className={`overflow-x-auto`}>
                <table className={`w-full border-collapse border border-gray-200`}>
                    <thead>
                    <tr className={`bg-gray-50`}>
                        <th className={`border border-gray-200 px-6 py-4 text-left font-semibold text-gray-900`}>
                            Features
                        </th>
                        {plans.map((plan) => (
                            <th
                                key={plan.id}
                                className={`border border-gray-200 px-6 py-4 text-center font-semibold text-gray-900`}
                            >
                                {plan.display_name}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {featureCategories.map((category) => (
                        <React.Fragment key={category.name}>
                            <tr className={`bg-gray-100`}>
                                <td className={`border border-gray-200 px-6 py-3 font-semibold text-gray-900`}
                                    colSpan={plans.length + 1}>
                                    {category.name}
                                </td>
                            </tr>
                            {category.features.map((feature) => (
                                <tr key={feature.key} className={`hover:bg-gray-50`}>
                                    <td className={`border border-gray-200 px-6 py-4`}>
                                        <div className={`flex items-center`}>
                                            <feature.icon className={`size-5 text-gray-400 mr-3`}/>
                                            <span className={`text-gray-900`}>{feature.label}</span>
                                        </div>
                                    </td>
                                    {plans.map((plan) => (
                                        <td key={plan.id} className={`border border-gray-200 px-6 py-4 text-center`}>
                                            {plan.features && plan.features[feature.key] ? (
                                                <CheckIcon className={`size-5 text-teal-600 mx-auto`}/>
                                            ) : (
                                                <XMarkIcon className={`size-5 text-gray-300 mx-auto`}/>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}