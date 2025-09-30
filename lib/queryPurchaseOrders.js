'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";
import {getCurrentLoggedInUser} from "@/lib/queryUsers";
import {adjustStock} from "@/lib/stock/queryStock";

export async function getPurchaseOrdersForCurrentOrganization(options = {}) {
    const supabase = await createClient();

    const {
        limit = 50,
        offset = 0,
        status = null,
        searchTerm = '',
        orderBy = 'created_at',
        orderDirection = 'desc'
    } = options;

    // Build the base query
    let query = supabase
        .from('purchase_orders')
        .select(`
            id,
            po_number,
            status,
            order_date,
            expected_date,
            received_date,
            subtotal,
            tax_amount,
            shipping_cost,
            total_amount,
            notes,
            created_at,
            updated_at,
            supplier:suppliers (id, name),
            location:locations (id, name, address),
            created_by_profile:profiles!created_by (id, full_name),
            approved_by_profile:profiles!approved_by (id, full_name),
            received_by_profile:profiles!received_by (id, full_name)
            `)
        .order(orderBy, {ascending: orderDirection === 'asc'})
        .range(offset, offset + limit - 1);

    if (searchTerm) {
        query = query.or(`po_number.ilike.%${searchTerm}%, notes.ilike.%${searchTerm}%`);
    }

    if (status) {
        query = query.eq('status', status);
    }

    const {data: purchaseOrders, error: ordersError} = await query;

    if (ordersError) {
        throw ordersError;
    }

    if (!purchaseOrders || purchaseOrders.length === 0) {
        return [];
    }

    // Get purchase order IDs for fetching items
    const orderIds = purchaseOrders.map(order => order.id);

    // Fetch purchase order items with product details
    const {data: orderItems, error: itemsError} = await supabase
        .from('purchase_order_items')
        .select(`
            id,
            purchase_order_id,
            quantity_ordered,
            quantity_received,
            unit_cost,
            total_cost,
            product: products(id, name, sku, description),
            variant:product_variants (id, name, sku,attributes)
        `)
        .in('purchase_order_id', orderIds);

    if (itemsError) {
        throw itemsError;
    }

    // Group items by purchase order ID
    const itemsByOrderId = {};
    if (orderItems) {
        orderItems.forEach(item => {
            if (!itemsByOrderId[item.purchase_order_id]) {
                itemsByOrderId[item.purchase_order_id] = [];
            }
            itemsByOrderId[item.purchase_order_id].push(item);
        });
    }

    // Transform data to match the component structure
    return purchaseOrders.map(order => ({
        id: order.id,
        po_number: order.po_number,
        status: order.status,
        order_date: order.order_date,
        expected_date: order.expected_date,
        received_date: order.received_date,
        subtotal: parseFloat(order.subtotal || 0),
        tax_amount: parseFloat(order.tax_amount || 0),
        shipping_cost: parseFloat(order.shipping_cost || 0),
        total_amount: parseFloat(order.total_amount || 0),
        notes: order.notes,
        created_at: order.created_at,
        updated_at: order.updated_at,
        supplier: {id: order.supplier?.id, name: order.supplier?.name || 'Unknown Supplier'},
        location: {id: order.location?.id, name: order.location?.name || 'Unknown Location'},
        created_by: {id: order.created_by_profile?.id, name: order.created_by_profile?.full_name || 'Unknown User'},
        approved_by: order.approved_by_profile ? {
            id: order.created_by_profile?.id,
            name: order.created_by_profile?.full_name || 'Unknown User',
        } : null,
        received_by: order.received_by_profile ? {
            id: order.created_by_profile?.id,
            name: order.created_by_profile?.full_name || 'Unknown User',
        } : null,

        items: itemsByOrderId[order.id] || [],
        items_count: (itemsByOrderId[order.id] || []).length,

        total_quantity_ordered: (itemsByOrderId[order.id] || [])
            .reduce((sum, item) => sum + (item.quantity_ordered || 0), 0),
        total_quantity_received: (itemsByOrderId[order.id] || [])
            .reduce((sum, item) => sum + (item.quantity_received || 0), 0)
    }));
}

export async function getPurchaseOrderById(orderId) {
    const supabase = await createClient();

    try {
        // If not found in the paginated results, fetch directly
        const {data, error} = await supabase
            .from('purchase_orders')
            .select(`
                id,
                po_number,
                status,
                order_date,
                expected_date,
                received_date,
                subtotal,
                tax_amount,
                shipping_cost,
                total_amount,
                notes,
                created_at,
                updated_at,
                supplier:suppliers (id, name),
                location:locations (id, name, address),
                created_by_profile:profiles!created_by (id, full_name),
                approved_by_profile:profiles!approved_by (id, full_name),
                received_by_profile:profiles!received_by (id, full_name)
            `)
            .eq('id', orderId)
            .single();

        if (error) throw error;

        // Get items for this specific order
        const {data: items, error: itemsError} = await supabase
            .from('purchase_order_items')
            .select(`
                *,
                product: products(id, name, sku, description),
                variant:product_variants (id, name, sku,attributes)
            `)
            .eq('purchase_order_id', orderId);

        if (itemsError) throw itemsError;

        return {
            ...data,
            items: items || [],
            items_count: (items || []).length,
            supplier: data.supplier || {name: 'Unknown Supplier'},
            location: data.location || {name: 'Unknown Location'},
            created_by: data.created_by_profile || {name: 'Unknown User'}
        };

    } catch (error) {
        console.error('Error fetching purchase order:', error);
        throw error;
    }
}

