import {CTA, Features, Footer, Header, Hero, Pricing, Testimonials} from "@/components/home";

export default function Page() {
    return (
        <main className={`min-h-screen bg-white`}>
            <Header/>
            <Hero/>
            <Features/>
            <Pricing/>
            <Testimonials/>
            <CTA/>
            <Footer/>
        </main>
    );
};
