'use client'

import {useEffect, useState} from 'react';
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisVerticalIcon,
    EyeIcon,
    PencilIcon,
    PrinterIcon,
    TrashIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {formatCurrency, formatTableDate} from "@/utils/formatters";
import SalesStatsGrid from "@/components/dashboard/sales/list/SalesStatsGrid";
import SalesSearchBar from "@/components/dashboard/sales/list/SalesSearchBar";
import {getCustomerDisplayName} from "@/utils/customerUtils";
import Link from "next/link";

export default function SalesDashboard({sales, stats}) {
    const [selectedSales, setSelectedSales] = useState([]);

    return (
        <div className={`space-y-6 py-6`}>
            <SalesStatsGrid stats={stats}/>
            <SalesSearchBar/>

            {selectedSales.length > 0 && (
                <BulkActionsBar selectedSales={selectedSales} setSelectedSales={setSelectedSales}/>
            )}

            <SalesTable sales={sales} selectedSales={selectedSales} setSelectedSales={setSelectedSales}/>
        </div>
    );
};

function BulkActionsBar({selectedSales, setSelectedSales}) {
    const handleExport = () => {
        alert(`Exporting ${selectedSales.length} sale(s)`);
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedSales.length} sale(s)?`)) {
            // setSales(prev => prev.filter(sale => !selectedSales.includes(sale.id)));
            setSelectedSales([]);
        }
    };

    return (
        <div className={`bg-teal-600 rounded-xl p-4 border border-teal-500 shadow-lg shadow-teal-900/50`}>
            <div className={`flex flex-wrap items-center justify-between gap-4`}>
                <div className={`flex items-center gap-3`}>
                    <div className={`size-10 bg-white/20 rounded-lg flex items-center justify-center`}>
                        <CheckIcon className={`size-5 text-white`}/>
                    </div>
                    <div>
                        <p className={`text-white font-semibold text-lg`}>
                            {selectedSales.length} {selectedSales.length === 1 ? 'sale' : 'sales'} selected
                        </p>
                        <p className={`text-teal-100 text-sm`}>Choose an action to perform</p>
                    </div>
                </div>

                <div className={`flex-1 flex items-center justify-end gap-2`}>
                    <button
                        onClick={handleExport}
                        className={`px-4 py-2 bg-white hover:bg-gray-100 text-teal-700 rounded-lg transition-colors flex items-center gap-2 font-medium`}
                    >
                        <ArrowDownTrayIcon className={`size-5`}/>
                        Export
                    </button>
                    <button
                        onClick={handleDelete}
                        className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium`}
                    >
                        <TrashIcon className={`size-5`}/>
                        Delete
                    </button>
                    <button
                        onClick={() => setSelectedSales([])}
                        className={`p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors`}
                    >
                        <XMarkIcon className={`size-5`}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

