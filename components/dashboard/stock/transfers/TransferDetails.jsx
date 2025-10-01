'use client'

import {ArrowRightIcon, CalendarIcon, UserIcon} from '@heroicons/react/24/outline';
import {formatCurrency, formatDescriptionDate} from "@/utils/formatters";

export default function TransferDetails({transfer}) {
    const transferItems = transfer.stock_transfer_items;

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
            {/* Main Content */}
            <div className={`lg:col-span-2 space-y-6`}>
                <TransferItems transferItems={transferItems}/>
                <TransferTimeline transfer={transfer}/>

                {transfer.notes && (
                    <div className={`bg-gray-800 rounded-lg p-4 sm:p-6`}>
                        <h2 className={`text-xl font-semibold mb-4`}>Notes</h2>
                        <p className={`text-gray-300`}>{transfer.notes}</p>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className={`space-y-6`}>
                <TransferInformation transfer={transfer}/>
                <QuickStats transferItems={transferItems}/>
            </div>
        </div>
    );
}

function TransferItems({transferItems}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-4 sm:p-6`}>
            <h2 className={`text-xl font-semibold mb-4`}>Transfer Items</h2>
            <div className={`overflow-x-auto`}>
                <table className={`w-full text-sm`}>
                    <thead>
                    <tr className={`border-b border-gray-700`}>
                        <th className={`text-left py-3 text-gray-300`}>Product</th>
                        <th className={`text-center py-3 text-gray-300`}>Requested</th>
                        <th className={`text-center py-3 text-gray-300`}>Shipped</th>
                        <th className={`text-center py-3 text-gray-300`}>Received</th>
                        <th className={`text-right py-3 text-gray-300`}>Unit Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transferItems.map((item) => (
                        <tr key={item.id} className={`border-b border-gray-700/50`}>
                            <td className={`py-4`}>
                                <div>
                                    <div className={`font-medium`}>{item.product?.name}</div>
                                    <div className={`text-gray-400 text-xs`}>
                                        SKU: {item.product?.sku}
                                        {item.variant && ` • ${item.variant.name}`}
                                    </div>
                                </div>
                            </td>
                            <td className={`text-center py-4`}>{item.quantity_requested}</td>
                            <td className={`text-center py-4`}>
                                <span className={`${item.quantity_shipped > 0 ? 'text-blue-400' : 'text-gray-500'}`}>
                                    {item.quantity_shipped}
                                </span>
                            </td>
                            <td className={`text-center py-4`}>
                                <span className={`${item.quantity_received > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                                    {item.quantity_received}
                                </span>
                            </td>
                            <td className={`text-right py-4`}>
                                {item.unit_cost ? formatCurrency(item.unit_cost) : '-'}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function TransferTimeline({transfer}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-4 sm:p-6`}>
            <h2 className={`text-xl font-semibold mb-4`}>Transfer Timeline</h2>
            <div className={`space-y-4`}>
                {/* Requested */}
                <div className={`flex items-start`}>
                    <div className={`flex-shrink-0`}>
                        <div className={`size-3 bg-teal-400 rounded-full mt-1`}/>
                    </div>
                    <div className={`ml-4`}>
                        <div className={`font-medium`}>Transfer Requested</div>
                        <div className={`text-gray-400 text-sm`}>
                            by {transfer.requester?.full_name || 'Unknown'} • {formatDescriptionDate(transfer.requested_at)}
                        </div>
                    </div>
                </div>

                {/* Approved */}
                {transfer.approved_at && (
                    <div className={`flex items-start`}>
                        <div className={`flex-shrink-0`}>
                            <div className={`size-3 bg-teal-400 rounded-full mt-1`}/>
                        </div>
                        <div className={`ml-4`}>
                            <div className={`font-medium`}>Transfer Approved</div>
                            <div className={`text-gray-400 text-sm`}>
                                by {transfer.approver?.full_name || 'Unknown'} • {formatDescriptionDate(transfer.approved_at)}
                            </div>
                        </div>
                    </div>
                )}

                {/* Shipped */}
                {transfer.shipped_at && (
                    <div className={`flex items-start`}>
                        <div className={`flex-shrink-0`}>
                            <div className={`size-3 bg-teal-400 rounded-full mt-1`}/>
                        </div>
                        <div className={`ml-4`}>
                            <div className={`font-medium`}>Transfer Shipped</div>
                            <div className={`text-gray-400 text-sm`}>
                                by {transfer.shipper?.full_name || 'Unknown'} • {formatDescriptionDate(transfer.shipped_at)}
                            </div>
                        </div>
                    </div>
                )}

                {/* Received */}
                {transfer.received_at && (
                    <div className={`flex items-start`}>
                        <div className={`flex-shrink-0`}>
                            <div className={`size-3 bg-green-400 rounded-full mt-1`}/>
                        </div>
                        <div className={`ml-4`}>
                            <div className={`font-medium`}>Transfer Completed</div>
                            <div className={`text-gray-400 text-sm`}>
                                by {transfer.receiver?.full_name || 'Unknown'} • {formatDescriptionDate(transfer.received_at)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

function TransferInformation({transfer}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-4 sm:p-6`}>
            <h3 className={`text-lg font-semibold text-white mb-4`}>Transfer Information</h3>
            <div className={`space-y-4`}>
                <div className={`flex items-center`}>
                    <ArrowRightIcon className={`size-5 text-gray-400 mr-3`}/>
                    <div>
                        <p className={`text-sm text-gray-400`}>From</p>
                        <p className={`font-medium`}>{transfer.from_location?.name}</p>
                    </div>
                </div>

                <div className={`flex items-center`}>
                    <ArrowRightIcon className={`size-5 text-gray-400 mr-3`}/>
                    <div>
                        <p className={`text-sm text-gray-400`}>To</p>
                        <p className={`font-medium`}>{transfer.to_location?.name}</p>
                    </div>
                </div>

                <div className={`flex items-center`}>
                    <UserIcon className={`size-5 text-gray-400 mr-3`}/>
                    <div>
                        <p className={`text-sm text-gray-400`}>Requested by</p>
                        <p className={`font-medium`}>{transfer.requester?.full_name || 'Unknown'}</p>
                    </div>
                </div>

                <div className={`flex items-center`}>
                    <CalendarIcon className={`size-5 text-gray-400 mr-3`}/>
                    <div>
                        <p className={`text-sm text-gray-400`}>Created</p>
                        <p className={`font-medium`}>{formatDescriptionDate(transfer.created_at)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function QuickStats({transferItems}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-4 sm:p-6`}>
            <h3 className={`text-lg font-semibold mb-4`}>Summary</h3>
            <div className={`space-y-3`}>
                <div className={`flex justify-between`}>
                    <span className={`text-gray-400`}>Total Items</span>
                    <span className={`font-medium`}>{transferItems.length}</span>
                </div>
                <div className={`flex justify-between`}>
                    <span className={`text-gray-400`}>Total Requested</span>
                    <span className={`font-medium`}>
                        {transferItems.reduce((sum, item) => sum + item.quantity_requested, 0)}
                  </span>
                </div>
                <div className={`flex justify-between`}>
                    <span className={`text-gray-400`}>Total Shipped</span>
                    <span className={`font-medium`}>
                        {transferItems.reduce((sum, item) => sum + item.quantity_shipped, 0)}
                  </span>
                </div>
                <div className={`flex justify-between`}>
                    <span className={`text-gray-400`}>Total Received</span>
                    <span className={`font-medium`}>
                        {transferItems.reduce((sum, item) => sum + item.quantity_received, 0)}
                  </span>
                </div>
            </div>
        </div>
    )
}