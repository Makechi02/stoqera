import TransferDetails from "@/components/dashboard/stock/transfers/TransferDetails";
import {fetchTransferWithDetails} from "@/lib/stock/queryStockTransfers";
import {notFound} from "next/navigation";
import {getCurrentLoggedInUser} from "@/lib/users/queryUsers";
import {CheckCircleIcon, ClockIcon, PencilIcon, TruckIcon, XCircleIcon} from "@heroicons/react/24/outline";
import {BackBtn} from "@/components/ui/buttons";
import Link from "next/link";

export default async function Page({params}) {
    const {id} = await params;
    const transferData = await fetchTransferWithDetails(id);
    const transfer = transferData.data;
    const currentUser = await getCurrentLoggedInUser();

    if (!transfer) notFound();

    const getStatusIcon = (status) => {
        const iconProps = "size-5";
        switch (status) {
            case 'pending':
                return <ClockIcon className={`${iconProps} text-yellow-400`}/>;
            case 'in_transit':
                return <TruckIcon className={`${iconProps} text-blue-400`}/>;
            case 'completed':
                return <CheckCircleIcon className={`${iconProps} text-green-400`}/>;
            case 'cancelled':
                return <XCircleIcon className={`${iconProps} text-red-400`}/>;
            default:
                return <ClockIcon className={`${iconProps} text-gray-400`}/>;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-900/20 text-yellow-400 border-yellow-400/20';
            case 'in_transit':
                return 'bg-blue-900/20 text-blue-400 border-blue-400/20';
            case 'completed':
                return 'bg-green-900/20 text-green-400 border-green-400/20';
            case 'cancelled':
                return 'bg-red-900/20 text-red-400 border-red-400/20';
            default:
                return 'bg-gray-900/20 text-gray-400 border-gray-400/20';
        }
    };

    const canUserProcess = (status) => {
        if (!currentUser || !transfer) return false;

        //TODO:  Add permission logic here based on user roles
        // For now, allowing any authenticated user to process
        return status === 'pending' || status === 'in_transit';
    };

    return (
        <div className={`max-w-6xl mx-auto py-8`}>
            <div className={`mb-8`}>
                <div className={`flex flex-wrap items-center justify-between gap-4`}>
                    <div className={`flex items-center`}>
                        <BackBtn/>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Transfer #{transfer.transfer_number}</h1>
                            <div className={`flex items-center mt-2`}>
                                {getStatusIcon(transfer.status)}
                                <span
                                    className={`ml-2 px-3 py-1 text-sm font-medium border rounded-full ${getStatusColor(transfer.status)}`}
                                >
                                {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                            </span>
                            </div>
                        </div>
                    </div>

                    {canUserProcess(transfer.status) && (
                        <div className={`flex-1 flex items-center justify-end`}>
                            <Link
                                href={`/dashboard/stock/transfers/${transfer.id}/process`}
                                className={`bg-teal-600 hover:bg-teal-700 text-text px-6 py-2 rounded-lg font-medium flex items-center`}
                            >
                                <PencilIcon className={`size-5 mr-2`}/>
                                Process Transfer
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <TransferDetails transfer={transfer}/>
        </div>
    )
}