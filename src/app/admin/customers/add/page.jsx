'use client'

import {useActionState, useEffect} from "react";
import {toast} from "react-toastify";
import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {createCustomer} from "@/lib/customerActions";

export default function Page() {
    const [message, dispatch] = useActionState(createCustomer, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>New customer</h1>
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
                                autoComplete={`off`}
                                required={true}
                                className={`dashboard-input`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`contact-person`} className={`dashboard-label`}>Contact Person:</label>
                            <input
                                type={`text`}
                                id={`contact-person`}
                                name={`contactPerson`}
                                autoComplete={`off`}
                                required={true}
                                className={`dashboard-input`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`email`} className={`dashboard-label`}>Email:</label>
                            <input
                                type={`email`}
                                id={`email`}
                                name={`email`}
                                autoComplete={`off`}
                                required={true}
                                className={`dashboard-input`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`phone`} className={`dashboard-label`}>Phone:</label>
                            <input
                                type={`text`}
                                id={`phone`}
                                name={`phone`}
                                autoComplete={`off`}
                                required={true}
                                className={`dashboard-input`}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`address`} className={`dashboard-label`}>Address:</label>
                            <input
                                type={`text`}
                                id={`address`}
                                name={`address`}
                                enterKeyHint={`done`}
                                autoComplete={`off`}
                                required={true}
                                className={`dashboard-input`}
                            />
                        </div>
                    </div>

                    <SubmitBtn text={`Add Customer`}/>
                </form>
            </div>
        </main>
    )
}
