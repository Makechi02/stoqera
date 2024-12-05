import Link from "next/link";

const CTA = () => {
    return (
        <section
            className={`px-4 text-center animate__animated animate__fadeIn`}>
            <div className={`max-w-screen-xl mx-auto rounded-2xl bg-gray-900 text-white px-6 py-16`}>
                <div className={`max-w-screen-md mx-auto`}>
                    <h2 className={`text-4xl md:text-4xl font-bold font-gfs_didot my-6`}>
                        Upgrade Your Business with Our Cutting-Edge Inventory Management Solutions!
                    </h2>
                    <p className={`mb-6 text-xl`}>
                        Experience the future of transactions! Schedule a demo today and witness how our inventory
                        management system solution can revolutionize your business.
                    </p>
                </div>
                <div className={`flex flex-wrap gap-4 justify-center items-center`}>
                    <Link
                        href={`/accounts/login`}
                        className={`bg-primary text-text font-semibold py-3 px-6 rounded-md shadow-md hover:scale-105 transform transition-transform duration-300`}
                    >
                        Purchase Now
                    </Link>
                    <Link
                        href={`/info/learn-more`}
                        className={`border-2 border-primary text-primary font-semibold py-3 px-6 rounded-md hover:scale-105 transform transition-transform duration-300`}
                    >
                        Start Free Trial
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CTA;