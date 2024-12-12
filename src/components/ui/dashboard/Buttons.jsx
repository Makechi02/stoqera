import {SmallLoadingSpinner} from "@/components/ui/LoadingSpinner";
import {useFormStatus} from "react-dom";
import {FaTrashCan} from "react-icons/fa6";

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

export function DeleteButton() {
    const {pending} = useFormStatus();

    return (
        <button
            type={`submit`}
            disabled={pending}
            aria-disabled={pending}
            className={`ml-3 delete-btn`} title={`Delete`}
        >
            {pending ? <SmallLoadingSpinner/> : <FaTrashCan/>}
        </button>
    )
}