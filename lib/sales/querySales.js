'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";

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

export async function getSaleChannelById(channelId) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('sales_channels')
        .select('*')
        .eq('id', channelId)
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching sales channel:', error);
        throw error;
    }

    return data || null;
}

export async function addSaleChannel(formData) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data, error} = await supabase
        .from('sales_channels')
        .insert([{
            organization_id: organizationId,
            name: formData.name.trim(),
            type: formData.type,
            description: formData.description.trim() || null,
            is_active: formData.is_active
        }])
        .select()
        .single();

    if (error) {
        console.error('Error creating sale channel:', error);
        throw error;
    }

    return data || null;
}

export async function updateSaleChannel(channelId, formData) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('sales_channels')
        .update({
            name: formData.name.trim(),
            type: formData.type,
            description: formData.description.trim() || null,
            is_active: formData.is_active
        })
        .eq('id', channelId)
        .select()
        .single();

    if (error) {
        console.error('Error updating sale channel: ', error);
        throw error;
    }

    return data || null;
}

export async function deleteSalesChannel(channelId) {
    const supabase = await createClient();

    const {error} = await supabase
        .from('sales_channels')
        .delete()
        .eq('id', channelId);

    if (error) throw error;
}
