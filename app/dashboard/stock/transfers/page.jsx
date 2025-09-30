import TransfersList from "@/components/dashboard/stock/transfers/TransfersList";
import Link from "next/link";
import {ArrowDownTrayIcon, PlusIcon} from "@heroicons/react/24/outline";
import {fetchTransfers, getTransferStats} from "@/lib/stock/queryStockTransfers";
import TransferStatsCards, {TransferStatsLoading} from "@/components/dashboard/stock/transfers/TransferStatsCards";
import {Suspense} from "react";
import TransfersFilterBar from "@/components/dashboard/stock/transfers/TransfersFilterBar";

export default async function Page(props) {
    const searchParams = await props.searchParams;
    const {search, status, sortBy, sortOrder, dateRange} = searchParams;

    const statsPromise = getTransferStats();
    const transfersPromise = fetchTransfers({
        searchTerm: search,
        status,
        sortBy,
        sortOrder,
        dateRange: dateRange ? JSON.parse(dateRange) : null,
    });

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto`}>
                    <div className={`flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8`}>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading mb-2`}>Stock Transfers</h1>
                            <p className={`text-gray-400`}>
                                Manage and track your inventory transfers across locations
                            </p>
                        </div>
                        <div className={`flex justify-end gap-3 mt-4 lg:mt-0`}>
                            <button
                                className={`px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors`}>
                                <ArrowDownTrayIcon className={`size-4`}/>
                                Export
                            </button>
                            <Link
                                href={`/dashboard/stock/transfers/create`}
                                className={`px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center gap-2 transition-colors`}
                            >
                                <PlusIcon className={`size-4`}/>
                                Request Transfer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`py-6 max-w-7xl mx-auto`}>
                <Suspense fallback={<TransferStatsLoading/>}>
                    <TransferStatsCards statsPromise={statsPromise}/>
                </Suspense>

                <TransfersFilterBar/>

                <TransfersList transfersPromise={transfersPromise}/>
            </div>
        </div>
    )
}
