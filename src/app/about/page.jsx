import {Footer} from "@/components/ui/preview";
import Link from "next/link";
import {Header} from "@/components/ui";
import {aboutNavLinks} from "@/data/constants";
import Introduction from "@/app/about/Introduction";
import Features from "@/app/about/Features";
import TechnologyStack from "@/app/about/TechnologyStack";
import Benefits from "@/app/about/Benefits";
import TargetAudience from "@/app/about/TargetAudience";
import Roadmap from "@/app/about/Roadmap";

export const metadata = {
    title: 'About - Finviq'
}

export default function Page() {
    return (
        <div>
            <Header navLinks={aboutNavLinks} />
            <div
                className={`h-[30vh] md:h-[40vh] bg-gradient-to-b from-surface to-secondary text-white flex flex-col items-center justify-center`}>
                <div className={`mx-auto max-w-screen-xl px-6 text-center`}>
                    <h1 className={`text-4xl md:text-6xl font-bold font-gfs_didot mb-4 animate__animated animate__fadeIn`}>
                        About Finviq
                    </h1>
                </div>
            </div>

            <main className={`container mx-auto py-8 space-y-8`}>
                <Introduction/>
                <Features/>
                <TechnologyStack/>
                <Benefits/>
                <TargetAudience/>
                <Roadmap/>

                <section id={`team`}>
                    <div>
                        <h2 className={`font-bold font-gfs_didot text-3xl`}>Crafted by Makechi Eric</h2>
                        <p>
                            As a dedicated developer, I created Finviq to provide businesses with a powerful yet
                            easy-to-use inventory management solution. My goal is to help businesses of all sizes
                            simplify their operations and scale efficiently.
                        </p>
                        <div>
                            <Link href={`mailto:makechi@example.com`}>Contact Me</Link>
                            <Link href={`https://makechi.vercel.app`}>Learn More About My Work</Link>
                        </div>
                    </div>
                    <div>
                        <img src={`/path/to/your-photo.jpg`}
                             alt={`Makechi Eric - Developer and Creator of Finviq`}/>
                    </div>
                </section>

            </main>

            <Footer/>
        </div>
    )
}