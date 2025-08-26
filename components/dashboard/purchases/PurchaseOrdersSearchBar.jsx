'use client'

import {CalendarDaysIcon, FunnelIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function PurchaseOrdersSearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');
    const [dateFilter, setDateFilter] = useState(searchParams.get('date') || 'all');

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        if (statusFilter !== 'all') {
            params.set('status', statusFilter);
        } else {
            params.delete('status');
        }

        if (dateFilter !== 'all') {
            params.set('date', dateFilter);
        } else {
            params.delete('date');
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, router, statusFilter, dateFilter, searchParams]);

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
            {/* Search */}
            <div className={`relative`}>
                <MagnifyingGlassIcon className={`size-5 absolute left-3 top-3 text-gray-400`}/>
                <input
                    type={`text`}
                    placeholder={`Search by PO number or supplier...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`dashboard-form-input-icon border-gray-600`}
                />
            </div>

            {/* Status Filter */}
            <div className={`relative`}>
                <FunnelIcon className={`size-5 absolute left-3 top-3 text-gray-400`}/>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`dashboard-form-input-icon border-gray-600 appearance-none`}
                >
                    <option value={`all`}>All Status</option>
                    <option value={`draft`}>Draft</option>
                    <option value={`sent`}>Sent</option>
                    <option value={`confirmed`}>Confirmed</option>
                    <option value={`received`}>Received</option>
                    <option value={`cancelled`}>Cancelled</option>
                </select>
            </div>

            {/* Date Filter */}
            <div className={`relative`}>
                <CalendarDaysIcon className={`size-5 absolute left-3 top-3 text-gray-400`}/>
                <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className={`dashboard-form-input-icon border-gray-600 appearance-none`}
                >
                    <option value={`all`}>All Time</option>
                    <option value={`today`}>Today</option>
                    <option value={`week`}>This Week</option>
                    <option value={`month`}>This Month</option>
                    <option value={`quarter`}>This Quarter</option>
                </select>
            </div>
        </div>
    )
}