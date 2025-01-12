import {Footer} from "@/components/ui/preview";
import Link from "next/link";
import {Header} from "@/components/ui";
import {aboutNavLinks} from "@/data/constants";
import Introduction from "@/app/about/Introduction";
import Features from "@/app/about/Features";
import TechnologyStack from "@/app/about/TechnologyStack";
import Benefits from "@/app/about/Benefits";

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

                <section id={`target-audience`}>
                    <h2 className={`font-bold font-gfs_didot text-3xl`}>Target Audience</h2>
                    <div>
                        <h3>Small to Medium Enterprises (SMEs)</h3>
                        <p>
                            Finviq is designed for small and medium-sized businesses that need a scalable inventory
                            management
                            system without the complexity and high costs of enterprise-level solutions. Whether
                            you're
                            managing
                            a small retail store or a growing e-commerce business, Finviq helps you maintain control
                            over your
                            stock and order processes.
                        </p>
                    </div>

                    <div>
                        <h3>Industries We Serve</h3>
                        <ul>
                            <li>
                                <strong>Retail</strong>: Finviq is perfect for retail businesses that need to manage
                                multiple product categories,
                                sales tracking, and inventory replenishment across different locations.
                            </li>
                            <li>
                                <strong>Manufacturing</strong>: Manufacturers can use Finviq to track raw materials,
                                work-in-progress, and finished
                                goods, ensuring production runs smoothly.
                            </li>
                            <li>
                                <strong>Wholesale & Distribution</strong>: Finviq streamlines wholesale inventory
                                management, helping businesses optimize their supply chain and improve vendor
                                relationships.
                            </li>
                        </ul>
                    </div>
                </section>

                <section id={`testimonials`}>
                    <h2 className={`font-bold font-gfs_didot text-3xl`}>Testimonials / Case studies</h2>
                    <div>
                        <h3>Customer Feedback</h3>
                        <p>
                            “Finviq has transformed the way we manage our inventory. The real-time inventory
                            tracking
                            and
                            automated stock alerts have helped us avoid stockouts and improve customer satisfaction.
                            It’s an
                            essential tool for our business!” – Jane Doe, Retail Store Owner
                        </p>
                    </div>

                    <div>
                        <h3>Case Study</h3>
                        <p>
                            ABC Electronics reduced their excess inventory by 30% after implementing Finviq. By
                            using
                            our
                            inventory analytics and real-time tracking, they were able to optimize stock levels,
                            reduce
                            waste,
                            and improve cash flow. Finviq has helped them scale their business without sacrificing
                            control over
                            their inventory.
                        </p>
                    </div>
                </section>

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