'use client'

import {deleteSupplier} from "@/lib/supplierActions";
import {useFormState} from "react-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {DeleteButton} from "@/components/ui/dashboard/Buttons";

export default function DeleteSupplier({supplier, text = ''}) {
    const deleteSupplierWithId = deleteSupplier.bind(null, supplier.id);
    const [message, dispatch] = useFormState(deleteSupplierWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <form action={dispatch}>
            <DeleteButton text={text}/>
        </form>
    )
}