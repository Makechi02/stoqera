'use server'

import {createClient} from "@/lib/supabase/server";

export async function getSalesForCurrentOrganization(options = {}) {
    const supabase = await createClient();

    const {searchTerm = '', statusFilter = 'all', typeFilter = 'all'} = options;

    let query = supabase
        .from('sales')
        .select('*');

    if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%`);
    }

    if (statusFilter !== 'all') {
        query = query.eq('is_active', statusFilter === 'active');
    }

    if (typeFilter !== 'all') {
        query = query.eq('type', typeFilter);
    }

    const {data, error} = await query;

    if (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }

    return data || [];
}

export async function getProductsForSale(search = '') {
    const supabase = await createClient();

    let query = supabase
        .from('products')
        .select('id, name, selling_price, inventory: inventory!product_id(location_id, quantity_on_hand, quantity_reserved, quantity_available)')
        .eq('is_active', true);

    if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,sku.ilike.%${search}%,brand.ilike.%${search}%,barcode.ilike.%${search}%`);
    }

    const {data, error} = await query
        .limit(10);

    if (error) throw error;

    return data || [];
}

export async function getPaymentMethodsForSales() {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true);

    if (error) throw error;

    return data || [];
}
