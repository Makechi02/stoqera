'use client';

import {useState} from 'react';
import {CreditCardIcon} from '@heroicons/react/24/outline';
import {formatCurrency} from "@/utils/formatters";
import {ProgressLoader} from "@/components";

export default function PaymentButton({plan, billingType = 'monthly', className = ''}) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            // Initialize payment
            const response = await fetch('/api/payments/initialize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: plan.id,
                    billingType
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to initialize payment');
            }

            const {authorization_url} = await response.json();

            // Redirect to Paystack payment page
            window.location.href = authorization_url;

        } catch (error) {
            console.error('Payment error:', error);
            alert('Failed to initialize payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const amount = billingType === 'yearly' ? plan.price_yearly : plan.price_monthly;
    const formattedAmount = formatCurrency(amount);

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className={`flex items-center justify-center px-6 py-3 border border-transparent rounded-lg font-medium transition-colors ${className} ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
        >
            {loading ? (
                <div className={`flex items-center gap-2`}>
                    <ProgressLoader/>
                    Processing...
                </div>
            ) : (
                <div className={`flex items-center`}>
                    <CreditCardIcon className={`size-5 mr-2`}/>
                    Subscribe for {formattedAmount}
                </div>
            )}
        </button>
    );
}