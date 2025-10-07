'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";

export async function getStockAlertsForCurrentOrganization(options = {search: ''}) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('low_stock_alerts')
        .select('*, product: products(id, name, sku, min_stock_level, reorder_point), variant: product_variants(id, name), location: locations(id, name)');

    if (error) throw error;

    return data || [];
}

export async function acknowledgeLowStockAlert(alertId, formData) {
    const supabase = await createClient();
    const currentUser = await getCurrentLoggedInUser();

    const {data, error} = await supabase
        .from('low_stock_alerts')
        .update({
            is_acknowledged: formData.is_acknowledged,
            acknowledged_by: currentUser.id,
            acknowledged_at: new Date()
        })
        .eq('id', alertId)
        .select()
        .single();

    if (error) {
        console.error('Error creating stockItem: ', error);
        return null;
    }

    return data;
}

