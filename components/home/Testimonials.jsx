'use client'

import {motion} from 'framer-motion';
import {StarIcon} from '@heroicons/react/24/outline';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Operations Manager",
            company: "TechStore Inc.",
            content: "Finviq has revolutionized our inventory management. We've reduced stockouts by 75% and improved efficiency across all locations.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "CEO",
            company: "GreenLeaf Supply",
            content: "The analytics and reporting features are incredible. We can now make data-driven decisions that have significantly improved our bottom line.",
            rating: 5
        },
        {
            name: "Emily Rodriguez",
            role: "Warehouse Director",
            company: "FastTrack Logistics",
            content: "Implementation was seamless, and the support team is outstanding. Our team adapted quickly and saw immediate benefits.",
            rating: 5
        }
    ];

    return (
        <section id={`testimonials`} className={`py-20 bg-white`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`text-center mb-16`}>
                    <h2 className={`text-4xl font-bold text-gray-900 mb-4 font-heading`}>
                        Trusted by thousands of businesses
                    </h2>
                    <p className={`text-xl text-gray-600 max-w-3xl mx-auto`}>
                        See what our customers have to say about Finviq
                    </p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-8`}>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className={`bg-gray-50 p-6 rounded-xl`}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6, delay: index * 0.1}}
                        >
                            <div className={`flex mb-4`}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <StarIcon key={i} className={`size-5 text-yellow-400 fill-current`}/>
                                ))}
                            </div>
                            <p className={`text-gray-600 mb-4`}>"{testimonial.content}"</p>
                            <div>
                                <p className={`font-semibold text-gray-900`}>{testimonial.name}</p>
                                <p className={`text-sm text-gray-600`}>{testimonial.role}, {testimonial.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}