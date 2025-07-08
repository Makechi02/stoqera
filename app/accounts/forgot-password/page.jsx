import Link from "next/link";
import {Logo} from "@/components";
import {ForgotPassword} from "@/components/accounts";

export const metadata = {
    title: 'Forgot password - Finviq'
}

export default function Page() {
    return (
        <section className={`p-1`}>
            <div className={`p-6`}>

                <div className={`bg-surface w-fit rounded-full`}>
                    <Logo/>
                </div>

                <div className={`my-6`}>
                    <h1 className={`font-bold text-2xl text-primary`}>Forgot Password</h1>
                    <p className={`text-sm`}>
                        Enter your registered email address and we'll send you a code to reset your password.
                    </p>
                </div>

                <ForgotPassword/>
            </div>

            <div
                className={`bg-background flex flex-wrap items-center justify-center gap-1 py-3 px-4 rounded-lg mt-4 text-center`}>
                <p>Remembered password?</p>
                <Link
                    href={`/accounts/login`}
                    className={`font-bold hover:underline`}
                >
                    Login
                </Link>
            </div>
        </section>
    );
};
