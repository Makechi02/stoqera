import Link from "next/link";

export default function Team() {
    return (
        <section id={`team`} className={`max-w-screen-md mx-auto text-center px-4`}>
            <div>
                <h2 className={`font-bold font-gfs_didot text-3xl text-center my-4`}>
                    Crafted by Makechi Eric
                </h2>

                <p>
                    As a dedicated developer, I created Finviq to provide businesses with a powerful yet
                    easy-to-use inventory management solution. My goal is to help businesses of all sizes
                    simplify their operations and scale efficiently.
                </p>

                <div className={`mt-2 flex flex-wrap gap-4 items-center justify-center underline`}>
                    <Link href={`mailto:makechieric9@gmail.com`}>Contact Me</Link>
                    <Link href={`https://makechi.vercel.app`}>Learn More About My Work</Link>
                </div>
            </div>
        </section>
    )
}