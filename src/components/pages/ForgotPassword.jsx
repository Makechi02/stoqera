'use client'

import {useEffect, useState} from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === '') {
            setErrorMessage("Email can't be blank");
            return;
        }

        console.log("Email: " + email);
    };

    useEffect(() => {
        setErrorMessage('');
    }, [email]);

    return (
        <form className={`space-y-4`} onSubmit={handleSubmit}>
            <div>
                {errorMessage && (
                    <p className={`text-red-600 text-sm`}>{errorMessage}</p>
                )}
            </div>

            <div className={`login-input-box`}>
                <label htmlFor={`email`} className={`label`}>Email address *</label>
                <input
                    type={`email`}
                    className={`input focus:outline-none focus:ring-2 focus:ring-primary`}
                    id={`email`}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </div>

            <button className={`w-full bg-primary hover:bg-primary/70 text-white py-2 px-4 rounded-lg`}>
                Recover Password
            </button>
        </form>
    )
}

export default ForgotPassword;