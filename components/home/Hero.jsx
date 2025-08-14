'use client'

import {ChevronRightIcon, PlayIcon} from '@heroicons/react/24/outline';
import {motion} from "framer-motion";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const fadeInUp = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        transition: {duration: 0.6}
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <section className={`relative bg-gradient-to-br from-teal-50 to-cyan-50 py-20`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <motion.div
                    className={`text-center`}
                    initial={`initial`}
                    animate={`animate`}
                    variants={staggerChildren}
                >
                    <motion.h1
                        className={`text-5xl md:text-7xl font-bold text-gray-900 mb-6 font-heading`}
                        variants={fadeInUp}
                    >
                        Inventory Management
                        <span className={`text-teal-600 block`}>Made Simple</span>
                    </motion.h1>

                    <motion.p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto`} variants={fadeInUp}>
                        Streamline your inventory operations with real-time tracking, automated alerts,
                        and powerful analytics. Perfect for businesses of all sizes.
                    </motion.p>

                    <motion.div
                        className={`flex flex-col sm:flex-row gap-4 justify-center items-center`}
                        variants={fadeInUp}
                    >
                        <Link
                            href={`/register`}
                            className={`bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors flex items-center`}
                        >
                            Start 14-Day Free Trial
                            <ChevronRightIcon className={`ml-2 size-5`}/>
                        </Link>
                        <Link
                            href={`/demo`}
                            className={`border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center`}
                        >
                            <PlayIcon className={`mr-2 size-5`}/>
                            Watch Demo
                        </Link>
                    </motion.div>

                    <motion.p className={`text-sm text-gray-500 mt-4`} variants={fadeInUp}>
                        No credit card required • Setup in 5 minutes
                    </motion.p>
                </motion.div>
            </div>

            {/* Dashboard Preview */}
            <motion.div
                className={`max-w-5xl mx-auto mt-16 px-4 sm:px-6 lg:px-8`}
                initial={{opacity: 0, y: 50}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, delay: 0.5}}
            >
                <div className={`bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden`}>
                    <div className={`bg-gray-50 px-4 py-3 border-b border-gray-200`}>
                        <div className={`flex space-x-2`}>
                            <div className={`size-3 bg-red-400 rounded-full`}></div>
                            <div className={`size-3 bg-yellow-400 rounded-full`}></div>
                            <div className={`size-3 bg-green-400 rounded-full`}></div>
                        </div>
                    </div>
                    <div className={`h-96 bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center relative`}>
                        <Image
                            src={`/assets/images/screenshots/dashboard-screenshot.png`}
                            alt={`Dashboard Preview`}
                            fill={true}
                            className={`object-left md:object-center object-cover`}
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    )
}