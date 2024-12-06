import {Benefits, Contact, CTA, FAQ, Footer, Hero, OurUsers, Pricing} from "@/components/ui/preview";
import {Header} from "@/components/ui";

const Home = () => {
    return (
        <main className={`bg-background text-text`}>
            <Header/>
            <Hero/>
            <Benefits/>
            <OurUsers/>
            <Pricing/>
            <CTA/>
            <FAQ/>
            <Contact/>
            <Footer/>
        </main>
    )
}

export default Home;