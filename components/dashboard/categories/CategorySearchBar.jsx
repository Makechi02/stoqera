'use client'

import {HiOutlineFunnel, HiOutlineMagnifyingGlass} from "react-icons/hi2";

export default function CategorySearchBar() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
                <HiOutlineMagnifyingGlass className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search categories..."
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
            </div>
            <div className="flex items-center space-x-2">
                <HiOutlineFunnel className="h-5 w-5 text-gray-400" />
                <select
                    // value={activeFilter}
                    // onChange={(e) => setActiveFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                    <option value="all">All Categories</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                </select>
            </div>
        </div>
    )
}