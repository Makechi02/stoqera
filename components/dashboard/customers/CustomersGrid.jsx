'use client'

import {useState} from 'react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisVerticalIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    TagIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import {
    BuildingOfficeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    UserIcon,
    XCircleIcon,
} from '@heroicons/react/24/solid';
import CustomersSearchBar from "@/components/dashboard/customers/CustomersSearchBar";
import {formatCurrency, formatDate} from "@/utils/formatters";
import Link from "next/link";

export default function CustomersGrid({customerGroups, customers, totalCount}) {
    const [searchQuery] = useState('');
    const [selectedGroup] = useState('all');
    const [selectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-400 bg-green-400/10';
            case 'inactive':
                return 'text-yellow-400 bg-yellow-400/10';
            case 'blocked':
                return 'text-red-400 bg-red-400/10';
            default:
                return 'text-gray-400 bg-gray-400/10';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return CheckCircleIcon;
            case 'inactive':
                return ExclamationTriangleIcon;
            case 'blocked':
                return XCircleIcon;
            default:
                return CheckCircleIcon;
        }
    };

    const getCustomerDisplayName = (customer) => {
        if (customer.type === 'business') {
            return customer.business_name || 'Unnamed Business';
        }
        return `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Unnamed Customer';
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                <CustomersSearchBar customerGroups={customerGroups}/>
                <StatsGrid customers={customers} totalCount={totalCount}/>

                <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                        {customers.map((customer) => {
                            const StatusIcon = getStatusIcon(customer.status);

                            return (
                                <div
                                    key={customer.id}
                                    className="bg-gray-800 rounded-lg border border-gray-700 hover:border-teal-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/10 p-6"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-teal-500/10 rounded-lg">
                                                {customer.type === 'business' ? (
                                                    <BuildingOfficeIcon className="h-6 w-6 text-teal-500"/>
                                                ) : (
                                                    <UserIcon className="h-6 w-6 text-teal-500"/>
                                                )}
                                            </div>
                                            <div>
                                                <div
                                                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(customer.status)}`}>
                                                    <StatusIcon className="h-3 w-3"/>
                                                    <span className="capitalize">{customer.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-white p-1 rounded">
                                            <EllipsisVerticalIcon className="h-5 w-5"/>
                                        </button>
                                    </div>

                                    {/* Customer Info */}
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-white text-lg mb-1">
                                            {getCustomerDisplayName(customer)}
                                        </h3>
                                        <p className="text-gray-400 text-sm font-mono">
                                            {customer.customer_code}
                                        </p>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-2 mb-4">
                                        {customer.email && (
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <EnvelopeIcon className="h-4 w-4 text-gray-500"/>
                                                <span className="truncate">{customer.email}</span>
                                            </div>
                                        )}
                                        {customer.phone && (
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <PhoneIcon className="h-4 w-4 text-gray-500"/>
                                                <span>{customer.phone}</span>
                                            </div>
                                        )}
                                        {(customer.city || customer.country) && (
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <MapPinIcon className="h-4 w-4 text-gray-500"/>
                                                <span className="truncate">
                                                    {[customer.city, customer.country].filter(Boolean).join(', ')}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Customer Group */}
                                    {customer.customer_groups && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{backgroundColor: customer.customer_groups.color || '#14b8a6'}}
                                            />
                                            <span className="text-sm text-gray-300">
                                                {customer.customer_groups.name}
                                            </span>
                                            {customer.customer_groups.discount_percentage > 0 && (
                                                <span
                                                    className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded">
                                                    {customer.customer_groups.discount_percentage}% off
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                                        <div>
                                            <p className="text-xs text-gray-400">Total Orders</p>
                                            <p className="font-semibold text-white">{customer.total_orders || 0}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Total Spent</p>
                                            <p className="font-semibold text-teal-400">
                                                {formatCurrency(customer.total_purchases)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Credit Limit</p>
                                            <p className="font-semibold text-white">
                                                {formatCurrency(customer.credit_limit)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Last Purchase</p>
                                            <p className="font-semibold text-gray-300 text-xs">
                                                {formatDate(customer.last_purchase_date)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {customer.tags && customer.tags.length > 0 && (
                                        <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-700">
                                            <TagIcon className="h-4 w-4 text-gray-500"/>
                                            <div className="flex flex-wrap gap-1">
                                                {customer.tags.slice(0, 2).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
                                                    >
                              {tag}
                            </span>
                                                ))}
                                                {customer.tags.length > 2 && (
                                                    <span className="text-xs text-gray-500">
                              +{customer.tags.length - 2} more
                            </span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center mt-8">
                            <div className="text-sm text-gray-400">
                                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                                {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} customers
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeftIcon className="h-5 w-5"/>
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({length: totalPages}, (_, i) => i + 1)
                                        .filter(page => {
                                            return page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1);
                                        })
                                        .map((page, index, array) => {
                                            const showEllipsis = index > 0 && array[index - 1] !== page - 1;
                                            return (
                                                <div key={page} className="flex items-center">
                                                    {showEllipsis && (
                                                        <span className="px-2 text-gray-500">...</span>
                                                    )}
                                                    <button
                                                        onClick={() => setCurrentPage(page)}
                                                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                                                            currentPage === page
                                                                ? 'bg-teal-600 text-white'
                                                                : 'text-gray-300 hover:bg-gray-800'
                                                        }`}
                                                    >
                                                        {page}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRightIcon className="h-5 w-5"/>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {customers.length === 0 && (
                        <div className="text-center py-12">
                            <UserGroupIcon className="h-16 w-16 text-gray-600 mx-auto mb-4"/>
                            <h3 className="text-lg font-semibold text-white mb-2">No customers found</h3>
                            <p className="text-gray-400 mb-6">
                                {searchQuery || selectedGroup !== 'all' || selectedStatus !== 'all'
                                    ? 'Try adjusting your search criteria or filters'
                                    : 'Get started by adding your first customer'
                                }
                            </p>
                            <Link
                                href={`/dashboard/customers/create`}
                                className={`bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors`}
                            >
                                Add Customer
                            </Link>
                        </div>
                    )}
                </>
            </div>
        </div>
    );
}

function StatsGrid({customers, totalCount}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Total Customers</p>
                        <p className="text-2xl font-bold text-white">{totalCount}</p>
                    </div>
                    <UserGroupIcon className="h-8 w-8 text-teal-500"/>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Active</p>
                        <p className="text-2xl font-bold text-green-400">
                            {customers.filter(c => c.status === 'active').length}
                        </p>
                    </div>
                    <CheckCircleIcon className="h-8 w-8 text-green-500"/>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Business</p>
                        <p className="text-2xl font-bold text-blue-400">
                            {customers.filter(c => c.type === 'business').length}
                        </p>
                    </div>
                    <BuildingOfficeIcon className="h-8 w-8 text-blue-500"/>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-400 text-sm">Individual</p>
                        <p className="text-2xl font-bold text-purple-400">
                            {customers.filter(c => c.type === 'individual').length}
                        </p>
                    </div>
                    <UserIcon className="h-8 w-8 text-purple-500"/>
                </div>
            </div>
        </div>
    )
}