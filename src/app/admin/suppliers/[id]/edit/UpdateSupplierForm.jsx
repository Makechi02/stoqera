'use client'

import {SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {useFormState} from "react-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {updateSupplier} from "@/lib/supplierActions";

export default function UpdateSupplierForm({supplier}) {
    const updateSupplierWithId = updateSupplier.bind(null, supplier.id);

    const [message, dispatch] = useFormState(updateSupplierWithId, undefined);

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
                        defaultValue={supplier.name}
                        enterKeyHint={`next`}
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
                        defaultValue={supplier.phone}
                        enterKeyHint={`next`}
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
                        defaultValue={supplier.address}
                        enterKeyHint={`done`}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                    />
                </div>
            </div>

            <SubmitBtn text={`Save Supplier`}/>
        </form>
    )
}