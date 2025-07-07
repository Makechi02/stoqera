import Link from "next/link";
import {pricingPlans} from "@/data/constants";

export default function Pricing() {
    return (
        <section className={`mx-auto max-w-screen-xl px-4 sm:px-6 sm:py-12 lg:px-8 py-16`} id={`pricing`}>
            <div className={`my-8 text-center`}>
                <p className={`font-bold text-primary text-2xl my-6`}>Our Pricing</p>
                <h2 className={`max-w-screen-md mx-auto text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>
                    Transparent Pricing Plans, Find the Perfect Fit for Your Needs
                </h2>
            </div>
            <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:grid-cols-3 md:gap-8`}>
                {pricingPlans.map((plan, index) => (
                    <div
                        key={index}
                        className={`rounded-2xl border border-gray-200 p-6 shadow-sm sm:px-8 lg:p-12 bg-gray-100 ${
                            plan.most_popular && 'border-primary ring-1 ring-primary bg-primary text-white'
                        } hover:ring-1 hover:ring-primary`}
                    >
                        <div className={`text-center`}>
                            <h2 className={`text-xl font-medium`}>
                                {plan.title}
                                <span className={`sr-only`}>{plan.sr_only_text}</span>
                            </h2>

                            <p className={`mt-2 sm:mt-4`}>
                                <strong className={`text-3xl font-bold sm:text-4xl font-gfs_didot`}> {plan.amount} </strong>
                                <span className={`text-sm font-medium`}> {plan.billing} </span>
                            </p>
                        </div>

                        <ul className={`mt-6 space-y-2`}>
                            {plan.features.map((feature, index) => (
                                <li key={index} className={`flex items-center gap-1`}>
                                    <CheckIcon styles={`${plan.most_popular ? 'text-white' : 'text-primary'}`}/>
                                    <span> {feature} </span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href={`#`}
                            className={`text-primary hover:ring-primary mt-8 block rounded-full border border-primary px-12 py-3 text-center text-sm font-medium hover:ring-1 focus:outline-none focus:ring active:text-indigo-500 ${
                                !plan.most_popular ? 'bg-primary text-white hover:ring-primary hover:bg-primary/70' : 'bg-white'
                            }`}
                        >
                            Get Started
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

function CheckIcon({styles = ''}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-5 ${styles}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
        </svg>
    )
}
