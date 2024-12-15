'use client'

import {useFormState} from "react-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {DeleteButton} from "@/components/ui/dashboard/Buttons";
import {deleteCustomer} from "@/lib/customerActions";

export default function DeleteCustomer({customer, text = ''}) {
    const deleteCustomerWithId = deleteCustomer.bind(null, customer.id);
    const [message, dispatch] = useFormState(deleteCustomerWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <form action={dispatch}>
            <DeleteButton text={text}/>
        </form>
    )
}