import {HiOutlineMagnifyingGlass} from "react-icons/hi2";

export default function LocationsSearchBar() {
    return (
        <div className={`mb-6`}>
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4`}>
                {/* Search */}
                <div className={`relative md:col-span-2`}>
                    <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
                        <HiOutlineMagnifyingGlass className={`size-5 text-gray-400`} />
                    </div>
                    <input
                        type={`text`}
                        placeholder={`Search locations...`}
                        className={`block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                        // value={searchTerm}
                        // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Type Filter */}
                <div>
                    <select
                        className={`block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                        // value={typeFilter}
                        // onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value={`all`}>All Types</option>
                        <option value={`store`}>Store</option>
                        <option value={`warehouse`}>Warehouse</option>
                        <option value={`outlet`}>Outlet</option>
                    </select>
                </div>

                {/* Status Filter */}
                <div>
                    <select
                        className="block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        // value={statusFilter}
                        // onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
        </div>
    )
}