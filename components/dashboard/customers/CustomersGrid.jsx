'use client'

import {useEffect, useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon, UserGroupIcon,} from '@heroicons/react/24/outline';
import {BuildingOfficeIcon, CheckCircleIcon, UserIcon,} from '@heroicons/react/24/solid';
import CustomersSearchBar from "@/components/dashboard/customers/CustomersSearchBar";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import CustomerCard from "@/components/dashboard/customers/CustomerCard";

export default function CustomersGrid({customerGroups, customers, totalCount}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const searchQuery = searchParams.get('search') || '';
    const selectedGroup = searchParams.get('group') || 'all';
    const selectedStatus = searchParams.get('status') || 'all';
    const [currentPage, setCurrentPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page')) : 1);
    const [itemsPerPage] = useState(searchParams.get('per_page') ? parseInt(searchParams.get('per_page')) : 10);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (currentPage.toString() !== '1') {
            params.set("page", currentPage.toString());
        } else {
            params.delete("page");
        }

        if (itemsPerPage.toString() !== '10') {
            params.set("per_page", itemsPerPage.toString());
        } else {
            params.delete("per_page");
        }

        router.replace(`?${params.toString()}`);
    }, [currentPage, itemsPerPage, router, searchParams]);

    return (
        <div>
            <div className={`max-w-7xl mx-auto py-8`}>
                <CustomersSearchBar customerGroups={customerGroups}/>
                <StatsGrid customers={customers} totalCount={totalCount}/>

                <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                        {customers.map((customer) => <CustomerCard key={customer.id} customer={customer}/>)}
                    </div>

                    {totalPages > 1 && (
                        <Pagination totalCount={totalCount} totalPages={totalPages} currentPage={currentPage}
                                    setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage}
                        />
                    )}

                    {customers.length === 0 && (
                        <EmptyState
                            searchQuery={searchQuery}
                            selectedGroup={selectedGroup}
                                   selectedStatus={selectedStatus}
                        />
                    )}
                </>
            </div>
        </div>
    );
}

function EmptyState({searchQuery, selectedGroup, selectedStatus}) {
    return (
        <div className={`text-center py-12`}>
            <UserGroupIcon className={`size-16 text-gray-600 mx-auto mb-4`}/>
            <h3 className={`text-lg font-semibold text-white mb-2`}>No customers found</h3>
            <p className={`text-gray-400 mb-6`}>
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
    )
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

function Pagination({currentPage, setCurrentPage, totalPages, itemsPerPage, totalCount}) {
    return (
        <div className={`flex justify-between items-center mt-8`}>
            <div className={`text-sm text-gray-400`}>
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} customers
            </div>

            <div className={`flex items-center gap-2`}>
                <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <ChevronLeftIcon className={`size-5`}/>
                </button>

                <div className={`flex items-center gap-1`}>
                    {Array.from({length: totalPages}, (_, i) => i + 1)
                        .filter(page => {
                            return page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1);
                        })
                        .map((page, index, array) => {
                            const showEllipsis = index > 0 && array[index - 1] !== page - 1;
                            return (
                                <div key={page} className={`flex items-center`}>
                                    {showEllipsis && (
                                        <span className={`px-2 text-gray-500`}>...</span>
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
                    className={`p-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <ChevronRightIcon className="h-5 w-5"/>
                </button>
            </div>
        </div>
    )
}
