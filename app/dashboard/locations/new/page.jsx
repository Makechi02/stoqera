import Link from "next/link";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import LocationForm from "@/components/dashboard/locations/LocationForm";
import {getUsersForCurrentOrganization} from "@/lib/users/queryUsers";

export default async function Page() {
    const users = await getUsersForCurrentOrganization();

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
                        <h1 className={`text-3xl font-bold font-heading`}>Add New Location</h1>
                        <p className={`mt-1 text-gray-400`}>Create a new location for your organization</p>
                    </div>
                </div>

                <LocationForm users={users}/>
            </div>
        </div>
    )
}