'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/24/solid';
import {ProgressLoader} from "@/components";

export default function PaymentCallback() {
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your payment...');
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const reference = searchParams.get('reference');

        if (!reference) {
            setStatus('error');
            setMessage('Invalid payment reference');
            return;
        }

        // Verify payment
        verifyPayment(reference);
    }, [searchParams]);

    const verifyPayment = async (reference) => {
        try {
            const response = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({reference}),
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Payment successful! Your subscription is now active.');

                // Redirect to dashboard after 3 seconds
                setTimeout(() => {
                    router.push('/dashboard');
                }, 3000);
            } else {
                const error = await response.json();
                setStatus('error');
                setMessage(error.message || 'Payment verification failed');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to verify payment. Please contact support.');
        }
    };

    return (
        <div className={`min-h-svh bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
            <div className={`max-w-md w-full space-y-8`}>
                <div className="text-center">
                    {status === 'verifying' && (
                        <div className={`mx-auto grid place-content-center size-16`}>
                            <ProgressLoader color={`teal`} size={`lg`}/>
                        </div>
                    )}

                    {status === 'success' && (
                        <CheckCircleIcon className={`mx-auto size-16 text-green-500`}/>
                    )}

                    {status === 'error' && (
                        <XCircleIcon className={`mx-auto size-16 text-red-500`}/>
                    )}

                    <h2 className={`mt-6 text-3xl font-bold text-gray-900 font-heading`}>
                        {status === 'verifying' && 'Processing Payment'}
                        {status === 'success' && 'Payment Successful!'}
                        {status === 'error' && 'Payment Failed'}
                    </h2>

                    <p className={`mt-2 text-sm text-gray-600`}>{message}</p>

                    {status === 'success' && (
                        <p className={`mt-4 text-sm text-gray-500`}>Redirecting to dashboard in a few seconds...</p>
                    )}

                    {status === 'error' && (
                        <div className={`mt-6 space-y-3`}>
                            <button
                                onClick={() => router.push('/pricing')}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                            >
                                Try Again
                            </button>
                            <button
                                // onClick={() => router.push('/contact')}
                                className={`w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                            >
                                Contact Support
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}