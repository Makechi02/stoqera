'use client'

import {motion} from "framer-motion";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {fadeIn} from "@/data/constants/animations";
import Link from "next/link";

export default function CTA() {
    return (
        <section className={`py-16 bg-gradient-to-br from-teal-600 to-teal-700`}>
            <motion.div {...fadeIn} className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center`}>
                <h2 className={`text-3xl sm:text-4xl font-bold mb-4`}>Ready to Transform Your Inventory Management?</h2>
                <p className={`text-xl text-teal-100 mb-8`}>Start your free 14-day trial. No credit card required.</p>

                <div className={`max-w-md mx-auto`}>
                    <Link
                        href={`/register`}
                        className={`px-8 py-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors font-semibold whitespace-nowrap`}
                    >
                        Start Free Trial
                    </Link>

                    <p className={`text-teal-100 text-sm mt-6`}>
                        <CheckCircleIcon className={`size-4 inline mr-1`}/>
                        Free for 14 days · No credit card required
                    </p>
                </div>
            </motion.div>
        </section>
    )
}