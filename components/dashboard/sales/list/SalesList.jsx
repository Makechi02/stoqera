'use client'

import {useState} from 'react';
import {
    ArrowDownIcon,
    ArrowPathIcon,
    ArrowUpIcon,
    EllipsisVerticalIcon,
    EyeIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/outline';
import {
    ChartBarIcon as ChartBarSolid,
    CurrencyDollarIcon as CurrencyDollarSolid,
    ShoppingCartIcon as ShoppingCartSolid,
    UserGroupIcon as UserGroupSolid
} from '@heroicons/react/24/solid';
import {formatCurrency} from "@/utils/formatters";

export default function SalesList({sales}) {
    return (
        <div className={`py-6`}>
            <StatsCards/>
            <SearchBar/>
            <SalesTable sales={sales}/>
        </div>
    );
};

function StatsCards() {
    const statsData = [
        {
            title: 'Total Sales',
            value: '$124,350',
            change: '+12.5%',
            isPositive: true,
            icon: CurrencyDollarSolid,
            color: 'text-teal-500'
        },
        {
            title: 'Orders Today',
            value: '28',
            change: '+8.2%',
            isPositive: true,
            icon: ShoppingCartSolid,
            color: 'text-emerald-500'
        },
        {
            title: 'Avg. Order Value',
            value: '$185.50',
            change: '-2.1%',
            isPositive: false,
            icon: ChartBarSolid,
            color: 'text-blue-500'
        },
        {
            title: 'Customers',
            value: '1,247',
            change: '+15.3%',
            isPositive: true,
            icon: UserGroupSolid,
            color: 'text-purple-500'
        }
    ];

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8`}>
            {statsData.map((stat, index) => (
                <div key={index} className={`bg-slate-800 rounded-xl p-6 border border-slate-700`}>
                    <div className={`flex items-center justify-between`}>
                        <div>
                            <p className={`text-slate-400 text-sm font-medium`}>{stat.title}</p>
                            <p className={`text-2xl font-bold text-white mt-2`}>{stat.value}</p>
                        </div>
                        <div
                            className={`size-12 rounded-lg bg-slate-700 flex items-center justify-center ${stat.color}`}>
                            <stat.icon className={`size-6`}/>
                        </div>
                    </div>
                    <div className={`flex items-center mt-4 space-x-2`}>
                        {stat.isPositive ? (
                            <ArrowUpIcon className={`size-4 text-emerald-500`}/>
                        ) : (
                            <ArrowDownIcon className={`size-4 text-red-500`}/>
                        )}
                        <span
                            className={`text-sm font-medium ${stat.isPositive ? 'text-emerald-500' : 'text-red-500'}`}
                        >
                            {stat.change}
                        </span>
                        <span className={`text-slate-400 text-sm`}>vs last period</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateRange, setDateRange] = useState('today');
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className={`mb-6`}>
            <div
                className={`flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0`}>
                {/* Search */}
                <div className={`relative flex-1 max-w-md`}>
                    <MagnifyingGlassIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400`}/>
                    <input
                        type={`text`}
                        placeholder={`Search sales...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`dashboard-form-input-icon border-slate-600`}
                    />
                </div>

                {/* Filters */}
                <div className={`flex flex-wrap items-center gap-4`}>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className={`bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                        <option value={`all`}>All Status</option>
                        <option value={`completed`}>Completed</option>
                        <option value={`confirmed`}>Confirmed</option>
                        <option value={`draft`}>Draft</option>
                        <option value={`cancelled`}>Cancelled</option>
                    </select>

                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className={`bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    >
                        <option value={`today`}>Today</option>
                        <option value={`week`}>This Week</option>
                        <option value={`month`}>This Month</option>
                        <option value={`quarter`}>This Quarter</option>
                    </select>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center space-x-2 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors`}
                    >
                        <FunnelIcon className={`size-5`}/>
                        <span>Filters</span>
                    </button>

                    <button
                        className={`p-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 transition-colors`}>
                        <ArrowPathIcon className={`size-5`}/>
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className={`mt-4 pt-4 border-t border-slate-700`}>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
                        <div>
                            <label className={`dashboard-form-label mb-2`}>Customer Type</label>
                            <select
                                className={`dashboard-form-input border-slate-600`}>
                                <option>All Customers</option>
                                <option>Registered</option>
                                <option>Walk-in</option>
                            </select>
                        </div>
                        <div>
                            <label className={`dashboard-form-label mb-2`}>Payment Status</label>
                            <select
                                className={`dashboard-form-input border-slate-600`}>
                                <option>All Payments</option>
                                <option>Paid</option>
                                <option>Partial</option>
                                <option>Pending</option>
                            </select>
                        </div>
                        <div>
                            <label className={`dashboard-form-label mb-2`}>Amount Range</label>
                            <div className={`flex space-x-2`}>
                                <input
                                    type={`number`}
                                    placeholder={`Min`}
                                    className={`dashboard-form-input border-slate-600`}
                                />
                                <input
                                    type={`number`}
                                    placeholder={`Max`}
                                    className={`dashboard-form-input border-slate-600`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function SalesTable({sales}) {
    const [selectedSales, setSelectedSales] = useState([]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            completed: {color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Completed'},
            confirmed: {color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Confirmed'},
            draft: {color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Draft'},
            cancelled: {color: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled'},
            refunded: {color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Refunded'}
        };
        const config = statusConfig[status] || statusConfig.draft;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
        );
    };

    const getPaymentStatusBadge = (paymentStatus) => {
        const statusConfig = {
            paid: {color: 'bg-emerald-100 text-emerald-800', label: 'Paid'},
            partial: {color: 'bg-yellow-100 text-yellow-800', label: 'Partial'},
            pending: {color: 'bg-orange-100 text-orange-800', label: 'Pending'},
            overdue: {color: 'bg-red-100 text-red-800', label: 'Overdue'}
        };
        const config = statusConfig[paymentStatus] || statusConfig.pending;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleSelectSale = (saleId) => {
        setSelectedSales(prev =>
            prev.includes(saleId)
                ? prev.filter(id => id !== saleId)
                : [...prev, saleId]
        );
    };

    const handleSelectAll = () => {
        setSelectedSales(
            selectedSales.length === sales.length
                ? []
                : sales.map(sale => sale.id)
        );
    };

    return (
        <div className={`bg-slate-800 rounded-xl border border-slate-700 overflow-hidden`}>
            <div className={`px-6 py-4 border-b border-slate-700`}>
                <div className={`flex items-center justify-between`}>
                    <h2 className={`text-lg font-semibold`}>Sales</h2>
                    {selectedSales.length > 0 && (
                        <div className={`flex items-center space-x-2`}>
                            <span className={`text-sm text-slate-400`}>{selectedSales.length} selected</span>
                            <button className={`text-sm text-teal-400 hover:text-teal-300`}>Export</button>
                            <button className={`text-sm text-red-400 hover:text-red-300`}>Delete</button>
                        </div>
                    )}
                </div>
            </div>

            <div className={`overflow-x-auto`}>
                <table className={`w-full`}>
                    <thead className={`bg-slate-700`}>
                    <tr>
                        <th className={`px-6 py-3 text-left`}>
                            <input
                                type={`checkbox`}
                                checked={selectedSales.length === sales.length && sales.length > 0}
                                onChange={handleSelectAll}
                                className={`size-4 text-teal-600 bg-slate-700 border-slate-600 rounded focus:ring-teal-500`}
                            />
                        </th>
                        <th className={`dashboard-table-heading text-left`}>Sale Number</th>
                        <th className={`dashboard-table-heading text-left`}>Customer</th>
                        <th className={`dashboard-table-heading text-left`}>Date</th>
                        <th className={`dashboard-table-heading text-left`}>Amount</th>
                        <th className={`dashboard-table-heading text-left`}>Status</th>
                        <th className={`dashboard-table-heading text-left`}>Payment</th>
                        <th className={`dashboard-table-heading text-left`}>Items</th>
                        <th className={`dashboard-table-heading text-left`}>Actions</th>
                    </tr>
                    </thead>
                    <tbody className={`divide-y divide-slate-700`}>
                    {sales.map((sale) => (
                        <tr key={sale.id} className={`hover:bg-slate-700/50 transition-colors`}>
                            <td className={`px-6 py-4`}>
                                <input
                                    type={`checkbox`}
                                    checked={selectedSales.includes(sale.id)}
                                    onChange={() => handleSelectSale(sale.id)}
                                    className={`size-4 text-teal-600 bg-slate-700 border-slate-600 rounded focus:ring-teal-500`}
                                />
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                                <div className={`text-sm font-medium text-white`}>{sale.sale_number}</div>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                                <div>
                                    <div
                                        className={`text-sm font-medium text-white`}>{sale.customer_name}</div>
                                    <div
                                        className={`text-sm text-slate-400 capitalize`}>{sale.customer_type.replace('_', ' ')}</div>
                                </div>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                                <div className={`text-sm text-slate-300`}>{formatDate(sale.sale_date)}</div>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                                <div
                                    className={`text-sm font-medium text-white`}>{formatCurrency(sale.total_amount)}</div>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>{getStatusBadge(sale.status)}</td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                                {getPaymentStatusBadge(sale.payment_status)}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                                <div className={`text-sm text-slate-300`}>{sale.items_count} items</div>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap`}>
                                <div className={`flex items-center space-x-2`}>
                                    <button
                                        className={`p-1 text-slate-400 hover:text-white transition-colors`}>
                                        <EyeIcon className={`size-4`}/>
                                    </button>
                                    <button
                                        className={`p-1 text-slate-400 hover:text-white transition-colors`}>
                                        <PencilIcon className={`size-4`}/>
                                    </button>
                                    <button
                                        className={`p-1 text-slate-400 hover:text-red-400 transition-colors`}>
                                        <TrashIcon className={`size-4`}/>
                                    </button>
                                    <button
                                        className={`p-1 text-slate-400 hover:text-white transition-colors`}>
                                        <EllipsisVerticalIcon className={`size-4`}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {sales.length !== 0 && (
                <div className={`px-6 py-4 border-t border-slate-700`}>
                    <div className={`flex items-center justify-between`}>
                        <p className={`text-sm text-slate-400`}>Showing 1 to {sales.length} of {sales.length} results</p>
                        <div className={`flex items-center space-x-2`}>
                            <button
                                className={`px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm hover:bg-slate-600 transition-colors`}>
                                Previous
                            </button>
                            <button className={`px-3 py-2 bg-teal-600 text-white rounded-lg text-sm`}>
                                1
                            </button>
                            <button
                                className={`px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm hover:bg-slate-600 transition-colors`}>
                                2
                            </button>
                            <button
                                className={`px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm hover:bg-slate-600 transition-colors`}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
