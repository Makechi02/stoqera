'use client'

import {HiOutlineAdjustmentsHorizontal, HiOutlineMagnifyingGlass} from "react-icons/hi2";
import {useState} from "react";

export default function SuppliersSearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState('all');

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
                    className={`w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
                <HiOutlineAdjustmentsHorizontal className="h-5 w-5 text-gray-400" />
                <select
                    value={filterActive}
                    onChange={(e) => setFilterActive(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                    <option value="all">All Suppliers</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                </select>
            </div>
        </div>
    )
}