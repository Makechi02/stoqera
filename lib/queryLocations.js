import {db} from "@/db";
import {categories, locations, products} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function getLocationsByOrganization(organizationId) {
    return db
        .select()
        .from(locations)
        .where(eq(locations.organizationId, organizationId));
}

export async function getCategoryById(categoryId) {
    const categoryArray = await db
        .select()
        .from(categories)
        .where(eq(categories.id, categoryId));

    return categoryArray[0];
}

export async function getParentCategoryById(parentId) {
    const categoryArray = await db
        .select()
        .from(categories)
        .where(eq(categories.id, parentId));

    return categoryArray[0];
}

export async function getSubCategories(categoryId) {
    return db
        .select()
        .from(categories)
        .where(eq(categories.parentId, categoryId));
}

export async function getProductsCountByCategory(categoryId) {
    return db
        .select()
        .from(products)
        .where(eq(products.categoryId, categoryId));
}