import {CheckIcon} from '@heroicons/react/24/solid'
import Link from 'next/link'
import {PaymentButton} from "@/components/ui/buttons";
import {formatPlanCurrency} from "@/utils/formatters";
import {getAllActivePlans} from "@/lib/querySubscription";

export default async function Pricing() {
    const activePlans = await getAllActivePlans();

    return (
        <section id={`pricing`} className={`bg-gray-50 py-16`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`text-center`}>
                    <h2 className={`text-3xl font-bold text-gray-900 sm:text-4xl font-heading`}>
                        Affordable Inventory Software Plans for Kenya SMBs
                    </h2>
                    <p className={`mt-4 text-xl text-gray-600`}>
                        Transparent pricing for small and medium businesses in Kenya. Choose your inventory management
                        plan with no hidden costs - all plans include core stock control features.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className={`mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3`}>
                    {activePlans.map((plan, index) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl bg-white p-8 hover:shadow-lg transition-shadow ${
                                index === 1 ? 'ring-2 ring-teal-600 shadow-xl' : 'ring-1 ring-gray-200'
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
                                    <span className={`text-4xl font-bold text-gray-900`}>
                                        {formatPlanCurrency(plan.price_monthly)}
                                    </span>
                                    <span className={`text-gray-600`}>/month</span>
                                </div>

                                <p className={`mt-2 text-sm text-gray-500`}>
                                    or {formatPlanCurrency(plan.price_yearly)}/year (save 17%)
                                </p>
                            </div>

                            <ul className={`mt-8 space-y-3`}>
                                <li className={`flex items-center`}>
                                    <CheckIcon className={`size-5 text-teal-600 mr-3 flex-shrink-0`}/>
                                    <span className={`text-gray-700`}>{plan.max_users} users</span>
                                </li>
                                <li className={`flex items-center`}>
                                    <CheckIcon className={`size-5 text-teal-600 mr-3 flex-shrink-0`}/>
                                    <span className={`text-gray-700`}>{plan.max_locations} locations</span>
                                </li>
                                <li className={`flex items-center`}>
                                    <CheckIcon className={`size-5 text-teal-600 mr-3 flex-shrink-0`}/>
                                    <span className={`text-gray-700`}>{plan.max_products} products</span>
                                </li>
                            </ul>

                            <div className={`mt-8`}>
                                <PaymentButton plan={plan} className={`w-full`}/>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className={`mt-12 text-center`}>
                    <p className={`text-gray-600 mb-4`}>Need more details? Compare all features and limits</p>
                    <Link
                        href={`/pricing`}
                        className={`inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold`}
                    >
                        View detailed pricing
                        <svg className={`ml-2 size-5`} fill={`none`} stroke={`currentColor`} viewBox={`0 0 24 24`}>
                            <path strokeLinecap={`round`} strokeLinejoin={`round`} strokeWidth={2} d={`M9 5l7 7-7 7`}/>
                        </svg>
                    </Link>
                </div>

                <TrustIndicators/>
            </div>
        </section>
    )
}

function TrustIndicators() {
    return (
        <div className={`mt-16 border-t border-gray-200 pt-12`}>
            <div className={`grid grid-cols-1 gap-8 md:grid-cols-3 text-center`}>
                <div>
                    <div className={`text-3xl font-bold text-teal-600`}>14 Days</div>
                    <div className={`text-gray-600`}>Free Trial</div>
                </div>
                <div>
                    <div className={`text-3xl font-bold text-teal-600`}>24/7</div>
                    <div className={`text-gray-600`}>WhatsApp Support</div>
                </div>
                <div>
                    <div className={`text-3xl font-bold text-teal-600`}>100%</div>
                    <div className={`text-gray-600`}>Data Security</div>
                </div>
            </div>
        </div>
    )
}
