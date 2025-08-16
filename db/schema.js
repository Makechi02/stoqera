import {
    boolean,
    check,
    date,
    decimal,
    inet,
    integer,
    jsonb,
    pgTable,
    text,
    timestamp,
    unique,
    uuid,
    varchar
} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";

export const organizations = pgTable('organizations', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 255}).notNull(),
    slug: varchar('slug', {length: 100}).unique('slug').notNull(),
    email: varchar('email', {length: 255}),
    phone: varchar('phone', {length: 50}),
    address: text('address'),
    logoUrl: text('logo_url'),
    subscriptionPlan: varchar('subscription_plan', {length: 50}).default('basic'),
    subscriptionStatus: varchar('subscription_status', {length: 20}).default('active'),
    settings: jsonb('settings').default({}),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const profiles = pgTable('profiles', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    email: varchar('email', {length: 255}).notNull(),
    fullName: varchar('full_name', {length: 255}),
    avatarUrl: text('avatar_url'),
    role: varchar('role', {length: 50}).default('user'),
    permissions: jsonb('permissions').default({}),
    isSuperAdmin: boolean('is_superadmin').default(false),
    lastLogin: timestamp('last_login', {withTimezone: true}),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
}, (table) => ({
    checkSuperAdminNoOrg: check(
        'check_superadmin_no_org',
        sql`
                (${table.isSuperAdmin} = true AND ${table.organizationId} IS NULL)
                OR
                (${table.isSuperAdmin} = false AND ${table.organizationId} IS NOT NULL)
        `),
}));

export const locations = pgTable('locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    name: varchar('name', {length: 255}).notNull(),
    type: varchar('type', {length: 50}).default('store'),
    code: varchar('code', {length: 50}).unique('code_unique').notNull(),
    address: text('address'),
    city: varchar('city', {length: 100}),
    state: varchar('state', {length: 100}),
    postalCode: varchar('postal_code', {length: 20}),
    country: varchar('country', {length: 100}),
    phone: varchar('phone', {length: 50}),
    email: varchar('email', {length: 255}),
    managerId: uuid('manager_id').references(() => profiles.id),
    isActive: boolean('is_active').default(true),
    settings: jsonb('settings').default({}),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const userLocations = pgTable('user_locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .notNull()
        .references(() => profiles.id, {onDelete: 'cascade'}),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id, {onDelete: 'cascade'}),
    role: varchar('role', {length: 50}).default('user'),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow()
}, (table) => ({
    userLocationUnique: unique('user_location_unique').on(table.userId, table.locationId)
}));

