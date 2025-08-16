'use server'

import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

export async function getAllCategories(organizationId) {
    const supabase = await createClient();
    const {data: {session}} = await supabase.auth.getSession();

    if (session) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?organizationId=${organizationId}`, {
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 401) {
            redirect('/login?redirectFrom=/dashboard/categories');
        }

        if (response.ok) {
            return await response.json();
        }
    }
}

export async function addCategory(category) {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const {error} = await supabase
        .from('categories')
        .insert(category);
}

export async function getCategoryById(categoryId) {
    const supabase = await createClient();
    const {data: {session}} = await supabase.auth.getSession();

    if (session) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 401) {
            redirect('/login?redirectFrom=/dashboard');
        }

        if (response.ok) {
            return await response.json();
        }
    }
}

export async function getSubCategories(categoryId) {
    const supabase = await createClient();

    const {data: categories, error} = await supabase
        .from('categories')
        .select('*')
        .eq('parent_id', categoryId);

    return categories;
}

export async function getProductsCountByCategory(categoryId) {
    const supabase = await createClient();

    const {data: products, error} = await supabase
        .from('products')
        .select('name, id')
        .eq('category_id', categoryId);

    return products;
}

export async function updateCategory(categoryId, data) {
    const supabase = await createClient();

    const {data: category, error} = await supabase
        .from('categories')
        .update({
            name: data.name,
            description: data.description,
            parent_id: data.parent_id,
            image_url: data.image_url,
            is_active: data.is_active,
            sort_order: data.sort_order,
            updated_at: new Date().toISOString()
        })
        .eq('id', categoryId)
        .select()
        .single();

    return category;
}