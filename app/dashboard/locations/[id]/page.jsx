import {getLocationById} from "@/lib/queryLocations";
import LocationDetails from "@/components/dashboard/locations/LocationDetails";
import Link from "next/link";
import {ArrowLeftIcon, PencilIcon} from '@heroicons/react/24/outline';
import DeleteLocationBtn from "@/components/dashboard/locations/DeleteLocationBtn";

export default async function Page({params}) {
    const {id} = await params;
    const location = await getLocationById(id);

    if (!location) {
        return (
            <div className={`min-h-[calc(100svh-120px)] bg-gray-900 flex items-center justify-center`}>
                <div className={`text-center`}>
                    <h2 className={`text-2xl font-bold text-white mb-2`}>Location Not Found</h2>
                    <p className={`text-gray-400 mb-4`}>The location you're looking for doesn't exist.</p>
                    <Link
                        href={`/dashboard/locations`}
                        className={`inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium transition-colors duration-200`}
                    >
                        <ArrowLeftIcon className={`size-4 mr-2`}/>
                        Back to Locations
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen bg-gray-900 text-white`}>
            <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>

                <div className={`flex items-center justify-between mb-8`}>
                    <div className={`flex items-center`}>
                        <Link
                            href={`/dashboard/locations`}
                            className={`mr-4 p-2 text-gray-400 hover:text-text hover:bg-gray-800 rounded-lg transition-colors duration-200`}
                        >
                            <ArrowLeftIcon className={`size-5`}/>
                        </Link>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Location Details</h1>
                            <p className={`mt-1 text-gray-400`}>View and manage location information</p>
                        </div>
                    </div>
                    <div className={`flex items-center space-x-3`}>
                        <Link
                            href={`/locations/${location.id}/edit`}
                            className={`inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white font-medium transition-colors duration-200`}
                        >
                            <PencilIcon className={`size-4 mr-2`}/>
                            Edit
                        </Link>
                        <DeleteLocationBtn location={location}/>
                    </div>
                </div>

                <LocationDetails location={location}/>
            </div>
        </div>
    )
}