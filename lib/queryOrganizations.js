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
