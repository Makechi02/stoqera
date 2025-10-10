import {Footer} from "@/components/home";
import {CTA, Features, Header, Hero, VideoSection} from "@/components/demo";
import Metrics from "@/app/metrics";

export const metadata = {
    title: `Demo | Stoqera`,
    alternates: {
        canonical: `/demo`
    }
}

export default function Page() {
    return (
        <>
            <main className={`min-h-screen bg-gradient-to-b from-teal-50 to-white`}>
                <Header/>
                <Hero/>
                <VideoSection/>
                <Features/>
                <CTA/>
                <Footer/>
            </main>
            <Metrics/>
        </>
    )
}