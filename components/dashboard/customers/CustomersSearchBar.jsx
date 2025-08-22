'use client'

import {FunnelIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

export default function CustomersSearchBar({customerGroups}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedGroup, setSelectedGroup] = useState('all');
    const [_, setCurrentPage] = useState(1);

    const handleClear = () => {
        setSelectedGroup('all');
        setSelectedStatus('all');
        setSearchQuery('');
        setCurrentPage(1);
    }

    return (
        <>
            <div className={`flex flex-col sm:flex-row gap-4 mb-8`}>
                {/* Search */}
                <div className={`relative flex-1`}>
                    <MagnifyingGlassIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400`}/>
                    <input
                        type={`text`}
                        placeholder={`Search customers...`}
                        className={`dashboard-form-input-icon border-gray-700`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Filter Toggle */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
                        showFilters
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                    <FunnelIcon className={`size-5`}/>
                    Filters
                </button>
            </div>

            {showFilters && (
                <div className={`bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700`}>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
                        {/* Status Filter */}
                        <div>
                            <label className={`dashboard-form-label mb-2`}>Status</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className={`dashboard-form-input border-gray-600`}
                            >
                                <option value={`all`}>All Statuses</option>
                                <option value={`active`}>Active</option>
                                <option value={`inactive`}>Inactive</option>
                                <option value={`blocked`}>Blocked</option>
                            </select>
                        </div>

                        {/* Group Filter */}
                        <div>
                            <label className={`dashboard-form-label mb-2`}>Customer Group</label>
                            <select
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                className={`dashboard-form-input border-gray-600`}
                            >
                                <option value={`all`}>All Groups</option>
                                {customerGroups.map((group) => (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Filters */}
                        <div className={`flex items-end`}>
                            <button
                                onClick={() => handleClear()}
                                className={`w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors`}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}