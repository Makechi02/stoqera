'use client';

import {useState} from 'react';
import Link from 'next/link';
import {
    HiOutlineBuildingOffice,
    HiOutlineBuildingStorefront,
    HiOutlineEnvelope,
    HiOutlineEye,
    HiOutlineMapPin,
    HiOutlinePencil,
    HiOutlinePhone,
    HiOutlinePlus,
    HiOutlineTrash,
    HiOutlineUser
} from "react-icons/hi2";
import {deleteLocation} from "@/lib/queryLocations";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export default function LocationsGrid({locations}) {
    const [searchTerm] = useState('');
    const [typeFilter] = useState('all');
    const [statusFilter] = useState('all');

    return (
        <div>

            {/* TODO: Add Results Summary */}
            {/*<div className="flex items-center justify-between mb-6">*/}
            {/*    <p className="text-gray-400">*/}
            {/*        Showing {filteredLocations.length} of {locations.length} locations*/}
            {/*    </p>*/}
            {/*</div>*/}

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                {locations.map((location) => <LocationCard key={location.id} location={location}/>)}
            </div>

            {locations.length === 0 && (
                <EmptyState statusFilter={statusFilter} searchTerm={searchTerm} typeFilter={typeFilter}/>
            )}
        </div>
    );
}

function EmptyState({searchTerm, typeFilter, statusFilter}) {
    return (
        <div className={`text-center py-12`}>
            <HiOutlineMapPin className={`size-12 text-gray-600 mx-auto mb-4`}/>
            <h3 className={`text-lg font-medium text-gray-400 mb-2`}>No locations found</h3>
            <p className={`text-gray-500 mb-6`}>
                {searchTerm || typeFilter !== 'all' || statusFilter !== 'all' ? 'Try adjusting your filters or search terms.' : 'Get started by adding your first location.'}
            </p>
            {(!searchTerm && typeFilter === 'all' && statusFilter === 'all') && (
                <Link
                    href={`/dashboard/locations/new`}
                    className={`inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium transition-colors duration-200`}
                >
                    <HiOutlinePlus className={`size-5 mr-2`}/>
                    Add Your First Location
                </Link>
            )}
        </div>
    )
}

function LocationCard({location}) {
    const router = useRouter();

    const getLocationIcon = (type) => {
        switch (type) {
            case 'store':
                return <HiOutlineBuildingStorefront className={`size-5 text-primary`}/>;
            case 'warehouse':
                return <HiOutlineBuildingOffice className={`size-5 text-primary`}/>;
            case 'outlet':
                return <HiOutlineMapPin className={`size-5 text-primary`}/>;
            default:
                return <HiOutlineMapPin className={`size-5 text-primary`}/>;
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            await deleteLocation(location.id);

            toast.success({
                title: 'Location deleted successfully.',
                status: 'success',
                duration: 5000,
                theme: 'dark',
            });

            router.push('/dashboard/locations');
        }
    };

    return (
        <div className={`bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors duration-200`}>
            {/* Header */}
            <div className={`flex items-start justify-between mb-4`}>
                <div className={`flex items-center`}>
                    {getLocationIcon(location.type)}
                    <div className={`ml-3`}>
                        <h3 className={`text-lg font-semibold text-white`}>{location.name}</h3>
                        <p className={`text-sm text-gray-400`}>{location.code}</p>
                    </div>
                </div>
                <div className={`flex items-center`}>
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
            <div className={`mb-4`}>
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900 text-teal-200 capitalize`}
                >
                    {location.type}
                </span>
            </div>

            {/* Address */}
            <div className={`mb-4`}>
                <p className={`text-sm text-gray-300`}>{location.address}</p>
                <p className={`text-sm text-gray-400`}>
                    {location.city}, {location.state} {location.postal_code}
                </p>
            </div>

            {/* Contact Info */}
            <div className={`mb-4 space-y-1`}>
                {location.phone && (<p className={`text-sm text-gray-400 flex items-center`}>
                    <HiOutlinePhone className={`size-4 mr-1`}/>
                    {location.phone}
                </p>)}
                {location.email && (<p className={`text-sm text-gray-400 flex items-center`}>
                    <HiOutlineEnvelope className={`size-4 mr-1`}/>
                    {location.email}
                </p>)}
                {location.manager && (
                    <p className={`text-sm text-gray-400 flex items-center`}>
                        <HiOutlineUser className={`size-4 mr-1`}/>
                        Manager: {location.manager.full_name}
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className={`flex items-center justify-end space-x-2 pt-4 border-t border-gray-700`}>
                <Link
                    href={`/dashboard/locations/${location.id}`}
                    className={`p-2 text-gray-400 hover:text-teal-400 hover:bg-gray-700 rounded-lg transition-colors duration-200`}
                    title={`View Details`}
                >
                    <HiOutlineEye className={`size-4`}/>
                </Link>
                <Link
                    href={`/dashboard/locations/${location.id}/edit`}
                    className={`p-2 text-gray-400 hover:text-yellow-400 hover:bg-gray-700 rounded-lg transition-colors duration-200`}
                    title={`Edit Location`}
                >
                    <HiOutlinePencil className={`size-4`}/>
                </Link>
                <button
                    onClick={() => handleDelete(location.id)}
                    className={`p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200`}
                    title={`Delete Location`}
                >
                    <HiOutlineTrash className={`size-4`}/>
                </button>
            </div>
        </div>
    )
}