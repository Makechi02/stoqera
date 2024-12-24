'use client'

import {updateUser} from "@/lib/userActions";
import {useActionState, useEffect} from "react";
import {toast} from "react-toastify";
import {SubmitBtn} from "@/components/ui/dashboard/Buttons";

export default function UpdateUserForm({user}) {
    const updateUserWithId = updateUser.bind(null, user.id);
    const [message, dispatch] = useActionState(updateUserWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <form className={`flex flex-col gap-3`} action={dispatch}>
            <div className={`grid sm:grid-cols-2 gap-4`}>
                <div className={`input-box`}>
                    <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                    <input
                        type={`text`}
                        id={`name`}
                        name={`name`}
                        autoComplete={`off`}
                        defaultValue={user.name}
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
                        defaultValue={user.email}
                        autoComplete={`off`}
                        className={`dashboard-input`}
                        required={true}
                    />
                </div>

                <div className={`input-box`}>
                    <label htmlFor={`role`} className={`dashboard-label`}>Role:</label>
                    <select
                        id={`role`}
                        name={`role`}
                        defaultValue={user.role}
                        className={`dashboard-input`}
                    >
                        <option>-- select role --</option>
                        <option value={'USER'}>USER</option>
                        <option value={'ADMIN'}>ADMIN</option>
                    </select>
                </div>
            </div>

            <div className={`flex gap-4 items-center mt-4`}>
                <SubmitBtn text={`Save changes`}/>
            </div>
        </form>
    )
}
