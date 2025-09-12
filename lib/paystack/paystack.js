const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

export class PaystackService {
    static async createPlan(planData) {
        const response = await fetch(`${PAYSTACK_BASE_URL}/plan`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: planData.display_name,
                amount: planData.price_monthly * 100, // Convert to kobo
                interval: 'monthly',
                currency: 'KES'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create Paystack plan');
        }

        return response.json();
    }

    static async createCustomer(customerData) {
        const response = await fetch(`${PAYSTACK_BASE_URL}/customer`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerData)
        });

        if (!response.ok) {
            throw new Error('Failed to create customer');
        }

        return response.json();
    }

    static async initializeTransaction(transactionData) {
        const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactionData)
        });

        if (!response.ok) {
            throw new Error('Failed to initialize transaction');
        }

        return response.json();
    }

    static async verifyTransaction(reference) {
        const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
            headers: {
                'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
            }
        });

        if (!response.ok) {
            throw new Error('Failed to verify transaction');
        }

        return response.json();
    }

    static async createSubscription(subscriptionData) {
        const response = await fetch(`${PAYSTACK_BASE_URL}/subscription`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscriptionData)
        });

        if (!response.ok) {
            throw new Error('Failed to create subscription');
        }

        return response.json();
    }
}