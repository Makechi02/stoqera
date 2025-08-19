'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";

export async function getProductsForCurrentOrganization() {
    const supabase = await createClient();
    const {data: products, error} = await supabase
        .from('products')
        .select('*, inventory: inventory!product_id(location_id, quantity_on_hand, quantity_reserved, quantity_available)');

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    return products;
}

export async function getProductById(productId) {
    const supabase = await createClient();

    const {data: product, error} = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .limit(1)
        .single();

    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }

    return product;
}

export async function addProduct(data) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data: product, error} = await supabase
        .from('products')
        .insert({
            organization_id: organizationId,
            sku: data.sku,
            name: data.name,
            description: data.description,
            category_id: data.category_id.trim() ? data.category_id : null,
            brand: data.brand,
            unit_of_measure: data.unit_of_measure,
            barcode: data.barcode,
            qr_code: data.qr_code,
            cost_price: data.cost_price,
            selling_price: data.selling_price,
            min_stock_level: data.min_stock_level,
            max_stock_level: data.max_stock_level,
            reorder_point: data.reorder_point,
            reorder_quantity: data.reorder_quantity,
            weight: data.weight,
            dimensions: data.dimensions,
            images: data.images,
            tags: data.tags,
            is_active: data.is_active ?? true,
            is_trackable: data.is_trackable ?? true
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating product:', error);
        return null;
    }

    return product;
}

export async function updateProduct(productId, data) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();

    const {data: product, error} = await supabase
        .from('products')
        .update({
            organization_id: organizationId,
            sku: data.sku,
            name: data.name,
            description: data.description,
            category_id: data.category_id.trim() ? data.category_id : null,
            brand: data.brand,
            unit_of_measure: data.unit_of_measure,
            barcode: data.barcode,
            qr_code: data.qr_code,
            cost_price: data.cost_price,
            selling_price: data.selling_price,
            min_stock_level: data.min_stock_level,
            max_stock_level: data.max_stock_level,
            reorder_point: data.reorder_point,
            reorder_quantity: data.reorder_quantity,
            weight: data.weight,
            dimensions: data.dimensions,
            images: data.images,
            tags: data.tags,
            is_active: data.is_active ?? true,
            is_trackable: data.is_trackable ?? true,
            updated_at: new Date().toISOString()
        })
        .eq('id', productId)
        .select()
        .single();

    if (error) {
        console.error('Error updating product: ', error);
        return null;
    }

    return product;
}

export async function deleteProduct(productId) {
    const supabase = await createClient();

    await supabase
        .from('products')
        .delete()
        .eq('id', productId);
}