function SalesTable({sales, selectedSales, setSelectedSales}) {
    const [openDropdown, setOpenDropdown] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Pagination
    const totalPages = Math.ceil(sales.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSales = sales.slice(startIndex, endIndex);

    // Selection handlers
    const toggleSelectAll = () => {
        if (selectedSales.length === currentSales.length) {
            setSelectedSales([]);
        } else {
            setSelectedSales(currentSales.map(sale => sale.id));
        }
    };

    const toggleSelectSale = (id) => {
        setSelectedSales(prev =>
            prev.includes(id) ? prev.filter(saleId => saleId !== id) : [...prev, id]
        );
    };

    const isAllSelected = currentSales.length > 0 && selectedSales.length === currentSales.length;
    const isSomeSelected = selectedSales.length > 0 && selectedSales.length < currentSales.length;

    const handleViewSale = (saleId) => {
        alert(`Viewing sale: ${saleId}`);
        setOpenDropdown(null);
    };

    const handleEditSale = (saleId) => {
        alert(`Editing sale: ${saleId}`);
        setOpenDropdown(null);
    };

    const handlePrintSale = (saleId) => {
        alert(`Printing sale: ${saleId}`);
        setOpenDropdown(null);
    };

    const handleRefundSale = (saleId) => {
        alert(`Processing refund for sale: ${saleId}`);
        setOpenDropdown(null);
    };

    const handleDeleteSale = (saleId) => {
        if (window.confirm('Are you sure you want to delete this sale?')) {
            // setSales(prev => prev.filter(sale => sale.id !== saleId));
            setOpenDropdown(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-teal-500/20 text-teal-400';
            case 'draft':
                return 'bg-gray-500/20 text-gray-400';
            case 'cancelled':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-blue-500/20 text-blue-400';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'paid':
                return 'bg-teal-500/20 text-teal-400';
            case 'partial':
                return 'bg-yellow-500/20 text-yellow-400';
            case 'pending':
                return 'bg-orange-500/20 text-orange-400';
            case 'overdue':
                return 'bg-red-500/20 text-red-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openDropdown && !event.target.closest('.dropdown-container')) {
                setOpenDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdown]);

    return (
        <div className={`bg-gray-900 rounded-xl border border-gray-800 overflow-hidden`}>
            <div className={`overflow-x-auto`}>
                <table className={`w-full`}>
                    <thead className={`bg-gray-800 border-b border-gray-700`}>
                    <tr>
                        <th className={`px-4 py-3 text-left`}>
                            <button
                                onClick={toggleSelectAll}
                                className={`size-5 rounded border-2 flex items-center justify-center transition-colors ${
                                    isAllSelected
                                        ? 'bg-teal-600 border-teal-600'
                                        : isSomeSelected ? 'bg-teal-600 border-teal-600' : 'border-gray-600 hover:border-gray-500'
                                }`}
                            >
                                {isAllSelected && <CheckIcon className={`size-3 text-white`}/>}
                                {isSomeSelected && !isAllSelected && <span className={`w-2 h-0.5 bg-white rounded`}/>}
                            </button>
                        </th>
                        <th className={`dashboard-table-heading text-left`}>Invoice</th>
                        <th className={`dashboard-table-heading text-left`}>Customer</th>
                        <th className={`dashboard-table-heading text-left`}>Date</th>
                        <th className={`dashboard-table-heading text-left`}>Status</th>
                        <th className={`dashboard-table-heading text-left`}>Payment</th>
                        <th className={`dashboard-table-heading text-left`}>Amount</th>
                        <th className={`dashboard-table-heading text-right`}>Actions</th>
                    </tr>
                    </thead>
                    <tbody className={`divide-y divide-gray-800`}>
                    {currentSales.map((sale) => (
                        <tr key={sale.id} className={`hover:bg-gray-800/50 transition-colors`}>
                            <td className={`px-4 py-4`}>
                                <button
                                    onClick={() => toggleSelectSale(sale.id)}
                                    className={`size-5 rounded border-2 flex items-center justify-center transition-colors ${
                                        selectedSales.includes(sale.id) ? 'bg-teal-600 border-teal-600' : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                >
                                    {selectedSales.includes(sale.id) && (
                                        <CheckIcon className={`size-3 text-white`}/>
                                    )}
                                </button>
                            </td>
                            <td className={`px-4 py-4`}>
                                <p className={`text-sm font-medium whitespace-nowrap`}>{sale.sale_number}</p>
                                <p className={`text-xs text-gray-400`}>{sale.items_count} items</p>
                            </td>
                            <td className={`px-4 py-4`}>
                                <p className={`text-sm text-gray-300`}>{getCustomerDisplayName(sale.customer)}</p>
                                <p className={`text-xs text-gray-500 capitalize`}>
                                    {sale.customer_type.replace('_', ' ')}
                                </p>
                            </td>
                            <td className={`px-4 py-4 text-sm text-gray-300`}>{formatTableDate(sale.sale_date)}</td>
                            <td className={`px-4 py-4`}>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(sale.status)}`}
                                >
                                    {sale.status}
                                </span>
                            </td>
                            <td className={`px-4 py-4`}>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPaymentStatusColor(sale.payment_status)}`}
                                >
                                    {sale.payment_status}
                                </span>
                            </td>
                            <td className={`px-4 py-4 text-right`}>
                                <p className={`text-sm font-medium`}>{formatCurrency(sale.total_amount)}</p>
                                {sale.amount_paid < sale.total_amount && (
                                    <p className={`text-xs text-gray-400`}>Paid: {formatCurrency(sale.amount_paid)}</p>
                                )}
                            </td>
                            <td className={`px-4 py-4 text-right`}>
                                <div className={`relative dropdown-container`}>
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === sale.id ? null : sale.id)}
                                        className={`p-2 hover:bg-gray-700 rounded-lg transition-colors`}
                                    >
                                        <EllipsisVerticalIcon className={`size-5 text-gray-400`}/>
                                    </button>

                                    {openDropdown === sale.id && (
                                        <div
                                            className={`absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10`}>
                                            <div className={`py-1`}>
                                                <Link
                                                    href={`/dashboard/sales/list/${sale.id}`}
                                                    className={`w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2`}
                                                >
                                                    <EyeIcon className={`size-4`}/>
                                                    View Details
                                                </Link>
                                                <Link
                                                    href={`/dashboard/sales/list/${sale.id}/edit`}
                                                    className={`w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2`}
                                                >
                                                    <PencilIcon className={`size-4`}/>
                                                    Edit Sale
                                                </Link>
                                                <button
                                                    onClick={() => handlePrintSale(sale.id)}
                                                    className={`w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2`}
                                                >
                                                    <PrinterIcon className={`size-4`}/>
                                                    Print Invoice
                                                </button>
                                                <button
                                                    onClick={() => handleRefundSale(sale.id)}
                                                    className={`w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2`}
                                                >
                                                    <ArrowPathIcon className={`size-4`}/>
                                                    Process Refund
                                                </button>
                                                <div className={`border-t border-gray-700 my-1`}></div>
                                                <button
                                                    onClick={() => handleDeleteSale(sale.id)}
                                                    className={`w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700 flex items-center gap-2`}
                                                >
                                                    <TrashIcon className={`size-4`}/>
                                                    Delete Sale
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 bg-gray-800 border-t border-gray-700 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                    Showing {startIndex + 1} to {Math.min(endIndex, sales.length)} of {sales.length} sales
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeftIcon className="w-5 h-5 text-gray-400"/>
                    </button>

                    <div className="flex gap-1">
                        {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                    currentPage === page
                                        ? 'bg-teal-600 text-white'
                                        : 'text-gray-400 hover:bg-gray-700'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRightIcon className="w-5 h-5 text-gray-400"/>
                    </button>
                </div>
            </div>
        </div>
    )
}
