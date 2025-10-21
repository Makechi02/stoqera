import Link from "next/link";
import {DocumentTextIcon} from "@heroicons/react/24/outline";
import {getSalesForCurrentOrganization, getSaleStatsForCurrentOrganization} from "@/lib/sales/querySales";
import SalesDashboard from "@/components/dashboard/sales/list/SalesDashboard";

export default async function Page({searchParams}) {
    const {search, filter} = await searchParams;

    const salesData = await getSalesForCurrentOrganization({searchTerm: search, statusFilter: filter});
    const stats = await getSaleStatsForCurrentOrganization();

    return (
        <div className={`max-w-7xl mx-auto`}>
            <div className={`border-b border-slate-700`}>
                <div className={`py-4`}>
                    <div className={`flex flex-wrap items-center justify-between gap-4`}>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Sales Dashboard</h1>
                            <p className={`text-slate-400 mt-1`}>Manage your sales and track performance</p>
                        </div>
                        <div className={`flex-1 flex justify-end`}>
                            <Link
                                href={`/dashboard/sales/list/create`}
                                className={`bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors`}>
                                <DocumentTextIcon className={`size-5`}/>
                                <span>New Sale</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <SalesDashboard salesData={salesData} stats={stats}/>
        </div>
    )
}