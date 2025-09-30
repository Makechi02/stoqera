'use client'

import {useEffect, useState} from "react";
import {FunnelIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {transferSortOptions, transferSortOrderOptions, transferStatuses} from "@/utils/transferUtils";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function TransfersFilterBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [status, setStatus] = useState(searchParams.get('status') || 'all');
    const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'created_at');
    const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
    const [dateRange, setDateRange] = useState(searchParams.get('dateRange') || null);

    const [showAdvanced, setShowAdvanced] = useState(false);

    const onClearFilters = () => {
        setSearchTerm('');
        setStatus('all');
        setSortBy('created_at');
        setSortOrder('desc');
        setDateRange(null);
    };

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        console.log(dateRange);
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        if (status !== 'all') {
            params.set('status', status);
        } else {
            params.delete('status');
        }

        if (sortBy !== 'created_at') {
            params.set('sortBy', sortBy);
        } else {
            params.delete('sortBy');
        }

        if (sortOrder !== 'desc') {
            params.set('sortOrder', sortOrder);
        } else {
            params.delete('sortOrder');
        }

        if(dateRange) {
            params.set('dateRange', JSON.stringify(dateRange));
        } else {
            params.delete('dateRange');
        }

        router.replace(`?${params.toString()}`);
    }, [searchParams, router, searchTerm, debouncedSearch, status, sortBy, sortOrder, dateRange]);

    return (
        <div className={`bg-gray-800 rounded-lg p-4 border border-gray-700 mb-6`}>
            <div className={`flex flex-col lg:flex-row gap-4`}>
                {/* Search */}
                <div className={`flex-1`}>
                    <div className={`relative`}>
                        <MagnifyingGlassIcon
                            className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4`}/>
                        <input
                            type={`search`}
                            placeholder={`Search transfers, locations, or notes...`}
                            className={`dashboard-form-input-icon border-gray-600`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <select
                    className={`px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {transferStatuses.map((status) => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                </select>

                {/* Advanced Filters Toggle */}
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`px-3 py-2 bg-teal-600 hover:bg-teal-700 text-text rounded-lg flex items-center gap-2 transition-colors`}
                >
                    <FunnelIcon className={`size-4`}/>
                    Advanced
                </button>

                {/* Clear Filters */}
                <button
                    onClick={onClearFilters}
                    className={`px-3 py-2 bg-gray-600 hover:bg-gray-500 text-text rounded-lg transition-colors`}
                >
                    Clear All
                </button>
            </div>

            {/* Advanced Filters */}
            {showAdvanced && (
                <div
                    className={`mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`}>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>Date From</label>
                        <input
                            type={`date`}
                            className={`dashboard-form-input border-gray-600`}
                            value={dateRange?.from || ''}
                            onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>Date To</label>
                        <input
                            type={`date`}
                            className={`dashboard-form-input border-gray-600`}
                            value={dateRange?.to || ''}
                            onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>Sort By</label>
                        <select
                            className={`dashboard-form-input border-gray-600`}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            {transferSortOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>Order</label>
                        <select
                            className={`dashboard-form-input border-gray-600`}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            {transferSortOrderOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}