'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentLocation} from "@/lib/queryLocations";
import {getCustomerDisplayName} from "@/utils/customerUtils";
import {getCurrentOrganizationId} from "@/lib/organization/queryOrganizations";
import {revalidatePath} from "next/cache";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";

export async function getSalesForCurrentOrganization(options = {}) {
    const supabase = await createClient();

    const {searchTerm = '', statusFilter = 'all'} = options;

    let query = supabase
        .from('sales')
        .select('*, customer: customers(id, first_name, last_name, business_name)');

    if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%`);
    }

    if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
    }

    const {data, error} = await query;

    if (error) {
        console.error('Error fetching sales:', error);
        throw error;
    }

    return data || [];
}

export async function getSaleStatsForCurrentOrganization() {
    const supabase = await createClient();

    const {data: sales, error} = await supabase
        .from('sales')
        .select("*");

    if (error) throw error;

    return {
        totalSales: sales?.length || 0,
        totalRevenue: sales.reduce((sum, sale) => sum + sale.total_amount, 0),
        completedSales: sales.filter(s => s.status === 'completed').length,
        pendingPayments: sales.filter(s => s.payment_status !== 'paid').length
    };
}

export async function getActiveProducts(search = '') {
    const supabase = await createClient();
    const currentLocation = await getCurrentLocation();

    let query = supabase
        .from('products')
        .select(`
                id, name, selling_price, cost_price, sku,
                category_id, categories (id, name),
                product_variants (id, name, sku, selling_price, cost_price),
                inventory (quantity_available, location_id)
            `)
        .eq('is_active', true)
        .eq('inventory.location_id', currentLocation.id);

    if (search) {
        query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,sku.ilike.%${search}%,brand.ilike.%${search}%,barcode.ilike.%${search}%`);
    }

    const {data: products, error} = await query
        .order('name', {ascending: true})
        .limit(10);

    if (error) throw error

    return products.map(product => ({
        ...product,
        stock: product.inventory?.[0]?.quantity_available || 0,
        category: product.categories?.name || 'Uncategorized'
    }))
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

export async function getCustomersForSales() {
    const supabase = await createClient()

    const {data: customers, error} = await supabase
        .from('customers')
        .select('id, first_name, last_name, business_name, phone, email, type')
        .eq('status', 'active')
        .order('first_name', {ascending: true})

    if (error) throw error;

    return customers
        .map(customer => ({
            ...customer,
            name: getCustomerDisplayName(customer)}
        ));
}

export async function getPaymentMethods() {
    const supabase = await createClient();

    const {data: paymentMethods, error} = await supabase
        .from('payment_methods')
        .select('id, name, type, processing_fee_percentage')
        .eq('is_active', true)
        .order('name', {ascending: true});

    if (error) throw error

    return paymentMethods;
}

export async function generateSaleNumber() {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data, error} = await supabase
        .rpc('generate_sale_number', {org_id: organizationId});

    if (error) throw error;

    return data || null;
}

export async function checkInventoryAvailability(items) {
    const supabase = await createClient();
    const currentLocation = await getCurrentLocation();

    const inventoryChecks = await Promise.all(
        items.map(async (item) => {
            const {data: inventory, error} = await supabase
                .from('inventory')
                .select('quantity_available')
                .eq('product_id', item.product_id)
                .eq('location_id', currentLocation.id)
                .maybeSingle()

            if (error) throw error

            const available = inventory?.quantity_available || 0
            const isAvailable = available >= item.quantity

            return {
                product_id: item.product_id,
                variant_id: item.variant_id,
                requested: item.quantity,
                available,
                isAvailable
            }
        })
    )

    const allAvailable = inventoryChecks.every(check => check.isAvailable)
    const unavailableItems = inventoryChecks.filter(check => !check.isAvailable)

    return {
        data: {
            allAvailable,
            checks: inventoryChecks,
            unavailableItems
        }
    }
}

export async function createSale(saleData) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();
    const currentLocation = await getCurrentLocation();
    const currentUser = await getCurrentLoggedInUser();

    // Start transaction
    const {data: sale, error: saleError} = await supabase
        .from('sales')
        .insert({
            organization_id: organizationId,
            location_id: currentLocation.id,
            sale_number: saleData.sale_number,
            customer_id: saleData.customer_id,
            customer_type: saleData.customer_type,
            sale_date: new Date().toISOString(),
            status: 'draft',
            type: saleData.type || 'sale',
            sales_channel_id: saleData.sales_channel_id,
            subtotal: saleData.subtotal,
            discount_amount: saleData.discount_amount || 0,
            discount_percentage: saleData.discount_percentage || 0,
            tax_amount: saleData.tax_amount || 0,
            tax_percentage: saleData.tax_percentage || 0,
            total_amount: saleData.total_amount,
            payment_status: saleData.payment_status || 'paid',
            amount_paid: saleData.amount_paid,
            served_by: currentUser.id,
            notes: saleData.notes,
            internal_notes: saleData.internal_notes
        })
        .select()
        .single();

    if (saleError) throw saleError;

    // Insert sale items
    const saleItems = saleData.items.map(item => ({
        sale_id: sale.id,
        product_id: item.id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: item.selling_price,
        discount_amount: item.discount_amount || 0,
        discount_percentage: item.discount_percentage || 0,
        tax_amount: item.tax_amount || 0,
        tax_percentage: item.tax_percentage || 0,
        cost_price: item.selling_price
    }));

    const {error: itemsError} = await supabase
        .from('sale_items')
        .insert(saleItems);

    if (itemsError) throw itemsError;

    // Insert payments
    if (saleData.payments && saleData.payments.length > 0) {
        const payments = saleData.payments.map(payment => ({
            organization_id: organizationId,
            sale_id: sale.id,
            payment_method_id: payment.method.id,
            amount: payment.amount,
            reference_number: payment.reference_number,
            payment_date: new Date().toISOString(),
            notes: payment.notes,
            processed_by: currentUser.id
        }));

        const {error: paymentsError} = await supabase
            .from('sale_payments')
            .insert(payments);

        if (paymentsError) throw paymentsError;
    }

    const { data: completedSale, error: updateError } = await supabase
        .from('sales')
        .update({status: saleData.status || 'completed'})
        .eq('id', sale.id)
        .select()
        .single()

    if (updateError) throw updateError;

    revalidatePath('/dashboard/sales/list');
    return completedSale;
}

