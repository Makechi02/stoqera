export default function TechnologyStack() {
    const technologies = [
        {
            title: "Backend",
            description: "Built on Spring Boot, Finviq’s backend offers a secure, scalable, and high-performance foundation for your inventory management needs. The Spring Boot framework ensures that your data is always accessible, secure, and processed efficiently, providing robust backend support for businesses of all sizes."
        },
        {
            title: "Frontend",
            description: "Our Next.js frontend ensures fast load times and a responsive interface, creating a seamless user experience. Server-side rendering (SSR) guarantees that your pages load quickly improving performance and SEO rankings."
        },
        {
            title: "Database",
            description: "Finviq utilizes MongoDB, a flexible NoSQL database that offers unmatched scalability. With MongoDB's document-oriented structure, businesses can easily scale as their inventory grows without worrying about database performance. NoSQL databases like MongoDB allow Finviq to handle large amounts of unstructured data while maintaining high performance."
        },
        {
            title: "Security",
            description: "Security is a priority at Finviq. Our system implements the latest data encryption techniques and multi-factor authentication (MFA) to keep your business data secure. With regular security audits, we ensure that your inventory management system is always protected against potential threats."
        },
    ];

    return (
        <section id={`technology-stack`}>
            <div className={`my-8 text-center`}>
                <p className={`font-bold text-primary text-lg`}>Technology used</p>
                <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>Technology Stack</h2>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8`}>
                {technologies.map((tech, index) => (
                    <div key={index} className={`bg-secondary text-white p-8 rounded-lg`}>
                        <h3 className={`font-medium text-2xl`}>{tech.title}</h3>
                        <p>{tech.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}