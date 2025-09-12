import Link from "next/link";

export default function PricingCTA() {
    return (
        <div className={`mt-24 text-center bg-teal-50 rounded-2xl p-8 sm:p-12`}>
            <h2 className={`text-3xl font-bold text-gray-900 mb-4`}>Ready to Transform Your Business?</h2>
            <p className={`text-xl text-gray-600 mb-8 max-w-2xl mx-auto`}>
                Join hundreds of Kenyan businesses already using our inventory management system.
                Start your free trial today.
            </p>
            <Link
                href={`/register`}
                className={`bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors`}
            >
                Start Your Free Trial
            </Link>
            <p className={`mt-4 text-sm text-gray-500`}>
                No credit card required • 14-day free trial • Cancel anytime
            </p>
        </div>
    )
}