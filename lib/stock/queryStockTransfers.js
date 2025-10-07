'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/organization/queryOrganizations";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";
import {generateTransferNumber} from "@/utils/codeGenerators";

export async function createTransfer(transferData) {
    const supabase = await createClient();

    const organizationId = await getCurrentOrganizationId();
    const currentUser = await getCurrentLoggedInUser();

    const transferNumber = generateTransferNumber();

    // Create the transfer record
    const { data: transfer, error: transferError } = await supabase
        .from('stock_transfers')
        .insert({
            from_location_id: transferData.from_location_id,
            to_location_id: transferData.to_location_id,
            notes: transferData.notes || null,
            organization_id: organizationId,
            requested_by: currentUser.id,
            transfer_number: transferNumber,
            status: 'pending',
            requested_at: new Date().toISOString()
        })
        .select()
        .single();

    if (transferError) throw transferError;

    // Create transfer items
    const transferItems = transferData.items.map(item => ({
        transfer_id: transfer.id,
        product_id: item.product_id,
        variant_id: item.variant_id || null,
        quantity_requested: item.quantity,
        unit_cost: item.unit_cost || null
    }));

    const { data: createdItems, error: itemsError } = await supabase
        .from('stock_transfer_items')
        .insert(transferItems)
        .select(`
                *,
                product:products(id, name, sku),
                variant:product_variants(id, name)
            `);

    if (itemsError) throw itemsError;

    return {data: { transfer, items: createdItems }};
}

export async function fetchTransferWithDetails(transferId) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('stock_transfers')
        .select(`
            *,
            from_location:locations!from_location_id(id, name, address),
            to_location:locations!to_location_id(id, name, address),
            requester:profiles!requested_by(id, full_name, email),
            approver:profiles!approved_by(id, full_name, email),
            shipper:profiles!shipped_by(id, full_name, email),
            receiver:profiles!received_by(id, full_name, email),
            stock_transfer_items(
                *,
                product:products(id, name, sku, description),
                variant:product_variants(id, name, sku)
            )
        `)
        .eq('id', transferId)
        .single();

    return { data, error };
}

export async function updateTransferStatus(transferId, status, additionalData = {}) {
    const supabase = await createClient();

    const currentUser = await getCurrentLoggedInUser();

    const timestamp = new Date().toISOString();

    let updateData = {
        status,
        updated_at: timestamp,
        ...additionalData
    };

    switch (status) {
        case 'in_transit':
            updateData.approved_by = currentUser.id;
            updateData.approved_at = timestamp;
            updateData.shipped_by = currentUser.id;
            updateData.shipped_at = timestamp;
            break;
        case 'completed':
            updateData.received_by = currentUser.id;
            updateData.received_at = timestamp;
            break;
        case 'cancelled':
            updateData.approved_by = currentUser.id;
            updateData.approved_at = timestamp;
            break;
    }

    const { data, error } = await supabase
        .from('stock_transfers')
        .update(updateData)
        .eq('id', transferId)
        .select()
        .single();

    if (error) throw error;

    return data || null;
}

export async function updateTransferItemQuantities(items) {
    const supabase = await createClient();

    const updatedItems = [];

    for (const item of items) {
        const { data, error } = await supabase
            .from('stock_transfer_items')
            .update({
                quantity_shipped: item.quantity_shipped ?? undefined,
                quantity_received: item.quantity_received ?? undefined
            })
            .eq('id', item.id)
            .select()
            .single();

        if (error) throw error;
        if (data) updatedItems.push(data);
    }

    return updatedItems;
}

