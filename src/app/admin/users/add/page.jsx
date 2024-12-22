"use client"

import {useEffect} from "react";
import {toast} from "react-toastify";
import {useFormState} from "react-dom";
import {createUser} from "@/lib/userActions";
import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";

const Page = () => {
    const [message, dispatch] = useFormState(createUser, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>New user</h1>
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
                                enterKeyHint={`next`}
                                className={`dashboard-input`}
                                required={true}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`email`} className={`dashboard-label`}>Email:</label>
                            <input
                                type={`email`}
                                id={`email`}
                                name={`email`}
                                autoComplete={`off`}
                                enterKeyHint={`next`}
                                className={`dashboard-input`}
                                required={true}
                            />
                        </div>

                        <div className={`input-box`}>
                            <label htmlFor={`role`} className={`dashboard-label`}>Role:</label>
                            <select
                                id={`role`}
                                name={`role`}
                                className={`dashboard-input`}
                            >
                                <option value={`USER`}>USER</option>
                                <option value={`ADMIN`}>ADMIN</option>
                            </select>
                        </div>
                    </div>
                    <SubmitBtn text={`Add user`}/>
                </form>
            </div>
        </main>
    )
}

export default Page;