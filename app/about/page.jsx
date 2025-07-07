import {Footer, Header} from "@/components";
import {aboutNavLinks} from "@/data/constants";
import {
    Benefits, CTA,
    Features,
    Hero,
    Introduction,
    Roadmap,
    TargetAudience,
    Team,
    TechnologyStack
} from "@/components/about";

export const metadata = {
    title: 'About - Finviq'
}

export default function Page() {
    return (
        <div>
            <Header navLinks={aboutNavLinks}/>
            <Hero/>
            <main>
                <Introduction/>
                <Features/>
                <TechnologyStack/>
                <Benefits/>
                <TargetAudience/>
                <Roadmap/>
                <Team/>
                <CTA/>
            </main>
            <Footer/>
        </div>
    )
}