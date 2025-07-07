import Image from "next/image";

export default function Introduction() {
    return (
        <section id={`introduction`} className={`py-16 bg-white`}>
            <div className={`container mx-auto px-4`}>
                <div className={`flex flex-col md:flex-row items-center gap-12`}>
                    <div className={`md:w-1/2`}>
                        <h2 className={`text-3xl font-bold mb-6 font-gfs_didot`}>Overview</h2>
                        <p className={`text-secondary mb-6`}>
                            Finviq is a comprehensive inventory management solution built for modern businesses.
                            From small shops to growing enterprises, our platform adapts to your needs while
                            maintaining simplicity and power.
                        </p>
                        <h3 className={`text-2xl font-semibold mb-4`}>Our Vision</h3>
                        <p className={`text-secondary mb-6`}>
                            To create the most intuitive, efficient, and adaptable inventory management system
                            that empowers businesses to focus on growth rather than logistics.
                        </p>
                    </div>
                    <div className={`md:w-1/2 bg-background p-8 rounded-lg shadow-lg`}>
                        <div className={`aspect-video relative bg-primary/10 rounded-md overflow-hidden`}>
                            <div className={`absolute inset-0 flex items-center justify-center`}>
                                <Image
                                    src={`/assets/images/screenshots/Screenshot_1.png`}
                                    alt={`Finviq's Dashboard Illustration`}
                                    fill={true}
                                />
                                <span className={`text-primary font-semibold`}>Finviq Dashboard Illustration</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}