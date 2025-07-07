import React from "react";

export default function TechnologyStack() {
    const technologies = ["Next.js", "React", "Tailwind", "Spring Boot", "MongoDB"];

    const technologyFeatures = [
        "Next.js 15 for a blazing-fast frontend experience",
        "Tailwind CSS for beautiful, responsive design",
        "Secure authentication and data encryption",
        "Cloud-native architecture for reliability and scalability",
        "RESTful APIs for seamless integration"
    ];

    return (
        <section id={`technology-stack`} className={`py-16 bg-white`}>
            <div className={`container mx-auto px-4`}>
                <div className={`flex flex-col md:flex-row items-center gap-12`}>
                    <div className={`md:w-1/2`}>
                        <h2 className={`text-3xl font-bold mb-6 font-gfs_didot`}>Technology Stack</h2>
                        <p className={`text-[#4B5563] mb-6`}>
                            Built with modern, reliable technologies to ensure performance, security, and scalability.
                        </p>
                        <ul className={`space-y-4`}>
                            {technologyFeatures.map((item, index) => (
                                <li key={index} className={`flex items-start`}>
                                    <span className={`text-primary mr-3`}>✓</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`md:w-1/2`}>
                        <div className={`grid grid-cols-2 md:grid-cols-3 gap-4`}>
                            {technologies.map((tech, index) => (
                                <div key={index}
                                     className={`aspect-square bg-background rounded-lg flex items-center justify-center p-4`}>
                                    <span className={`font-medium text-center`}>{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}