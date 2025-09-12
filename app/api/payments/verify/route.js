import {NextResponse} from 'next/server';
import {PaystackService} from '@/lib/paystack/paystack';
import {createClient} from "@/lib/supabase/server";

export async function POST(request) {
    try {
        const supabase = await createClient();
        const { reference } = await request.json();

        // Verify transaction with Paystack
        const verification = await PaystackService.verifyTransaction(reference);

        if (verification.data.status !== 'success') {
            return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
        }

        const { metadata } = verification.data;
        const { organization_id, plan_id, billing_type } = metadata;

        // Calculate subscription end date
        const now = new Date();
        const expiresAt = new Date(now);
        if (billing_type === 'yearly') {
            expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        } else {
            expiresAt.setMonth(expiresAt.getMonth() + 1);
        }

        // Update organization subscription status
        const { error: orgError } = await supabase
            .from('organizations')
            .update({
                subscription_status: 'active',
                is_trial: false,
                trial_ends_at: null,
                updated_at: new Date().toISOString()
            })
            .eq('id', organization_id);

        if (orgError) {
            throw orgError;
        }

        // Create or update subscription record
        const { error: subError } = await supabase
            .from('subscriptions')
            .upsert({
                organization_id,
                plan_id,
                paystack_subscription_code: verification.data.reference,
                paystack_customer_code: verification.data.customer?.customer_code || null,
                status: 'active',
                started_at: now.toISOString(),
                expires_at: expiresAt.toISOString(),
                auto_renew: true,
                updated_at: now.toISOString()
            });

        if (subError) {
            throw subError;
        }

        return NextResponse.json({
            success: true,
            message: 'Subscription activated successfully'
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Failed to verify payment' },
            { status: 500 }
        );
    }
}