export async function addPurchaseOrder(data, orderItems = []) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();
    const currentUser = await getCurrentLoggedInUser();

    const generatePONumber = () => `PO-${Date.now()}`;
    // TODO: Handle approved and received by
    //     approved_by UUID REFERENCES profiles(id),
    //     received_by UUID REFERENCES profiles(id),

    const {data: purchaseOrder, error} = await supabase
        .from('purchase_orders')
        .insert({
            organization_id: organizationId,
            location_id: data.location_id,
            po_number: data.po_number || generatePONumber(),
            supplier_id: data.supplier_id,
            status: data.status || 'draft',
            order_date: data.order_date || new Date().toISOString().split('T')[0],
            expected_date: data.expected_date || null,
            received_date: data.received_date || null,
            subtotal: data.subtotal || 0,
            tax_amount: data.tax_amount || 0,
            shipping_cost: data.shipping_cost || 0,
            total_amount: data.total_amount || 0,
            notes: data.notes,
            created_by: currentUser.id,
        })
        .select()
        .single();

    if (error) throw error;

    if (orderItems.length > 0) {
        const validOrderItems = orderItems
            .filter(orderItem => orderItem.quantity_ordered)
            .map(orderItem => ({
                ...orderItem,
                quantity_received: purchaseOrder.status === 'received' ? orderItem.quantity_ordered : orderItem.quantity_received || 0,
                variant_id: orderItem.variant_id?.trim() ? orderItem.variant_id.trim() : null,
                purchase_order_id: purchaseOrder.id
            }));

        if (validOrderItems.length > 0) {
            await addPurchaseOrderItems(validOrderItems);
        }
    }

    if (purchaseOrder.status === 'received') {
        const items = await getPurchaseOrderItems(purchaseOrder.id);

        await adjustStock({
            locationId: purchaseOrder.location_id,
            movementType: 'in',
            transactionType: 'purchase',
            referenceType: 'purchase_order',
            referenceId: purchaseOrder.id,
            performedAt: new Date().toISOString(),
            notes: 'Stock received via PO',
            items: items.map(item => ({
                productId: item.product_id,
                variantId: item.variant_id,
                quantity: item.quantity_received || item.quantity_ordered, // fallback
                unitCost: item.unit_cost
            }))
        });
    }

    return purchaseOrder || null;
}

async function addPurchaseOrderItems(orderItems) {
    const supabase = await createClient();

    const {error} = await supabase
        .from('purchase_order_items')
        .insert(orderItems);

    if (error) throw error;
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

export async function updatePurchaseOrderStatus(purchaseOrderId, status) {
    // status = draft, sent, confirmed, received, cancelled

    const supabase = await createClient();
    const currentUser = await getCurrentLoggedInUser();
    const currentDate = new Date().toISOString().split('T')[0];
    const updatedStatus = status.toLowerCase();
    const currentStatus = (await getPurchaseOrderById(purchaseOrderId)).status;

    if (updatedStatus === currentStatus) {
        return null;
    }

    if (updatedStatus === 'approved' && currentStatus !== 'draft') {
        throw new Error('Cannot approve a purchase order that is not in draft status');
    }

    if (updatedStatus === 'received' && currentStatus !== 'approved') {
        throw new Error('Cannot receive a purchase order that is not in approved status');
    }

    if (updatedStatus === 'received' && (await getPurchaseOrderById(purchaseOrderId)).received_date) {
        throw new Error('Purchase order has already been received');
    }

    if (updatedStatus === 'cancelled' && currentStatus !== 'draft') {
        throw new Error('Cannot cancel a purchase order that is not in draft status');
    }

    if (updatedStatus === 'cancelled' && (await getPurchaseOrderById(purchaseOrderId)).received_date) {
        throw new Error('Purchase order has already been received');
    }

    const {data: purchaseOrder, error} = await supabase
    .from('purchase_orders')
        .update({
            status: updatedStatus,
            received_date: updatedStatus === 'received' ? currentDate : null,
            received_by: updatedStatus === 'received' ? currentUser.id : null,
            updated_at: currentDate,
        })
        .eq('id', purchaseOrderId)
        .select()
        .single();
    if (error) throw error;

    if (updatedStatus === 'received') {
        const items = await getPurchaseOrderItems(purchaseOrderId);

        await adjustStock({
            locationId: purchaseOrder.location_id,
            movementType: 'in',
            transactionType: 'purchase',
            referenceType: 'purchase_order',
            referenceId: purchaseOrder.id,
            performedAt: new Date().toISOString(),
            notes: 'Stock received via PO',
            items: items.map(item => ({
                productId: item.product_id,
                variantId: item.variant_id,
                quantity: item.quantity_received || item.quantity_ordered, // fallback
                unitCost: item.unit_cost
            }))
        });
    }

    return purchaseOrder || null;
}

async function getPurchaseOrderItems(purchaseOrderId) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('purchase_order_items')
        .select('*')
        .eq('purchase_order_id', purchaseOrderId);

    if (error) throw error;

    return data || [];
}

export async function deletePurchaseOrder(purchaseOrderId) {
    const supabase = await createClient();

    const {error} = await supabase
        .from('purchase_orders')
        .delete()
        .eq('id', purchaseOrderId);

    if (error) throw error;
}