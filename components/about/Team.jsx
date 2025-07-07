import Image from "next/image";

export default function Team() {
    const platforms = [
        {
            title: 'GitHub',
            link: 'https://github.com/Makechi02'
        },
        {
            title: 'LinkedIn',
            link: 'https://www.linkedin.com/in/makechi-eric-235a72210'
        },
        {
            title: 'Twitter',
            link: 'https://www.twitter.com/OEMakbe'
        }
    ];

    return (
        <section className={`py-16 bg-white`}>
            <div className={`container mx-auto px-4`}>
                <div className={`max-w-3xl mx-auto text-center`}>
                    <h2 className={`text-3xl font-bold mb-6 font-gfs_didot`}>Meet the Developer</h2>
                    <div
                        className={`w-32 h-32 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center overflow-hidden`}
                    >
                        <Image
                            src={`/assets/images/Eric.webp`}
                            alt={`Makechi Eric`}
                            width={128}
                            height={128}
                            className={`object-center object-cover`}
                        />
                    </div>
                    <h3 className={`text-xl font-bold mb-2`}>Makechi Eric</h3>
                    <p className={`text-accent mb-4`}>Founder & Lead Developer</p>
                    <p className={`text-secondary mb-6`}>
                        Finviq is currently a solo project built with passion and dedication.
                        With over 2 years of experience in software development and a background in
                        inventory management, I created Finviq to solve real problems I've encountered
                        in the industry.
                    </p>
                    <div className={`flex items-center justify-center space-x-4`}>
                        {platforms.map((platform, index) => (
                            <a
                                key={index}
                                href={platform.link}
                                target={`_blank`}
                                className={`text-secondary hover:text-primary hover:font-bold transition-colors`}
                            >
                                {platform.title}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}