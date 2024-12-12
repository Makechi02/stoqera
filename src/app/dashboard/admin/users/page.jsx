import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import Link from "next/link";
import UsersTable from "@/components/ui/dashboard/admin/users/UsersTable";
import {Suspense} from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import {FaEllipsisVertical, FaPlus} from "react-icons/fa6";

async function getAllUsers(query) {
    const {accessToken} = await getServerSession(authOptions);
    const queryString = query ? `?query=${query}` : '';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users${queryString}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch users');
    }

    return await response.json();
}

export const metadata = {
    title: 'Users - Finviq'
}

export default async function Page({searchParams}) {
    const {query} = searchParams;
    const users = await getAllUsers(query);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <h1 className={`page-heading`}>Users</h1>

                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <SearchForm/>
                    <div className={`flex gap-4 items-center`}>
                        <Link href={`/dashboard/admin/users/add`} className={`add-btn flex items-center gap-2`}>
                            <FaPlus/> New user
                        </Link>
                        {/* TODO: Handle invite user */}
                        <button
                            className={`px-3 py-2 rounded-lg border border-primary hover:bg-primary hover:text-white flex items-center gap-2`}
                        >
                            Invite user
                        </button>
                        {/* TODO: Handle more options menu */}
                        <button
                        className={`bg-gray-200 hover:bg-gray-300 py-3 px-2 rounded-lg`}
                        >
                            <FaEllipsisVertical/>
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <Suspense fallback={<TableSkeleton/>}>
                    <UsersTable users={users}/>
                </Suspense>
            </div>
        </main>
    )
}