export const categories = pgTable('categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    name: varchar('name', {length: 255}).notNull(),
    description: text('description'),
    parentId: uuid('parent_id').references(() => categories.id),
    imageUrl: text('image_url'),
    isActive: boolean('is_active').default(true),
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const suppliers = pgTable('suppliers', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    name: varchar('name', {length: 255}).notNull(),
    code: varchar('code', {length: 50}).unique('suppliers_code_unique').notNull(),
    contactPerson: varchar('contact_person', {length: 255}),
    email: varchar('email', {length: 255}),
    phone: varchar('phone', {length: 50}),
    address: text('address'),
    taxId: varchar('tax_id', {length: 100}),
    paymentTerms: integer('payment_terms').default(30),
    notes: text('notes'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const products = pgTable('products', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    sku: varchar('sku', {length: 100}).unique('sku_unique').notNull(),
    name: varchar('name').notNull(),
    description: text('description'),
    categoryId: uuid('category_id').references(() => categories.id),
    brand: varchar('brand', {length: 255}),
    unitOfMeasure: varchar('unit_of_measure', {length: 50}).default('pcs'),
    barcode: varchar('barcode', {length: 255}),
    qrCode: varchar('qr_code', {length: 255}),
    costPrice: decimal('cost_price', {scale: 2, precision: 10}).default(0),
    sellingPrice: decimal('selling_price', {scale: 2, precision: 10}).default(0),
    minStockLevel: integer('min_stock_level').default(0),
    maxSTockLevel: integer('max_stock_level'),
    reorderPoint: integer('reorder_point').default(0),
    reorderQuantity: integer('reorder_quantity').default(0),
    weight: decimal('weight', {scale: 3, precision: 8}),
    dimensions: jsonb('dimensions'),
    images: jsonb('images').default([]),
    tags: text('tags').array(),
    isActive: boolean('is_active').default(true),
    isTrackable: boolean('is_trackable').default(true),
    createdBy: uuid('created_by').references(() => profiles.id),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const productVariants = pgTable('product_variants', {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, {onDelete: 'cascade'}),
    sku: varchar('sku', {length: 100}).unique('product_variants_sku_unique').notNull(),
    name: varchar('name').notNull(),
    attributes: jsonb('attributes').default({}),
    costPrice: decimal('cost_price', {scale: 2, precision: 10}),
    sellingPrice: decimal('selling_price', {scale: 2, precision: 10}),
    barcode: varchar('barcode', {length: 255}),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const inventory = pgTable('inventory', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id, {onDelete: 'cascade'}),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, {onDelete: 'cascade'}),
    variantId: uuid('variant_id').references(() => productVariants.id),
    quantityOnHand: integer('quantity_on_hand').default(0),
    quantityReserved: integer('quantity_reserved').default(0),
    quantityAvailable: integer('quantity_available'),
    lastCountedAt: timestamp('last_counted_at', {withTimezone: true}),
    lastMovementAt: timestamp('last_movement_at', {withTimezone: true}).defaultNow(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
}, (table) => ({
    uniqueLocationProductVariant: unique('unique_location_product_variant').on(table.locationId, table.productId, table.variantId)
}));

export const stockMovements = pgTable('stock_movements', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id, {onDelete: 'cascade'}),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id, {onDelete: 'cascade'}),
    variantId: uuid('variant_id').references(() => productVariants.id),
    movementType: varchar('movement_type', {length: 50}).notNull(),
    transactionType: varchar('transaction_type', {length: 50}).notNull(),
    quantity: integer('quantity').notNull(),
    unitCost: decimal('unit_cost', {precision: 10, scale: 2}),
    referenceId: integer('reference_id'),
    referenceType: varchar('reference_type', {length: 50}),
    notes: text('notes'),
    performedBy: uuid('performed_by').references(() => profiles.id),
    performedAt: timestamp('performed_at', {withTimezone: true}).defaultNow(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow()
});

export const stockTransfers = pgTable('stock_transfers', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    transferNumber: uuid('transfer_number', {length: 100})
        .unique('stock_transfer_number_unique')
        .notNull(),
    fromLocationId: uuid('from_location_id').notNull().references(() => locations.id),
    toLocationId: uuid('to_location_id').notNull().references(() => locations.id),
    status: varchar('status', {length: 50}).default('pending'),
    requestedBy: uuid('requested_by').references(() => profiles.id),
    approvedBy: uuid('approved_by').references(() => profiles.id),
    shippedBy: uuid('shipped_by').references(() => profiles.id),
    receivedBy: uuid('received_by').references(() => profiles.id),
    requestedAt: timestamp('requested_at', {withTimezone: true}).defaultNow(),
    approvedAt: timestamp('approved_at', {withTimezone: true}),
    shippedAt: timestamp('shipped_at', {withTimezone: true}),
    receivedAt: timestamp('received_at', {withTimezone: true}),
    notes: text('notes'),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const stockTransferItems = pgTable('stock_transfer_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    transferId: uuid('transfer_id').references(() => stockTransfers.id, {onDelete: 'cascade'}),
    productId: uuid('product_id').notNull().references(() => products.id),
    variantId: uuid('variant_id').references(() => productVariants.id),
    quantityRequested: integer('quantity_requested').notNull(),
    quantityShipped: integer('quantity_shipped').default(0),
    quantityReceived: integer('quantity_received').default(0),
    unitCost: decimal('unit_cost', {precision: 10, scale: 2}),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const customerGroups = pgTable('customer_groups', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    name: varchar('name', {length: 255}).notNull(),
    description: text('description'),
    discountPercentage: decimal('discount_percentage', {precision: 5, scale: 2}).default(0),
    color: varchar('color', {length: 7}),
    isDefault: boolean('is_default').default(false),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const customers = pgTable('customers', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    customerCode: varchar('customer_code', {length: 50}).unique('customers_code_unique').notNull(),
    type: varchar('type', {length: 20}).default('individual'),
    fullName: varchar('full_name', {length: 255}),
    businessName: varchar('business_name', {length: 255}),
    taxId: varchar('tax_id', {length: 100}),
    email: varchar('email', {length: 255}),
    phone: varchar('phone', {length: 50}),
    dateOfBirth: date('date_of_birth'),
    gender: varchar('gender', {length: 20}),
    addressLine1: text('address_line_1'),
    addressLine2: text('address_line_2'),
    city: varchar('city', {length: 100}),
    state: varchar('state', {length: 100}),
    postalCode: varchar('postal_code', {length: 20}),
    country: varchar('country', {length: 100}).default('Kenya'),
    customerGroupId: uuid('customer_group_id').references(() => customerGroups.id),
    assignedTo: uuid('assigned_to').references(() => profiles.id),
    acquisitionSource: varchar('acquisitionSource', {length: 100}),
    status: varchar('status', {length: 20}).default('active'),
    creditLimit: decimal('credit_limit', {precision: 12, scale: 2}).default(0),
    currentCreditBalance: decimal('current_credit_balance', {precision: 12, scale: 2}).default(0),
    loyaltyPoints: integer('loyalty_points').default(0),
    preferredContactMethod: varchar('preferred_contact_method', {length: 20}).default('email'),
    marketingConsent: boolean('marketing_consent').default(false),
    notes: text('notes'),
    tags: text('tags').array(),
    customFields: jsonb('custom_fields').default({}),
    lastPurchaseDate: date('last_purchase_date'),
    totalPurchases: decimal('total_purchases', {precision: 12, scale: 2}).default(0),
    totalOrders: integer('total_orders').default(0),
    createdBy: uuid('created_by').references(() => profiles.id),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const customerContacts = pgTable('customer_contacts', {
    id: uuid('id').primaryKey().defaultRandom(),
    customerId: uuid('customer_id')
        .notNull()
        .references(() => customers.id, {onDelete: 'cascade'}),
    name: varchar('name', {length: 255}).notNull(),
    title: varchar('title', {length: 100}),
    email: varchar('email', {length: 255}),
    phone: varchar('phone', {length: 50}),
    isPrimary: boolean('is_primary').default(false),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const customerInteractions = pgTable('customer_interactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    customerId: uuid('customer_id')
        .notNull()
        .references(() => customers.id, {onDelete: 'cascade'}),
    type: varchar('type', {length: 50}).notNull(),
    subject: varchar('subject', {length: 255}),
    description: text('description'),
    outcome: varchar('outcome', {length: 100}),
    followUpDate: date('follow_up_date'),
    performedBy: uuid('performed_by').references(() => profiles.id),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow()
});


// SALES & TRANSACTIONS
export const salesChannels = pgTable('sales_channels', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    name: varchar('name', {length: 255}).notNull(),
    type: varchar('type', {length: 50}).notNull(),
    description: text('description'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow()
});

export const paymentMethods = pgTable('payment_methods', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    name: varchar('name', {length: 255}).notNull(),
    type: varchar('type', {length: 50}).notNull(),
    isActive: boolean('is_active').default(true),
    processingFeePercentage: decimal('processing_fee_percentage', {precision: 5, scale: 4}).default(0),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow()
});

// TODO
//     amount_due DECIMAL(12,2) GENERATED ALWAYS AS (total_amount - amount_paid) STORED,

export const sales = pgTable('sales', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id, {onDelete: 'cascade'}),
    saleNumber: varchar('sale_number', {length: 100}).unique('sales_sale_no_unique').notNull(),
    customerId: uuid('customer_id').references(() => customers.id),
    customerType: varchar('customer_type', {length: 20}).default('walk_in'),
    saleDate: timestamp('sale_date', {withTimezone: true}).defaultNow(),
    dueDate: date('due_date'),
    status: varchar('status', {length: 50}).default('completed'),
    type: varchar('type', {length: 50}).default('sale'),
    salesChannelId: uuid('sales_channel_id').references(() => salesChannels.id),
    subTotal: decimal('sub_total', {precision: 12, scale: 2}).default(0),
    discountAmount: decimal('discount_amount', {precision: 12, scale: 2}).default(0),
    discountPercentage: decimal('discount_percentage', {precision: 5, scale: 2}).default(0),
    taxAmount: decimal('tax_amount', {precision: 12, scale: 2}).default(0),
    taxPercentage: decimal('tax_percentage', {precision: 5, scale: 2}).default(0),
    shippingCost: decimal('shipping_cost', {precision: 12, scale: 2}).default(0),
    totalAmount: decimal('total_amount', {precision: 12, scale: 2}).default(0),
    paymentStatus: varchar('payment_status', {length: 50}).default('paid'),
    amountPaid: decimal('amount_paid', {precision: 12, scale: 2}).default(0),
    amountDue: decimal('amount_due', {precision: 12, scale: 2}),
    parentSaleId: uuid('parent_sale_id').references(() => sales.id),
    servedBy: uuid('served_by').references(() => profiles.id),
    approvedBy: uuid('approved_by').references(() => profiles.id),
    notes: text('notes'),
    internalNotes: text('internal_notes'),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

// TODO:
//     line_total DECIMAL(12,2) GENERATED ALWAYS AS (
//     (quantity * unit_price) - discount_amount + tax_amount
// ) STORED,

export const saleItems = pgTable('sale_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    saleId: uuid('sale_id')
        .notNull()
        .references(() => sales.id, {onDelete: 'cascade'}),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id),
    variantId: uuid('variant_id').references(() => productVariants.id),
    quantity: integer('quantity').notNull(),
    unitPrice: decimal('unit_price', {precision: 10, scale: 2}).notNull(),
    discountAmount: decimal('discount_amount', {precision: 10, scale: 2}).default(0),
    discountPercentage: decimal('discount_percentage', {precision: 5, scale: 2}).default(0),
    taxAmount: decimal('tax_amount', {precision: 10, scale: 2}).default(0),
    taxPercentage: decimal('tax_percentage', {precision: 5, scale: 2}).default(0),
    lineTotal: decimal('line_total', {precision: 12, scale: 2}),
    costPrice: decimal('cost_price', {precision: 10, scale: 2}),
    notes: text('text'),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
});

export const salePayments = pgTable('sale_payments', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    saleId: uuid('sale_id')
        .notNull()
        .references(() => sales.id, {onDelete: 'cascade'}),
    paymentMethodId: uuid('payment_method_id')
        .notNull()
        .references(() => paymentMethods.id),
    amount: decimal('amount', {precision: 12, scale: 2}).notNull(),
    referenceNumber: varchar('reference_number', {length: 255}),
    paymentDate: timestamp('payment_date', {withTimezone: true}).defaultNow(),
    notes: text('notes'),
    processedBy: uuid('processed_by').references(() => profiles.id),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
});

export const promotions = pgTable('promotions', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    name: varchar('name', {length: 255}).notNull(),
    description: text('description'),
    type: varchar('type', {length: 50}).notNull(),
    discountValue: decimal('decimal_value', {precision: 10, scale: 2}),
    minPurchaseAmount: decimal('min_purchase_amount', {precision: 10, scale: 2}),
    maxDiscountAmount: decimal('max_discount_amount', {precision: 10, scale: 2}),
    buyQuantity: integer('buy_quantity'),
    getQuantity: integer('get_quantity'),
    startDate: timestamp('start_date', {withTimezone: true}).notNull(),
    endDate: timestamp('end_date', {withTimezone: true}),
    usageLimit: integer('usage_limit'),
    usageLimitPerCustomer: integer('usage_limit_per_customer'),
    currentUsage: integer('current_usage').default(0),
    applicableLocations: uuid('applicable_locations').array(),
    applicableProducts: uuid('applicable_products').array(),
    applicableCategories: uuid('applicable_categories').array(),
    applicableCustomerGroups: uuid('applicable_customer_groups').array(),
    minimumCustomerTier: varchar('minimum_customer_tier', {length: 50}),
    isActive: boolean('is_active').default(true),
    isStackable: boolean('is_stackable').default(false),
    autoApply: boolean('auto_apply').default(false),
    promoCode: varchar('promo_code', {length: 50}).unique('promotions_promo_code_unique'),
    createdBy: uuid('created_by').references(() => profiles.id),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const promotionUsage = pgTable('promotion_usage', {
    id: uuid('id').primaryKey().defaultRandom(),
    promotionId: uuid('promotion_id')
        .notNull()
        .references(() => promotions.id, {onDelete: 'cascade'}),
    saleId: uuid('sale_id')
        .notNull()
        .references(() => sales.id, {onDelete: 'cascade'}),
    customerId: uuid('customer_id').references(() => customers.id),
    discountApplied: decimal('discount_applied', {precision: 12, scale: 2}).notNull(),
    usedAt: timestamp('used_at', {withTimezone: true}).defaultNow(),
});

export const loyaltyPrograms = pgTable('loyalty_programs', {
   id: uuid('id').primaryKey().defaultRandom(),
   organizationId: uuid('organization_id')
       .notNull()
       .references(() => organizations.id, {onDelete: 'cascade'}),
   name: varchar('name', {length: 255}).notNull(),
   description: text('description'),
   pointsPerCurrencyUnit: decimal('points_per_currency_unit', {precision: 8, scale: 4}).default(1),
   pointsValue: decimal('points_value', {precision: 8, scale: 4}).default(0.01),
   minPointsToRedeem: integer('min_points_to_redeem').default(100),
   maxPointsPerTransaction: integer('max_points_per_transaction'),
   pointExpiryMonths: integer('point_expiry_months'),
    welcomeBonusPoints: integer('welcome_bonus_points').default(0),
    birthdayBonusPoints: integer('birthday_bonus_points').default(0),
    referralBonusPoints: integer('referral_bonus_points').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const loyaltyTransactions = pgTable('loyalty_transactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    customerId: uuid('customer_id')
        .notNull()
        .references(() => customers.id, {onDelete: 'cascade'}),
    transactionType: varchar('transaction_type', {length: 50}).notNull(),
    points: integer('points').notNull(),
    referenceType: varchar('reference_type', {length: 50}),
    referenceId: uuid('reference_id'),
    description: text('description'),
    expiresAt: timestamp('expires_at', {withTimezone: true}),
    processedBy: uuid('processed_by').references(() => profiles.id),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow()
});

export const purchaseOrders = pgTable('purchase_orders', {
   id: uuid('id').primaryKey().defaultRandom(),
   organizationId: uuid('organization_id')
       .notNull()
       .references(() => organizations.id, {onDelete: 'cascade'}),
   locationId: uuid('location_id')
       .notNull()
       .references(() => locations.id),
   poNumber: varchar('po_number', {length: 100}).unique('purchase_orders_po_no_unique').notNull(),
   supplierId: uuid('supplier_id').references(() => suppliers.id),
   status: varchar('status', {length: 50}).default('draft'),
   orderDate: date('order_date').defaultNow(),
    expectedDate: date('expected_date'),
    receivedDate: date('received_date'),
    subTotal: decimal('sub_total', {precision: 12, scale: 2}).default(0),
    taxAmount: decimal('tax_amount', {precision: 12, scale: 2}).default(0),
    shippingCost: decimal('shipping_cost', {precision: 12, scale: 2}).default(0),
    totalAmount: decimal('total_amount', {precision: 12, scale: 2}).default(0),
    notes: text('notes'),
    createdBy: uuid('created_by').references(() => profiles.id),
    approvedBy: uuid('approved_by').references(() => profiles.id),
    receivedBy: uuid('received_by').references(() => profiles.id),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

// TODO:
//     total_cost DECIMAL(12,2) GENERATED ALWAYS AS (quantity_ordered * unit_cost) STORED,

export const purchaseOrderItems = pgTable('purchase_order_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    purchaseOrderId: uuid('purchase_order_id')
        .notNull()
        .references(() => purchaseOrders.id, {onDelete: 'cascade'}),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id),
    variantId: uuid('variant_id').references(() => productVariants.id),
    quantityOrdered: integer('quantity_ordered').notNull(),
    quantityReceived: integer('quantity_received').default(0),
    unitCost: decimal('unit_cost', {precision: 10, scale: 2}).notNull(),
    totalCost: decimal('total_cost', {precision: 12, scale: 2}),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const lowStockAlerts = pgTable('low_stock_alerts', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id),
    productId: uuid('product_id')
        .notNull()
        .references(() => products.id),
    variantId: uuid('variant_id').references(() => productVariants.id),
    currentStock: integer('current_stock').notNull(),
    minStockLevel: integer('min_stock_level').notNull(),
    alertLevel: varchar('alert_level', {length: 20}).default('low'),
    isAcknowledged: boolean('is_acknowledged').default(false),
    acknowledgedBy: uuid('acknowledged_by').references(() => profiles.id),
    acknowledgedAt: timestamp('acknowledged_at', {withTimezone: true}),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
});

export const platformSettings = pgTable('platform_settings', {
    id: uuid('id').primaryKey().defaultRandom(),
    key: varchar('key', {length: 100}).notNull(),
    value: jsonb('value').notNull(),
    description: text('description'),
    isPublic: boolean('is_public').default(false),
    createdBy: uuid('created_by').references(() => profiles.id),
    updatedBy: uuid('updated_by').references(() => profiles.id),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const subscriptionPlans = pgTable('subscription_plans', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 100}).notNull().unique('subscription_plans_name_unique'),
    displayName: varchar('display_name', {length: 255}).notNull(),
    description: text('description'),
    priceMonthly: decimal('price_monthly', {precision: 10, scale: 2}),
    priceYearly: decimal('price_yearly', {precision: 10, scale: 2}),
    features: jsonb('features').default('{}'),
    maxLocations: integer('max_locations'),
    maxUsers: integer('max_users'),
    maxProducts: integer('max_products'),
    storageLimitGb: integer('storage_limit_gb'),
    isActive: boolean('is_active').default(true),
    sortOrder: integer('sort_order').default(0),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

export const organizationUsage = pgTable('organization_usage', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    usageDate: date('usage_date').defaultNow(),
    totalUsers: integer('total_users').default(0),
    totalLocations: integer('total_locations').default(0),
    totalProducts: integer('total_products').default(0),
    totalTransactions: integer('total_transactions').default(0),
    storageUsedMb: integer('storage_used_mb').default(0),
    apiCalls: integer('api_calls').default(0),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
    updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
}, (table) => ({
    organizationIdUsageDateUnique: unique('organization_id_usage_date_unique').on(table.organizationId, table.usageDate)
}));

export const systemNotifications = pgTable('system_notifications', {
   id: uuid('id').primaryKey().defaultRandom(),
   title: varchar('title', {length: 255}).notNull(),
   message: text('message').notNull(),
   type: varchar('type', {length: 50}).default('info'),
   targetType: varchar('target_type', {length: 50}).default('all'),
   targetIds: uuid('target_ids').array(),
   isUrgent: boolean('is_urgent').default(false),
   expiresAt: timestamp('expires_at', {withTimezone: true}),
   createdBy: uuid('created_by').references(() => profiles.id),
   createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
   updatedAt: timestamp('updated_at', {withTimezone: true}).defaultNow()
});

// TODO:
//     UNIQUE(notification_id, COALESCE(organization_id, '00000000-0000-0000-0000-000000000000'::UUID), COALESCE(user_id, '00000000-0000-0000-0000-000000000000'::UUID))

export const notificationStatus = pgTable('notification_status', {
    id: uuid('id').primaryKey().defaultRandom(),
    notificationId: uuid('notification_id')
        .notNull()
        .references(() => systemNotifications.id, {onDelete: 'cascade'}),
    organizationId: uuid('organization_id').references(() => organizations.id, {onDelete: 'cascade'}),
    userId: uuid('user_id').references(() => profiles.id, {onDelete: 'cascade'}),
    isRead: boolean('is_read').default(false),
    readAt: timestamp('read_at', {withTimezone: true}),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
});

export const auditLogs = pgTable('audit_logs', {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organization_id')
        .notNull()
        .references(() => organizations.id, {onDelete: 'cascade'}),
    userId: uuid('user_id').references(() => profiles.id),
    action: varchar('action', {length: 100}),
    resourceType: varchar('resource_type', {length: 50}).notNull(),
    resource_id: uuid('resource_id'),
    oldValues: jsonb('old_values'),
    newValues: jsonb('new_values'),
    ipAddress: inet('ip_address'),
    userAgent: text('user_agent'),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow(),
});
