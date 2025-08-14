'use client'

import {motion} from 'framer-motion';
import {
    ChartBarIcon,
    ClockIcon,
    CloudArrowUpIcon,
    CubeIcon,
    DevicePhoneMobileIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Features() {
    const features = [
        {
            icon: ChartBarIcon,
            title: "Real-time Analytics",
            description: "Get instant insights into your inventory levels, sales trends, and performance metrics."
        },
        {
            icon: ClockIcon,
            title: "Automated Alerts",
            description: "Never run out of stock again with intelligent low-stock alerts and reorder notifications."
        },
        {
            icon: CloudArrowUpIcon,
            title: "Cloud-based",
            description: "Access your inventory data from anywhere with secure cloud storage and real-time sync."
        },
        {
            icon: DevicePhoneMobileIcon,
            title: "Mobile Ready",
            description: "Manage your inventory on the go with our responsive design and mobile apps."
        },
        {
            icon: ShieldCheckIcon,
            title: "Secure & Reliable",
            description: "Enterprise-grade security with 99.9% uptime guarantee and automatic backups."
        },
        {
            icon: CubeIcon,
            title: "Multi-location",
            description: "Track inventory across multiple warehouses, stores, and locations from one dashboard."
        }
    ];

    return (
        <section id={`features`} className={`py-20 bg-white`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`text-center mb-16`}>
                    <h2 className={`text-4xl font-bold text-gray-900 mb-4 font-heading`}>
                        Everything you need to manage inventory
                    </h2>
                    <p className={`text-xl text-gray-600 max-w-3xl mx-auto`}>
                        Powerful features designed to streamline your operations and boost efficiency
                    </p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors`}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                        >
                            <feature.icon className={`h-12 w-12 text-teal-600 mb-4`}/>
                            <h3 className={`text-xl font-semibold text-gray-900 mb-2`}>{feature.title}</h3>
                            <p className={`text-gray-600`}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}