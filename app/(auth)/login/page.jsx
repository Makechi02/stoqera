'use client'

import {motion} from 'framer-motion';
import {CheckCircleIcon} from '@heroicons/react/24/outline';
import LoginForm from "@/components/auth/LoginForm";
import {fadeInUp} from "@/data/constants/animations";

export default function Page() {
    return (
        <div className={`min-h-svh`}>
            <Features/>
            <LoginForm/>
        </div>
    );
};

function Features() {
    const features = [
        {
            title: 'Real-time Tracking',
            description: 'Monitor your inventory levels in real-time across all locations.'
        },
        {
            title: 'Multi-location Support',
            description: 'Manage inventory across multiple warehouses and stores.'
        },
        {
            title: 'Advanced Analytics',
            description: 'Get insights with powerful reporting and forecasting tools.'
        }
    ];

    return (
        <div className={`fixed top-0 left-0 h-full hidden lg:flex lg:w-1/2 bg-teal-600 text-white p-12 items-center`}>
            <motion.div
                initial={`initial`}
                animate={`animate`}
                variants={fadeInUp}
                className={`max-w-md`}
            >
                <h2 className={`text-4xl font-bold font-heading`}>Welcome Back to Finviq</h2>
                <p className={`text-xl text-teal-100 mb-6`}>
                    Manage your inventory with confidence and precision.
                </p>

                <div className={`space-y-6`}>
                    {features.map((feature, index) => (
                        <div key={index} className={`flex items-start space-x-3`}>
                            <CheckCircleIcon className={`size-6 text-teal-200 mt-1 flex-shrink-0`}/>
                            <div>
                                <h3 className={`font-semibold text-teal-100`}>{feature.title}</h3>
                                <p className={`text-teal-200 text-sm`}>{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
