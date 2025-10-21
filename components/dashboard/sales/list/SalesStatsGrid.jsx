import {CurrencyDollarIcon, ShoppingCartIcon, UserGroupIcon} from "@heroicons/react/24/outline";
import {CheckIcon as CheckIconSolid} from '@heroicons/react/24/solid';
import {formatCurrency} from "@/utils/formatters";

export default function SalesStatsGrid({stats}) {
    const statsData = [
        {
            label: `Total Sales`,
            value: stats.totalSales,
            icon: ShoppingCartIcon,
            iconColor: `text-teal-400`,
            iconBg: 'bg-teal-500/20'
        },
        {
            label: `Total Revenue`,
            value: formatCurrency(stats.totalRevenue),
            icon: CurrencyDollarIcon,
            iconColor: `text-teal-400`,
            iconBg: 'bg-teal-500/20'
        },
        {
            label: `Completed`,
            value: stats.completedSales,
            icon: CheckIconSolid,
            iconColor: `text-teal-400`,
            iconBg: 'bg-teal-500/20'
        },
        {
            label: `Pending Payments`,
            value: stats.pendingPayments,
            icon: UserGroupIcon,
            iconColor: `text-yellow-400`,
            iconBg: 'bg-yellow-500/20'
        }
    ];

    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}>
            {statsData.map((stat, index) => (
                <div key={index} className={`bg-gray-800 rounded-xl p-6 border border-gray-800`}>
                    <div className={`flex items-center justify-between`}>
                        <div>
                            <p className={`text-gray-400 text-sm`}>{stat.label}</p>
                            <p className={`text-2xl font-bold text-white mt-1`}>{stat.value}</p>
                        </div>
                        <div className={`size-12 rounded-lg flex items-center justify-center ${stat.iconBg}`}>
                            <stat.icon className={`size-6 ${stat.iconColor}`}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}