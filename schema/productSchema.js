import {z} from 'zod';

const toNumber = (v) => (v === '' || v == null ? undefined : Number(v));

export const productRegex = {
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    url: /^https?:\/\/.+/i,
    sku: /^[a-zA-Z0-9-_]+$/,
};

// Dimensions schema
const dimensionsSchema = z.object({
    length: z.preprocess(toNumber, z.number().positive().optional()),
    width: z.preprocess(toNumber, z.number().positive().optional()),
    height: z.preprocess(toNumber, z.number().positive().optional()),
}).optional();

// Images schema - array of image URLs or file objects
const imagesSchema = z.array(z.object({
    url: z.string().regex(productRegex.url, 'Invalid URL format').optional(),
    file: z.any().optional(), // For file uploads
    id: z.string().optional(),
})).default([]);

// Product variant attributes schema
const variantAttributesSchema = z.record(z.string(), z.string()).default({});

// Product variant schema
const productVariantSchema = z.object({
    // id: z.string().optional(), // Optional for new variants
    sku: z.string()
        .min(1, 'Variant SKU is required')
        .max(100, 'SKU must be 100 characters or less')
        .regex(productRegex.sku, 'SKU can only contain letters, numbers, hyphens and underscores'),
    name: z.string()
        .min(1, 'Variant name is required')
        .max(255, 'Name must be 255 characters or less'),
    attributes: variantAttributesSchema,
    cost_price:
        z.preprocess(
            toNumber,
            z.number()
                .nonnegative('Cost price must be 0 or greater')
                .optional()
                .nullable()
        ),
    selling_price:
        z.preprocess(
            toNumber,
            z.number()
                .nonnegative('Selling price must be 0 or greater')
                .optional()
                .nullable()
        ),
    barcode: z.string()
        .max(255, 'Barcode must be 255 characters or less')
        .optional()
        .nullable(),
    is_active: z.boolean().default(true),
    _isDeleted: z.boolean().optional(), // For tracking deletions in edit mode
});

// Main product schema
export const productFormSchema = z.object({
    id: z.string().regex(productRegex.uuid, 'Invalid UUID format').optional(), // Optional for new products, required for editing
    sku: z.string()
        .min(1, 'SKU is required')
        .max(100, 'SKU must be 100 characters or less')
        .regex(productRegex.sku, 'SKU can only contain letters, numbers, hyphens and underscores'),
    name: z.string()
        .min(1, 'Product name is required')
        .max(255, 'Name must be 255 characters or less'),
    description: z.string().optional().nullable(),
    category_id: z.string().regex(productRegex.uuid, 'Invalid category ID').optional().nullable(),
    brand: z.string()
        .max(255, 'Brand must be 255 characters or less')
        .optional()
        .nullable(),
    unit_of_measure: z.string()
        .max(50, 'Unit of measure must be 50 characters or less')
        .default('pcs'),
    barcode: z.string()
        .max(255, 'Barcode must be 255 characters or less')
        .optional()
        .nullable(),
    qr_code: z.string()
        .max(255, 'QR code must be 255 characters or less')
        .optional()
        .nullable(),
    cost_price: z
        .preprocess(
            toNumber,
            z.number()
                .nonnegative('Cost price must be 0 or greater')
                .default(0)
        ),
    selling_price:
        z.preprocess(
            toNumber,
            z.number()
                .nonnegative('Selling price must be 0 or greater')
                .default(0)
        ),
    min_stock_level:
        z.preprocess(
            toNumber,
            z.number()
                .int('Minimum stock level must be a whole number')
                .nonnegative('Minimum stock level must be 0 or greater')
                .default(0)
        ),
    max_stock_level:
        z.preprocess(
            toNumber,
            z.number()
                .int('Maximum stock level must be a whole number')
                .nonnegative('Minimum stock level must be 0 or greater')
                .optional()
                .nullable()
        ),
    reorder_point:
        z.preprocess(
            toNumber,
            z.number()
                .int('Reorder point must be a whole number')
                .nonnegative('Reorder point must be 0 or greater')
                .default(0)
        ),
    reorder_quantity:
        z.preprocess(
            toNumber,
            z.number()
                .int('Reorder quantity must be a whole number')
                .nonnegative('Reorder quantity must be 0 or greater')
                .default(0)
        ),
    weight:
        z.preprocess(
            toNumber,
            z.number()
                .nonnegative('Weight must be 0 or greater')
                .optional()
                .nullable()
        ),
    dimensions: dimensionsSchema,
    images: imagesSchema,
    tags: z.array(z.string()).default([]),
    is_active: z.boolean().default(true),
    is_trackable: z.boolean().default(true),
    created_by: z.string().regex(productRegex.uuid, 'Invalid user ID').optional(),

    // Variants array
    variants: z.array(productVariantSchema).default([]),
}).refine((data) => {
    // Validate that max_stock_level is greater than min_stock_level if both are provided
    if (data.max_stock_level !== null && data.max_stock_level !== undefined) {
        return data.max_stock_level >= data.min_stock_level;
    }
    return true;
}, {
    message: 'Maximum stock level must be greater than or equal to minimum stock level',
    path: ['max_stock_level'],
}).refine((data) => {
    // Validate that selling price is greater than or equal to cost price
    if (data.selling_price && data.cost_price) {
        return data.selling_price >= data.cost_price;
    }
    return true;
}, {
    message: 'Selling price should be greater than or equal to cost price',
    path: ['selling_price'],
}).refine((data) => {
    // Ensure variant SKUs are unique within the product
    const skus = data.variants
        .filter(v => !v._isDeleted) // Ignore deleted variants
        .map(v => v.sku);
    return new Set(skus).size === skus.length;
}, {
    message: 'Variant SKUs must be unique',
    path: ['variants'],
});
