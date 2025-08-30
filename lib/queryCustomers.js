'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";

export async function getCustomersForCurrentOrganization(searchTerm = '', groupFilter = 'all', statusFilter = 'all', currentPage = 1, itemsPerPage = 10) {
    const supabase = await createClient();

    let query = supabase
        .from('customers')
        .select(`*, customer_groups (id, name, color, discount_percentage)`, {count: 'exact'});

    if (searchTerm) {
        query = query.or(`first_name.ilike.%${searchTerm}%, last_name.ilike.%${searchTerm}%, business_name.ilike.%${searchTerm}%, email.ilike.%${searchTerm}%, customer_code.ilike.%${searchTerm}%`);
    }

    if (groupFilter !== 'all') {
        query = query.eq('customer_group_id', groupFilter);
    }

    if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
    }

    const from = (currentPage - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    query = query
        .order('created_at', {ascending: false})
        .range(from, to);

    const {data, error, count} = await query;

    if (error) throw error;

    return {customers: data || [], totalCount: count || 0};
}

export async function getCustomerById(customerId) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('customers')
        .select('*, customer_groups (id, name, description, discount_percentage, color), profiles: assigned_to (id, full_name, email)')
        .eq('id', customerId)
        .single();

    if (error) throw error;

    return data || null;
}

export async function getCustomerContacts(customerId) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('customer_contacts')
        .select('*')
        .eq('customer_id', customerId)
        .order('is_primary', {ascending: false});

    if (error) throw error;

    return data || [];
}

export async function getRecentCustomerInteractions(customerId) {
    const supabase = await createClient();

    const {data, error} = await supabase
        .from('customer_interactions')
        .select(`*, profiles: performed_by (full_name)`)
        .eq('customer_id', customerId)
        .order('created_at', {ascending: false})
        .limit(10);

    if (error) throw error;

    return data || [];
}

export async function addCustomer(formData, contacts = []) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data: customer, error: customerError} = await supabase
        .from('customers')
        .insert([{
            ...formData,
            organization_id: organizationId,
            date_of_birth: formData.date_of_birth ? new Date(formData.date_of_birth).toISOString() : null,
            customer_group_id: formData.customer_group_id || null,
            assigned_to: formData.assigned_to || null,
        }])
        .select()
        .single();

    if (customerError) throw customerError;

    if (formData.type === 'business' && contacts.length > 0) {
        const validContacts = contacts
            .filter(contact => contact.name.trim())
            .map(contact => ({
                ...contact,
                customer_id: customer.id
            }));

        if (validContacts.length > 0) {
            await addCustomerContacts(validContacts);
        }
    }

    return customer || null;
}

export async function addCustomerContacts(contacts) {
    const supabase = await createClient();

    const {error: contactsError} = await supabase
        .from('customer_contacts')
        .insert(contacts);

    if (contactsError) throw contactsError;
}
