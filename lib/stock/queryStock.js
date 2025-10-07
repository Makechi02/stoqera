'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/organization/queryOrganizations";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";

export async function getStockLevelsForCurrentOrganization() {
    const supabase = await createClient();

    const {data: inventory, error} = await supabase
        .from('inventory')
        .select('*, product: products(id, name, sku, min_stock_level, reorder_point), variant: product_variants(id, name), location: locations(id, name)');

    if (error) {
        // console.error('Error fetching inventory:', error);
        return [];
    }

    return inventory;
}

export async function getInventorySummaryForCurrentOrganization() {
    const supabase = await createClient();

    const {data: inventorySummary, error} = await supabase
        .from('inventory_summary')
        .select('*')
        .single();

    if (error) {
        // console.error('Error fetching inventorySummary:', error);
        return null;
    }

    return inventorySummary;
}

export async function adjustStock(data) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();
    const currentUser = await getCurrentLoggedInUser();

    const rows = data.items.map(item => ({
        organization_id: organizationId,
        location_id: data.locationId,
        product_id: item.productId,
        variant_id: item.variantId || null,
        quantity: Number(item.quantity),
        movement_type: data.movementType,
        transaction_type: data.transactionType,
        reference_type: data.referenceType,
        reference_id: data.referenceId || null,
        unit_cost: Number(item.unitCost) || 0,
        performed_at: data.performedAt,
        notes: data.notes,
        performed_by: currentUser?.id
    }));

    const {count, error} = await supabase
        .from('stock_movements')
        .insert(rows, {count: 'exact'})
        .select();

    if (error) {
        console.error('Error creating stockItem: ', error);
        return 0;
    }

    return count;
}