'use client'

import {useEffect} from "react";
import {toast} from "react-toastify";
import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {useFormState} from "react-dom";
import {createCategory} from "@/lib/categoryActions";

const Page = () => {
    const [message, dispatch] = useFormState(createCategory, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>New category</h1>
                </div>
            </div>

            <div className={`my-4 max-w-screen-md mx-8`}>
                <form className={`flex flex-col gap-2`} action={dispatch}>
                    <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                    <input
                        type={`text`}
                        id={`name`}
                        name={`name`}
                        required={true}
                        enterKeyHint={`done`}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                    />

                    <SubmitBtn text={`Add category`}/>
                </form>
            </div>
        </main>
    )
}

export default Page;