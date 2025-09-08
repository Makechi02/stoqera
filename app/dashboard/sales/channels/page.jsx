import ChannelsGrid from "@/components/dashboard/sales/channels/ChannelsGrid";
import {getSalesChannelsForCurrentOrganization} from "@/lib/sales/querySales";
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/24/outline";
import ChannelsSearchBar from "@/components/dashboard/sales/channels/ChannelsSearchBar";

export default async function Page(props) {
    const searchParams = await props.searchParams;
    const {search, type, status} = searchParams;
    const salesChannels = await getSalesChannelsForCurrentOrganization({
        searchTerm: search, typeFilter: type, statusFilter: status
    });

    return (
        <div className={`max-w-7xl mx-auto`}>
            <div className={`flex flex-wrap gap-4 justify-between items-center mb-8`}>
                <div>
                    <h1 className={`text-3xl font-bold font-heading`}>Sales Channels</h1>
                    <p className={`text-gray-400 mt-2`}>Manage your sales channels and track performance</p>
                </div>
                <div className={`flex-1 flex justify-end`}>
                    <Link
                        href={`/dashboard/sales/channels/create`}
                        className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                    >
                        <PlusIcon className={`size-5`}/>
                        Add Channel
                    </Link>
                </div>
            </div>

            <ChannelsSearchBar/>
            <ChannelsGrid channels={salesChannels}/>
        </div>
    )
}