import {getDashboardStats} from "@/lib/dashboard/queryStats";
import DashboardStatsCards from "@/components/dashboard/home/DashboardStatsCards";
import DashboardQuickActions from "@/components/dashboard/home/DashboardQuickActions";

export default async function Page() {
    const dashboardStats = await getDashboardStats();

    return (
        <div className={`max-w-7xl mx-auto space-y-6`}>
            <div>
                <h2 className={`text-3xl font-bold font-heading`}>Inventory Overview</h2>
                <p className={`text-gray-400 mt-1`}>
                    Monitor your stock, sales, and business performance across all locations.
                </p>
            </div>

            <DashboardStatsCards dashboardStats={dashboardStats}/>
            <DashboardQuickActions lowStockAlerts={dashboardStats.lowStockAlerts.value}/>
        </div>
    )
}
