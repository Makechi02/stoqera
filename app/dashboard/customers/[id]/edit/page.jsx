import CustomersForm from "@/components/dashboard/customers/CustomersForm";
import {BackBtn} from "@/components/ui/buttons";
import {getUsersForCurrentOrganization} from "@/lib/queryUsers";
import {getCustomerGroupsForCurrentOrganization} from "@/lib/queryCustomerGroups";
import {getCustomerById} from "@/lib/queryCustomers";

export default async function Page({params}) {
    const {id} = await params;
    const customerGroups = await getCustomerGroupsForCurrentOrganization();
    const users = await getUsersForCurrentOrganization();
    const customer = await getCustomerById(id);

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-4xl mx-auto`}>
                    <div className={`flex items-center py-6`}>
                        <BackBtn/>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Edit Customer</h1>
                            <p className={`text-gray-400 mt-1`}>Update your customer information</p>
                        </div>
                    </div>
                </div>
            </div>

            <CustomersForm customer={customer} customerGroups={customerGroups} salesReps={users}/>
        </div>
    )
}