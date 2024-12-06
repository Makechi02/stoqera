import {FaArrowRight} from "react-icons/fa6";
import {ourUsers} from "@/data/constants";

const OurUsers = () => {
    return (
        <section className={`py-8 md:py-16 max-w-screen-xl mx-auto px-4`}>
            <div className={`my-8`}>
                <p className={`font-bold text-primary text-2xl my-6`}>Who Can Use Our Finviq</p>
                <h2 className={`max-w-screen-md text-3xl md:text-4xl font-bold font-gfs_didot text-gray-800`}>
                    Our Software Capable for Wide Range of Business and Industries
                </h2>
            </div>

            <ul className={`max-w-screen-md grid sm:grid-cols-2 gap-4`}>
                {ourUsers.map((user, index) => (
                    <li key={index} className={`flex items-center gap-4 text-xl text-text`}>
                        <span className={`border-2 border-accent p-1 rounded-full`}><FaArrowRight/></span>
                        <span>{user}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default OurUsers;