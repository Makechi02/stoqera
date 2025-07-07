export default function Contact() {
    return (
        <section id={`contact`} className={`bg-gray-100`}>
            <div className={`py-8 md:py-16 max-w-screen-xl mx-auto px-4 text-center`}>
                <div className={`my-8`}>
                    <p className={`font-bold text-primary text-2xl my-6`}>Contact Us</p>
                    <h2 className={`max-w-screen-md mx-auto text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>
                        Get in Touch! Reach Out to Us Today
                    </h2>
                </div>

                <form className={`max-w-screen-md mx-auto`}>
                    <div className={`flex flex-wrap gap-4`}>
                        <input
                            type={`text`}
                            required={true}
                            placeholder={`Full Name*`}
                            className={`preview-input max-w-md flex-1`}
                        />

                        <input
                            type={`email`}
                            required={true}
                            placeholder={`Email*`}
                            className={`preview-input max-w-md flex-1`}
                        />
                    </div>

                    <div className={`flex flex-wrap gap-4 mt-4`}>
                        <input
                            type={`tel`}
                            required={true}
                            placeholder={`Mobile*`}
                            className={`preview-input max-w-md flex-1`}
                        />

                        <input
                            type={`text`}
                            required={true}
                            placeholder={`Subject*`}
                            className={`preview-input max-w-md flex-1`}
                        />
                    </div>

                    <textarea
                        placeholder={`Write project details*`}
                        required={true}
                        className={`preview-input mt-4 w-full min-h-40`}
                    />

                    <div className={`flex mt-4`}>
                        <button className={`bg-primary rounded-lg py-3 px-4`}>
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
