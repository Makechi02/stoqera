'use client'

import {useState} from 'react';
import {motion} from 'framer-motion';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    LockClosedIcon
} from '@heroicons/react/24/outline';
import {Logo} from "@/components";
import Link from "next/link";
import {TogglePasswordBtn} from "@/components/ui/buttons";
import {createClient} from "@/lib/supabase/client";
import {useRouter, useSearchParams} from "next/navigation";
import {fadeInUp} from "@/data/constants/animations";

export default function LoginForm() {
    const supabase = createClient();
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirected_from') || '/dashboard';

    const handleInputChange = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));

        // Clear errors when the user starts typing
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: ''}));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        const {error} = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        setIsLoading(false);

        if (error) {
            setErrors({general: error.message});
        } else {
            router.push(redirectUrl);
        }
    };

    return (
        <div className={`lg:absolute lg:left-1/2 right-0 bg-gradient-to-br from-teal-50 to-cyan-50 min-h-svh`}>
            <Header/>
            <div className={`flex items-center justify-center p-4 md:p-8 min-h-[calc(100svh-100px)]`}>
                <motion.div
                    className={`w-full max-w-md`}
                    initial={`initial`}
                    animate={`animate`}
                    variants={fadeInUp}
                >
                    <div className={`bg-white rounded-2xl shadow-xl p-8`}>
                        {/*TODO: Handle Detecting Organization*/}
                        <div className={`mb-6 text-center`}>
                            <h1 className={`text-3xl font-bold text-gray-900 mb-2 font-heading`}>Sign In</h1>
                            <p className={`text-gray-600`}>Access your inventory management dashboards</p>
                        </div>

                        {/* Error Message */}
                        {errors.general && (
                            <div className={`mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center`}>
                                <ExclamationTriangleIcon className={`size-5 text-red-600 mr-2`}/>
                                <p className={`text-sm text-red-600`}>{errors.general}</p>
                            </div>
                        )}

                        <div className={`space-y-6`}>
                            {/* Email */}
                            <div>
                                <label className={`auth-form-label mb-2`}>Email Address</label>
                                <div className={`relative`}>
                                    <EnvelopeIcon
                                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                                    <input
                                        type={`email`}
                                        value={formData.email}
                                        placeholder={`john@company.com`}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className={`auth-form-input-icon ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className={`mt-1 text-sm text-red-600`}>{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className={`auth-form-label mb-2`}>Password</label>
                                <div className={`relative`}>
                                    <LockClosedIcon
                                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        placeholder={`Enter your password`}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        className={`auth-form-input-icon ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                    />

                                    <TogglePasswordBtn
                                        showPassword={showPassword}
                                        toggleShowPassword={() => setShowPassword(prevState => !prevState)}
                                    />
                                </div>
                                {errors.password && (
                                    <p className={`mt-1 text-sm text-red-600`}>{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className={`flex items-center justify-between`}>
                                <div className={`flex items-center`}>
                                    <input
                                        type={`checkbox`}
                                        id={`remember`}
                                        checked={formData.rememberMe}
                                        onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                                        className={`size-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded`}
                                    />
                                    <label htmlFor={`remember`} className={`ml-2 text-sm text-gray-700`}>
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    href={`/forgot-password`}
                                    className={`text-sm text-teal-600 hover:text-teal-700 underline`}
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className={`w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 focus:ring-4 focus:ring-teal-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center`}
                            >
                                {isLoading ? (
                                    <div className={`flex items-center`}>
                                        <div
                                            className={`animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2`}/>
                                        Signing In...
                                    </div>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRightIcon className={`size-5 ml-2`}/>
                                    </>
                                )}
                            </button>

                            {/* TODO: Add Social Login */}
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className={`mt-6 text-center text-sm text-gray-500`}>
                        <p>🔒 Your connection is secure and encrypted</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function Header() {
    return (
        <header className={`sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8`}>
            <div className={`flex flex-wrap justify-between items-center py-4 gap-4`}>
                <div className={`lg:hidden`}>
                    <Logo/>
                </div>
                <div className={`w-full flex items-center justify-between gap-4`}>
                    <Link
                        href={`/`}
                        className={`flex items-center text-gray-600 hover:text-teal-600 transition-colors`}
                    >
                        <ArrowLeftIcon className={`size-4 mr-2`}/>
                        Back to Home
                    </Link>
                    <div className={`text-sm text-gray-600`}>
                        Don't have an account?{' '}
                        <Link href={`/register`} className={`text-teal-600 hover:text-teal-700 font-medium`}>
                            Register
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

function SocialLogin() {
    const handleSocialLogin = (provider) => {
        console.log(`Social login with ${provider}`);
        // Implement social login logic
    };

    return (
        <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"/>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                    onClick={() => handleSocialLogin('google')}
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="ml-2">Google</span>
                </button>

                <button
                    onClick={() => handleSocialLogin('microsoft')}
                    className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                    <svg className="h-5 w-5" fill="#00A4EF" viewBox="0 0 24 24">
                        <path
                            d="M23.5 12c0-6.351-5.149-11.5-11.5-11.5S.5 5.649.5 12s5.149 11.5 11.5 11.5S23.5 18.351 23.5 12z"/>
                        <path fill="#FFF"
                              d="M12.5 6.5h4v3h-4v-3zm0 4h4v3h-4v-3zm0 4h4v3h-4v-3zm-5-8h4v3h-4v-3zm0 4h4v3h-4v-3zm0 4h4v3h-4v-3z"/>
                    </svg>
                    <span className="ml-2">Microsoft</span>
                </button>
            </div>
        </div>
    )
}