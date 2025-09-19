'use client'

import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {CheckCircleIcon, EyeIcon, EyeSlashIcon, LockClosedIcon} from '@heroicons/react/24/outline';
import {useRouter} from 'next/navigation';
import {createClient} from "@/lib/supabase/client";
import {Logo, ProgressLoader} from "@/components";

export default function Page() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isValidSession, setIsValidSession] = useState(false);

    useEffect(() => {
        const supabase = createClient();

        const init = async () => {
            await supabase.auth.signOut();

            // Handle auth state change (when user clicks the email link)
            const {data: {subscription}} = supabase.auth.onAuthStateChange(
                async (event, session) => {
                    if (event === 'PASSWORD_RECOVERY') {
                        setIsValidSession(true);
                    }
                }
            );


            return () => subscription.unsubscribe();
        }

        init();
    }, [router]);

    const validatePassword = (pwd) => {
        if (pwd.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])/.test(pwd)) {
            return 'Password must contain both uppercase and lowercase letters';
        }
        if (!/(?=.*\d)/.test(pwd)) {
            return 'Password must contain at least one number';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const supabase = createClient();
            const {error} = await supabase.auth.updateUser({
                password: password
            });

            if (error) {
                setError(error.message);
            } else {
                setIsSubmitted(true);
                // Auto redirect to login after 3 seconds
                setTimeout(() => {
                    handleLoginRedirect();
                }, 3000);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    if (!isValidSession) {
        return (
            <div
                className={`min-h-svh bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center px-4 sm:px-6 lg:px-8`}>
                <div className={`max-w-md w-full text-center`}>
                    <div className={`flex items-center justify-center`}>
                        <ProgressLoader color={`teal`} size={`lg`}/>
                    </div>
                    <p className={`mt-4 text-gray-600`}>Verifying your reset link...</p>
                </div>
            </div>
        );
    }

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
                        className={`mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6`}
                    >
                        <CheckCircleIcon className={`size-8 text-teal-600`}/>
                    </motion.div>

                    <motion.h2
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3}}
                        className={`text-2xl font-bold text-gray-900 mb-4 font-heading`}
                    >
                        Password updated successfully!
                    </motion.h2>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                        className={`text-gray-600 mb-8`}
                    >
                        Your password has been updated. You'll be redirected to login in a few seconds.
                    </motion.p>

                    <motion.button
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.5}}
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        onClick={handleLoginRedirect}
                        className={`w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200`}
                    >
                        Continue to login
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
                    <div className={`text-center mb-6`}>
                        <h2 className={`text-2xl font-bold text-gray-900 mb-2 font-heading`}>Create new password</h2>
                        <p className={`text-gray-600`}>Please enter your new password below.</p>
                    </div>

                    <div className={`space-y-6`}>
                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.3}}
                        >
                            <label htmlFor={`password`} className={`auth-form-label mb-2`}>New Password</label>
                            <div className={`relative`}>
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                    <LockClosedIcon className={`size-5 text-gray-400`}/>
                                </div>
                                <input
                                    id={`password`}
                                    name={`password`}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`auth-form-input-icon border-gray-300`}
                                    placeholder={`Enter your new password`}
                                />

                                <div className={`absolute inset-y-0 right-0 pr-3 flex items-center`}>
                                    <button
                                        type={`button`}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={`text-gray-400 hover:text-gray-600`}
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className={`size-5`}/>
                                        ) : (
                                            <EyeIcon className={`size-5`}/>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{opacity: 0, x: -20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.4}}
                        >
                            <label htmlFor={`confirmPassword`} className={`auth-form-label mb-2`}>
                                Confirm New Password
                            </label>
                            <div className={`relative`}>
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                                    <LockClosedIcon className={`size-5 text-gray-400`}/>
                                </div>
                                <input
                                    id={`confirmPassword`}
                                    name={`confirmPassword`}
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                                    className={`auth-form-input-icon border-gray-300`}
                                    placeholder={`Confirm your new password`}
                                />
                                <div className={`absolute inset-y-0 right-0 pr-3 flex items-center`}>
                                    <button
                                        type={`button`}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className={`text-gray-400 hover:text-gray-600`}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeSlashIcon className={`size-5`}/>
                                        ) : (
                                            <EyeIcon className={`size-5`}/>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Password Requirements */}
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.5}}
                            className={`bg-gray-50 rounded-lg p-4`}
                        >
                            <p className={`text-sm text-gray-600 mb-2 font-semibold`}>Password requirements:</p>
                            <ul className={`text-xs text-gray-500 space-y-1`}>
                                <li className={`flex items-center`}>
                                    <span
                                        className={`mr-2 size-3 rounded-full
                                            ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-400'}
                                        `}
                                    />
                                    At least 8 characters
                                </li>
                                <li className={`flex items-center`}>
                                    <span
                                        className={`mr-2 size-3 rounded-full
                                            ${/(?=.*[a-z])(?=.*[A-Z])/.test(password) ? 'bg-green-500' : 'bg-gray-400'}
                                        `}
                                    />
                                    Contains uppercase and lowercase letters
                                </li>
                                <li className={`flex items-center`}>
                                    <span
                                        className={`mr-2 size-3 rounded-full
                                            ${/(?=.*\d)/.test(password) ? 'bg-green-500' : 'bg-gray-400'}
                                        `}
                                    />
                                    Contains at least one number
                                </li>
                            </ul>
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
                            transition={{delay: 0.6}}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className={`w-full bg-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
                        >
                            {isLoading ? (
                                <ProgressLoader/>
                            ) : (
                                'Update password'
                            )}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};