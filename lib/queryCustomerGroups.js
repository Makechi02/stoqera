'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";

export async function getCustomerGroupsForCurrentOrganization(searchTerm = '') {
    const supabase = await createClient();

    let query = supabase
        .from('customer_groups')
        .select('*');

    if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%`);
    }

    query = query.order('name');

    const {data, error} = await query;

    if (error) throw error;

    return data || [];
}

export async function getCustomerGroupById(groupId) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('customer_groups')
        .select('*')
        .eq('id', groupId)
        .single();

    if (error) throw error;

    return data || null;
}

export async function getCustomerGroupStats(groupId) {
    // TODO: Handle customer group stats
    console.log(groupId);

    return {
        totalCustomers: 0,
        activeCustomers: 0,
        totalRevenue: 0,
        avgOrderValue: 0
    };
}

export async function addCustomerGroup(data) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data: customerGroup, error} = await supabase
        .from('customer_groups')
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

export async function updateCustomerGroup(data, groupId) {
    const supabase = await createClient();

    const {data: customerGroup, error} = await supabase
        .from('customer_groups')
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

export async function deleteCustomerGroup(groupId) {
    const supabase = await createClient();

    const {error} = await supabase
        .from('customer_groups')
        .delete()
        .eq('id', groupId);

    if (error) throw error;
}