import PurchaseOrderDetails from "@/components/dashboard/purchases/PurchaseOrderDetails";
import {getPurchaseOrderById} from "@/lib/queryPurchaseOrders";
import {notFound} from "next/navigation";

export default async function Page({params}) {
    const {id} = await params;
    const purchaseOrder = await getPurchaseOrderById(id);

    if (!purchaseOrder) notFound();

    return (
        <div>
            <PurchaseOrderDetails purchaseOrder={purchaseOrder}/>
        </div>
    )
}