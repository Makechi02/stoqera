'use client'

import {PlayCircleIcon} from "@heroicons/react/24/outline";
import {motion} from 'framer-motion';

export default function Hero() {
    return (
        <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pt-20 sm:pb-16`}>
            <motion.div
                className={`text-center max-w-3xl mx-auto`}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: 'easeOut'}}
            >
                <div
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6`}>
                    <PlayCircleIcon className={`size-5`}/>
                    <span>5-minute product walkthrough</span>
                </div>

                <h1
                    className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight font-heading`}
                >
                    See How We Simplify
                    <span className={`text-teal-600`}> Inventory Management</span>
                </h1>

                <p className={`text-xl text-gray-600 mb-8 leading-relaxed`}>
                    Watch how businesses like yours are saving 10+ hours per week with automated inventory tracking,
                    smart alerts, and real-time insights.
                </p>
            </motion.div>
        </section>
    )
}
