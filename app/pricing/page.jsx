import PlansGrid from "@/components/pricing/PlansGrid";
import {getAllActivePlans} from "@/lib/querySubscription";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingCTA from "@/components/pricing/PricingCTA";
import {Footer} from "@/components/home";

export const metadata = {
    title: `Pricing | Stoqera`,
    alternates: {
        canonical: `/pricing`
    }
}

export default async function Page() {
    const activePlans = await getAllActivePlans();

    return (
        <div className={`bg-white`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16`}>
                <div className={`text-center`}>
                    <h1 className={`text-4xl font-bold text-gray-900 sm:text-5xl font-heading`}>
                        Affordable Inventory Software Plans for You
                    </h1>
                    <p className={`mt-4 text-xl text-gray-600 max-w-3xl mx-auto`}>
                        Transparent pricing designed for small and medium businesses in Kenya.
                        Start with our 14-day free trial, no credit card required.
                    </p>
                </div>

                <PlansGrid plans={activePlans}/>
                <PricingFAQ/>
                <PricingCTA/>
            </div>
            <Footer/>
        </div>
    )
}
