'use client'

import {useRouter} from "next/navigation";
import {DashboardQuickActionButton} from "@/components/ui/buttons";
import {
    ArrowPathIcon,
    BuildingStorefrontIcon,
    ChartBarIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    PlusIcon,
    ShoppingCartIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function DashboardQuickActions({pendingPurchaseOrders = 0, lowStockAlerts = 0}) {
    const router = useRouter();

    return (
        <div className={`bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50`}>
            <h3 className={`text-lg font-semibold mb-4`}>Quick Actions</h3>
            <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4`}>
                <DashboardQuickActionButton
                    icon={PlusIcon}
                    label={`Add Product`}
                    variant={`primary`}
                    onClick={() => router.push('/dashboard/products/new')}
                />
                <DashboardQuickActionButton
                    icon={ShoppingCartIcon}
                    label={`New Sale`}
                    onClick={() => router.push('/dashboard/sales/list/create')}
                />
                <DashboardQuickActionButton
                    icon={DocumentTextIcon}
                    label={`Purchase Orders`}
                    badge={pendingPurchaseOrders}
                    onClick={() => router.push('/dashboard/purchases')}
                />
                <DashboardQuickActionButton
                    icon={ArrowPathIcon}
                    label={`Stock Transfer`}
                    onClick={() => router.push('/dashboard/stock/transfers')}
                />
                <DashboardQuickActionButton
                    icon={ExclamationTriangleIcon}
                    label={`Stock Alerts`}
                    badge={lowStockAlerts}
                    onClick={() => router.push('/dashboard/stock/alerts')}
                />
                <DashboardQuickActionButton
                    icon={UserGroupIcon}
                    label={`Customers`}
                    onClick={() => router.push('/dashboard/customers')}
                />
                <DashboardQuickActionButton
                    icon={BuildingStorefrontIcon}
                    label={`Suppliers`}
                    onClick={() => router.push('/dashboard/suppliers')}
                />
                <DashboardQuickActionButton
                    icon={ChartBarIcon}
                    label={`Reports`}
                    onClick={() => router.push('/dashboard/reports')}
                />
            </div>
        </div>
    )
}
