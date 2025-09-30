'use client'

import {useEffect, useState} from 'react';
import {
    AdjustmentsHorizontalIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    BuildingStorefrontIcon,
    CheckCircleIcon,
    ClockIcon,
    CubeIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import {
    ExclamationTriangleIcon as ExclamationTriangleSolid,
    XCircleIcon as XCircleSolid
} from '@heroicons/react/24/solid';
import {formatTableDate} from "@/utils/formatters";
import {acknowledgeLowStockAlert} from "@/lib/stock/queryStockAlerts";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function LowStockList({stockAlerts}) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || 'all');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'created_at');
    const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
    const [showFilters, setShowFilters] = useState(false);

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }

        if (selectedLevel !== 'all') {
            params.set("level", selectedLevel);
        } else {
            params.delete("level");
        }

        if (sortBy !== 'created_at') {
            params.set("sortBy", sortBy);
        } else {
            params.delete("sortBy");
        }

        if (sortOrder !== 'desc') {
            params.set("sortOrder", sortOrder);
        } else {
            params.delete("sortOrder");
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, selectedLevel, sortBy, sortOrder, router, searchParams]);

    return (
        <div className={`max-w-7xl mx-auto py-8`}>
            <StatsCards alerts={stockAlerts}/>

            <div className={`flex items-center justify-end mb-6`}>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                >
                    <AdjustmentsHorizontalIcon className={`size-4 mr-2`}/>
                    Filters
                </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
                <FiltersPanel
                    searchTerm={searchTerm}
                    selectedLevel={selectedLevel}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    setSearchTerm={setSearchTerm}
                    setSelectedLevel={setSelectedLevel}
                    setSortBy={setSortBy}
                    setSortOrder={setSortOrder}
                />
            )}

            {/* Alerts Table */}
            <div className={`bg-gray-800 rounded-lg shadow border border-gray-700 overflow-hidden`}>
                <div className={`overflow-x-auto`}>
                    <AlertsTable alerts={stockAlerts}/>
                </div>

                {stockAlerts.length === 0 && (
                    <div className={`text-center py-12`}>
                        <CubeIcon className={`mx-auto h-12 w-12 text-gray-500`}/>
                        <h3 className={`mt-2 text-sm font-medium text-gray-300`}>No alerts found</h3>
                        <p className={`mt-1 text-sm text-gray-500`}>
                            {searchTerm || selectedLevel !== 'all'
                                ? 'Try adjusting your filters to see more results.'
                                : 'All inventory levels are healthy!'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

function StatsCards({alerts}) {
    const stats = {
        total: alerts.length,
        critical: alerts.filter(a => a.alert_level === 'critical').length,
        outOfStock: alerts.filter(a => a.alert_level === 'out_of_stock').length,
        low: alerts.filter(a => a.alert_level === 'low').length,
        unacknowledged: alerts.filter(a => !a.is_acknowledged).length
    };

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8`}>
            <StatCard stat={{
                title: 'Total Alerts',
                value: stats.total,
                icon: <CubeIcon className={`size-8 text-teal-400`}/>
            }}/>

            <StatCard stat={{
                title: 'Out of Stock',
                value: stats.outOfStock,
                icon: <XCircleIcon className={`size-8 text-red-400`}/>
            }}/>

            <StatCard stat={{
                title: 'Critical',
                value: stats.critical,
                icon: <ExclamationTriangleIcon className={`size-8 text-red-400`}/>
            }}/>

            <StatCard stat={{
                title: 'Low Stock',
                value: stats.low,
                icon: <ExclamationTriangleIcon className={`size-8 text-yellow-400`}/>
            }}/>

            {/*<StatCard stat={{*/}
            {/*    title: 'Unacknowledged',*/}
            {/*    value: stats.unacknowledged,*/}
            {/*    icon: <ClockIcon className={`size-8 text-orange-400`}/>*/}
            {/*}}/>*/}
        </div>
    )
}

function StatCard({stat}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <div className={`flex items-center`}>
                <div className={`flex-shrink-0`}>{stat.icon}</div>
                <div className={`ml-5 w-0 flex-1`}>
                    <dl>
                        <dt className={`text-sm font-medium text-gray-400 truncate`}>{stat.title}</dt>
                        <dd className={`text-lg font-medium`}>{stat.value}</dd>
                    </dl>
                </div>
            </div>
        </div>
    )
}

function FiltersPanel({
                          searchTerm,
                          selectedLevel,
                          sortBy,
                          sortOrder,
                          setSearchTerm,
                          setSelectedLevel,
                          setSortBy,
                          setSortOrder
                      }) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700`}>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
                <div>
                    <p className={`dashboard-form-label mb-2`}>Search Products</p>
                    <div className={`relative`}>
                        <div
                            className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                            <MagnifyingGlassIcon className={`size-5 text-gray-400`}/>
                        </div>
                        <input
                            type={`text`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`dashboard-form-input-icon border-gray-600`}
                            placeholder={`Search by product, variant, or location...`}
                        />
                    </div>
                </div>

                <div>
                    <p className={`dashboard-form-label mb-2`}>Alert Level</p>
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    >
                        <option value={`all`}>All Levels</option>
                        <option value={`out_of_stock`}>Out of Stock</option>
                        <option value={`critical`}>Critical</option>
                        <option value={`low`}>Low Stock</option>
                    </select>
                </div>

                <div>
                    <p className={`dashboard-form-label mb-2`}>Sort By</p>
                    <div className={`flex space-x-2`}>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={`dashboard-form-input border-gray-600`}
                        >
                            <option value={`created_at`}>Date Created</option>
                            <option value={`current_stock`}>Current Stock</option>
                            <option value={`min_stock_level`}>Min Stock Level</option>
                            <option value={`product_name`}>Product Name</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className={`px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        >
                            {sortOrder === 'asc' ? (
                                <ArrowUpIcon className={`size-4`}/>
                            ) : (
                                <ArrowDownIcon className={`size-4`}/>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function AlertsTable({alerts}) {
    const getAlertIcon = (level) => {
        switch (level) {
            case 'critical':
                return <ExclamationTriangleSolid className={`size-5 text-red-500`}/>;
            case 'out_of_stock':
                return <XCircleSolid className={`size-5 text-red-600`}/>;
            case 'low':
                return <ExclamationTriangleIcon className={`h-5 w-5 text-yellow-500`}/>;
            default:
                return null;
        }
    };

    const getAlertBadge = (level) => {
        const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
        ;
        switch (level) {
            case 'critical':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400`;
            case 'out_of_stock':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400`;
            case 'low':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400`;
            default:
                return baseClasses;
        }
    };

    const acknowledgeAlert = async (id) => {
        const updatedAlert = await acknowledgeLowStockAlert(id);
        if (!updatedAlert) {
            showErrorToast('Error acknowledging alert. Please try again.');
        }

        showSuccessToast('Alert acknowledged successfully!');
        window.location.reload();
    };

    return (
        <table className={`min-w-full divide-y divide-gray-700`}>
            <thead className={`bg-gray-700`}>
            <tr>
                <th className={`dashboard-table-heading`}>Product</th>
                <th className={`dashboard-table-heading`}>Location</th>
                <th className={`dashboard-table-heading`}>Stock Level</th>
                <th className={`dashboard-table-heading`}>Alert Level</th>
                <th className={`dashboard-table-heading`}>Created</th>
                <th className={`dashboard-table-heading`}>Status</th>
                <th className={`dashboard-table-heading text-right`}>Actions</th>
            </tr>
            </thead>
            <tbody className={`bg-gray-800 divide-y divide-gray-700`}>
            {alerts.map((alert) => (
                <tr key={alert.id} className={`hover:bg-gray-750`}>
                    <td className={`px-6 py-4 whitespace-nowrap`}>
                        <div className={`flex items-center`}>
                            {getAlertIcon(alert.alert_level)}
                            <div className={`ml-4`}>
                                <div className={`text-sm font-medium`}>{alert.product_name}</div>
                                <div className={`text-sm text-gray-400`}>{alert.variant_name}</div>
                            </div>
                        </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap`}>
                        <div className={`flex items-center`}>
                            <BuildingStorefrontIcon className={`size-4 text-gray-400 mr-2`}/>
                            <div className={`text-sm`}>{alert.location_name}</div>
                        </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap`}>
                        <div className={`text-sm text-white`}>
                            <span className={`font-medium ${
                                alert.current_stock === 0 ? 'text-red-400' :
                                    alert.current_stock < alert.min_stock_level / 2 ? 'text-orange-400' : 'text-teal-400'
                            }`}>
                                {alert.current_stock}
                            </span>
                            <span className={`text-gray-400`}> / {alert.min_stock_level} min</span>
                        </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap`}>
                        <span className={getAlertBadge(alert.alert_level)}>
                            {alert.alert_level.replace('_', ' ').toUpperCase()}
                        </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-400`}>
                        {formatTableDate(alert.created_at)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap`}>
                        {alert.is_acknowledged ? (
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400`}
                            >
                                <CheckCircleIcon className={`size-3 mr-1`}/>
                                Acknowledged
                            </span>
                        ) : (
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`}
                            >
                                <ClockIcon className={`size-3 mr-1`}/>
                                Pending
                            </span>
                        )}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-right text-sm font-medium`}>
                        <div className={`flex justify-end space-x-2`}>
                            <button className={`text-teal-400 hover:text-teal-300 p-1`}>
                                <EyeIcon className={`size-4`}/>
                            </button>
                            {!alert.is_acknowledged && (
                                <button
                                    onClick={() => acknowledgeAlert(alert.id)}
                                    className={`text-green-400 hover:text-green-300 p-1`}
                                >
                                    <CheckCircleIcon className={`size-4`}/>
                                </button>
                            )}
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
