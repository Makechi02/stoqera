import {CTA, Features, Footer, Header, Hero, Pricing} from "@/components/home";
import Script from "next/script";

export default function Page() {
    return (
        <>
            <Script type={`application/ld+json`} id={`software-ld-json`} strategy={`afterInteractive`}>
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Finviq Inventory Management Software",
                    "applicationCategory": "BusinessApplication",
                    "operatingSystem": "Web Browser",
                    "description": "Professional inventory management software designed for small and medium businesses in Kenya. Features real-time stock tracking, automated alerts, and comprehensive analytics.",
                    "url": "https://finviq.vercel.app",
                    "image": "https://finviq.vercel.app/assets/images/finviq-logo-without-bg.webp",
                    "offers": [
                        {
                            "@type": "Offer",
                            "name": "Finviq Starter Plan",
                            "description": "Essential inventory management features for small businesses",
                            "price": "2900",
                            "priceCurrency": "KES",
                            "priceValidUntil": "2025-12-31",
                            "availability": "https://schema.org/InStock"
                        },
                        {
                            "@type": "Offer",
                            "name": "Finviq Professional Plan",
                            "description": "Advanced inventory management with analytics for growing businesses",
                            "price": "7900",
                            "priceCurrency": "KES",
                            "priceValidUntil": "2025-12-31",
                            "availability": "https://schema.org/InStock"
                        }
                    ],
                    "provider": {
                        "@type": "Organization",
                        "name": "Finviq",
                        "url": "https://finviq.vercel.app",
                        "logo": "https://finviq.vercel.app/assets/images/finviq-logo-without-bg.webp",
                        "address": {
                            "@type": "PostalAddress",
                            "addressCountry": "KE",
                            "addressLocality": "Nairobi"
                        }
                    },
                    "featureList": [
                        "Real-time inventory tracking",
                        "Automated reorder alerts",
                        "Inventory analytics and reporting",
                        "Multi-location stock management",
                        "Barcode scanning support",
                        "Low stock notifications"
                    ],
                    "audience": {
                        "@type": "BusinessAudience",
                        "audienceType": "Small and Medium Businesses"
                    }
                })}
            </Script>

            <Script type={`application/ld+json`} id={`organization-ld-json`} strategy={`afterInteractive`}>
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Finviq",
                    "url": "https://finviq.vercel.app",
                    "logo": "https://finviq.vercel.app/assets/images/finviq-logo-without-bg.webp",
                    "description": "Leading provider of inventory management software for small and medium businesses in Kenya",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "KE",
                        "addressLocality": "Nairobi"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+254-716-862131",
                        "contactType": "customer service",
                        "availableLanguage": ["English", "Swahili"]
                    }
                })}
            </Script>

            <main className={`min-h-screen bg-white`}>
                <Header/>
                <Hero/>
                <Features/>
                <Pricing/>
                {/*TODO: Add Testimonials*/}
                {/*<Testimonials/>*/}
                <CTA/>
                <Footer/>
            </main>
        </>
    );
};
