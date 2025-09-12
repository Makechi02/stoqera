import {NextResponse} from 'next/server';
import crypto from 'crypto';
import {createClient} from "@/lib/supabase/server";

export async function POST(request) {
    const supabase = await createClient();

    try {
        const body = await request.text();
        const signature = request.headers.get('x-paystack-signature');

        // Verify webhook signature
        const expectedSignature = crypto
            .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
            .update(body)
            .digest('hex');

        if (signature !== expectedSignature) {
            return NextResponse.json({error: 'Invalid signature'}, {status: 401});
        }

        const event = JSON.parse(body);

        // Handle different webhook events
        switch (event.event) {
            case 'subscription.create':
                await handleSuccessfulPayment(event.data);
                break;

            case 'subscription.disable':
                await handleSubscriptionDisable(event.data, supabase);
                break;

            case 'invoice.payment_failed':
                await handlePaymentFailed(event.data, supabase);
                break;

            default:
                console.log(`Unhandled webhook event: ${event.event}`);
        }

        return NextResponse.json({received: true});

    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json({error: 'Webhook processing failed'}, {status: 500});
    }
}

async function handleSuccessfulPayment(data) {
    const { metadata } = data;
    const supabase = await createClient();

    if (metadata?.organization_id && metadata?.plan_id) {
        // Activate subscription
        await supabase
            .from('organizations')
            .update({
                subscription_status: 'active',
                is_trial: false,
                updated_at: new Date().toISOString()
            })
            .eq('id', metadata.organization_id);

        // Log successful payment
        await supabase
            .from('payment_logs')
            .insert({
                organization_id: metadata.organization_id,
                amount: data.amount / 100, // Convert from kobo
                status: 'success',
                paystack_reference: data.reference,
                event_type: 'charge.success'
            });

        // Send confirmation email/WhatsApp
        // await sendSubscriptionConfirmation(metadata.organization_id);
    }
}

async function handleSubscriptionDisable(data, supabase) {
    const {error} = await supabase
        .from('subscriptions')
        .update({
            status: 'canceled',
            canceled_at: new Date().toISOString()
        })
        .eq('paystack_subscription_code', data.subscription_code);

    if (error) {
        console.error('Failed to update subscription:', error);
    }
}

async function handlePaymentFailed(data, supabase) {
    // Implement logic for handling failed payments
    // Maybe send notification to user, update subscription status, etc.
}