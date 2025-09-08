import ChannelsForm from "@/components/dashboard/sales/channels/ChannelsForm";
import {BackBtn} from "@/components/ui/buttons";
import {getSaleChannelById} from "@/lib/sales/querySales";
import {notFound} from "next/navigation";

export default async function Page({params}) {
    const {id} = await params;
    const channel = await getSaleChannelById(id);

    if(!channel) notFound();

    return (
        <div className={`max-w-2xl mx-auto`}>
            <div className={`flex items-center mb-8`}>
                <BackBtn/>
                <div>
                    <h1 className={`text-3xl font-bold font-heading`}>Edit Sales Channel</h1>
                    <p className={`text-gray-400 mt-1`}>Update channel information</p>
                </div>
            </div>

            <ChannelsForm channel={channel}/>
        </div>
    )
}