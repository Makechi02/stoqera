import {features} from "@/data/constants";

const FeatureIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
        {...props}
    >
        <path
            fillRule="evenodd"
            d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5z"
            clipRule="evenodd"
        />
    </svg>
);

export default function Features() {
    return (
        <section id={`features`} className={`py-16`}>
            <div className={`container mx-auto px-4`}>
                <div className={`text-center mb-16`}>
                    <h2 className={`text-3xl font-bold mb-6 font-gfs_didot`}>Key Features</h2>
                    <p className={`text-secondary max-w-3xl mx-auto`}>
                        Designed with real business needs in mind, Finviq offers a comprehensive set
                        of features to manage your inventory efficiently.
                    </p>
                </div>

                <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8`}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`bg-white p-8 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md`}
                        >
                            <div className={`text-accent mb-4`}>
                                <FeatureIcon/>
                            </div>
                            <h3 className={`text-xl font-semibold mb-3`}>{feature.title}</h3>
                            <p className={`text-secondary`}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}