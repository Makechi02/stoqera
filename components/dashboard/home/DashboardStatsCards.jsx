import {
    ArrowTrendingDownIcon,
    ArrowTrendingUpIcon,
    BanknotesIcon,
    CubeIcon,
    ExclamationTriangleIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";
import {use} from "react";

export default function DashboardStatsCards({statsPromise}) {
    const dashboardStats = use(statsPromise);

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`}>
            <StatCard
                title={`Total Products`}
                value={dashboardStats.totalProducts.value}
                change={`${dashboardStats.totalProducts.change}%`}
                icon={CubeIcon}
                trend={dashboardStats.totalProducts.change >= 0 ? 'up' : 'down'}
                subtitle={`across ${dashboardStats.totalProducts.variants} variants`}
            />
            <StatCard
                title={`Total Sales`}
                value={dashboardStats.totalSales.value}
                change={`${dashboardStats.totalSales.change}%`}
                icon={BanknotesIcon}
                trend={dashboardStats.totalSales.change >= 0 ? 'up' : 'down'}
                subtitle={`${dashboardStats.totalSales.transactions} transactions`}
            />
            <StatCard
                title={`Active Customers`}
                value={dashboardStats.activeCustomers.value}
                change={`${dashboardStats.activeCustomers.change}%`}
                icon={UserGroupIcon}
                trend={dashboardStats.activeCustomers.change >= 0 ? 'up' : 'down'}
                subtitle={`across ${dashboardStats.activeCustomers.groups} customer groups`}
            />
            <StatCard
                title={`Low Stock Alerts`}
                value={dashboardStats.lowStockAlerts.value}
                change={`${dashboardStats.lowStockAlerts.change}%`}
                icon={ExclamationTriangleIcon}
                trend={dashboardStats.lowStockAlerts.change >= 0 ? 'up' : 'down'}
                subtitle={`require immediate attention`}
            />
        </div>
    )
}

function StatCard({title, value, change, icon: Icon, trend, subtitle}) {
    return (
        <div
            className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300`}
        >
            <div className={`flex items-center justify-between`}>
                <div>
                    <p className={`text-gray-400 text-sm font-medium`}>{title}</p>
                    <p className={`text-2xl font-bold mt-1`}>{value}</p>
                    {subtitle && (
                        <p className={`text-gray-500 text-xs mt-1`}>{subtitle}</p>
                    )}
                    <div className={`flex items-center mt-2`}>
                        {trend === 'up' ? (
                            <ArrowTrendingUpIcon className={`size-4 text-green-400 mr-1`}/>
                        ) : (
                            <ArrowTrendingDownIcon className={`size-4 text-red-400 mr-1`}/>
                        )}
                        <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </span>
                        <span className={`text-gray-500 text-sm ml-1`}>vs last month</span>
                    </div>
                </div>
                <div className={`bg-teal-500/20 p-3 rounded-lg`}>
                    <Icon className={`size-6 text-teal-400`}/>
                </div>
            </div>
        </div>
    )
}
