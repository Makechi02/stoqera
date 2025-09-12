'use client'

import {useState} from 'react'
import FeatureComparisonTable from "@/components/pricing/FeatureComparisonTable";
import PricingPlanCard from "@/components/pricing/PricingPlanCard";

export default function PlansGrid({plans}) {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <div>
            <BillingToggle isYearly={isYearly} setIsYearly={setIsYearly}/>

            <div className={`mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3`}>
                {plans.map((plan, index) => (
                    <PricingPlanCard key={plan.id} plan={plan} index={index} isYearly={isYearly}/>
                ))}
            </div>

            <FeatureComparisonTable plans={plans}/>
        </div>
    )
}

function BillingToggle({isYearly, setIsYearly}) {
    return (
        <div className={`mt-12 flex justify-center`}>
            <div className={`relative flex bg-gray-100 p-1 rounded-lg`}>
                <button
                    onClick={() => setIsYearly(false)}
                    className={`relative px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                        !isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setIsYearly(true)}
                    className={`relative px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                        isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                    Yearly
                    <span
                        className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-teal-100 text-teal-800`}
                    >
                        Save 17%
                    </span>
                </button>
            </div>
        </div>
    )
}
