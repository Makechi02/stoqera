import {
    Benefits,
    CTA,
    FAQ,
    Footer,
    Hero,
    Pricing
} from "@/components/ui/preview";
import {Header} from "@/components/ui";

const Home = () => {
    return (
        <main className={`bg-background text-text`}>
            <Header/>
            <Hero/>
            <Benefits/>
            <Pricing/>
            <CTA/>
            <FAQ/>
            <Footer/>
        </main>
    )
}

export default Home;