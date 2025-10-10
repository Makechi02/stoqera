'use client'

import {BellIcon, ChartBarIcon, ClockIcon, CubeIcon} from "@heroicons/react/24/outline";
import {motion} from "framer-motion";
import {fadeIn} from "@/data/constants/animations";

export default function Features() {
    const features = [
        {
            icon: <CubeIcon className={`size-6`}/>,
            title: "Real-time Stock Tracking",
            description: "Monitor inventory levels across multiple locations instantly"
        },
        {
            icon: <BellIcon className={`size-6`}/>,
            title: "Low Stock Alerts",
            description: "Never run out with automated reorder notifications"
        },
        {
            icon: <ChartBarIcon className={`size-6`}/>,
            title: "Smart Analytics",
            description: "Make data-driven decisions with powerful insights"
        },
        {
            icon: <ClockIcon className={`size-6`}/>,
            title: "Save Hours Daily",
            description: "Automate repetitive tasks and focus on growth"
        }
    ];

    return (
        <section className={`bg-white py-16`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <motion.div {...fadeIn} className={`text-center mb-12`}>
                    <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}>What You'll See in the Demo</h2>
                    <p className={`text-lg text-gray-600 max-w-2xl mx-auto`}>
                        A complete walkthrough of the features that help businesses manage inventory effortlessly
                    </p>
                </motion.div>

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: index * 0.1, ease: 'easeOut'}}
                            className={`p-6 rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all`}
                        >
                            <div
                                className={`size-12 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 mb-4`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className={`text-lg font-semibold text-gray-900 mb-2`}>{feature.title}</h3>
                            <p className={`text-gray-600 text-sm`}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
