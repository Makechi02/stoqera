import Link from "next/link";
import {FaPen} from "react-icons/fa";
import DateUtil from "@/utils/dateUtil";
import {FaEllipsisVertical} from "react-icons/fa6";
import {BackBtn} from "@/components/ui/dashboard/Buttons";
import {getCustomerById} from "@/lib/customerActions";
import DeleteCustomer from "@/components/ui/dashboard/admin/customers/DeleteCustomer";

export async function generateMetadata({params}) {
    const customer = await getCustomerById(params.id);

    return {
        title: `${customer.name} - Finviq`
    }
}

export default async function Page({params}) {
    const customer = await getCustomerById(params.id);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <div className={`flex items-center gap-4`}>
                        <BackBtn/>
                        <h1 className={`page-heading`}>{customer.name}</h1>
                    </div>

                    <div className={`flex gap-4 items-center`}>
                        <Link
                            title={`Edit customer`}
                            className={`add-btn flex items-center gap-2`}
                            href={`/dashboard/admin/customers/${customer.id}/edit`}
                        >
                            <FaPen/> Edit customer
                        </Link>

                        <DeleteCustomer customer={customer} text={`Delete customer`}/>

                        {/* TODO: Handle more options menu */}
                        <button
                            className={`bg-gray-200 hover:bg-gray-300 py-3 px-2 rounded-lg`}
                        >
                            <FaEllipsisVertical/>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`py-8 px-8 max-w-screen-md`}>
                <div className={`space-y-4`}>
                    <div>
                        <h2 className={`font-bold font-gfs_didot text-2xl mb-2`}>Customer details</h2>
                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Name:</span>
                            <span>{customer.name}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Contact Person:</span>
                            <span>{customer.contactPerson}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Email:</span>
                            <span>{customer.email}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Phone:</span>
                            <span>{customer.phone}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Address:</span>
                            <span>{customer.address}</span>
                        </p>
                    </div>

                    <div>
                        <h2 className={`font-bold font-gfs_didot text-2xl mb-2`}>Metadata</h2>
                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Added at:</span>
                            <span>{DateUtil.formatDate(customer.addedAt)}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Added by:</span>
                            <span>{customer.addedBy.name}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Last updated at:</span>
                            <span>{DateUtil.formatDate(customer.updatedAt)}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Last updated by:</span>
                            <span>{customer.updatedBy.name}</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
