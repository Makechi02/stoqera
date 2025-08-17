'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";

export async function getSuppliersForCurrentOrganization() {
    const supabase = await createClient();
    const {data: suppliers, error} = await supabase
        .from('suppliers')
        .select('*');

    if (error) {
        console.error('Error fetching suppliers:', error);
        return [];
    }

    return suppliers;
}

export async function getSupplierById(supplierId) {
    const supabase = await createClient();

    const {data: supplier, error} = await supabase
        .from('suppliers')
        .select('*')
        .eq('id', supplierId)
        .limit(1)
        .single();

    return supplier;
}

export async function addSupplier(data) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data: supplier, error} = await supabase
        .from('suppliers')
        .insert({
            organization_id: organizationId,
            name: data.name,
            code: data.code,
            contact_person: data.contact_person,
            phone: data.phone,
            email: data.email,
            address: data.address,
            tax_id: data.tax_id,
            payment_terms: data.payment_terms,
            notes: data.notes,
            is_active: data.is_active ?? true
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating supplier:', error);
        return null;
    }

    return supplier;
}

export async function updateSupplier(supplierId, data) {
    const supabase = await createClient();

    const {data: supplier, error} = await supabase
        .from('suppliers')
        .update({
            organization_id: data.organization_id,
            name: data.name,
            code: data.code,
            contact_person: data.contact_person,
            phone: data.phone,
            email: data.email,
            address: data.address,
            tax_id: data.tax_id,
            payment_terms: data.payment_terms,
            notes: data.notes,
            is_active: data.is_active ?? true,
            updated_at: new Date().toISOString()
        })
        .eq('id', supplierId)
        .select()
        .single();

    if (error) {
        console.error('Error updating supplier: ', error);
        return null;
    }

    return supplier;
}

export async function deleteSupplier(supplierId) {
    const supabase = await createClient();

    await supabase
        .from('suppliers')
        .delete()
        .eq('id', supplierId);
}