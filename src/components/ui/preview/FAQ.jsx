"use client"

import {useState} from 'react';
import {faqs} from "@/data/constants";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={`py-16 bg-gray-50`} id={`faq`}>
            <div className={`container mx-auto px-6 text-center`}>
                <div>
                    <p className={`font-bold text-primary text-2xl my-6`}>Have any Question?</p>
                    <h2 className={`text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800 mb-8`}>
                        Frequently Asked Questions
                    </h2>
                </div>
                <div className={`max-w-screen-md mx-auto text-left`}>
                    {faqs.map((faq, index) => (
                        <div key={index} className={`border-b border-gray-200 mb-4`}>
                            <button
                                className={`flex justify-between items-center w-full py-4 text-left focus:outline-none`}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className={`font-semibold text-xl hover:text-primary`}>{faq.question}</span>
                                <span className={`text-gray-500 hover:text-primary text-xl`}>{openIndex === index ? '-' : '+'}</span>
                            </button>
                            {openIndex === index && (<p className={`text-gray-600 mt-2`}>{faq.answer}</p>)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQ;