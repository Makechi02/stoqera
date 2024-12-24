import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import Link from "next/link";
import {Suspense} from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import {FaEllipsisVertical, FaPlus, FaTrashCan} from "react-icons/fa6";
import {getAllUsers} from "@/lib/userActions";
import DateUtil from "@/utils/dateUtil";
import {FaPen} from "react-icons/fa";

export const metadata = {
    title: 'Users - Finviq'
}

export default async function Page(props) {
    const searchParams = await props.searchParams;
    const {query} = searchParams;
    const users = await getAllUsers(query);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <h1 className={`page-heading`}>Users</h1>

                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <SearchForm/>
                    <div className={`flex gap-4 items-center`}>
                        <Link href={`/admin/users/add`} className={`add-btn flex items-center gap-2`}>
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

function UsersTable({users}) {
    return (
        users.length === 0 ? (
            <div>
                <p className={`text-center`}>No users found</p>
            </div>
        ) : (
            <div className={`overflow-x-auto`}>
                <table className={`min-w-full divide-y divide-gray-200 hidden sm:table`}>
                    <thead className={`bg-gray-50`}>
                    <tr>
                        <th scope={`col`} className={`table-heading`}>S/No</th>
                        <th scope={`col`} className={`table-heading`}>Name</th>
                        <th scope={`col`} className={`table-heading`}>Email</th>
                        <th scope={`col`} className={`table-heading`}>Role</th>
                        <th scope={`col`} className={`table-heading`}>Added at</th>
                        <th scope={`col`} className={`table-heading`}>Updated at</th>
                        <th scope={`col`} className={`table-heading`}>Actions</th>
                    </tr>
                    </thead>

                    <tbody className={`bg-white divide-y divide-gray-200`}>
                    {users?.map((user, index) => (
                        <tr key={user.id}>
                            <td className={`table-data`}>{index + 1}</td>
                            <td className={`table-data`}>{user.name}</td>
                            <td className={`table-data`}>{user.email}</td>
                            <td className={`table-data`}>{user.role}</td>
                            <td className={`table-data`}>{DateUtil.formatDate(user.createdAt)}</td>
                            <td className={`table-data`}>{DateUtil.formatDate(user.updatedAt)}</td>
                            <td className={`table-data flex`}>
                                <Link
                                    title={`Edit`}
                                    className={`edit-btn`}
                                    href={`/admin/users/${user.id}/edit`}
                                >
                                    <FaPen/>
                                </Link>

                                <Link
                                    title={`Delete user`}
                                    className={`delete-btn ml-3`}
                                    href={`/admin/users/${user.id}/delete`}
                                >
                                    <FaTrashCan/>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    )
}
