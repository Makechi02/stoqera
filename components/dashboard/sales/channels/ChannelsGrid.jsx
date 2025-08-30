'use client'

import Link from 'next/link';
import {EyeIcon, PencilIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import {useSearchParams} from "next/navigation";
import {formatDate} from "@/utils/formatters";
import {useState} from "react";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {deleteSalesChannel} from "@/lib/querySales";
import {DeleteModal} from "@/components/ui/modal";

export default function ChannelsGrid({channels}) {
    const searchParams = useSearchParams();

    const searchTerm = searchParams.get('search') || '';
    const typeFilter = searchParams.get('type') || '';
    const statusFilter = searchParams.get('status') || '';

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [deleteModal, setDeleteModal] = useState({open: false, data: null});

    const handleDelete = async (channelId) => {
        setLoadingDelete(true);

        try {
            await deleteSalesChannel(channelId);

            setDeleteModal({open: false, data: null});
            showSuccessToast('Sale channel deleted successfully.');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting sale channel:', error);
            showErrorToast('Error deleting sale channel. Please try again later.');
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <div>
            <StatsCards channels={channels}/>

            {channels.length === 0 ? (
                <div className={`bg-gray-800 rounded-lg p-12 text-center`}>
                    <div className={`text-gray-400 text-lg`}>
                        {searchTerm || typeFilter || statusFilter
                            ? 'No channels match your filters'
                            : 'No sales channels found'}
                    </div>
                    {!searchTerm && !typeFilter && !statusFilter && (
                        <Link
                            href={`/dashboard/sales-channels/create`}
                            className={`mt-4 bg-teal-600 hover:bg-teal-700 text-text px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors`}
                        >
                            <PlusIcon className={`size-5`}/>
                            Create Your First Channel
                        </Link>
                    )}
                </div>
            ) : (
                <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
                        {channels.map((channel) => (
                            <ChannelCard key={channel.id} channel={channel} setDeleteModal={setDeleteModal}/>
                        ))}
                    </div>

                    {deleteModal.open && (
                        <DeleteModal
                            setDeleteModal={setDeleteModal}
                            deleteModal={deleteModal}
                            handleDelete={handleDelete}
                            isLoading={loadingDelete}
                            title={`Delete Sale Channel`}/>
                    )}
                </>
            )}
        </div>
    );
}

function StatsCards({channels}) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8`}>
            <div className={`bg-gray-800 rounded-lg p-6`}>
                <div className={`flex items-center`}>
                    <div className={`p-2 bg-teal-900 rounded-lg`}>
                        <div className={`size-6 bg-teal-500 rounded`}/>
                    </div>
                    <div className={`ml-4`}>
                        <p className={`text-gray-400 text-sm`}>Total Channels</p>
                        <p className={`text-2xl font-bold`}>{channels.length}</p>
                    </div>
                </div>
            </div>
            <div className={`bg-gray-800 rounded-lg p-6`}>
                <div className={`flex items-center`}>
                    <div className={`p-2 bg-green-900 rounded-lg`}>
                        <div className={`size-6 bg-green-500 rounded`}/>
                    </div>
                    <div className={`ml-4`}>
                        <p className={`text-gray-400 text-sm`}>Active</p>
                        <p className={`text-2xl font-bold`}>{channels.filter(c => c.is_active).length}</p>
                    </div>
                </div>
            </div>
            <div className={`bg-gray-800 rounded-lg p-6`}>
                <div className={`flex items-center`}>
                    <div className={`p-2 bg-red-900 rounded-lg`}>
                        <div className={`size-6 bg-red-500 rounded`}/>
                    </div>
                    <div className={`ml-4`}>
                        <p className={`text-gray-400 text-sm`}>Inactive</p>
                        <p className={`text-2xl font-bold`}>{channels.filter(c => !c.is_active).length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChannelCard({channel, setDeleteModal}) {
    const channelTypes = [
        {value: 'pos', label: 'Point of Sale'},
        {value: 'online', label: 'Online'},
        {value: 'phone', label: 'Phone'},
        {value: 'wholesale', label: 'Wholesale'}
    ];

    const getTypeLabel = (type) => {
        const typeObj = channelTypes.find(t => t.value === type);
        return typeObj ? typeObj.label : type;
    };

    const getTypeBadgeColor = (type) => {
        const colors = {
            pos: 'bg-blue-900 text-blue-300',
            online: 'bg-green-900 text-green-300',
            phone: 'bg-purple-900 text-purple-300',
            wholesale: 'bg-orange-900 text-orange-300'
        };
        return colors[type] || 'bg-gray-700 text-gray-300';
    };

    return (
        <div
            className={`bg-gray-800 rounded-lg p-6 sm:p-4 hover:bg-gray-750 transition-colors border border-gray-700 hover:border-gray-600`}
        >
            <div className={`flex items-start justify-between mb-4`}>
                <div className={`flex-1`}>
                    <h3 className={`text-lg font-semibold mb-1 truncate`}>{channel.name}</h3>
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeColor(channel.type)}`}
                    >
                        {getTypeLabel(channel.type)}
                    </span>
                </div>
                <p
                    className={`ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                        channel.is_active
                            ? 'bg-green-900 text-green-300'
                            : 'bg-red-900 text-red-300'
                    }`}
                >
                    {channel.is_active ? 'Active' : 'Inactive'}
                </p>
            </div>

            {/* Description */}
            <div className={`mb-4`}>
                <p className={`text-gray-400 text-sm line-clamp-2 min-h-10`}>
                    {channel.description || 'No description provided'}
                </p>
            </div>

            {/* Created Date */}
            <p className={`mb-4 text-xs text-gray-500`}>Created {formatDate(channel.created_at)}</p>

            {/* Actions */}
            <div className={`flex items-center justify-between pt-4 border-t border-gray-700`}>
                <Link
                    href={`/dashboard/sales/channels/${channel.id}`}
                    className={`text-teal-400 hover:text-teal-300 text-sm font-medium transition-colors flex items-center gap-1`}
                >
                    <EyeIcon className={`size-4`}/>
                    View Details
                </Link>
                <div className={`flex items-center gap-2`}>
                    <Link
                        href={`/dashboard/sales/channels/${channel.id}/edit`}
                        className={`text-gray-400 hover:text-blue-400 transition-colors p-1`}
                    >
                        <PencilIcon className={`size-4`}/>
                    </Link>
                    <button
                        onClick={() => setDeleteModal({open: true, data: channel})}
                        className={`text-gray-400 hover:text-red-400 transition-colors p-1`}
                    >
                        <TrashIcon className={`size-4`}/>
                    </button>
                </div>
            </div>
        </div>
    )
}