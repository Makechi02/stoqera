'use client'

import {FunnelIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function ChannelsSearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all');
    const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        if (typeFilter !== 'all') {
            params.set('type', typeFilter);
        } else {
            params.delete('type');
        }

        if (statusFilter !== 'all') {
            params.set('status', statusFilter);
        } else {
            params.delete('status');
        }

        router.replace(`?${params.toString()}`);
    }, [router, searchParams, debouncedSearch, typeFilter, statusFilter]);

    const channelTypes = [
        { value: 'pos', label: 'Point of Sale' },
        { value: 'online', label: 'Online' },
        { value: 'phone', label: 'Phone' },
        { value: 'wholesale', label: 'Wholesale' }
    ];

    return (
        <div className={`bg-gray-800 rounded-lg p-6 mb-6`}>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
                {/* Search */}
                <div className={`relative`}>
                    <MagnifyingGlassIcon className={`size-5 absolute left-3 top-3 text-gray-400`} />
                    <input
                        type={`text`}
                        placeholder={`Search channels...`}
                        className={`dashboard-form-input-icon border-gray-600`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Type Filter */}
                <div className={`relative`}>
                    <FunnelIcon className={`size-5 absolute left-3 top-3 text-gray-400`} />
                    <select
                        className={`dashboard-form-input-icon border-gray-600`}
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value={`all`}>All Types</option>
                        {channelTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div>
                    <select
                        className={`dashboard-form-input border-gray-600`}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value={`all`}>All Status</option>
                        <option value={`active`}>Active</option>
                        <option value={`inactive`}>Inactive</option>
                    </select>
                </div>
            </div>
        </div>
    )
}