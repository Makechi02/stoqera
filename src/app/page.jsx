import {Benefits, CTA, FAQ, Footer, Hero} from "@/components/ui/preview";
import {Header} from "@/components/ui";

const Home = () => {
    return (
        <main className={`bg-background`}>
            <Header/>
            <Hero/>
            <Benefits/>
            <CTA/>
            <FAQ/>
            <Footer/>
        </main>
    )
}

export default Home;