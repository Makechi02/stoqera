'use client'

import {Suspense, use} from 'react';
import {formatDescriptionDate} from "@/utils/formatters";
import {ArrowRightIcon, CubeIcon, DocumentTextIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function TransfersList({transfersPromise}) {
    return (
        <>
            <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden`}>
                <div className={`overflow-x-auto`}>
                    <table className={`w-full`}>
                        <thead className={`bg-gray-750`}>
                        <tr className={`border-b border-gray-700`}>
                            <th className={`dashboard-table-heading text-left`}>Transfer #</th>
                            <th className={`dashboard-table-heading text-left`}>Status</th>
                            <th className={`dashboard-table-heading text-left`}>Route</th>
                            <th className={`dashboard-table-heading text-left`}>Requested By</th>
                            <th className={`dashboard-table-heading text-left`}>Items</th>
                            <th className={`dashboard-table-heading text-left`}>Date</th>
                            <th className={`dashboard-table-heading text-right`}>Actions</th>
                        </tr>
                        </thead>
                        <tbody className={`divide-y divide-gray-700`}>
                        <Suspense fallback={<TransferListSkeleton/>}>
                            <TransferRows transfersPromise={transfersPromise}/>
                        </Suspense>
                        </tbody>
                    </table>
                </div>

                <Suspense fallback={
                    <div className={`px-6 py-4 border-t border-gray-700 flex items-center justify-between`}>
                        <p className={`text-sm text-gray-400`}>Loading...</p>
                    </div>
                }>
                    <Pagination transfersPromise={transfersPromise}/>
                </Suspense>
            </div>
        </>
    );
};

function StatusBadge({status}) {
    const statusConfig = {
        pending: {label: 'Pending', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'},
        approved: {label: 'Approved', color: 'bg-green-500/20 text-green-400 border-green-500/30'},
        in_transit: {label: 'In Transit', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30'},
        completed: {label: 'Completed', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'},
        cancelled: {label: 'Cancelled', color: 'bg-red-500/20 text-red-400 border-red-500/30'}
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
            {config.label}
        </span>
    );
}

function Pagination({transfersPromise}) {
    const {data: transfers, count, hasNextPage, hasPrevPage} = use(transfersPromise);

    return (
        <div className={`px-6 py-4 border-t border-gray-700 flex items-center justify-between`}>
            <div className={`text-sm text-gray-400`}>
                Showing {transfers.length} of {count} transfers
            </div>
            <div className={`flex gap-2`}>
                {hasPrevPage && (
                    <button
                        className={`px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors`}
                    >
                        Previous
                    </button>
                )}
                {hasNextPage && (
                    <button
                        className={`px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm transition-colors`}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

function TransferRows({transfersPromise}) {
    const transfersData = use(transfersPromise);
    const transfers = transfersData.data;

    return (
        transfers.length === 0 ? (
            <tr>
                <td colSpan={7} className={`px-6 py-12 text-center`}>
                    <CubeIcon className={`size-12 text-gray-600 mx-auto mb-4`}/>
                    <p className={`text-gray-400 text-lg`}>No transfers found</p>
                    <p className={`text-gray-500 text-sm`}>Try adjusting your filters or create a new transfer</p>
                </td>
            </tr>
        ) : transfers.map((transfer) => (
            <tr key={transfer.id} className={`hover:bg-gray-750 transition-colors`}>
                <td className={`px-6 py-4`}>
                    <div className={`text-sm font-medium`}>{transfer.transfer_number}</div>
                    {transfer.notes && (
                        <div className={`text-xs text-gray-400 mt-1 flex items-center gap-1`}>
                            <DocumentTextIcon className={`size-3`}/>
                            {transfer.notes.substring(0, 30)}...
                        </div>
                    )}
                </td>
                <td className={`px-6 py-4`}><StatusBadge status={transfer.status}/></td>
                <td className={`px-6 py-4`}>
                    <div className={`flex items-center gap-2 text-sm`}>
                        <div>{transfer.from_location.name}</div>
                        <ArrowRightIcon className={`size-4 text-gray-400`}/>
                        <div>{transfer.to_location.name}</div>
                    </div>
                </td>
                <td className={`px-6 py-4`}>
                    <div className={`text-sm`}>{transfer.requester.full_name}</div>
                    <div className={`text-xs text-gray-400`}>{transfer.requester.email}</div>
                </td>
                <td className={`px-6 py-4`}>
                    <div className={`text-sm font-medium`}>{transfer.totalItems} items</div>
                    <div className={`text-xs text-gray-400`}>
                        Qty: {transfer.totalQuantityRequested}
                        {transfer.totalQuantityShipped > 0 && ` → ${transfer.totalQuantityShipped}`}
                        {transfer.totalQuantityReceived > 0 && ` → ${transfer.totalQuantityReceived}`}
                    </div>
                </td>
                <td className={`px-6 py-4`}>
                    <div className={`text-sm`}>{formatDescriptionDate(transfer.requested_at)}</div>
                    {transfer.status === 'in_transit' && transfer.shipped_at && (
                        <div className={`text-xs text-teal-400`}>
                            Shipped: {formatDescriptionDate(transfer.shipped_at)}
                        </div>
                    )}
                    {transfer.status === 'completed' && transfer.received_at && (
                        <div
                            className={`text-xs text-green-400`}>
                            Received: {formatDescriptionDate(transfer.received_at)}
                        </div>
                    )}
                </td>
                <td className={`px-6 py-4`}>
                    <Link
                        href={`/dashboard/stock/transfers/${transfer.id}`}
                        className={`inline-flex text-teal-400 hover:text-teal-300 text-sm font-medium`}
                    >
                        View Details
                    </Link>
                </td>
            </tr>
        ))
    )
}

function TransferListSkeleton() {
    return (
        <>
            {Array(5).fill(0).map((_, i) => <TableRowSkeleton key={i}/>)}
        </>
    )
}

const TableRowSkeleton = () => (
    <tr className={`animate-pulse`}>
        <td className={`px-6 py-4`}>
            <div className={`w-24 h-4 bg-gray-700 rounded`}/>
        </td>
        <td className={`px-6 py-4`}>
            <div className={`w-16 h-6 bg-gray-700 rounded-full`}/>
        </td>
        <td className={`px-6 py-4`}>
            <div className={`w-32 h-4 bg-gray-700 rounded`}/>
        </td>
        <td className={`px-6 py-4`}>
            <div className={`w-28 h-4 bg-gray-700 rounded`}/>
        </td>
        <td className={`px-6 py-4`}>
            <div className={`w-20 h-4 bg-gray-700 rounded`}/>
        </td>
        <td className={`px-6 py-4`}>
            <div className={`w-24 h-4 bg-gray-700 rounded`}/>
        </td>
        <td className={`px-6 py-4`}>
            <div className={`size-8 bg-gray-700 rounded`}/>
        </td>
    </tr>
);
