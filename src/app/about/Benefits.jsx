export default function Benefits() {
    const benefits = [
        {
            metric: "30%",
            description: "Average reduction in inventory holding costs"
        },
        {
            metric: "40%",
            description: "Improvement in order fulfillment speed"
        },
        {
            metric: "25%",
            description: "Reduction in stockouts and overstock situations"
        },
        {
            metric: "60%",
            description: "Less time spent on inventory management tasks"
        }
    ];

    return (
        <section id={`benefits`} className={`py-16 bg-text text-white`}>
            <div className={`container mx-auto px-4`}>
                <div className={`text-center mb-16`}>
                    <h2 className={`text-3xl font-bold mb-6 font-gfs_didot`}>Why Choose Finviq?</h2>
                    <p className={`text-gray-300 max-w-3xl mx-auto`}>
                        Our inventory management system delivers tangible benefits that impact your bottom line.
                    </p>
                </div>

                <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8`}>
                    {benefits.map((benefit, index) => (
                        <div key={index} className={`text-center`}>
                            <div className={`text-4xl md:text-5xl font-bold text-accent mb-4`}>{benefit.metric}</div>
                            <p className={`text-gray-300`}>{benefit.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}