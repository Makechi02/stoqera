import ChannelsForm from "@/components/dashboard/sales/channels/ChannelsForm";
import {BackBtn} from "@/components/ui/buttons";

export default function Page() {
    return (
        <div className={`max-w-2xl mx-auto`}>
            <div className={`flex items-center mb-8`}>
                <BackBtn/>
                <div>
                    <h1 className={`text-3xl font-bold font-heading`}>Add Sales Channel</h1>
                    <p className={`text-gray-400 mt-1`}>Create a new sales channel</p>
                </div>
            </div>

            <ChannelsForm/>
        </div>
    )
}