import {getOrganizationBySlug} from "@/lib/queryOrganizations";
import {getLocationsByOrganization} from "@/lib/queryLocations";
import Link from "next/link";
import {
    HiOutlineBuildingOffice,
    HiOutlineBuildingStorefront,
    HiOutlineEye,
    HiOutlineMapPin,
    HiOutlinePencil,
    HiOutlinePlus,
    HiOutlineTrash
} from "react-icons/hi2";

export default async function Page({params}) {
    const {slug, location} = await params;

    const organization = await getOrganizationBySlug(slug);
    const locations = await getLocationsByOrganization(organization.id);

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

    return (
        <div>
            <div className={`max-w-7xl mx-auto`}>
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
            </div>

            {/*<div className="flex items-center justify-between mb-6">*/}
            {/*    <p className="text-gray-400">*/}
            {/*        Showing {locations.length} of {locations.length} locations*/}
            {/*    </p>*/}
            {/*</div>*/}

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
                {locations.map((location) => (
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
                                        location.isActive
                                            ? 'bg-green-900 text-green-200'
                                            : 'bg-red-900 text-red-200'
                                    }`}>
                                        {location.isActive ? 'Active' : 'Inactive'}
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
                                {location.city}, {location.state} {location.postalCode}
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
                                // onClick={() => handleDelete(location.id)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                                title="Delete Location"
                            >
                                <HiOutlineTrash className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}