export default function TargetAudience() {
    return (
        <section id={`target-audience`} className={`py-8 px-4`}>
            <div className={`my-8 text-center`}>
                <p className={`font-bold text-primary text-lg`}>Who can use our system</p>
                <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>
                    Target Audience
                </h2>
            </div>

            <div className={`flex flex-wrap flex-col md:flex-row gap-4`}>
                <div className={`flex-1`}>
                    <h3 className={`font-bold text-lg mb-2`}>Small to Medium Enterprises (SMEs)</h3>
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

                <div className={`flex-1`}>
                    <h3 className={`font-bold text-lg mb-2`}>Industries We Serve</h3>
                    <ul className={`list-decimal list-inside`}>
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
            </div>
        </section>
    )
}