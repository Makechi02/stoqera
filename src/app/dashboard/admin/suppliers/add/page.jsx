'use client'

import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {useFormState} from "react-dom";
import {createSupplier} from "@/lib/supplierActions";
import {useEffect} from "react";
import {toast} from "react-toastify";

const Page = () => {
    const [message, dispatch] = useFormState(createSupplier, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>New supplier</h1>
                </div>
            </div>

            <div className={`my-4 max-w-screen-md mx-8`}>
                <form className={`flex flex-col gap-2`} action={dispatch}>
                    <div className={`grid sm:grid-cols-2 gap-4`}>
                        <div className={`input-box`}>
                            <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                            <input
                                type={`text`}
                                id={`name`}
                                name={`name`}
                                required={true}
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
                                required={true}
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
                                required={true}
                                enterKeyHint={`done`}
                                autoComplete={`off`}
                                className={`dashboard-input`}
                            />
                        </div>
                    </div>

                    <SubmitBtn text={`Add Supplier`}/>
                </form>
            </div>
        </main>
    )
}

export default Page;