import Link from "next/link";
import React from "react";
import StockLevelsList from "@/components/dashboard/stock/StockLevelsList";
import {getInventorySummaryForCurrentOrganization, getStockLevelsForCurrentOrganization} from "@/lib/stock/queryStock";
import {ArrowTrendingDownIcon, ArrowTrendingUpIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import {formatCurrency} from "@/utils/formatters";
import {getLocationsForCurrentOrganization} from "@/lib/queryLocations";

export default async function Page() {
    const inventory = await getStockLevelsForCurrentOrganization();
    const summaryStats = await getInventorySummaryForCurrentOrganization();
    const locations = await getLocationsForCurrentOrganization();

    return (
        <div>
            <div className={`max-w-7xl mx-auto`}>
                <div className={`flex flex-wrap gap-4 justify-between items-center mb-6`}>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>Stock Levels</h1>
                        <p className={`text-gray-400 mt-2`}>
                            Monitor and manage your inventory across all locations
                        </p>
                    </div>

                    <Link
                        href={`/dashboard/stock/levels/adjust`}
                        className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                    >
                        Adjust Stock
                    </Link>
                </div>

                <SummaryCards summaryStats={summaryStats}/>
                <StockLevelsList locations={locations} inventory={inventory}/>
            </div>
        </div>
    )
}

function SummaryCards({summaryStats}) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8`}>
            <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Total Products</p>
                        <p className={`text-2xl font-bold`}>{summaryStats?.total_products || 0}</p>
                    </div>
                    <div className={`bg-teal-600/20 p-3 rounded-lg`}>
                        <ArrowTrendingUpIcon className={`size-6 text-teal-400`}/>
                    </div>
                </div>
            </div>

            <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Low Stock Items</p>
                        <p className={`text-2xl font-bold text-yellow-400`}>{summaryStats?.total_low_stock || 0}</p>
                    </div>
                    <div className={`bg-yellow-600/20 p-3 rounded-lg`}>
                        <ExclamationTriangleIcon className={`size-6 text-yellow-400`}/>
                    </div>
                </div>
            </div>

            <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Out of Stock</p>
                        <p className={`text-2xl font-bold text-red-400`}>{summaryStats?.total_out_of_stock || 0}</p>
                    </div>
                    <div className={`bg-red-600/20 p-3 rounded-lg`}>
                        <ArrowTrendingDownIcon className={`size-6 text-red-400`}/>
                    </div>
                </div>
            </div>

            <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Total Value</p>
                        <p className={`text-2xl font-bold`}>{formatCurrency(summaryStats?.total_cost_value || 0)}</p>
                    </div>
                    <div className={`bg-green-600/20 p-3 rounded-lg`}>
                        <ArrowTrendingUpIcon className={`size-6 text-green-400`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}