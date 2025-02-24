import {Footer} from "@/components/ui/preview";
import {Header} from "@/components/ui";
import {aboutNavLinks} from "@/data/constants";
import Introduction from "@/app/about/Introduction";
import Features from "@/app/about/Features";
import TechnologyStack from "@/app/about/TechnologyStack";
import Benefits from "@/app/about/Benefits";
import TargetAudience from "@/app/about/TargetAudience";
import Roadmap from "@/app/about/Roadmap";
import Team from "@/app/about/Team";
import Hero from "@/app/about/Hero";
import CTA from "@/app/about/CTA";

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