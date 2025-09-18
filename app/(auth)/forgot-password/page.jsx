'use client'

import {useState} from 'react';
import {motion} from 'framer-motion';
import {ArrowLeftIcon, CheckCircleIcon, EnvelopeIcon} from '@heroicons/react/24/outline';
import {Logo, ProgressLoader} from "@/components";
import {useRouter} from "next/navigation";
import {createClient} from "@/lib/supabase/client";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            // Supabase auth function to send reset password email
            const supabase = createClient();
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) {
                setError(error.message);
            } else {
                setIsSubmitted(true);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToLogin = () => {
        router.push('/login');
    };

    if (isSubmitted) {
        return (
            <div
                className={`min-h-svh bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center px-4 sm:px-6 lg:px-8`}
            >
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.4}}
                    className={`max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center`}
                >
                    <motion.div
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        transition={{delay: 0.2, type: "spring", stiffness: 200}}
                        className={`mx-auto size-16 bg-teal-100 rounded-full flex items-center justify-center mb-6`}
                    >
                        <CheckCircleIcon className={`size-8 text-teal-600`}/>
                    </motion.div>

                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className={`text-2xl font-bold text-gray-900 mb-4 font-heading`}
                    >
                        Check your email
                    </motion.h2>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                        className={`text-gray-600 mb-8`}
                    >
                        We've sent a password reset link to <span className={`font-semibold text-gray-900`}>{email}</span>
                    </motion.p>

                    <motion.button
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.5}}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        onClick={handleBackToLogin}
                        className={`w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center gap-2`}
                    >
                        <ArrowLeftIcon className={`size-4`}/>
                        Back to login
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-svh bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8`}
        >
            <motion.div
                initial={{opacity: 0, y: 40}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className={`max-w-md w-full`}
            >
                {/* Header */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.1}}
                    className={`text-center mb-6`}
                >
                    <motion.div whileHover={{scale: 1.05}} className={`inline-flex items-center justify-center`}>
                        <Logo size={`lg`} layout={`vertical`}/>
                    </motion.div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.2}}
                    className={`bg-white rounded-2xl shadow-xl p-6`}
                >
                    <div className={`mb-6 text-center`}>
                        <h2 className={`text-2xl font-bold text-gray-900 mb-2 font-heading`}>Reset your password</h2>
                        <p className={`text-gray-600`}>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <div className={`space-y-6`}>
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.3}}
                        >
                            <label htmlFor={`email`} className={`auth-form-label mb-2`}>Email address</label>
                            <div className={`relative`}>
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                    <EnvelopeIcon className={`size-5 text-gray-400`}/>
                                </div>
                                <input
                                    id={`email`}
                                    name={`email`}
                                    type={`email`}
                                    autoComplete={`email`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    className={`auth-form-input-icon border-gray-300`}
                                    placeholder={`Enter your email`}
                                />
                            </div>
                        </motion.div>

                        {error && (
                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                className={`bg-red-50 border border-red-200 rounded-lg p-3`}
                            >
                                <p className={`text-sm text-red-600`}>{error}</p>
                            </motion.div>
                        )}

                        <motion.button
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4}}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
                        >
                            {isLoading ? (
                                <ProgressLoader/>
                            ) : (
                                'Send reset link'
                            )}
                        </motion.button>
                    </div>

                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5}}
                        className={`mt-4 pt-4 border-t border-gray-200`}
                    >
                        <button
                            onClick={handleBackToLogin}
                            className={`w-full text-teal-600 hover:text-teal-700 font-semibold py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors duration-200 flex items-center justify-center gap-2`}
                        >
                            <ArrowLeftIcon className={`size-4`}/>
                            Back to login
                        </button>
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.6}}
                    className={`text-center mt-8`}
                >
                    <p className={`text-sm text-gray-500`}>
                        Need help?{' '}
                        <a href="#" className={`text-teal-600 hover:text-teal-700 font-semibold`}>
                            Contact support
                        </a>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};
