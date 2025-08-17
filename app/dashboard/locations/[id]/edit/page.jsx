import Link from "next/link";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import LocationForm from "@/components/dashboard/locations/LocationForm";
import {getCurrentOrganizationId} from "@/lib/queryOrganizations";
import {getUserForCurrentOrganization} from "@/lib/queryUsers";
import {getLocationById} from "@/lib/queryLocations";

export default async function Page({params}) {
    const {id} = await params;

    const location = await getLocationById(id);

    const organizationId = await getCurrentOrganizationId();
    const users = await getUserForCurrentOrganization();

    return (
        <div className={`min-h-screen`}>
            <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                <div className={`flex items-center mb-8`}>
                    <Link
                        href={`/dashboard/locations`}
                        className={`mr-4 p-2 text-gray-400 hover:text-text hover:bg-gray-800 rounded-lg transition-colors duration-200`}
                    >
                        <ArrowLeftIcon className={`size-5`}/>
                    </Link>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>Edit Location</h1>
                        <p className={`mt-1 text-gray-400`}>Update location information</p>
                    </div>
                </div>

                <LocationForm organizationId={organizationId} users={users} location={location} />
            </div>
        </div>
    )
}