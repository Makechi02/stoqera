import {CTA, Features, Footer, Header, Hero, Pricing} from "@/components/home";

export default function Page() {
    return (
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
    );
};
