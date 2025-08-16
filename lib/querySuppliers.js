import {db} from "@/db";
import {suppliers} from "@/db/schema";
import {eq} from "drizzle-orm";

export async function getSuppliersByOrganization(organizationId) {
    return db
        .select()
        .from(suppliers)
        .where(eq(suppliers.organizationId, organizationId));
}

export async function getSupplierById(supplierId) {
    const supplierArray = await db
        .select()
        .from(suppliers)
        .where(eq(suppliers.id, supplierId));

    return supplierArray[0];
}
