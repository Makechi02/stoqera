'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/organization/queryOrganizations";

export async function getPaymentMethodsForCurrentOrganization() {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('payment_methods')
        .select('*');

    if (error) {
        console.error('Error fetching payment methods:', error);
        throw error;
    }

    return data || [];
}

export async function getPaymentMethodById(methodId) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('payment_methods')
        .select('*')
        .eq('id', methodId)
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching the payment method:', error);
        throw error;
    }

    return data || null;
}

export async function addPaymentMethod(formData) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data, error} = await supabase
        .from('payment_methods')
        .insert([{
            organization_id: organizationId,
            name: formData.name.trim(),
            type: formData.type,
            processing_fee_percentage: formData.processing_fee_percentage || 0,
            is_active: formData.is_active
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating payment method:', error);
        throw error;
    }

    return data || null;
}

export async function updatePaymentMethod(methodId, formData) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('payment_methods')
        .update({
            name: formData.name.trim(),
            type: formData.type,
            processing_fee_percentage: formData.processing_fee_percentage || 0,
            is_active: formData.is_active
        })
        .eq('id', methodId)
        .select()
        .single();

    if (error) {
        console.error('Error updating payment method: ', error);
        throw error;
    }

    return data || null;
}

export async function deletePaymentMethod(methodId) {
    const supabase = await createClient();

    const {error} = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', methodId);

    if (error) throw error;
}
