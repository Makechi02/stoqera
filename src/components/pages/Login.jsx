'use client'

import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (email === '') {
            setErrorMessage("Email can't be blank");
            setLoading(false);
            return;
        }

        if (password === '') {
            setErrorMessage("Password can't be blank");
            setLoading(false);
            return;
        }

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result.error) {
            setLoading(false);
            setErrorMessage(result.error);
        } else {
            const response = await fetch("/api/auth/session");
            const session = await response.json();
            const role = session.user.role;

            setLoading(false);
            router.push(role === 'USER' ? "/dashboard/user" : "/admin");
        }
    };

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    return (
        <form className={`space-y-4`} onSubmit={handleSubmit}>
            {errorMessage && (
                <p className={`text-red-600 text-sm`}>{errorMessage}</p>
            )}
            <div className={`login-input-box`}>
                <label htmlFor={`email`} className={`label`}>Email *</label>
                <input
                    type={`email`}
                    name={`email`}
                    className={`input focus:outline-none focus:ring-2 focus:ring-primary`}
                    id={`email`}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </div>

            <div className={`login-input-box`}>
                <label htmlFor={`password`} className={`label`}>Password *</label>
                <input
                    type={`password`}
                    name={`password`}
                    className={`input focus:outline-none focus:ring-2 focus:ring-primary`}
                    id={`password`}
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </div>

            <div className={`flex flex-wrap justify-between items-center gap-4`}>
                <label className={`flex gap-2 items-center`}>
                    <input type={`checkbox`}/>
                    <span>Remember me</span>
                </label>

                <Link href={`/accounts/forgot-password`} className={`text-sm font-bold hover:underline`}>
                    Forgot password?
                </Link>
            </div>

            <button
                className={`w-full bg-primary hover:bg-primary/70 text-white py-2 px-4 rounded-lg`}>
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    )
}

export default Login;