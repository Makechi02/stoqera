import Image from "next/image";
import Link from "next/link";

export default function Hero () {
    return (
        <section
            id={`home`}
            className={`min-h-svh bg-gradient-to-b from-surface to-secondary text-white py-16 md:py-20 flex flex-col items-center md:justify-center`}
        >
            <div className={`mx-auto max-w-screen-xl px-6 text-center`}>
                <h1 className={`text-4xl md:text-6xl font-bold font-gfs_didot mb-4 animate__animated animate__fadeIn`}>
                    Finviq: Revolutionize Your Business Operations
                </h1>

                <p className={`max-w-screen-md mx-auto text-base md:text-lg my-8 animate__animated animate__fadeIn animate__delay-1s`}>
                    Say goodbye to manual tracking and outdated systems. Finviq offers powerful tools to manage your inventory, monitor sales, and analyze performance—all in one seamless platform designed to scale with your business.
                </p>

                <div className={`flex flex-wrap justify-center items-center gap-4`}>
                    <Link
                        href={`/accounts/login`}
                        className={`bg-primary text-text font-semibold py-3 px-6 rounded-md shadow-md hover:scale-105 transform transition-transform duration-300`}
                    >
                        Get Started Today
                    </Link>

                    <Link
                        href={`/info/learn-more`}
                        className={`border-2 border-primary text-primary font-semibold py-3 px-6 rounded-md hover:scale-105 transform transition-transform duration-300`}
                    >
                        See How It Works
                    </Link>
                </div>

                <div className={`mt-12 animate__animated animate__fadeInUp animate__delay-2s`}>
                    <Image
                        src={`/assets/images/screenshots/Screenshot_1.png`}
                        alt={`Inventory management screenshot`}
                        width={500}
                        height={300}
                        className={`mx-auto`}
                        priority={true}
                    />
                </div>
            </div>
        </section>
    );
}