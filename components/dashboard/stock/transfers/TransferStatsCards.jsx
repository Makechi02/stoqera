import StatsCardSkeleton from "@/components/ui/loading/StatsCardSkeleton";
import {use} from "react";
import {CheckCircleIcon, ClockIcon, CubeIcon, TruckIcon, XCircleIcon} from "@heroicons/react/24/outline";

export default function TransferStatsCards({statsPromise}) {
    const statsData = use(statsPromise);
    const stats = statsData.data;

    const statCards = [
        {label: 'Total Transfers', value: stats.total, icon: CubeIcon, color: 'text-blue-400', bg: 'bg-blue-500/20'},
        {label: 'Pending', value: stats.pending, icon: ClockIcon, color: 'text-yellow-400', bg: 'bg-yellow-500/20'},
        {
            label: 'Approved',
            value: stats.approved,
            icon: CheckCircleIcon,
            color: 'text-green-400',
            bg: 'bg-green-500/20'
        },
        {label: 'In Transit', value: stats.inTransit, icon: TruckIcon, color: 'text-teal-400', bg: 'bg-teal-500/20'},
        {
            label: 'Completed',
            value: stats.completed,
            icon: CheckCircleIcon,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500/20'
        },
        {label: 'Cancelled', value: stats.cancelled, icon: XCircleIcon, color: 'text-red-400', bg: 'bg-red-500/20'}
    ];

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8`}>
            {statCards.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index}
                         className={`bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-teal-500/50 transition-colors`}>
                        <div className={`flex items-center justify-between mb-4`}>
                            <div className={`p-2 rounded-lg ${stat.bg}`}>
                                <Icon className={`size-5 ${stat.color}`}/>
                            </div>
                            <span className={`text-xs text-gray-400 font-medium`}>
                                {((stat.value / stats.total) * 100).toFixed(0)}%
                            </span>
                        </div>
                        <div className={`text-2xl font-bold mb-1`}>{stat.value}</div>
                        <div className={`text-sm text-gray-400`}>{stat.label}</div>
                    </div>
                );
            })}
        </div>
    );
};

export function TransferStatsLoading() {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8`}>
            {Array(6).fill(0).map((_, i) => (
                <StatsCardSkeleton key={i}/>
            ))}
        </div>
    )
}