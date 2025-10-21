import {useEffect, useState} from 'react';
import {FunnelIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function SalesSearchBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState(searchParams.get( 'search') || '');
    const [statusFilter, setStatusFilter] = useState(searchParams.get('filter') || 'all');

    const [showFilters, setShowFilters] = useState(false);

    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {

        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        if (statusFilter !== 'all') {
            params.set('filter', statusFilter);
        } else {
            params.delete('filter');
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, statusFilter, searchParams, router]);

    return (
        <div className={`bg-gray-900 rounded-xl p-4 border border-gray-800`}>
            <div className={`flex flex-col lg:flex-row gap-4`}>
                <div className={`flex-1 relative`}>
                    <MagnifyingGlassIcon
                        className={`size-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2`}/>
                    <input
                        type={`search`}
                        placeholder={`Search by invoice number or customer...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`dashboard-form-input-icon border-gray-700`}
                    />
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors flex items-center gap-2 text-gray-300`}
                >
                    <FunnelIcon className={`size-5`}/>
                    Filters
                </button>
            </div>

            {showFilters && (
                <div className={`mt-4 pt-4 border-t border-gray-800`}>
                    <div className={`flex flex-wrap gap-2`}>
                        <button
                            onClick={() => setStatusFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                statusFilter === 'all' ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setStatusFilter('completed')}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                statusFilter === 'completed' ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => setStatusFilter('draft')}
                            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                statusFilter === 'draft' ? 'bg-teal-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            Draft
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}