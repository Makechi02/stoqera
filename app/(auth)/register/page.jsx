'use client'

import {motion} from 'framer-motion';
import {CheckCircleIcon} from '@heroicons/react/24/outline';
import SignUpForm from "@/components/auth/SignUpForm";
import {fadeInUp} from "@/data/constants/animations";

export default function Page() {
    return (
        <div className={`min-h-svh`}>
            <Benefits/>
            <SignUpForm/>
        </div>
    );
};

function Benefits() {
    const benefits = [
        {
            title: '14-day free trial',
            description: 'Full access to all features, no credit card required'
        },
        {
            title: 'Setup in minutes',
            description: 'Get started quickly with our intuitive onboarding process'
        },
        {
            title: 'Expert support',
            description: 'Our team is here to help you succeed every step of the way'
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
                <h2 className={`text-4xl font-bold mb-6 font-heading`}>
                    Join hundreds of Kenyan businesses managing inventory smarter
                </h2>

                <div className={`space-y-6`}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className={`flex items-start space-x-3`}>
                            <CheckCircleIcon className={`size-6 text-teal-200 mt-1 flex-shrink-0`}/>
                            <div>
                                <h3 className={`font-semibold text-teal-100`}>{benefit.title}</h3>
                                <p className={`text-teal-200 text-sm`}>{benefit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/*<TrustIndicator/>*/}
            </motion.div>
        </div>
    )
}

function TrustIndicator() {
    return (
        <div className={`mt-12 p-6 bg-teal-500 rounded-lg`}>
            <p className={`text-sm text-teal-100 mb-2`}>Trusted by 10,000+ businesses</p>
            <div className={`flex items-center space-x-4`}>
                <div className={`text-2xl font-bold`}>4.9/5</div>
                <div className={`flex space-x-1`}>
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-4 h-4 bg-yellow-400 rounded-full`}></div>
                    ))}
                </div>
                <div className={`text-sm text-teal-100`}>from 500+ reviews</div>
            </div>
        </div>
    )
}