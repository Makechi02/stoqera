import {features} from "@/data/constants";
import {FeatureCard} from "@/components/ui/Cards";

export default function Features() {
    return (
        <section id={`features`} className={`py-8 md:py-16 px-4 text-center`}>
            <div className={`my-8`}>
                <p className={`font-bold text-primary text-lg`}>Our cornerstone</p>
                <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>Key Features</h2>
            </div>

            <ul className={`flex flex-wrap justify-center gap-8 md:gap-10`}>
                {features.map((feature, index) => (
                    <li
                        key={index}
                        style={{animationDelay: `${index * 0.2}s`}}
                        className={`max-w-md animate__animated animate__fadeIn flex`}
                    >
                        <FeatureCard feature={feature} />
                    </li>
                ))}
            </ul>
        </section>
    )
}