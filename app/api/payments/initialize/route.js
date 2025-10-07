import {NextResponse} from 'next/server';
import {PaystackService} from '@/lib/paystack/paystack';
import {createClient} from "@/lib/supabase/server";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";
import {getCurrentOrganization} from "@/lib/organization/queryOrganizations";

export async function POST(request) {
    try {
        const supabase = await createClient();
        const {planId, billingType} = await request.json();

        // Get current user
        const currentUser = await getCurrentLoggedInUser();
        if (!currentUser) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }

        // Get organization
        const currentOrganization = await getCurrentOrganization();
        if (!currentOrganization) {
            return NextResponse.json({error: 'Organization not found'}, {status: 404});
        }

        // Get selected plan
        const {data: plan, error: planError} = await supabase
            .from('subscription_plans')
            .select('*')
            .eq('id', planId)
            .single();

        if (planError || !plan) {
            return NextResponse.json({error: 'Plan not found'}, {status: 404});
        }

        // Calculate amount based on billing type
        const amount = billingType === 'yearly' ? plan.price_yearly : plan.price_monthly;

        // Create or get customer from Paystack
        let customer;
        try {
            customer = await PaystackService.createCustomer({
                email: currentUser.email,
                first_name: currentOrganization.name,
                last_name: '',
                phone: currentOrganization.phone || ''
            });
        } catch (error) {
            // Customer might already exist, that's okay
            customer = {data: {customer_code: null}};
        }

        // Initialize transaction
        const transaction = await PaystackService.initializeTransaction({
            email: currentUser.email,
            amount: amount * 100, // Convert to kobo
            currency: 'KES',
            callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`,
            metadata: {
                organization_id: currentOrganization.id,
                plan_id: planId,
                billing_type: billingType,
                user_id: currentUser.id
            }
        });

        return NextResponse.json({
            authorization_url: transaction.data.authorization_url,
            reference: transaction.data.reference
        });

    } catch (error) {
        console.error('Payment initialization error:', error);
        return NextResponse.json(
            {error: 'Failed to initialize payment'},
            {status: 500}
        );
    }
}