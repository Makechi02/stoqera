import {BackBtn} from "@/components/ui/buttons";
import CustomerGroupForm from "@/components/dashboard/customers/groups/CustomerGroupForm";
import {getCustomerGroupById} from "@/lib/queryCustomerGroups";

export default async function Page({params}) {
    const {id} = await params;
    const customerGroup = await getCustomerGroupById(id);

    return (
        <div>
            <div className={`mb-8 max-w-2xl mx-auto`}>
                <div className={`flex items-center mb-4`}>
                    <BackBtn/>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>Edit Customer Group</h1>
                        <p className={`text-gray-400 mt-1`}>Update customer group details</p>
                    </div>
                </div>
            </div>

            <CustomerGroupForm customerGroup={customerGroup}/>
        </div>
    )
}