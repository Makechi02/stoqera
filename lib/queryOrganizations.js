'use server'

import {createClient} from "@/lib/supabase/server";

export async function getOrganizationBySlug(slug) {
    const supabase = await createClient();
    const {data: organization, error} = await supabase
        .from('organizations')
        .select('*')
        .eq('slug', slug)
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching organization:', error);
        return null;
    }

    return organization;
}

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

    return organization;
}
