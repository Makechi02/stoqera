'use server'

import {createClient} from "@/lib/supabase/server";
import {getCurrentOrganizationId} from "@/lib/organization/queryOrganizations";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";

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
        .select('*, category: categories(id, name), variants: product_variants(*), inventory: inventory!product_id(location_id, quantity_on_hand, quantity_reserved, quantity_available)')
        .eq('id', productId)
        .limit(1)
        .single();

    if (error) throw error;

    return product || null;
}

export async function getCategoriesForProducts() {
    const supabase = await createClient();
    const {data: categories, error} = await supabase
        .from('categories')
        .select('id, name');

    if (error) throw error;

    return categories;
}

export async function addProduct(data) {
    const supabase = await createClient();
    const organizationId = await getCurrentOrganizationId();
    const currentUser = await getCurrentLoggedInUser();

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
            is_trackable: data.is_trackable ?? true,
            created_by: currentUser.id,
        })
        .select()
        .single();

    if (error) throw error;

    const productVariants = data.variants.map(variant => ({
        product_id: product.id,
        sku: variant.sku,
        name: variant.name,
        attributes: variant.attributes,
        cost_price: variant.cost_price,
        selling_price: variant.selling_price,
        barcode: variant.barcode,
        is_active: variant.is_active ?? true
    }));

    const {data: createdVariants, error: itemsError} = await supabase
        .from('product_variants')
        .insert(productVariants)
        .select(`*`);

    if (itemsError) throw itemsError;

    return {data: {product, items: createdVariants}};
}

export async function updateProduct(productId, data) {
    const supabase = await createClient();

    const {data: product, error} = await supabase
        .from('products')
        .update({
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

    if (error) throw error;

    const productVariants = data.variants.map(variant => ({
        product_id: productId,
        sku: variant.sku,
        name: variant.name,
        attributes: variant.attributes,
        cost_price: variant.cost_price,
        selling_price: variant.selling_price,
        barcode: variant.barcode,
        is_active: variant.is_active ?? true
    }));

    return product || null;
}

export async function deleteProduct(productId) {
    const supabase = await createClient();

    await supabase
        .from('products')
        .delete()
        .eq('id', productId);
}