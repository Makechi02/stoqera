'use client';

import Link from 'next/link';
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    BuildingStorefrontIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    EnvelopeIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    UserIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import {formatDescriptionDate} from "@/utils/formatters";

export default function LocationDetails({location}) {
    const getLocationIcon = (type) => {
        switch (type) {
            case 'store':
                return <BuildingStorefrontIcon className={`size-8 text-teal-400`}/>;
            case 'warehouse':
                return <BuildingOfficeIcon className={`size-8 text-teal-400`}/>;
            case 'outlet':
                return <MapPinIcon className={`size-8 text-teal-400`}/>;
            default:
                return <MapPinIcon className={`size-8 text-teal-400`}/>;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                {/* Main Information */}
                <div className={`lg:col-span-2 space-y-6`}>
                    {/* Basic Info Card */}
                    <div className={`bg-gray-800 rounded-lg p-6`}>
                        <div className={`flex items-start justify-between mb-6`}>
                            <div className={`flex items-center`}>
                                {getLocationIcon(location.type)}
                                <div className={`ml-4`}>
                                    <h2 className={`text-2xl font-bold font-heading`}>{location.name}</h2>
                                    <p className={`text-gray-400`}>{location.code}</p>
                                </div>
                            </div>
                            <div className={`flex items-center space-x-3`}>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-900 text-teal-200 capitalize`}>
                                    {location.type}
                                </span>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    location.is_active
                                        ? 'bg-green-900 text-green-200'
                                        : 'bg-red-900 text-red-200'
                                }`}>
                                    {location.is_active ? (
                                        <>
                                            <CheckCircleIcon className={`size-4 mr-1`}/>
                                            Active
                                        </>
                                    ) : (
                                        <>
                                            <XCircleIcon className={`size-4 mr-1`}/>
                                            Inactive
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                            {/* Address */}
                            <div>
                                <h3 className={`text-lg font-semibold mb-3 flex items-center`}>
                                    <MapPinIcon className={`size-5 mr-2 text-teal-400`}/>
                                    Address
                                </h3>
                                <div className={`text-gray-300 space-y-1`}>
                                    <p>{location.address}</p>
                                    <p>{location.city}, {location.state} {location.postal_code}</p>
                                    <p>{location.country}</p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div>
                                <h3 className={`text-lg font-semibold mb-3`}>Contact Information</h3>
                                <div className={`space-y-3`}>
                                    <div className={`flex items-center text-gray-300`}>
                                        <PhoneIcon className={`size-5 mr-3 text-teal-400`}/>
                                        <a
                                            href={`tel:${location.phone}`}
                                            className={`hover:text-teal-400 transition-colors`}
                                        >
                                            {location.phone}
                                        </a>
                                    </div>
                                    <div className={`flex items-center text-gray-300`}>
                                        <EnvelopeIcon className={`size-5 mr-3 text-teal-400`}/>
                                        <a href={`mailto:${location.email}`}
                                           className={`hover:text-teal-400 transition-colors`}
                                        >
                                            {location.email}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operating Hours */}
                    {location.settings?.operating_hours && (
                        <div className={`bg-gray-800 rounded-lg p-6`}>
                            <h3 className={`text-lg font-semibold text-white mb-4 flex items-center`}>
                                <ClockIcon className={`size-5 mr-2 text-teal-400`}/>
                                Operating Hours
                            </h3>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3`}>
                                {Object.entries(location.settings.operating_hours).map(([day, hours]) => (
                                    <div key={day}
                                         className={`flex justify-between items-center py-2 px-3 bg-gray-700 rounded`}>
                                        <span className={`text-gray-300 capitalize font-medium`}>{day}</span>
                                        <span className={`text-gray-400`}>{hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    {location.settings?.features && (
                        <div className={`bg-gray-800 rounded-lg p-6`}>
                            <h3 className={`text-lg font-semibold text-white mb-4`}>Features & Amenities</h3>
                            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3`}>
                                {location.settings.features.map((feature, index) => (
                                    <div key={index} className={`flex items-center py-2 px-3 bg-gray-700 rounded`}>
                                        <CheckCircleIcon className={`size-4 mr-3 text-green-400`}/>
                                        <span className={`text-gray-300`}>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className={`space-y-6`}>
                    {/* Manager Information */}
                    {location.manager && (
                        <div className={`bg-gray-800 rounded-lg p-6`}>
                            <h3 className={`text-lg font-semibold text-white mb-4 flex items-center`}>
                                <UserIcon className={`size-5 mr-2 text-teal-400`}/>
                                Manager
                            </h3>
                            <div className={`space-y-3`}>
                                <div>
                                    <p className={`text-white font-medium`}>{location.manager.full_name}</p>
                                    {location.manager.email && (
                                        <a
                                            href={`mailto:${location.manager.email}`}
                                            className={`text-teal-400 hover:text-teal-300 transition-colors text-sm`}
                                        >
                                            {location.manager.email}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Metadata */}
                    <div className={`bg-gray-800 rounded-lg p-6`}>
                        <h3 className={`text-lg font-semibold text-white mb-4 flex items-center`}>
                            <CalendarIcon className={`size-5 mr-2 text-teal-400`}/>
                            Metadata
                        </h3>
                        <div className={`space-y-4`}>
                            <div>
                                <p className={`text-gray-400 text-sm`}>Created</p>
                                <p>{formatDescriptionDate(location.created_at)}</p>
                            </div>
                            <div>
                                <p className={`text-gray-400 text-sm`}>Last Updated</p>
                                <p>{formatDescriptionDate(location.updated_at)}</p>
                            </div>
                            <div>
                                <p className={`text-gray-400 text-sm`}>Location ID</p>
                                <p className={`font-mono text-sm`}>{location.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={`bg-gray-800 rounded-lg p-6`}>
                        <h3 className={`text-lg font-semibold text-white mb-4`}>Quick Actions</h3>
                        <div className={`space-y-3`}>
                            <Link
                                href={`/dashboard/locations/${location.id}/edit`}
                                className={`w-full flex items-center justify-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white font-medium transition-colors duration-200`}
                            >
                                <PencilIcon className={`size-4 mr-2`}/>
                                Edit Location
                            </Link>
                            <button
                                onClick={() => window.print()}
                                className={`w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors duration-200`}
                            >
                                Print Details
                            </button>
                            <Link
                                href={`/dashboard/locations`}
                                className={`w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors duration-200`}
                            >
                                <ArrowLeftIcon className={`size-4 mr-2`}/>
                                Back to List
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}