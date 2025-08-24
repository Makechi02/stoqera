'use client'

import {useState} from 'react';
import Link from 'next/link';
import {EyeIcon, PencilIcon, TagIcon, TrashIcon, UserGroupIcon} from '@heroicons/react/24/outline';
import {StarIcon} from '@heroicons/react/24/solid';
import {formatDate} from "@/utils/formatters";
import DeleteCustomerGroupModal from "@/components/dashboard/customers/groups/DeleteCustomerGroupModal";
import {deleteCustomerGroup} from "@/lib/queryCustomerGroups";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";

export default function CustomerGroupsGrid({customerGroups}) {
    const [deleteModal, setDeleteModal] = useState({open: false, group: null});

    const handleDelete = async (groupId) => {
        try {
            await deleteCustomerGroup(groupId);

            setDeleteModal({open: false, group: null});
            showSuccessToast('Customer group deleted successfully.');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting customer group:', error);
            showErrorToast('Error deleting customer group. Please try again later.');
        }
    };

    return (
        <div>
            <StatsCard customerGroups={customerGroups}/>

            {/* Customer Groups Table */}
            <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden`}>
                <div className={`overflow-x-auto`}>
                    <table className={`w-full`}>
                        <thead className={`bg-gray-700`}>
                        <tr>
                            <th className={`px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                                Group
                            </th>
                            <th className={`px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                                Discount
                            </th>
                            <th className={`px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                                Status
                            </th>
                            <th className={`px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                                Created
                            </th>
                            <th className={`px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider`}>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className={`divide-y divide-gray-700`}>
                        {customerGroups.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={`px-6 py-12 text-center text-gray-400`}>
                                    <UserGroupIcon className={`size-12 mx-auto mb-4 text-gray-500`}/>
                                    <p className={`text-lg font-medium`}>No customer groups found</p>
                                    <p className={`mt-1`}>Get started by creating your first customer group.</p>
                                </td>
                            </tr>
                        ) : (
                            customerGroups.map((group) => (
                                <CustomerRow key={group.id} group={group} setDeleteModal={setDeleteModal}/>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.open && (
                <DeleteCustomerGroupModal
                    setDeleteModal={setDeleteModal}
                    deleteModal={deleteModal}
                    handleDelete={handleDelete}/>
            )}
        </div>
    );
}

function StatsCard({customerGroups}) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8`}>
            <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                <div className={`flex items-center`}>
                    <UserGroupIcon className={`size-8 text-teal-400`}/>
                    <div className={`ml-4`}>
                        <p className={`text-sm text-gray-400`}>Total Groups</p>
                        <p className={`text-2xl font-bold`}>{customerGroups.length}</p>
                    </div>
                </div>
            </div>
            <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                <div className={`flex items-center`}>
                    <TagIcon className={`size-8 text-teal-400`}/>
                    <div className={`ml-4`}>
                        <p className={`text-sm text-gray-400`}>Avg. Discount</p>
                        <p className={`text-2xl font-bold`}>
                            {customerGroups.length > 0
                                ? Math.round(customerGroups.reduce((sum, group) => sum + (group.discount_percentage || 0), 0) / customerGroups.length)
                                : 0}%
                        </p>
                    </div>
                </div>
            </div>
            <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                <div className={`flex items-center`}>
                    <StarIcon className={`size-8 text-yellow-400`}/>
                    <div className={`ml-4`}>
                        <p className={`text-sm text-gray-400`}>Default Groups</p>
                        <p className={`text-2xl font-bold`}>
                            {customerGroups.filter(group => group.is_default).length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CustomerRow({group, setDeleteModal}) {
    return (
        <tr className={`hover:bg-gray-750`}>
            <td className={`px-6 py-4`}>
                <div className={`flex items-center`}>
                    <div className={`size-4 rounded-full mr-3`} style={{backgroundColor: group.color || '#6B7280'}}/>
                    <div>
                        <div className={`flex items-center`}>
                            <span className={`text-sm font-medium`}>{group.name}</span>
                            {group.is_default && (
                                <StarIcon className={`h-4 w-4 ml-2 text-yellow-400`}/>
                            )}
                        </div>
                        {group.description && (<p className={`text-sm text-gray-400 mt-1`}>{group.description}</p>)}
                    </div>
                </div>
            </td>
            <td className={`px-6 py-4`}>
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900 text-teal-200`}
                >
                    {group.discount_percentage || 0}%
                </span>
            </td>
            <td className={`px-6 py-4`}>
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        group.is_default ? 'bg-yellow-900 text-yellow-200' : 'bg-gray-700 text-gray-300'
                    }`}>
                {group.is_default ? 'Default' : 'Active'}
                </span>
            </td>
            <td className={`px-6 py-4 text-sm text-gray-400`}>{formatDate(group.created_at)}</td>
            <td className={`px-6 py-4 text-right`}>
                <div className={`flex items-center justify-end space-x-2`}>
                    <Link
                        href={`/dashboard/customer-groups/${group.id}`}
                        className={`p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors`}
                    >
                        <EyeIcon className={`size-4`}/>
                    </Link>
                    <Link
                        href={`/dashboard/customer-groups/${group.id}/edit`}
                        className={`p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors`}
                    >
                        <PencilIcon className={`size-4`}/>
                    </Link>
                    <button
                        onClick={() => setDeleteModal({open: true, group})}
                        className={`p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors`}
                    >
                        <TrashIcon className={`size-4`}/>
                    </button>
                </div>
            </td>
        </tr>
    )
}

