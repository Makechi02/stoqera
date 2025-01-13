export default function Roadmap() {
    return (
        <section id={`roadmap`} className={`px-4`}>
            <div className={`my-8 text-center`}>
                <p className={`font-bold text-primary text-lg`}>Our Roadmap</p>
                <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>
                    Vision for the future
                </h2>
            </div>

            <div>
                <h3 className={`font-bold text-lg`}>Our Roadmap</h3>
                <p>
                    We are committed to continuously improving Finviq to meet the evolving needs of businesses
                    worldwide. In the coming months, we plan to introduce:
                </p>
                <ul className={`list-disc list-inside`}>
                    <li>
                        <strong>Mobile App Integration</strong>: Manage your inventory on the go with our mobile app,
                        ensuring you stay connected no matter where you are.
                    </li>
                    <li>
                        <strong>Advanced Reporting Tools</strong>: Unlock even more powerful inventory reporting
                        features that provide deeper insights into sales trends, stock turnover, and profitability.
                    </li>
                </ul>
            </div>

            <div className={`mt-4`}>
                <h3 className={`font-bold text-lg`}>Continuous Improvement</h3>
                <p>
                    Your feedback drives the continuous improvement of Finviq. We are dedicated to providing
                    regular updates, new features, and enhancements based on customer input, ensuring we deliver the
                    best inventory management software in the market.
                </p>
            </div>
        </section>
    )
}