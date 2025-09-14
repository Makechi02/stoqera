import {CTA, Features, Footer, Header, Hero, Pricing} from "@/components/home";
import Script from "next/script";

export default function Page() {
    return (
        <>
            <Script type={`application/ld+json`} id={`software-ld-json`} strategy={`afterInteractive`}>
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "Stoqera Inventory Management Software",
                    "applicationCategory": "BusinessApplication",
                    "operatingSystem": "Web Browser",
                    "description": "Professional inventory management software designed for small and medium businesses in Kenya. Features real-time stock tracking, automated alerts, and comprehensive analytics.",
                    "url": "https://stoqera.co.ke",
                    "image": "https://stoqera.co.ke/assets/images/stoqera-logo-mark.svg",
                    "offers": [
                        {
                            "@type": "Offer",
                            "name": "Stoqera Starter Plan",
                            "description": "Essential inventory management features for small businesses",
                            "price": "2900",
                            "priceCurrency": "KES",
                            "priceValidUntil": "2025-12-31",
                            "availability": "https://schema.org/InStock"
                        },
                        {
                            "@type": "Offer",
                            "name": "Stoqera Professional Plan",
                            "description": "Advanced inventory management with analytics for growing businesses",
                            "price": "7900",
                            "priceCurrency": "KES",
                            "priceValidUntil": "2025-12-31",
                            "availability": "https://schema.org/InStock"
                        }
                    ],
                    "provider": {
                        "@type": "Organization",
                        "name": "Stoqera",
                        "url": "https://stoqera.co.ke",
                        "logo": "https://stoqera.co.ke/assets/images/stoqera-logo-mark.svg",
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
                    "name": "Stoqera",
                    "url": "https://stoqera.co.ke",
                    "logo": "https://stoqera.co.ke/assets/images/stoqera-logo-mark.svg",
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
