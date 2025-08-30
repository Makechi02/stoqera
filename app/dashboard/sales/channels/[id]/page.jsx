import ChannelDetails from "@/components/dashboard/sales/channels/ChannelDetails";
import {getSaleChannelById} from "@/lib/querySales";
import {notFound} from "next/navigation";

export default async function Page({params}) {
    const {id} = await params;

    const saleChannel = await getSaleChannelById(id);

    if (!saleChannel) notFound();

    return (
        <div className={`max-w-4xl mx-auto`}>
            <ChannelDetails channel={saleChannel}/>
        </div>
    )
}