import {Footer} from "@/components/ui/preview";
import {Logo} from "@/components/ui";
import Link from "next/link";

export const metadata = {
    title: 'About - Finviq'
}

export default function Page() {
    return (
        <div>
            <Header/>
            <div
                className={`h-[30vh] md:h-[50vh] bg-gradient-to-b from-surface to-secondary text-white flex flex-col items-center justify-center`}>
                <div className={`mx-auto max-w-screen-xl px-6 text-center`}>
                    <h1 className={`text-4xl md:text-6xl font-bold font-gfs_didot mb-4 animate__animated animate__fadeIn`}>
                        About Finviq
                    </h1>
                </div>
            </div>

            <main className={`container mx-auto py-8 space-y-8`}>
                <section id={`introduction`} className={`space-y-2 text-center`}>
                    <h2 className={`font-bold font-gfs_didot text-3xl`}>Introduction</h2>
                    <div className={`max-w-screen-lg mx-auto`}>
                        <h3 className={`font-medium text-2xl`}>Overview of Finviq</h3>
                        <p>
                            Welcome to Finviq, the ultimate inventory management system designed to streamline
                            operations, improve stock control, and enhance business efficiency. Whether you're a
                            small
                            business, retail chain, or large enterprise, Finviq provides the tools to manage your
                            inventory seamlessly. Our cloud-based inventory solution offers real-time stock
                            tracking,
                            automated inventory updates, and intuitive reporting features, ensuring you always stay
                            ahead in your supply chain management.
                        </p>
                    </div>

                    <div className={`max-w-screen-lg mx-auto`}>
                        <h3 className={`font-medium text-2xl`}>Mission statement</h3>
                        <p>
                            At Finviq, our mission is to deliver a comprehensive, user-friendly inventory management
                            software that simplifies your business operations. We focus on providing real-time
                            inventory
                            visibility, reducing operational costs, and helping businesses scale efficiently with an
                            easy-to-use inventory tracking system.
                        </p>
                    </div>
                </section>

                <section id={`features`}>
                    <h2 className={`font-bold font-gfs_didot text-3xl`}>Key Features</h2>
                    <ul className={`space-y-2`}>
                        <li>
                            <h3>Inventory Tracking</h3>
                            <p>
                                With Finviq’s real-time inventory management, you can automatically track stock
                                levels
                                across all your locations and warehouses. The system ensures accurate stock levels,
                                reduces human error, and helps prevent stockouts and overstocking. Our inventory
                                tracking software integrates with your existing workflows to offer seamless
                                inventory
                                control.
                            </p>
                        </li>
                        <li>
                            <h3>Supplier and Customer Management</h3>
                            <p>
                                Efficient supplier management is crucial for maintaining smooth business operations.
                                Finviq helps businesses manage supplier relationships, track supplier orders, and
                                monitor payment statuses. Additionally, our customer relationship management (CRM)
                                feature ensures you keep detailed records of customers and their purchase histories,
                                improving customer satisfaction and retention.
                            </p>
                        </li>
                        <li>
                            <h3>Order Management</h3>
                            <p>
                                Finviq’s order management system (OMS) ensures that every order is processed
                                accurately
                                and promptly. You can easily create, track, and fulfill orders, all while
                                maintaining
                                full visibility into their status. Whether managing purchase orders or sales orders,
                                Finviq allows for end-to-end order management with minimal manual intervention.
                            </p>
                        </li>
                        <li>
                            <h3>Analytics and Reporting</h3>
                            <p>
                                Our powerful inventory analytics and business intelligence tools help you generate
                                customized reports and insights on stock levels, sales performance, and order
                                trends.
                                Finviq's data-driven inventory management allows you to make informed decisions and
                                optimize your stock levels, reducing excess inventory and improving cash flow.
                            </p>
                        </li>
                        <li>
                            <h3>User Permissions</h3>
                            <p>
                                Finviq offers customizable user roles, including administrators, managers, and
                                staff,
                                ensuring that everyone in your organization has the right level of access. You can
                                restrict access to sensitive data, giving your team the ability to collaborate
                                efficiently while maintaining data security and role-based access controls.
                            </p>
                        </li>
                    </ul>
                </section>

                <section id={`technology-stack`}>
                    <h2 className={`font-bold font-gfs_didot text-3xl`}>Technology Stack</h2>
                    <div>
                        <h3>Backend</h3>
                        <p>
                            Built on Spring Boot, Finviq’s backend offers a secure, scalable, and high-performance
                            foundation for your inventory management needs. The Spring Boot framework ensures that
                            your
                            data is always accessible, secure, and processed efficiently, providing robust backend
                            support for businesses of all sizes.
                        </p>
                    </div>
                    <div>
                        <h3>Frontend</h3>
                        <p>
                            Our Next.js frontend ensures fast load times and a responsive interface, creating a
                            seamless
                            user experience. Server-side rendering (SSR) guarantees that your pages load quickly,
                            improving performance and SEO rankings.
                        </p>
                    </div>
                    <div>
                        <h3>Database</h3>
                        <p>
                            Finviq utilizes MongoDB, a flexible NoSQL database that offers unmatched scalability.
                            With
                            MongoDB's document-oriented structure, businesses can easily scale as their inventory
                            grows
                            without worrying about database performance. NoSQL databases like MongoDB allow Finviq
                            to
                            handle large amounts of unstructured data while maintaining high performance.
                        </p>
                    </div>
                    <div>
                        <h3>Security</h3>
                        <p>
                            Security is a priority at Finviq. Our system implements the latest data encryption
                            techniques and multi-factor authentication (MFA) to keep your business data secure. With
                            regular security audits, we ensure that your inventory management system is always
                            protected
                            against potential threats.
                        </p>
                    </div>
                </section>

                <section id={`benefits`}>
                    <h2 className={`font-bold font-gfs_didot text-3xl`}>Benefits</h2>
                    <ul>
                        <li>
                            <h3>Increased Efficiency</h3>
                            <p>
                                Finviq’s automated inventory management system reduces manual work and minimizes
                                errors,
                                allowing
                                your business to focus on growth. With features like real-time stock updates,
                                automated
                                order
                                fulfillment, and instant reporting, Finviq helps you run your operations more
                                smoothly
                                and
                                efficiently.
                            </p>
                        </li>
                        <li>
                            <h3>Real-time Updates</h3>
                            <p>
                                Stay on top of your stock with real-time inventory updates. Whether you’re in the
                                office
                                or on the
                                go, Finviq ensures that you always have the most up-to-date information on your
                                inventory levels,
                                sales, and orders.
                            </p>
                        </li>
                        <li>
                            <h3>Customization</h3>
                            <p>
                                Finviq offers a highly customizable inventory management solution that adapts to
                                your
                                business's
                                unique needs. You can create custom categories, set specific alerts, and tailor the
                                system to meet
                                your operational requirements. This flexibility makes Finviq the ideal choice for
                                businesses across
                                industries, including retail, manufacturing, and wholesale.
                            </p>
                        </li>
                        <li>
                            <h3>User-Friendly Interface</h3>
                            <p>
                                The user-friendly interface of Finviq ensures that both tech-savvy and non-technical
                                users can
                                easily navigate and manage inventory without extensive training. With a clean design
                                and
                                intuitive
                                layout, our cloud-based inventory system allows users to stay productive from day
                                one.
                            </p>
                        </li>
                    </ul>
                </section>

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

function Header() {
    return (
        <header className={`bg-surface sticky top-0 z-10`}>
            <div className={`mx-auto max-w-screen-xl px-4 md:px-2 flex justify-between items-center gap-8`}>
                <Logo/>

                <nav>
                    <ul className={`md:flex md:items-center gap-6 text-white`}>
                        <li>
                            <Link href={`#introduction`} className={`hover:text-primary block`}>Intro</Link>
                        </li>
                        <li>
                            <Link href={`#features`} className={`hover:text-primary block`}>Features</Link>
                        </li>
                        <li>
                            <Link href={`#benefits`} className={`hover:text-primary block`}>Benefits</Link>
                        </li>
                        <li>
                            <Link href={`#testimonials`} className={`hover:text-primary block`}>Testimonials</Link>
                        </li>
                        <li>
                            <Link href={`#roadmap`} className={`hover:text-primary block`}>Roadmap</Link>
                        </li>
                    </ul>
                </nav>

                <div className={`sm:flex sm:gap-4`}>
                    <Link
                        href={`/accounts/login`}
                        className={`px-5 py-2.5 font-medium text-white hover:text-primary`}
                    >
                        Login
                    </Link>
                    <div className={`hidden sm:flex`}>
                        <Link
                            href={`/accounts/register`}
                            className={`rounded-md bg-primary px-5 py-2.5 font-medium hover:scale-105`}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}