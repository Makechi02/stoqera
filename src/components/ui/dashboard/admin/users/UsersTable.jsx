'use client'

import DateUtil from "@/utils/dateUtil";
import Link from "next/link";
import {FaPen} from "react-icons/fa";
import {UserCard} from "@/components/ui/dashboard/admin/TableCards";
import {showConfirmDialog} from "@/utils/sweetalertUtil";
import {UserService} from "@/service";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {deleteUser} from "@/lib/userActions";
import {useFormState} from "react-dom";
import {useEffect} from "react";
import {DeleteButton} from "@/components/ui/dashboard/Buttons";

export default function UsersTable({users}) {
    const router = useRouter();

    const handleDelete = (user) => {
        showConfirmDialog(
            `Are you sure you want to delete user ${user.name}?`,
            () => deleteUser(user)
        );
    }

    const deleteUser = (user) => {
        UserService.deleteUser(user.id)
            .then(response => {
                if (response.status === 200) {
                    toast.success('User deleted successfully');
                    router.refresh();
                }
            })
            .catch(error => console.error(error));
    }

    return (
        users.length === 0 ? (
            <div>
                <p className={`text-center`}>No users found</p>
            </div>
        ) : (
            <>
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
                                        href={`/dashboard/admin/users/edit/${user.id}`}
                                    >
                                        <FaPen/>
                                    </Link>
                                    <DeleteUser user={user}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {users.map((user, index) => (
                    <div key={index} className={`sm:hidden`}>
                        <UserCard user={user} handleDelete={handleDelete}/>
                    </div>
                ))}
            </>
        )
    )
}

const DeleteUser = ({user}) => {
    const deleteUserWithId = deleteUser.bind(null, user.id);
    const [message, dispatch] = useFormState(deleteUserWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <form action={dispatch}>
            <DeleteButton/>
        </form>
    )
}

