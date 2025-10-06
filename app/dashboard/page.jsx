import {getDashboardStats} from "@/lib/dashboard/queryStats";
import DashboardStatsCards from "@/components/dashboard/home/DashboardStatsCards";
import DashboardQuickActions from "@/components/dashboard/home/DashboardQuickActions";
import {Suspense} from "react";

export const revalidate = 60;

export default function Page() {
    const dashboardStatsPromise = getDashboardStats();

    return (
        <div className={`max-w-7xl mx-auto space-y-6`}>
            <div>
                <h2 className={`text-3xl font-bold font-heading`}>Inventory Overview</h2>
                <p className={`text-gray-400 mt-1`}>
                    Monitor your stock, sales, and business performance across all locations.
                </p>
            </div>

            <Suspense fallback={<StatsGridSkeleton/>}>
                <DashboardStatsCards statsPromise={dashboardStatsPromise}/>
            </Suspense>

            <DashboardQuickActions/>
        </div>
    )
}

function StatsGridSkeleton() {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`bg-gray-700 rounded-lg shadow p-6 animate-pulse`}>
                    <div className={`h-4 bg-gray-500 rounded w-1/2 mb-4`}/>
                    <div className={`h-8 bg-gray-500 rounded w-3/4 mb-2`}/>
                    <div className={`h-3 bg-gray-500 rounded w-1/3`}/>
                </div>
            ))}
        </div>
    )
}