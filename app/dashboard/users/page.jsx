import {PlusIcon} from '@heroicons/react/24/outline';
import Link from "next/link";
import UserList from "@/components/dashboard/users/UserList";
import {getUsersForCurrentOrganization} from "@/lib/users/queryUsers";

export default async function Page() {
    const users = await getUsersForCurrentOrganization();

    return (
        <div className={`max-w-7xl mx-auto py-6`}>
            <div className={`flex flex-wrap items-center justify-between gap-4 mb-8`}>
                <div>
                    <h1 className={`text-3xl font-bold font-heading mb-2`}>Users</h1>
                    <p className={`text-gray-400`}>Manage users in your organization</p>
                </div>

                <div className={`flex-1 flex justify-end`}>
                    <Link
                        href={`/dashboard/users/invite`}
                        className={`flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors`}
                    >
                        <PlusIcon className={`size-5`}/>
                        <span className={`whitespace-nowrap`}>Invite User</span>
                    </Link>
                </div>
            </div>

            <UserList users={users}/>
        </div>
    )
}