export async function getSaleById(saleId) {
    const supabase = await createClient();

    const {data: sale, error} = await supabase
        .from('sales')
        .select(`
            *,
            customers (id, first_name, last_name, phone),
            locations (id, name),
            sale_items (
                *,
                products (id, name, sku),
                product_variants (id, name)
            ),
            sale_payments (
                *,
                payment_methods (id, name, type)
            )
        `)
        .eq('id', saleId)
        .single();

    if (error) throw error;

    return sale;
}

/**
 * Get recent sales for an organization
 */
export async function getRecentSales(limit = 20) {
    const supabase = await createClient();

    const {data: sales, error} = await supabase
        .from('sales')
        .select(`
            id,
            sale_number,
            sale_date,
            customer_type,
            total_amount,
            payment_status,
            status,
            customers (first_name, last_name)
        `)
        .order('created_at', {ascending: false})
        .limit(limit);

    if (error) throw error;

    return sales;
}

/**
 * Cancel/Void a sale
 */
export async function cancelSale(saleId, reason) {
    const supabase = await createClient();

    // Get sale details first
    const {data: sale, error: fetchError} = await supabase
        .from('sales')
        .select('*, sale_items(*)')
        .eq('id', saleId)
        .single();

    if (fetchError) throw fetchError;

    // Update sale status
    const {error: updateError} = await supabase
        .from('sales')
        .update({
            status: 'cancelled',
            internal_notes: `${sale.internal_notes || ''}\n\nCancelled: ${reason}`
        })
        .eq('id', saleId);

    if (updateError) throw updateError;

    // Restore inventory
    for (const item of sale.sale_items) {
        const {error: inventoryError} = await supabase.rpc(
            'restore_inventory_on_cancel',
            {
                p_product_id: item.product_id,
                p_location_id: sale.location_id,
                p_quantity: item.quantity
            }
        );

        if (inventoryError) throw inventoryError;
    }

    revalidatePath('/dashboard/sales/list');
    return {success: true};
}

/**
 * Create a sale return
 */
export async function createSaleReturn(returnData) {
    const supabase = await createClient();

    // Create return as a new sale with negative quantities
    const {data: returnSale, error: returnError} = await supabase
        .from('sales')
        .insert({
            organization_id: returnData.organization_id,
            location_id: returnData.location_id,
            sale_number: returnData.sale_number,
            customer_id: returnData.customer_id,
            customer_type: returnData.customer_type,
            sale_date: new Date().toISOString(),
            status: 'completed',
            type: 'return',
            parent_sale_id: returnData.parent_sale_id,
            subtotal: -Math.abs(returnData.subtotal),
            total_amount: -Math.abs(returnData.total_amount),
            payment_status: 'paid',
            amount_paid: -Math.abs(returnData.amount_paid),
            served_by: returnData.served_by,
            notes: returnData.notes
        })
        .select()
        .single();

    if (returnError) throw returnError;

    // Insert return items
    const returnItems = returnData.items.map(item => ({
        sale_id: returnSale.id,
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: -Math.abs(item.quantity), // Negative quantity for returns
        unit_price: item.unit_price,
        cost_price: item.cost_price
    }));

    const {error: itemsError} = await supabase
        .from('sale_items')
        .insert(returnItems);

    if (itemsError) throw itemsError;

    // Restore inventory
    for (const item of returnData.items) {
        const {error: inventoryError} = await supabase.rpc(
            'restore_inventory_on_return',
            {
                p_product_id: item.product_id,
                p_location_id: returnData.location_id,
                p_quantity: Math.abs(item.quantity)
            }
        );

        if (inventoryError) throw inventoryError;
    }

    revalidatePath('/dashboard/sales/list');
    return returnSale;
}

/**
 * Get a sales summary for a date range
 */
export async function getSalesSummary(startDate, endDate) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data: summary, error} = await supabase
        .rpc('get_sales_summary', {
            p_organization_id: organizationId,
            p_start_date: startDate,
            p_end_date: endDate
        });

    if (error) throw error;

    return summary;
}

export async function deleteSale(saleId) {
    const supabase = await createClient();

    await supabase
        .from('sales')
        .delete()
        .eq('id', saleId);
}
