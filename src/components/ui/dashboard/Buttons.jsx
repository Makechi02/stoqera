'use client'

import {SmallLoadingSpinner} from "@/components/ui/LoadingSpinner";
import {useFormStatus} from "react-dom";
import {FaTrashCan} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import {FaChevronLeft} from "react-icons/fa";

export function BackBtn() {
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

export function SubmitBtn({loading, text}) {
    const {pending} = useFormStatus();

    return (
        <button type={`submit`} disabled={pending} aria-disabled={pending} className={`dashboard-submit-btn`}>
            {pending ? (
                <span className={`flex gap-2 items-center justify-center`}>
                    Loading <SmallLoadingSpinner/>
                </span>
            ) : text}
        </button>
    );
}

export function DeleteButton({text = ''}) {
    const {pending} = useFormStatus();

    return (
        <button
            type={`submit`}
            disabled={pending}
            aria-disabled={pending}
            className={`delete-btn ${text ? 'flex items-center gap-2' : 'ml-3'}`} title={`Delete`}
        >
            {pending ? <SmallLoadingSpinner/> : (
                <>
                    <span><FaTrashCan/></span>
                    <span>{text}</span>
                </>
            )}
        </button>
    )
}