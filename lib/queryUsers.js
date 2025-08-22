'use server'

import {createClient} from "@/lib/supabase/server";

export async function getUsersForCurrentOrganization() {
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

export async function getCurrentLoggedInUser() {
    const supabase = await createClient();
    const {data, error: userError} = await supabase.auth.getUser();

    if (userError) {
        console.error('Error fetching user: ', userError);
        return null;
    }

    return data.user;
}
