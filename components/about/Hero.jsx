export default function Hero() {
    return (
        <section className={`relative py-20 overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 z-0`}></div>
            <div className={`relative container mx-auto px-4 z-0`}>
                <div className={`flex flex-col items-center text-center`}>
                    <h1 className={`text-4xl md:text-5xl font-bold mb-6 font-gfs_didot`}>About Finviq</h1>
                    <div className={`w-20 h-1 bg-primary mb-8`}></div>
                    <p className={`text-xl max-w-3xl mb-8 text-secondary`}>
                        A modern inventory management system designed to streamline your operations
                        and boost productivity with powerful features and an intuitive interface.
                    </p>
                </div>
            </div>
        </section>
    )
}