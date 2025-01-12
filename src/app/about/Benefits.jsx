import {FaCheckCircle} from "react-icons/fa";

export default function Benefits() {
    const benefits = [
        {
            title: 'Increased Efficiency',
            description: "Finviq's automated inventory management system reduces manual work and minimizes errors, allowing your business to focus on growth. With features like real-time stock updates, automated order fulfillment, and instant reporting, Finviq helps you run your operations more smoothly and efficiently."
        },
        {
            title: 'Real-time updates',
            description: "Stay on top of your stock with real-time inventory updates. Whether you’re in the office or on the go, Finviq ensures that you always have the most up-to-date information on your inventory levels, sales, and orders."
        },
        {
            title: 'Customization',
            description: "Finviq offers a highly customizable inventory management solution that adapts to your business's unique needs. You can create custom categories, set specific alerts, and tailor the system to meet your operational requirements. This flexibility makes Finviq the ideal choice for businesses across industries, including retail, manufacturing, and wholesale."
        },
        {
            title: 'User-Friendly Interface',
            description: "The user-friendly interface of Finviq ensures that both tech-savvy and non-technical users can easily navigate and manage inventory without extensive training. With a clean design and intuitive layout, our cloud-based inventory system allows users to stay productive from day one."
        }
    ];

    return (
        <section id={`benefits`} className={`py-8 md:py-16 px-4`}>
            <div className={`my-8 text-center`}>
                <p className={`font-bold text-primary text-lg`}>Why choose us</p>
                <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>Benefits of our system</h2>
            </div>

            <ul className={`flex flex-wrap justify-center gap-8`}>
                {benefits.map((benefit, index) => (
                    <li key={index} className={`flex items-start gap-4`}>
                        <div className={`flex-shrink-0`}>
                            <FaCheckCircle className={`text-primary text-3xl`} />
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold mb-2`}>{benefit.title}</h3>
                            <p className={`max-w-sm`}>{benefit.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}