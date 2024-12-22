"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import {signOut} from "next-auth/react";
import {UserService} from "@/service";

const UpdateAccountForm = ({user}) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name === '') {
            setErrorMessage("Name can't be blank");
            return;
        }

        if (email === '') {
            setErrorMessage("email can't be blank");
            return;
        }

        try {
            const updatedUser = {name, email, role: user.role};
            const response = await UserService.updateUser(user.id, updatedUser);

            if (response.status === 200) {
                alert("User updated successfully");
                await signOut({callbackUrl: '/accounts/login'});
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        setErrorMessage("");
    }, [name, email]);

    return (
        <form className={`flex flex-col gap-3`} onSubmit={handleSubmit}>
            <div>
                <p className={`text-red-600 font-bold`}>{errorMessage && errorMessage}</p>
            </div>

            <div className={`input-box`}>
                <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                <input
                    type={`text`}
                    id={`name`}
                    value={name}
                    autoComplete={`off`}
                    onChange={event => setName(event.target.value)}
                    className={`dashboard-input`}
                />
            </div>

            <div className={`input-box`}>
                <label htmlFor={`email`} className={`dashboard-label`}>Email:</label>
                <input
                    type={`email`}
                    id={`email`}
                    value={email}
                    autoComplete={`off`}
                    onChange={event => setEmail(event.target.value)}
                    className={`dashboard-input`}
                />
            </div>

            <div className={`input-box`}>
                <label htmlFor={`role`} className={`dashboard-label`}>Role:</label>
                <input className={`dashboard-input`} id={`role`} readOnly={true} defaultValue={user.role}/>
            </div>

            <p className={`text-sm`}>
                Change your account details below, or
                <Link href={`/${user.role.toLowerCase()}/profile/security#change-password`}
                      className={`underline`}> click here </Link>
                to change your password
            </p>

            <p className={`text-sm text-gray-700`}>After update you'll be logged out to reflect the changes</p>

            <button className={`bg-gray-700 hover:bg-black text-white py-2 px-4 rounded-lg w-fit`}>
                Update Account
            </button>
        </form>
    )
}

export default UpdateAccountForm;