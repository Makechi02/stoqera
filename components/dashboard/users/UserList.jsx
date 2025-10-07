'use client'

import {useEffect, useState} from 'react';
import {
    FunnelIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    UserCircleIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import {formatDate} from "@/utils/formatters";

export default function UserList({users}) {
    return (
        <div>
            {/* Stats */}
            <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 mb-6`}>
                <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4`}>
                    <p className={`text-gray-400 text-sm mb-1`}>Total Users</p>
                    <p className={`text-2xl font-bold`}>{users.length}</p>
                </div>
                <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4`}>
                    <p className={`text-gray-400 text-sm mb-1`}>Active Users</p>
                    <p className={`text-2xl font-bold text-teal-400`}>
                        {users.filter(u => u.is_active).length}
                    </p>
                </div>
                <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4`}>
                    <p className={`text-gray-400 text-sm mb-1`}>Admins</p>
                    <p className={`text-2xl font-bold`}>{users.filter(u => u.role === 'admin').length}</p>
                </div>
                <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4`}>
                    <p className={`text-gray-400 text-sm mb-1`}>Managers</p>
                    <p className={`text-2xl font-bold`}>{users.filter(u => u.role === 'manager').length}</p>
                </div>
            </div>

            <FiltersBar/>

            {users.length > 0 ? (
                <UsersGrid users={users}/>
            ) : (
                <div className={`bg-gray-800 rounded-lg border border-gray-700 text-center py-12`}>
                    <UserGroupIcon className={`size-12 text-gray-600 mx-auto mb-4`}/>
                    <p className={`text-gray-400`}>No users found</p>
                </div>
            )}
        </div>
    );
}

function FiltersBar() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [roleFilter, setRoleFilter] = useState(searchParams.get('role') || 'all');
    const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all');

    const debouncedSearch = useDebounce(searchQuery, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }

        if (roleFilter !== 'all') {
            params.set("role", roleFilter);
        } else {
            params.delete("role");
        }

        if (statusFilter !== 'all') {
            params.set("status", statusFilter);
        } else {
            params.delete("status");
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, roleFilter, statusFilter, searchParams, router]);

    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-4`}>
            {/* Search */}
            <div className={`relative`}>
                <MagnifyingGlassIcon className={`absolute left-3 top-2.5 size-5 text-gray-500`}/>
                <input
                    type={`search`}
                    placeholder={`Search users...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`dashboard-form-input-icon border-gray-700`}
                />
            </div>

            {/* Role Filter */}
            <div className={`relative`}>
                <FunnelIcon className={`absolute left-3 top-2.5 size-5 text-gray-500`}/>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className={`dashboard-form-input-icon border-gray-700`}
                >
                    <option value={`all`}>All Roles</option>
                    <option value={`admin`}>Admin</option>
                    <option value={`manager`}>Manager</option>
                    <option value={`user`}>User</option>
                    <option value={`viewer`}>Viewer</option>
                </select>
            </div>

            {/* Status Filter */}
            <div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`dashboard-form-input-icon border-gray-700`}
                >
                    <option value={`all`}>All Status</option>
                    <option value={`active`}>Active</option>
                    <option value={`inactive`}>Inactive</option>
                </select>
            </div>
        </div>
    )
}

function UsersGrid({users}) {
    const getRoleBadgeColor = (role) => {
        const colors = {
            admin: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
            manager: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            user: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
            viewer: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
        };
        return colors[role] || colors.user;
    };

    const handleDeleteUser = async (userId) => {
        if (confirm('Are you sure you want to delete this user?')) {
            // Implement delete logic
            // setUsers(users.filter(u => u.id !== userId));
        }
    };

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
            {users.map((user) => (
                <div
                    key={user.id}
                    className={`bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all overflow-hidden`}
                >
                    {/* Card Header */}
                    <div className={`p-5 border-b border-gray-700`}>
                        <div className={`flex items-start justify-between mb-3`}>
                            <div className={`flex items-center space-x-3`}>
                                <div
                                    className={`size-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0`}>
                                    {user.avatar_url ? (
                                        <img
                                            src={user.avatar_url}
                                            alt={``}
                                            className={`size-12 rounded-full`}/>
                                    ) : (
                                        <UserCircleIcon className={`size-7 text-gray-600`}/>
                                    )}
                                </div>
                                <div className={`flex-1 min-w-0`}>
                                    <h3 className={`text-sm font-semibold truncate`}>{user.full_name}</h3>
                                    <p className={`text-xs text-gray-400 truncate`}>{user.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`flex items-center space-x-2`}>
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getRoleBadgeColor(user.role)}`}
                            >
                                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${
                                    user.is_active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                                }`}
                            >
                                {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className={`p-5 space-y-3`}>
                        <div className={`flex items-center justify-between text-sm`}>
                            <span className={`text-gray-400`}>Locations</span>
                            <span className={`font-medium`}>
                                {user.locations.length} {user.locations.length === 1 ? 'location' : 'locations'}
                            </span>
                        </div>

                        <div className={`flex items-center justify-between text-sm`}>
                            <span className={`text-gray-400`}>Last Login</span>
                            <span>{formatDate(user.last_login)}</span>
                        </div>

                        <div className={`flex items-center justify-between text-sm`}>
                            <span className={`text-gray-400`}>Member Since</span>
                            <span>{formatDate(user.created_at)}</span>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div
                        className={`px-5 py-3 border-t border-gray-700 flex justify-end space-x-2`}>
                        <Link
                            href={`/dashboard/users/${user.id}/edit`}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 hover:bg-gray-700 rounded-lg transition-colors text-teal-400 text-sm font-medium`}
                            title={`Edit user`}
                        >
                            <PencilIcon className={`size-4`}/>
                            <span>Edit</span>
                        </Link>
                        <button
                            onClick={() => handleDeleteUser(user.id)}
                            className={`flex items-center space-x-1.5 px-3 py-1.5 hover:bg-gray-700 rounded-lg transition-colors text-red-400 text-sm font-medium`}
                            title={`Delete user`}
                        >
                            <TrashIcon className={`size-4`}/>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
