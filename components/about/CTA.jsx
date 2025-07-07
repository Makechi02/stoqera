import React from "react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className={`py-20 bg-gradient-to-br from-primary to-primary/90 text-white`}>
            <div className={`container mx-auto px-4 text-center`}>
                <h2 className={`text-3xl md:text-4xl font-bold mb-6`}>Ready to Transform Your Inventory Management?</h2>
                <p className={`max-w-2xl mx-auto mb-8 text-white/80`}>
                    Join the growing number of businesses that trust Finviq for their inventory needs.
                </p>
                <div className={`flex flex-col sm:flex-row items-center justify-center gap-4`}>
                    <Link
                        href={`/accounts/register`}
                        className={`bg-white text-primary px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all`}
                    >
                        Get Started
                    </Link>
                    <Link
                        href={`/info/learn-more`}
                        className={`bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all`}
                    >
                        Request Demo
                    </Link>
                </div>
            </div>
        </section>
    )
}