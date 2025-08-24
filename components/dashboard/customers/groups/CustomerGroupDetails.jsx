'use client'

import {useState} from 'react';
import Link from 'next/link';
import {
    CalendarIcon,
    ChartBarIcon,
    InformationCircleIcon,
    PencilIcon,
    TagIcon,
    TrashIcon,
    UserGroupIcon,
    UsersIcon
} from '@heroicons/react/24/outline';
import {StarIcon as StarSolidIcon} from '@heroicons/react/24/solid';
import {formatCurrency, formatDate} from "@/utils/formatters";
import {BackBtn} from "@/components/ui/buttons";
import DeleteCustomerGroupModal from "@/components/dashboard/customers/groups/DeleteCustomerGroupModal";
import {deleteCustomerGroup} from "@/lib/queryCustomerGroups";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {useRouter} from "next/navigation";

export default function CustomerGroupDetails({group, stats}) {
    const router = useRouter();
    const [deleteModal, setDeleteModal] = useState({open: false, group: null});

    const handleDelete = async (groupId) => {
        try {
            await deleteCustomerGroup(groupId);

            setDeleteModal({open: false, group: null});
            showSuccessToast('Customer group deleted successfully.');
            router.push('/dashboard/customer-groups');
        } catch (error) {
            console.error('Error deleting customer group:', error);
            showErrorToast('Error deleting customer group. Please try again later.');
        }
    };

    return (
        <div>
            <div className={`mb-8`}>
                <div className={`flex flex-wrap gap-4 items-center justify-between`}>
                    <div className={`flex items-center`}>
                        <BackBtn/>
                        <div className={`flex flex-wrap gap-4 items-center`}>
                            <div
                                className={`size-8 rounded-full mr-4`}
                                style={{backgroundColor: group.color || '#6B7280'}}
                            />
                            <div>
                                <div className={`flex items-center`}>
                                    <h1 className={`text-3xl font-bold font-heading`}>{group.name}</h1>
                                    {group.is_default && (
                                        <StarSolidIcon className="h-6 w-6 ml-3 text-yellow-400"/>
                                    )}
                                </div>
                                {group.description && (
                                    <p className="text-gray-400 mt-1">{group.description}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={`flex items-center space-x-3 flex-1 justify-end`}>
                        <Link
                            href={`/dashboard/customer-groups/${group.id}/edit`}
                            className={`inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors`}
                        >
                            <PencilIcon className="h-4 w-4 mr-2"/>
                            Edit
                        </Link>
                        <button
                            onClick={() => setDeleteModal({open: true, group: group})}
                            className={`inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors`}
                        >
                            <TrashIcon className="h-4 w-4 mr-2"/>
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center">
                        <UsersIcon className="h-8 w-8 text-teal-400"/>
                        <div className="ml-4">
                            <p className="text-sm text-gray-400">Total Customers</p>
                            <p className="text-2xl font-bold text-white">{stats.totalCustomers.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center">
                        <UserGroupIcon className="h-8 w-8 text-green-400"/>
                        <div className="ml-4">
                            <p className="text-sm text-gray-400">Active Customers</p>
                            <p className="text-2xl font-bold text-white">{stats.activeCustomers.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center">
                        <ChartBarIcon className="h-8 w-8 text-blue-400"/>
                        <div className="ml-4">
                            <p className="text-sm text-gray-400">Total Revenue</p>
                            <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center">
                        <TagIcon className="h-8 w-8 text-purple-400"/>
                        <div className="ml-4">
                            <p className="text-sm text-gray-400">Avg. Order Value</p>
                            <p className="text-2xl font-bold text-white">{formatCurrency(stats.avgOrderValue)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Group Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-lg font-medium mb-6 flex items-center">
                            <InformationCircleIcon className="h-5 w-5 mr-2"/>
                            Group Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Group Name
                                </label>
                                <p className="text-white font-medium">{group.name}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Discount Percentage
                                </label>
                                <div className="flex items-center">
                                    <span
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-900 text-teal-200"
                                    >
                                        {group.discount_percentage || 0}%
                                    </span>
                                </div>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Description
                                </label>
                                <p className="text-white">
                                    {group.description || 'No description provided'}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Status
                                </label>
                                <div className="flex items-center space-x-3">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            group.is_default ? 'bg-yellow-900 text-yellow-200' : 'bg-gray-700 text-gray-300'
                                        }`}>
                                        {group.is_default ? 'Default Group' : 'Active'}
                                    </span>
                                    {group.is_default && (
                                        <StarSolidIcon className="h-4 w-4 text-yellow-400"/>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Group Color
                                </label>
                                <div className="flex items-center">
                                    <div
                                        className="h-8 w-8 rounded-full border-2 border-gray-600 mr-3"
                                        style={{backgroundColor: group.color || '#6B7280'}}
                                    />
                                    <span className="font-mono text-sm">{group.color || '#6B7280'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-lg font-medium text-white mb-6 flex items-center">
                            <ChartBarIcon className="h-5 w-5 mr-2"/>
                            Recent Activity
                        </h2>

                        <div className="text-center py-12 text-gray-400">
                            <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-gray-500"/>
                            <p className="text-lg font-medium">No recent activity</p>
                            <p className="mt-1">Customer activity will appear here once customers are assigned to this
                                group.</p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Metadata */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-lg font-medium text-white mb-4 flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2"/>
                            Metadata
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Created At
                                </label>
                                <p className="text-white text-sm">{formatDate(group.created_at)}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Last Updated
                                </label>
                                <p className="text-white text-sm">{formatDate(group.updated_at)}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">
                                    Group ID
                                </label>
                                <p className="text-white text-sm font-mono break-all">{group.id}</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>

                        <div className="space-y-3">
                            <Link
                                href={`/dashboard/customers?group=${group.id}`}
                                className="block w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-center transition-colors"
                            >
                                View Customers
                            </Link>

                            <Link
                                href={`/dashboard/customer-groups/${group.id}/edit`}
                                className="block w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-center transition-colors"
                            >
                                Edit Group
                            </Link>

                            <button
                                onClick={() => setDeleteModal({open: true, group})}
                                className="block w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-center transition-colors"
                            >
                                Delete Group
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.open && (
                <DeleteCustomerGroupModal
                    handleDelete={handleDelete}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                />
            )}
        </div>
    );
}