import ProcessTransfer from "@/components/dashboard/stock/transfers/ProcessTransfer";
import {fetchTransferWithDetails} from "@/lib/stock/queryStockTransfers";
import {notFound} from "next/navigation";
import {BackBtn} from "@/components/ui/buttons";

export default async function Page({params}) {
    const {id} = await params;
    const transferData = await fetchTransferWithDetails(id);

    const transfer = transferData.data;

    if (!transfer) notFound();

    return (
        <div className={`max-w-4xl mx-auto py-8`}>
            <div className={`flex items-center mb-8`}>
                <BackBtn/>
                <div>
                    <h1 className={`text-3xl font-bold font-heading`}>Process Transfer #{transfer.transfer_number}</h1>
                    <p className={`text-gray-400 mt-2`}>
                        {transfer.from_location?.name} → {transfer.to_location?.name}
                    </p>
                </div>
            </div>

            <ProcessTransfer transfer={transfer}/>
        </div>
    )
}