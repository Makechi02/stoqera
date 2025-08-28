import CustomersForm from "@/components/dashboard/customers/CustomersForm";
import {BackBtn} from "@/components/ui/buttons";
import {getUsersForCurrentOrganization} from "@/lib/queryUsers";
import {getCustomerGroupsForCurrentOrganization} from "@/lib/queryCustomerGroups";

export default async function Page() {
    const customerGroups = await getCustomerGroupsForCurrentOrganization();
    const users = await getUsersForCurrentOrganization();

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-4xl mx-auto`}>
                    <div className={`flex items-center py-6`}>
                        <BackBtn/>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Add New Customer</h1>
                            <p className={`text-gray-400 mt-1`}>Create a new customer profile for your system</p>
                        </div>
                    </div>
                </div>
            </div>

            <CustomersForm customerGroups={customerGroups} salesReps={users}/>
        </div>
    )
}