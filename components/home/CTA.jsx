import Link from "next/link";

export default function CTA() {
    return (
        <section className={`py-20 bg-teal-600`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center`}>
                <h2 className={`text-4xl font-bold text-white mb-4 font-heading`}>
                    Ready to transform your inventory management?
                </h2>
                <p className={`text-xl text-teal-100 mb-8 max-w-3xl mx-auto`}>
                    Join thousands of businesses that trust StockFlow to manage their inventory efficiently.
                </p>
                <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center`}>
                    <Link
                        href={`/register`}
                        className={`bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors`}
                    >
                        Start Your Free Trial
                    </Link>
                    <Link
                        href={`/demo`}
                        className={`border border-teal-400 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-500 transition-colors`}
                    >
                        Schedule Demo
                    </Link>
                </div>
            </div>
        </section>
    )
}