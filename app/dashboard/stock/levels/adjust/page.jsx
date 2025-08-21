import StockAdjustmentForm from "@/components/dashboard/stock/StockAdjustmentForm";
import {BackBtn} from "@/components/ui/buttons";
import {getLocationsForCurrentOrganization} from "@/lib/queryLocations";
import {getProductsForCurrentOrganization} from "@/lib/queryProducts";

export default async function Page() {
    const locations = await getLocationsForCurrentOrganization();
    const products = await getProductsForCurrentOrganization();

    return (
        <div>
            <div className={`py-6 border-b border-gray-700`}>
                <div className="flex items-center">
                    <BackBtn/>
                    <div>
                        <h2 className={`text-3xl font-bold font-heading`}>Adjust Stock</h2>
                        <p className={`text-gray-400 mt-1`}>Add inventory and record stock movements</p>
                    </div>
                </div>
            </div>

            <StockAdjustmentForm locations={locations} products={products}/>
        </div>
    )
}