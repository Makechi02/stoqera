import {Footer} from "@/components/ui/preview";
import Link from "next/link";
import {Header} from "@/components/ui";
import {aboutNavLinks} from "@/data/constants";
import Introduction from "@/app/about/Introduction";
import Features from "@/app/about/Features";
import TechnologyStack from "@/app/about/TechnologyStack";
import Benefits from "@/app/about/Benefits";
import TargetAudience from "@/app/about/TargetAudience";

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

                <section id={`roadmap`}>
                    <h2 className={`font-bold font-gfs_didot text-3xl`}>Vision for the future</h2>
                    <div>
                        <h3>Our Roadmap</h3>
                        <p>
                            We are committed to continuously improving Finviq to meet the evolving needs of
                            businesses
                            worldwide. In the coming months, we plan to introduce:
                        </p>
                        <ul>
                            <li>
                                Mobile App Integration: Manage your inventory on the go with our mobile app,
                                ensuring
                                you stay
                                connected no matter where you are.
                            </li>
                            <li>Advanced Reporting Tools: Unlock even more powerful inventory reporting features
                                that
                                provide deeper
                                insights into sales trends, stock turnover, and profitability.
                            </li>
                            <li>AI-based Forecasting: We’re working on incorporating AI-powered inventory
                                forecasting to
                                help you
                                predict stock requirements and optimize your supply chain.
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Continuous Improvement</h3>
                        <p>
                            Your feedback drives the continuous improvement of Finviq. We are dedicated to providing
                            regular
                            updates, new features, and enhancements based on customer input, ensuring we deliver the
                            best
                            inventory management software in the market.
                        </p>
                    </div>
                </section>

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