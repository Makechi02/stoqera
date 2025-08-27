'use client'

import {HiOutlineAdjustmentsHorizontal, HiOutlineMagnifyingGlass} from "react-icons/hi2";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function SuppliersSearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get( 'search') || '');
    const [filterActive, setFilterActive] = useState(searchParams.get('status') || 'all');

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        if (filterActive !== 'all') {
            params.set('status', filterActive);
        } else {
            params.delete('status');
        }

        router.replace(`?${params.toString()}`);
    }, [router, searchParams, debouncedSearch, filterActive]);

    return (
        <div className={`flex flex-col sm:flex-row gap-4 mb-6`}>
            {/* Search */}
            <div className={`flex-1 relative`}>
                <HiOutlineMagnifyingGlass className={`size-5 absolute left-3 top-3 text-gray-400`} />
                <input
                    type={`text`}
                    placeholder={`Search suppliers...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`dashboard-form-input-icon border-gray-700`}
                />
            </div>

            {/* Filter */}
            <div className={`flex items-center gap-2`}>
                <HiOutlineAdjustmentsHorizontal className={`size-5 text-gray-400`} />
                <select
                    value={filterActive}
                    onChange={(e) => setFilterActive(e.target.value)}
                    className={`bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:outline-none focus:border-transparent`}
                >
                    <option value={`all`}>All Suppliers</option>
                    <option value={`active`}>Active Only</option>
                    <option value={`inactive`}>Inactive Only</option>
                </select>
            </div>
        </div>
    )
}