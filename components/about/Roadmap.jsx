export default function Roadmap() {
    const roadmap = [
        {
            quarter: "Q3 2025",
            title: "Advanced Analytics",
            description: "Predictive inventory forecasting and enhanced reporting capabilities."
        },
        {
            quarter: "Q4 2025",
            title: "Mobile App Launch",
            description: "Native mobile applications for Android for on-the-go inventory management."
        },
        {
            quarter: "Q1 2026",
            title: "AI-Powered Recommendations",
            description: "Smart suggestions for optimal stock levels and purchasing decisions."
        },
        {
            quarter: "Q2 2026",
            title: "Global Expansion",
            description: "Multi-currency support and localization for international markets."
        }
    ];

    return (
        <section id={`roadmap`} className={`py-16 bg-background`}>
            <div className={`container mx-auto px-4`}>
                <div className={`text-center mb-16`}>
                    <h2 className={`text-3xl font-bold mb-6 font-gfs_didot`}>Roadmap</h2>
                    <p className={`text-secondary max-w-3xl mx-auto`}>
                        We're constantly evolving. Here's what we're working on next.
                    </p>
                </div>

                <div className={`relative`}>
                    <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20`}></div>

                    <div className={`space-y-12`}>
                        {roadmap.map((milestone, index) => (
                            <div key={index} className={`relative`}>
                                <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary`}></div>

                                <div className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className={`md:w-5/12 text-center md:text-right`}>
                                        <span
                                            className={`inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-2`}
                                        >
                                            {milestone.quarter}
                                        </span>
                                    </div>
                                    <div className={`md:w-5/12`}>
                                        <div className={`bg-white p-6 rounded-lg shadow-sm`}>
                                            <h3 className={`text-xl font-semibold mb-2`}>{milestone.title}</h3>
                                            <p className={`text-secondary`}>{milestone.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}