import CustomerGroupsGrid from "@/components/dashboard/customers/groups/CustomerGroupsGrid";
import {PlusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import CustomerGroupSearchBar from "@/components/dashboard/customers/groups/CustomerGroupSearchBar";
import {getCustomerGroupsForCurrentOrganization} from "@/lib/queryCustomerGroups";

export default async function Page(props) {
    const {search} = await props.searchParams;
    const customerGroups = await getCustomerGroupsForCurrentOrganization(search);

    return (
        <div>
            <div className={`mb-8`}>
                <div className={`flex flex-wrap gap-4 items-center justify-between`}>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading mb-2`}>Customer Groups</h1>
                        <p className={`text-gray-400`}>Manage customer segments and pricing tiers</p>
                    </div>
                    <div className={`flex-1 flex justify-end`}>
                        <Link
                            href={`/dashboard/customer-groups/create`}
                            className={`inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors`}
                        >
                            <PlusIcon className={`size-5 mr-2`}/>
                            Add Group
                        </Link>
                    </div>
                </div>
            </div>

            <CustomerGroupSearchBar/>
            <CustomerGroupsGrid customerGroups={customerGroups}/>
        </div>
    )
}