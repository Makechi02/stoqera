import {getLocationsForCurrentOrganization} from "@/lib/queryLocations";
import Link from "next/link";
import {HiOutlinePlus} from "react-icons/hi2";
import LocationsGrid from "@/components/dashboard/locations/LocationsGrid";
import LocationsSearchBar from "@/components/dashboard/locations/LocationsSearchBar";

export default async function Page() {
    const locations = await getLocationsForCurrentOrganization();

    return (
        <div>
            <div className={`max-w-7xl mx-auto`}>
                <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8`}>
                    <div>
                        <h1 className={`text-3xl font-bold text-white font-heading`}>Locations</h1>
                        <p className={`mt-2 text-gray-400`}>Manage your organization's locations</p>
                    </div>
                    <div className={`mt-4 sm:mt-0`}>
                        <Link
                            href={`/dashboard/locations/new`}
                            className={`inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium transition-colors duration-200`}
                        >
                            <HiOutlinePlus className={`size-5 mr-2`}/>
                            Add Location
                        </Link>
                    </div>
                </div>
            </div>

            <LocationsSearchBar/>
            <LocationsGrid locations={locations}/>
        </div>
    )
}