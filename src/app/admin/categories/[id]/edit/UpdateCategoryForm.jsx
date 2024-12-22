'use client'

import {SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {useFormState} from "react-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {updateCategory} from "@/lib/categoryActions";

export default function UpdateCategoryForm({category}) {
    const updateCategoryWithId = updateCategory.bind(null, category.id);

    const [message, dispatch] = useFormState(updateCategoryWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <form className={`flex flex-col gap-2`} action={dispatch}>
            <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
            <input
                type={`text`}
                id={`name`}
                name={`name`}
                defaultValue={category.name}
                enterKeyHint={`done`}
                autoComplete={`off`}
                className={`dashboard-input`}
            />

            <SubmitBtn text={`Update Category`}/>
        </form>
    )
}