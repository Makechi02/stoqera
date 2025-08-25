'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";

export async function getPurchaseOrdersForCurrentOrganization(searchTerm = '', status = '', date = '') {
    const supabase = await createClient();

    let query = supabase
        .from('purchase_orders')
        .select('*');

    if (searchTerm) {
        query = query.or(`po_number.ilike.%${searchTerm}%, notes.ilike.%${searchTerm}%`);
    }

    query = query.order('order_date', {ascending: false});

    const {data, error} = await query;

    if (error) throw error;

    return data || [];
}

export async function getPurchaseOrderById(purchaseOrderId) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('purchase_orders')
        .select('*')
        .eq('id', purchaseOrderId)
        .single();

    if (error) throw error;

    return data || null;
}

export async function addPurchaseOrder(data) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data: customerGroup, error} = await supabase
        .from('purchase_orders')
        .insert({
            organization_id: organizationId,
            name: data.name,
            description: data.description || null,
            color: data.color || null,
            discount_percentage: data.discount_percentage || 0,
            is_default: data.is_default ?? false
        })
        .select()
        .single();

    if (error) throw error;

    return customerGroup || null;
}

export async function updatePurchaseOrder(data, groupId) {
    const supabase = await createClient();

    const {data: customerGroup, error} = await supabase
        .from('purchase_orders')
        .update({
            name: data.name,
            description: data.description || null,
            color: data.color || null,
            discount_percentage: data.discount_percentage || 0,
            is_default: data.is_default ?? false
        })
        .eq('id', groupId)
        .select()
        .single();

    if (error) throw error;

    return customerGroup || null;
}

export async function deletePurchaseOrder(purchaseOrderId) {
    const supabase = await createClient();

    const {error} = await supabase
        .from('purchase_orders')
        .delete()
        .eq('id', purchaseOrderId);

    if (error) throw error;
}