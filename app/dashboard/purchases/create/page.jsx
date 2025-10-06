import PurchaseOrderForm from "@/components/dashboard/purchases/PurchaseOrderForm";
import {BackBtn} from "@/components/ui/buttons";
import {getLocationsForCurrentOrganization} from "@/lib/queryLocations";
import {getSuppliersForCurrentOrganization} from "@/lib/querySuppliers";
import {getProductsForCurrentOrganization} from "@/lib/products/queryProducts";

export default async function Page() {
    const products = await getProductsForCurrentOrganization();
    const suppliers = await getSuppliersForCurrentOrganization();
    const locations = await getLocationsForCurrentOrganization();

    return (
        <div className={`max-w-6xl mx-auto py-4`}>
            <div className={`mb-8`}>
                <div className={`flex items-center`}>
                    <BackBtn/>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>Purchase Order</h1>
                        <p className={`text-gray-400 mt-1`}>Create a purchase order for your inventory</p>
                    </div>
                </div>
            </div>

            <PurchaseOrderForm suppliers={suppliers} locations={locations} products={products}/>
        </div>
    )
}