import {Footer, Header} from "@/components";
import {navLinks} from "@/data/constants";
import {Benefits, Contact, CTA, FAQ, Hero, OurUsers, Pricing} from "@/components/home";

export default function Page() {
    return (
        <>
            <Header navLinks={navLinks}/>
            <main>
                <Hero/>
                <Benefits/>
                <OurUsers/>
                <Pricing/>
                <CTA/>
                <FAQ/>
                <Contact/>
            </main>
            <Footer/>
        </>
    );
};
