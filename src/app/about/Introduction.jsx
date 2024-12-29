export default function Introduction() {
    return (
        <section id={`introduction`} className={`space-y-2 px-2 text-center`}>
            <div className={`my-8`}>
                <p className={`font-bold text-primary text-lg`}>About Us</p>
                <h2 className={`max-w-screen-md mx-auto text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>
                    Introduction
                </h2>
            </div>

            <div className={`flex flex-wrap items-center justify-around gap-6 md:gap-4`}>
                <div className={`space-y-6`}>
                    <h3 className={`font-medium text-2xl`}>Overview of Finviq</h3>
                    <p className={`max-w-screen-md`}>
                        Welcome to Finviq, the ultimate inventory management system designed to streamline
                        operations, improve stock control, and enhance business efficiency. Whether you're a
                        small business, retail chain, or large enterprise, Finviq provides the tools to manage your
                        inventory seamlessly. Our cloud-based inventory solution offers real-time stock tracking,
                        automated inventory updates, and intuitive reporting features, ensuring you always stay ahead
                        in your supply chain management.
                    </p>
                </div>

                <div className={`bg-secondary text-white p-8 rounded-lg max-w-md space-y-6`}>
                    <h3 className={`font-medium text-2xl`}>Mission statement</h3>
                    <p>
                        At Finviq, our mission is to deliver a comprehensive, user-friendly inventory management
                        software that simplifies your business operations. We focus on providing real-time inventory
                        visibility, reducing operational costs, and helping businesses scale efficiently with an
                        easy-to-use inventory tracking system.
                    </p>
                </div>
            </div>
        </section>
    )
}