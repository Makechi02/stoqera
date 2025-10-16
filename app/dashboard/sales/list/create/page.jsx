import CreateSalePage from "@/components/dashboard/sales/list/create/CreateSalePage";
import {getProductsForSale} from "@/lib/sales/querySales";

export default async function Page({searchParams}) {
    const {search} = await searchParams;
    const products = await getProductsForSale(search);

    return (
        <div>
            <CreateSalePage products={products}/>
        </div>
    )
}