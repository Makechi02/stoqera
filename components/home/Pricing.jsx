'use client'

import {motion} from "framer-motion";
import {CheckIcon} from "@heroicons/react/24/outline";
import React from "react";
import Link from "next/link";

export default function Pricing() {
    const plans = [
        {
            name: "Starter",
            price: "Ksh. 2900",
            description: "Perfect for small businesses",
            features: [
                "Up to 1,000 products",
                "Basic analytics",
                "Email support",
                "Mobile app access",
                "Cloud storage"
            ],
            popular: false
        },
        {
            name: "Professional",
            price: "Ksh. 7900",
            description: "Best for growing businesses",
            features: [
                "Up to 10,000 products",
                "Advanced analytics",
                "Priority support",
                "Multi-location tracking",
                "API access",
                "Custom reports"
            ],
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For large organizations",
            features: [
                "Unlimited products",
                "Enterprise analytics",
                "24/7 phone support",
                "Custom integrations",
                "Dedicated account manager",
                "SLA guarantee"
            ],
            popular: false
        }
    ];

    return (
        <section id={`pricing`} className={`py-20 bg-gray-50`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`text-center mb-16`}>
                    <h2 className={`text-4xl font-bold text-gray-900 mb-4 font-heading`}>
                        Simple, transparent pricing
                    </h2>
                    <p className={`text-xl text-gray-600 max-w-3xl mx-auto`}>
                        Choose the plan that's right for your business. All plans include our core features.
                    </p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8`}>
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            className={`bg-white rounded-xl p-8 ${plan.popular ? 'border-2 border-teal-500 relative' : 'border border-gray-200'}`}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                        >
                            {plan.popular && (
                                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2`}>
                                    <span
                                        className={`bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold`}
                                    >
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className={`text-center mb-6`}>
                                <h3 className={`text-2xl font-bold text-gray-900 mb-2`}>{plan.name}</h3>
                                <div className={`text-4xl font-bold text-gray-900 mb-2`}>
                                    {plan.price}
                                    {plan.price !== "Custom" && <span className={`text-lg text-gray-600`}>/month</span>}
                                </div>
                                <p className={`text-gray-600`}>{plan.description}</p>
                            </div>

                            <ul className={`space-y-3 mb-8`}>
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className={`flex items-center`}>
                                        <CheckIcon className={`size-5 text-teal-500 mr-3`}/>
                                        <span className={`text-gray-600`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.price === 'Custom' ? '/contact-sales' : '/register'}
                                className={`w-full block py-3 px-4 rounded-lg font-semibold transition-colors text-center ${
                                    plan.popular
                                        ? 'bg-teal-600 text-white hover:bg-teal-700'
                                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                }`}
                            >
                                {plan.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}