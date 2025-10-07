'use server'

import {createClient} from "@/lib/supabase/server";

export async function getCurrentOrganizationId() {
    const supabase = await createClient();
    const {data: organizationId, error: organizationError} = await supabase.rpc('get_user_organization_id');

    if (organizationError) {
        console.error('Error fetching organization ID:', organizationError);
        return null;
    }

    return organizationId;
}

export async function getCurrentOrganization() {
    const supabase = await createClient();

    const organizationId = await getCurrentOrganizationId();

    const {data: organization, error} = await supabase
        .from('organizations')
        .select('*')
        .eq('id', organizationId)
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching organization:', error);
        throw error;
    }

    return organization || null;
}

export async function updateOrganization(formData) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data, error} = await supabase
        .from('organizations')
        .update({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            logo_url: formData.logo_url
        })
        .eq('id', organizationId)
        .select()
        .single();

    if (error) throw error;
    return data || null;
}