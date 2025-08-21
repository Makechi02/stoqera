'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";
import {getCurrentLoggedInUser} from "@/lib/queryUsers";

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

export async function adjustTransferStock(data) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();
    const currentUser = await getCurrentLoggedInUser();

    const {data: stockItem, error} = await supabase
        .from('stock_movements')
        .insert({
            organization_id: organizationId,
            location_id: data.location_id?.trim(),
            product_id: data.product_id?.trim(),
            variant_id: data.variant_id?.trim() ? data.variant_id.trim() : null,
            movement_type: data.movement_type,
            transaction_type: data.transaction_type,
            quantity: data.quantity,
            unit_cost: data.unit_cost,
            reference_id: data.reference_id?.trim() ? data.reference_id.trim() : null,
            reference_type: data.reference_type,
            notes: data.notes || null,
            performed_by: currentUser?.id,
            performed_at: data.performed_at
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating stockItem:', error);
        return null;
    }

    return stockItem;
}
