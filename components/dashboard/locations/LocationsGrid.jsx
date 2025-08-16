'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {
    HiOutlineBuildingOffice,
    HiOutlineBuildingStorefront,
    HiOutlineEye,
    HiOutlineMagnifyingGlass,
    HiOutlineMapPin,
    HiOutlinePencil,
    HiOutlinePlus,
    HiOutlineTrash
} from "react-icons/hi2";
import {useParams} from "next/navigation";

export default function LocationsPage() {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const {slug, location} = useParams();

    // Mock data - replace with your API call
    useEffect(() => {
        const mockLocations = [
            {
                id: '1',
                name: 'Downtown Store',
                type: 'store',
                code: 'LOC001',
                address: '123 Main Street',
                city: 'New York',
                state: 'NY',
                postal_code: '10001',
                country: 'USA',
                phone: '+1 (555) 123-4567',
                email: 'downtown@company.com',
                is_active: true,
                manager_name: 'John Doe'
            },
            {
                id: '2',
                name: 'Central Warehouse',
                type: 'warehouse',
                code: 'WH001',
                address: '456 Industrial Blvd',
                city: 'Newark',
                state: 'NJ',
                postal_code: '07102',
                country: 'USA',
                phone: '+1 (555) 987-6543',
                email: 'warehouse@company.com',
                is_active: true,
                manager_name: 'Jane Smith'
            },
            {
                id: '3',
                name: 'Mall Outlet',
                type: 'outlet',
                code: 'OUT001',
                address: '789 Shopping Center',
                city: 'Brooklyn',
                state: 'NY',
                postal_code: '11201',
                country: 'USA',
                phone: '+1 (555) 456-7890',
                email: 'outlet@company.com',
                is_active: false,
                manager_name: 'Mike Johnson'
            }
        ];

        setTimeout(() => {
            setLocations(mockLocations);
            setFilteredLocations(mockLocations);
        }, 1000);
    }, []);

    useEffect(() => {
        let filtered = locations;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(location =>
                location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                location.address.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Type filter
        if (typeFilter !== 'all') {
            filtered = filtered.filter(location => location.type === typeFilter);
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(location =>
                statusFilter === 'active' ? location.is_active : !location.is_active
            );
        }

        setFilteredLocations(filtered);
    }, [locations, searchTerm, typeFilter, statusFilter]);

    const getLocationIcon = (type) => {
        switch (type) {
            case 'store':
                return <HiOutlineBuildingStorefront className={`size-5 text-primary`} />;
            case 'warehouse':
                return <HiOutlineBuildingOffice className={`size-5 text-primary`} />;
            case 'outlet':
                return <HiOutlineMapPin className={`size-5 text-primary`} />;
            default:
                return <HiOutlineMapPin className={`size-5 text-primary`} />;
        }
    };

    const handleDelete = (locationId) => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            // Implement delete API call here
            setLocations(locations.filter(loc => loc.id !== locationId));
        }
    };

    return (
        <div className={`min-h-screen`}>
            <div className={`max-w-7xl mx-auto`}>
                {/* Header */}
                <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8`}>
                    <div>
                        <h1 className={`text-3xl font-bold text-white font-heading`}>Locations</h1>
                        <p className={`mt-2 text-gray-400`}>Manage your organization's locations</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <Link
                            href={`/${slug}/${location}/locations/new`}
                            className={`inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium transition-colors duration-200`}
                        >
                            <HiOutlinePlus className={`size-5 mr-2`} />
                            Add Location
                        </Link>
                    </div>
                </div>

                {/* Filters and Search */}
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Type Filter */}
                        <div>
                            <select
                                className={`block w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
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
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-400">
                        Showing {filteredLocations.length} of {locations.length} locations
                    </p>
                </div>

                {/* Locations Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                    {filteredLocations.map((location) => (
                        <div key={location.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center">
                                    {getLocationIcon(location.type)}
                                    <div className="ml-3">
                                        <h3 className="text-lg font-semibold text-white">{location.name}</h3>
                                        <p className="text-sm text-gray-400">{location.code}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                        location.is_active
                                            ? 'bg-green-900 text-green-200'
                                            : 'bg-red-900 text-red-200'
                                    }`}>
                                        {location.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>

                            {/* Type Badge */}
                            <div className="mb-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900 text-teal-200 capitalize">
                                    {location.type}
                                </span>
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                                <p className="text-sm text-gray-300">{location.address}</p>
                                <p className="text-sm text-gray-400">
                                    {location.city}, {location.state} {location.postal_code}
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="mb-4 space-y-1">
                                <p className="text-sm text-gray-400">📞 {location.phone}</p>
                                <p className="text-sm text-gray-400">✉️ {location.email}</p>
                                {location.manager_name && (
                                    <p className="text-sm text-gray-400">👤 Manager: {location.manager_name}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-700">
                                <Link
                                    href={`/locations/${location.id}`}
                                    className="p-2 text-gray-400 hover:text-teal-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                    title="View Details"
                                >
                                    <HiOutlineEye className="h-4 w-4" />
                                </Link>
                                <Link
                                    href={`/locations/${location.id}/edit`}
                                    className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                    title="Edit Location"
                                >
                                    <HiOutlinePencil className="h-4 w-4" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(location.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                    title="Delete Location"
                                >
                                    <HiOutlineTrash className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredLocations.length === 0 && (
                    <EmptyState statusFilter={statusFilter} searchTerm={searchTerm} typeFilter={typeFilter}/>
                )}
            </div>
        </div>
    );
}

function EmptyState({searchTerm, typeFilter, statusFilter}) {
    return (
        <div className={`text-center py-12`}>
            <HiOutlineMapPin className={`size-12 text-gray-600 mx-auto mb-4`} />
            <h3 className={`text-lg font-medium text-gray-400 mb-2`}>No locations found</h3>
            <p className={`text-gray-500 mb-6`}>
                {searchTerm || typeFilter !== 'all' || statusFilter !== 'all' ? 'Try adjusting your filters or search terms.' : 'Get started by adding your first location.'}
            </p>
            {(!searchTerm && typeFilter === 'all' && statusFilter === 'all') && (
                <Link
                    href={`/locations/new`}
                    className={`inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium transition-colors duration-200`}
                >
                    <HiOutlinePlus className={`size-5 mr-2`} />
                    Add Your First Location
                </Link>
            )}
        </div>
    )
}