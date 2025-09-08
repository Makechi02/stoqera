'use client'

import Link from 'next/link';
import {CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon} from '@heroicons/react/24/outline';
import {BackBtn} from "@/components/ui/buttons";
import {formatDescriptionDate} from "@/utils/formatters";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {deleteSalesChannel} from "@/lib/sales/querySales";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {DeleteModal} from "@/components/ui/modal";

export default function ChannelDetails({channel}) {
    const router = useRouter();

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [deleteModal, setDeleteModal] = useState({open: false, data: null});

    const handleDelete = async (channelId) => {
        setLoadingDelete(true);

        try {
            await deleteSalesChannel(channelId);

            setDeleteModal({open: false, data: null});
            showSuccessToast('Sale channel deleted successfully.');
            router.push('/dashboard/sales/channels');
        } catch (error) {
            console.error('Error deleting sale channel:', error);
            showErrorToast('Error deleting sale channel. Please try again later.');
        } finally {
            setLoadingDelete(false);
        }
    };

    const getTypeLabel = (type) => {
        const types = {
            pos: 'Point of Sale',
            online: 'Online',
            phone: 'Phone',
            wholesale: 'Wholesale'
        };
        return types[type] || type;
    };

    return (
        <div>
            {/* Header */}
            <div className={`flex flex-wrap gap-4 items-center justify-between mb-8`}>
                <div className={`flex items-center`}>
                    <BackBtn/>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>{channel.name}</h1>
                        <p className={`text-gray-400 mt-1`}>Sales Channel Details</p>
                    </div>
                </div>
                <div className={`flex items-center gap-3 flex-1 justify-end`}>
                    <Link
                        href={`/dashboard/sales/channels/${channel.id}/edit`}
                        className={`bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                    >
                        <PencilIcon className={`size-5 `}/>
                        Edit
                    </Link>
                    <button
                        onClick={() => setDeleteModal({open: true, data: channel})}
                        className={`bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                    >
                        <TrashIcon className={`size-5`}/>
                        Delete
                    </button>
                </div>
            </div>

            {/* Channel Info */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                {/* Main Info */}
                <div className={`lg:col-span-2 space-y-6`}>
                    <div className={`bg-gray-800 rounded-lg p-6`}>
                        <h2 className={`text-xl font-semibold mb-4`}>Channel Information</h2>
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                            <div>
                                <p className={`block text-sm font-medium text-gray-300 mb-2`}>Name</p>
                                <p className={`bg-gray-700 px-3 py-2 rounded-lg`}>{channel.name}</p>
                            </div>
                            <div>
                                <p className={`block text-sm font-medium text-gray-300 mb-2`}>Type</p>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                        channel.type === 'pos' ? 'bg-blue-900 text-blue-300' :
                                            channel.type === 'online' ? 'bg-green-900 text-green-300' :
                                                channel.type === 'phone' ? 'bg-purple-900 text-purple-300' :
                                                    'bg-orange-900 text-orange-300'
                                    }`}
                                >
                                        {getTypeLabel(channel.type)}
                                    </span>
                            </div>
                            <div className={`md:col-span-2`}>
                                <p className={`block text-sm font-medium text-gray-300 mb-2`}>Description</p>
                                <p className={`bg-gray-700 px-3 py-2 rounded-lg min-h-20`}>
                                    {channel.description || 'No description provided'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Side Info */}
                <div className={`space-y-6`}>
                    <div className={`bg-gray-800 rounded-lg p-6`}>
                        <h3 className={`text-lg font-semibold mb-4`}>Status</h3>
                        <div className={`flex items-center gap-3`}>
                            {channel.is_active ? (
                                <CheckCircleIcon className={`size-8 text-green-500`}/>
                            ) : (
                                <XCircleIcon className={`size-8 text-red-500`}/>
                            )}
                            <div>
                                <p className={`font-medium ${channel.is_active ? 'text-green-400' : 'text-red-400'}`}>
                                    {channel.is_active ? 'Active' : 'Inactive'}
                                </p>
                                <p className={`text-gray-400 text-sm`}>
                                    {channel.is_active ? 'Channel is operational' : 'Channel is disabled'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={`bg-gray-800 rounded-lg p-6`}>
                        <h3 className={`text-lg font-semibold mb-4`}>Details</h3>
                        <div className={`space-y-3`}>
                            <div>
                                <p className={`text-gray-400 text-sm`}>Created</p>
                                <p>{formatDescriptionDate(channel.created_at)}</p>
                            </div>
                            <div>
                                <p className={`text-gray-400 text-sm`}>Channel ID</p>
                                <p className={`text-xs font-mono bg-gray-700 px-2 py-1 rounded`}>{channel.id}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {deleteModal.open && (
                <DeleteModal
                    setDeleteModal={setDeleteModal}
                    deleteModal={deleteModal}
                    handleDelete={handleDelete}
                    isLoading={loadingDelete}
                    title={`Delete Sale Channel`}/>
            )}
        </div>
    );
}