import CreateSalePage from "@/components/dashboard/sales/list/create/CreateSalePage";
import {generateSaleNumber, getActiveProducts} from "@/lib/sales/querySales";
import {getCurrentLocation} from "@/lib/queryLocations";

export default async function Page({searchParams}) {
    const {search} = await searchParams;
    const products = await getActiveProducts(search);
    const currentLocation = await getCurrentLocation();

    const saleNumber = await generateSaleNumber();

    return (
        <div>
            <CreateSalePage products={products} saleNumber={saleNumber} currentLocation={currentLocation}/>
        </div>
    )
}