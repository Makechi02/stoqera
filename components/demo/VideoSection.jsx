'use client'

import {motion} from "framer-motion";
import {fadeIn} from "@/data/constants/animations";

export default function VideoSection() {
    return (
        <section className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16`}>
            <motion.div {...fadeIn}>
                <div className={`relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900`}>
                    {/* Video Placeholder - Replace with your actual video embed */}
                    <div
                        className={`aspect-video bg-gradient-to-br from-teal-900 to-gray-900 flex items-center justify-center`}
                    >
                        <div className={`text-center`}>
                            {/*<div*/}
                            {/*    className={`inline-flex items-center justify-center w-20 h-20 bg-teal-600 rounded-full mb-4 hover:bg-teal-500 transition-colors cursor-pointer`}*/}
                            {/*>*/}
                            {/*    <PlayCircleIcon className={`size-12 text-white ml-1`}/>*/}
                            {/*</div>*/}
                            {/*<p className={`text-white text-lg font-medium`}>Watch Demo Video</p>*/}
                            <p className={`text-white text-lg font-medium`}>Coming Soon</p>
                            <p className={`text-teal-200 text-sm mt-2`}>5 minutes · No sign-up required</p>
                        </div>
                    </div>

                    {/*TODO: Replace the above div with actual video embed*/}
                    {/*<iframe*/}
                    {/*    className="w-full aspect-video"*/}
                    {/*    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"*/}
                    {/*    title="Product Demo"*/}
                    {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
                    {/*    allowFullScreen*/}
                    {/*/>*/}
                </div>

                {/*<VideoChapters/>*/}
            </motion.div>
        </section>
    )
}

function VideoChapters() {
    const chapters = [
        {time: '0:00', title: 'Quick Overview', desc: 'Main dashboard & navigation'},
        {time: '1:30', title: 'Adding Products', desc: 'Bulk import & management'},
        {time: '3:00', title: 'Stock Tracking', desc: 'Real-time updates & alerts'},
        {time: '4:15', title: 'Reports & Insights', desc: 'Analytics dashboard tour'}
    ];

    return (
        <div className={`mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
            {chapters.map((chapter, index) => (
                <div key={index}
                     className={`flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200`}>
                    <div className={`text-teal-600 font-semibold text-sm mt-0.5`}>{chapter.time}</div>
                    <div>
                        <div className={`font-medium text-gray-900 text-sm`}>{chapter.title}</div>
                        <div className={`text-gray-600 text-xs mt-1`}>{chapter.desc}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}