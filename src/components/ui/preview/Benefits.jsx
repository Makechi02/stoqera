import {benefits} from "@/data/constants";

const Benefits = () => {
    return (
        <section className={`py-8 md:py-16 max-w-screen-xl mx-auto px-4 text-center`} id={`features`}>
            <div className={`my-8`}>
                <p className={`font-bold text-primary text-2xl my-6`}>Grow your business with Invisio</p>
                <h2 className={`max-w-screen-md mx-auto text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>
                    Why Choose Our Inventory Management System?
                </h2>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10`}>
                {benefits.map((benefit, index) => (
                    <div
                        key={index}
                        className={`bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out animate__animated animate__fadeIn`}
                        style={{animationDelay: `${index * 0.2}s`}}
                    >
                        <div className={`flex justify-center text-4xl mb-4 text-accent`}>{benefit.icon}</div>
                        <h3 className={`text-xl font-semibold text-gray-800 mb-2`}>{benefit.title}</h3>
                        <p className={`text-gray-600`}>{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;