'use server'

import {createClient} from "@/lib/supabase/server";

export async function getUserForCurrentOrganization() {
    const supabase = await createClient();

    const {data: users, error} = await supabase
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }

    return users;
}