// Fetch Transfers with Advanced Filtering
export async function fetchTransfers(options = {}) {
    const {
        searchTerm = '',
        status = '',
        fromLocationId = '',
        toLocationId = '',
        requestedBy = '',
        dateRange = null, // { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
        sortBy = 'created_at',
        sortOrder = 'desc',
        page = 1,
        limit = 20
    } = options;

    const supabase = await createClient();

    try {
        let query = supabase
            .from('stock_transfers')
            .select(`
                id,
                transfer_number,
                status,
                requested_at,
                approved_at,
                shipped_at,
                received_at,
                created_at,
                updated_at,
                notes,
                from_location:locations!from_location_id(id, name, address),
                to_location:locations!to_location_id(id, name, address),
                requester:profiles!requested_by(id, full_name, email),
                approver:profiles!approved_by(id, full_name),
                shipper:profiles!shipped_by(id, full_name),
                receiver:profiles!received_by(id, full_name),
                stock_transfer_items!inner(
                    id,
                    quantity_requested,
                    quantity_shipped,
                    quantity_received,
                    product:products(name)
                )
            `, { count: 'exact' });

        // TODO: Add search filters for transfer number, location names, and requester name
        // Search filter - searches transfer number, location names, and requester name
        if (searchTerm.trim()) {
            // query = query.or(`transfer_number.ilike.%${searchTerm}%,from_location.name.ilike.%${searchTerm}%,to_location.name.ilike.%${searchTerm}%,requester.full_name.ilike.%${searchTerm}%,notes.ilike.%${searchTerm}%`);
            query = query.or(`transfer_number.ilike.%${searchTerm}%, notes.ilike.%${searchTerm}%`);
        }

        // Status filter
        if (status) {
            query = query.eq('status', status);
        }

        // Location filters
        if (fromLocationId) {
            query = query.eq('from_location_id', fromLocationId);
        }
        if (toLocationId) {
            query = query.eq('to_location_id', toLocationId);
        }

        // Requested by filter
        if (requestedBy) {
            query = query.eq('requested_by', requestedBy);
        }

        // Date range filter
        if (dateRange) {
            if (dateRange.from) {
                query = query.gte('created_at', `${dateRange.from}T00:00:00.000Z`);
            }
            if (dateRange.to) {
                query = query.lte('created_at', `${dateRange.to}T23:59:59.999Z`);
            }
        }

        // Sorting
        const validSortFields = [
            'created_at', 'updated_at', 'requested_at', 'approved_at',
            'shipped_at', 'received_at', 'transfer_number', 'status'
        ];
        const validSortOrders = ['asc', 'desc'];

        const finalSortBy = validSortFields.includes(sortBy) ? sortBy : 'created_at';
        const finalSortOrder = validSortOrders.includes(sortOrder) ? sortOrder : 'desc';

        query = query.order(finalSortBy, { ascending: finalSortOrder === 'asc' });

        // Pagination
        const offset = (page - 1) * limit;
        query = query.range(offset, offset + limit - 1);

        const { data, error, count } = await query;

        if (error) throw error;

        // Calculate totals for each transfer
        const transfersWithTotals = data?.map(transfer => ({
            ...transfer,
            totalItems: transfer.stock_transfer_items?.length || 0,
            totalQuantityRequested: transfer.stock_transfer_items?.reduce(
                (sum, item) => sum + (item.quantity_requested || 0), 0
            ) || 0,
            totalQuantityShipped: transfer.stock_transfer_items?.reduce(
                (sum, item) => sum + (item.quantity_shipped || 0), 0
            ) || 0,
            totalQuantityReceived: transfer.stock_transfer_items?.reduce(
                (sum, item) => sum + (item.quantity_received || 0), 0
            ) || 0
        })) || [];

        return {
            data: transfersWithTotals,
            count: count || 0,
            totalPages: Math.ceil((count || 0) / limit),
            currentPage: page,
            hasNextPage: (page * limit) < (count || 0),
            hasPrevPage: page > 1,
            error: null
        };
    } catch (error) {
        console.error('Error fetching transfers:', error);
        return {
            data: [],
            count: 0,
            totalPages: 0,
            currentPage: page,
            hasNextPage: false,
            hasPrevPage: false,
            error
        };
    }
}

// Get transfer statistics/summary
export const getTransferStats = async (dateRange = null) => {
    try {
        const supabase = await createClient();
        let query = supabase
            .from('stock_transfers')
            .select('status, created_at');

        if (dateRange) {
            if (dateRange.from) {
                query = query.gte('created_at', `${dateRange.from}T00:00:00.000Z`);
            }
            if (dateRange.to) {
                query = query.lte('created_at', `${dateRange.to}T23:59:59.999Z`);
            }
        }

        const { data, error } = await query;
        if (error) throw error;

        const stats = {
            total: data?.length || 0,
            pending: data?.filter(t => t.status === 'pending').length || 0,
            approved: data?.filter(t => t.status === 'approved').length || 0,
            inTransit: data?.filter(t => t.status === 'in_transit').length || 0,
            completed: data?.filter(t => t.status === 'completed').length || 0,
            cancelled: data?.filter(t => t.status === 'cancelled').length || 0
        };

        return { data: stats, error: null };
    } catch (error) {
        return { data: null, error };
    }
};

// Get available locations for transfer creation
export async function getTransferLocations() {
    try {
        const supabase = await createClient();
        const {data, error} = await supabase
            .from('locations')
            .select('id, name')
            .eq('is_active', true)
            .order('name');

        return {data: data || [], error};
    } catch (error) {
        return {data: [], error};
    }
}

// Get products for transfer creation
export async function getTransferProducts(searchTerm = '') {
    try {
        const supabase = await createClient();

        let query = supabase
            .from('products')
            .select(`
                id,
                name,
                sku,
                description,
                product_variants(id, name, sku, barcode),
                inventory: inventory!product_id(location_id, quantity_on_hand, quantity_reserved, quantity_available)
            `)
            .eq('is_active', true);

        if (searchTerm.trim()) {
            query = query.or(`name.ilike.%${searchTerm}%, sku.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%`);
        }

        query = query
            .order('name')
            .limit(50);

        const {data, error} = await query;
        return {data: data || [], error};
    } catch (error) {
        return {data: [], error};
    }
}

// Get recent transfers for dashboard
export async function getRecentTransfers(limit = 5) {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('stock_transfers')
            .select(`
                id,
                transfer_number,
                status,
                created_at,
                from_location:locations!from_location_id(name),
                to_location:locations!to_location_id(name),
                requester:profiles!requested_by(full_name)
            `)
            .order('created_at', { ascending: false })
            .limit(limit);

        return { data: data || [], error };
    } catch (error) {
        return { data: [], error };
    }
}

// Bulk operations
export async function bulkUpdateTransferStatus(transferIds, status, userId, notes = '') {
    try {
        const supabase = await createClient();
        const timestamp = new Date().toISOString();
        let updateData = {
            status,
            updated_at: timestamp,
            notes: notes || undefined
        };

        // Set appropriate fields based on status
        switch (status) {
            case 'cancelled':
                updateData.approved_by = userId;
                updateData.approved_at = timestamp;
                break;
        }

        const { data, error } = await supabase
            .from('stock_transfers')
            .update(updateData)
            .in('id', transferIds)
            .select('id, transfer_number, status');

        return { data: data || [], error };
    } catch (error) {
        return { data: [], error };
    }
}
