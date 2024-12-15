'use client'

import {SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {useFormState} from "react-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {updateCustomer} from "@/lib/customerActions";

export default function UpdateCustomerForm({customer}) {
    const updateCustomerWithId = updateCustomer.bind(null, customer.id);

    const [message, dispatch] = useFormState(updateCustomerWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <form className={`flex flex-col gap-2`} action={dispatch}>
            <div className={`grid sm:grid-cols-2 gap-4`}>
                <div className={`input-box`}>
                    <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                    <input
                        type={`text`}
                        id={`name`}
                        name={`name`}
                        defaultValue={customer.name}
                        enterKeyHint={`next`}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`contact-person`} className={`dashboard-label`}>Contact Person:</label>
                    <input
                        type={`text`}
                        id={`contact-person`}
                        name={`contactPerson`}
                        defaultValue={customer.contactPerson}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`email`} className={`dashboard-label`}>Email:</label>
                    <input
                        type={`email`}
                        id={`email`}
                        name={`email`}
                        defaultValue={customer.email}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`phone`} className={`dashboard-label`}>Phone:</label>
                    <input
                        type={`text`}
                        id={`phone`}
                        name={`phone`}
                        defaultValue={customer.phone}
                        enterKeyHint={`done`}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`address`} className={`dashboard-label`}>Address:</label>
                    <input
                        type={`text`}
                        id={`address`}
                        name={`address`}
                        defaultValue={customer.address}
                        enterKeyHint={`done`}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                    />
                </div>
            </div>

            <SubmitBtn text={`Save customer`}/>
        </form>
    )
}