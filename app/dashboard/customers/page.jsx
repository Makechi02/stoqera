import {getCustomersForCurrentOrganization} from "@/lib/queryCustomers";
import {getCustomerGroupsForCurrentOrganization} from "@/lib/queryCustomerGroups";
import CustomersGrid from "@/components/dashboard/customers/CustomersGrid";
import {UserPlusIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page(props) {
    const {search, status, group, page, per_page} = await props.searchParams;
    const data = await getCustomersForCurrentOrganization(search, group, status, page, per_page);
    const customerGroups = await getCustomerGroupsForCurrentOrganization();

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto`}>
                    <div className={`flex flex-wrap gap-4 justify-between items-center py-6`}>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Customers</h1>
                            <p className={`text-gray-400 mt-1`}>Manage your customer relationships and data</p>
                        </div>
                        <div className={`flex-1 flex justify-end`}>
                            <Link
                                href={`/dashboard/customers/create`}
                                className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors`}
                            >
                                <UserPlusIcon className={`size-5`}/>
                                Add Customer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <CustomersGrid customerGroups={customerGroups} customers={data.customers} totalCount={data.totalCount}/>
        </div>
    )
}