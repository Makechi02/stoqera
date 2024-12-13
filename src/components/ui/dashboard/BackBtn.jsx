"use client"

import {FaChevronLeft} from "react-icons/fa";
import {useRouter} from "next/navigation";

const BackBtn = () => {
    const router = useRouter();

    return (
        <button
            title={`Back`}
            onClick={() => router.back()}
            className={`hover:bg-secondary hover:text-gray-100 p-2 rounded-lg flex items-center gap-2 w-fit text-xl`}
        >
            <span className={`sr-only`}>Back</span>
            <FaChevronLeft/>
        </button>
    )
}

export default BackBtn;