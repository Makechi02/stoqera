'use server'

import {createClient} from "@/lib/supabase/server";

export async function getCategoriesForCurrentOrganization(searchTerm = '', statusFilter = '') {
    const supabase = await createClient();

    let query = supabase
        .from('categories')
        .select('*');

    if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
    }

    if (statusFilter) {
        query = query.eq('is_active', statusFilter === 'active');
    }

    query = query.order('sort_order', {ascending: true});

    const {data: categories, error} = await query;

    if (error) throw error;

    return categories || [];
}

export async function addCategory(data) {
    const supabase = await createClient();

    const {data: category, error} = await supabase
        .from('categories')
        .insert({
            organization_id: data.organization_id,
            name: data.name,
            description: data.description || null,
            parent_id: data.parent_id?.trim() ? data.parent_id : null,
            image_url: data.image_url || null,
            is_active: data.is_active ?? true,
            sort_order: data.sort_order ?? 0
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating category:', error);
        return null;
    }

    return category;
}

export async function getCategoryById(categoryId) {
    const supabase = await createClient();

    const {data: category, error} = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .limit(1)
        .single();

    if (error) throw error;

    return category || null;
}

export async function getSubCategories(categoryId) {
    const supabase = await createClient();

    const {data: categories, error} = await supabase
        .from('categories')
        .select('*')
        .eq('parent_id', categoryId);

    if (error) throw error;

    return categories;
}

export async function getProductsCountByCategory(categoryId) {
    const supabase = await createClient();

    const {data: products, error} = await supabase
        .from('products')
        .select('name, id')
        .eq('category_id', categoryId);

    if (error) throw error;

    return products;
}

export async function updateCategory(categoryId, data) {
    const supabase = await createClient();

    const {data: category, error} = await supabase
        .from('categories')
        .update({
            organization_id: data.organization_id,
            name: data.name,
            description: data.description,
            parent_id: data.parent_id?.trim() ? data.parent_id : null,
            image_url: data.image_url,
            is_active: data.is_active,
            sort_order: data.sort_order,
            updated_at: new Date().toISOString()
        })
        .eq('id', categoryId)
        .select()
        .single();

    if (error) {
        console.error('Error updating category: ', error);
        return null;
    }

    return category;
}

export async function deleteCategory(categoryId) {
    const supabase = await createClient();

    await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);
}