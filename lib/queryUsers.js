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

    const {data: user, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .limit(1)
        .single();

    if (error) throw error;
    return user;
}

export async function getUserById(userId) {
    const supabase = await createClient();
    const {data: user, error} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .limit(1)
        .single();

    if (error) throw error;
    return user;
}

export async function signOut() {
    const supabase = await createClient();
    const {error} = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out:', error);
        throw error;
    }
}
