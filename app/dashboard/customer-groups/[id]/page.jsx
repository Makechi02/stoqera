import CustomerGroupDetails from "@/components/dashboard/customers/groups/CustomerGroupDetails";
import {getCustomerGroupById, getCustomerGroupStats} from "@/lib/queryCustomerGroups";
import Link from "next/link";

export default async function Page({params}) {
    const {id} = await params;
    const customerGroup = await getCustomerGroupById(id);
    const customerGroupStats = await getCustomerGroupStats(id);

    if (!customerGroup) {
        return (
            <div className={`min-h-svh bg-gray-900 p-6`}>
                <div className={`text-center`}>
                    <h1 className={`text-2xl font-bold mb-4`}>Customer Group Not Found</h1>
                    <Link href={`/dashboard/customer-groups`} className={`text-teal-400 hover:text-teal-300`}>
                        Back to Customer Groups
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <CustomerGroupDetails group={customerGroup} stats={customerGroupStats}/>
        </div>
    )
}