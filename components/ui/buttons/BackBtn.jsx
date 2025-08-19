'use client'

import React from "react";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";

export default function BackBtn() {
    const router = useRouter();

    return (
        <button
            title={`Back`}
            onClick={router.back}
            className={`mr-4 p-2 hover:bg-gray-800 rounded-lg transition-colors`}
        >
            <ArrowLeftIcon className={`size-6 text-gray-400 hover:text-text`}/>
        </button>
    )
}