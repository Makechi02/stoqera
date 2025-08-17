'use server'

import {createClient} from "@/lib/supabase/server";

export async function getLocationsForCurrentOrganization() {
    const supabase = await createClient();

    const {data: locations, error} = await supabase
        .from('locations')
        .select('*, manager: profiles (id, full_name)');

    if (error) {
        console.error('Error fetching locations:', error);
        return [];
    }

    return locations;
}

export async function getLocationById(locationId) {
    const supabase = await createClient();

    const {data: location, error} = await supabase
        .from('locations')
        .select('*, manager: profiles (id, full_name, email)')
        .eq('id', locationId)
        .limit(1)
        .single();

    return location;
}

export async function addLocation(data) {
    const supabase = await createClient();

    const {data: location, error} = await supabase
        .from('locations')
        .insert({
            organization_id: data.organization_id,
            name: data.name,
            type: data.type,
            code: data.code,
            address: data.address,
            city: data.city,
            state: data.state,
            postal_code: data.postal_code,
            country: data.country,
            phone: data.phone,
            email: data.email,
            manager_id: data.manager_id?.trim() ? data.manager_id : null,
            is_active: data.is_active ?? true,
            settings: data.settings || {}
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating location:', error);
        return null;
    }

    return location;
}

export async function updateLocation(locationId, data) {
    const supabase = await createClient();

    const {data: location, error} = await supabase
        .from('locations')
        .update({
            organization_id: data.organization_id,
            name: data.name,
            type: data.type,
            code: data.code,
            address: data.address,
            city: data.city,
            state: data.state,
            postal_code: data.postal_code,
            country: data.country,
            phone: data.phone,
            email: data.email,
            manager_id: data.manager_id?.trim() ? data.manager_id : null,
            is_active: data.is_active ?? true,
            settings: data.settings || {},
            updated_at: new Date().toISOString()
        })
        .eq('id', locationId)
        .select()
        .single();

    if (error) {
        console.error('Error updating location: ', error);
        return null;
    }

    return location;
}

export async function deleteLocation(locationId) {
    const supabase = await createClient();

    await supabase
        .from('locations')
        .delete()
        .eq('id', locationId);
}