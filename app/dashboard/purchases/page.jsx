import PurchasesGrid from "@/components/dashboard/purchases/PurchasesGrid";
import {getPurchaseOrdersForCurrentOrganization} from "@/lib/queryPurchaseOrders";
import {PlusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import PurchaseOrdersSearchBar from "@/components/dashboard/purchases/PurchaseOrdersSearchBar";

export default async function Page(props) {
    const {search, status, date} = await props.searchParams;
    const purchaseOrders = await getPurchaseOrdersForCurrentOrganization(search, status, date);

    return (
        <div>
            <div className={`border-b border-gray-700 mb-8`}>
                <div className={`max-w-7xl mx-auto`}>
                    <div className={`flex flex-wrap gap-4 justify-between items-center min-h-16 mb-4`}>
                        <div className={`flex items-center`}>
                            <h1 className={`text-2xl font-bold font-heading`}>Purchase Orders</h1>
                            <div className={`ml-4 px-3 py-1 bg-teal-900 text-teal-300 rounded-full text-sm`}>
                                {purchaseOrders.length} orders
                            </div>
                        </div>
                        <div className={`flex-1 flex justify-end`}>
                            <Link
                                href={`/dashboard/purchases/create`}
                                className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors`}
                            >
                                <PlusIcon className={`size-5`}/>
                                <span>Create Purchase Order</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <PurchaseOrdersSearchBar/>
            <PurchasesGrid purchaseOrders={purchaseOrders}/>
        </div>
    )
}