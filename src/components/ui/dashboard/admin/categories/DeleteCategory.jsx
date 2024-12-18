'use client'

import {useFormState} from "react-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {DeleteButton} from "@/components/ui/dashboard/Buttons";
import {deleteCategory} from "@/lib/categoryActions";

export default function DeleteCategory({category, text = ''}) {
    const deleteCategoryWithId = deleteCategory.bind(null, category.id);
    const [message, dispatch] = useFormState(deleteCategoryWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <form action={dispatch}>
            <DeleteButton text={text}/>
        </form>
    )
}