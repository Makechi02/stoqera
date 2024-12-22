import {FaEye, FaPen} from "react-icons/fa";
import {FaEllipsisVertical, FaPlus} from "react-icons/fa6";
import Link from "next/link";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Suspense} from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import DeleteCustomer from "@/components/ui/dashboard/admin/customers/DeleteCustomer";

async function getAllCustomers(query) {
    const {accessToken} = await getServerSession(authOptions);
    const queryString = query ? `?query=${query}` : '';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/customers${queryString}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch customers');
    }

    return await response.json();
}

export const metadata = {
    title: 'Customers - Finviq'
}

export default async function Page({searchParams}) {
    const {query} = searchParams;
    const customers = await getAllCustomers(query);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <h1 className={`page-heading`}>Customers</h1>

                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <SearchForm/>
                    <div className={`flex gap-4 items-center`}>
                        <Link href={`/admin/customers/add`} className={`add-btn flex items-center gap-2`}>
                            <FaPlus/> New customer
                        </Link>

                        {/* TODO: Handle more options menu */}
                        <button
                            className={`bg-gray-200 hover:bg-gray-300 py-3 px-2 rounded-lg`}
                        >
                            <FaEllipsisVertical/>
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <Suspense fallback={<TableSkeleton rows={10} columns={5}/>}>
                    <CustomersTable customers={customers}/>
                </Suspense>
            </div>
        </main>
    )
}

const CustomersTable = ({customers}) => {
    return (
        customers.length === 0 ? (
            <div>
                <p className={`text-center`}>No customers found</p>
            </div>
        ) : (
            <>
                <div className={`overflow-x-auto`}>
                    <table className={`min-w-full divide-y divide-gray-200 hidden sm:table`}>
                        <thead className={`bg-gray-50`}>
                        <tr>
                            <th scope={`col`} className={`table-heading`}>S/No</th>
                            <th scope={`col`} className={`table-heading`}>Name</th>
                            <th scope={`col`} className={`table-heading`}>Phone</th>
                            <th scope={`col`} className={`table-heading`}>Address</th>
                            <th scope={`col`} className={`table-heading`}>Actions</th>
                        </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200`}>
                        {customers?.map((customer, index) => (
                            <tr key={customer.id}>
                                <td className={`table-data`}>{index + 1}</td>
                                <td className={`table-data`}>{customer.name}</td>
                                <td className={`table-data`}>{customer.phone}</td>
                                <td className={`table-data`}>{customer.address}</td>
                                <td className={`table-data flex`}>
                                    <Link
                                        title={`Preview`}
                                        className={`edit-btn`}
                                        href={`/admin/customers/${customer.id}`}
                                    >
                                        <FaEye/>
                                    </Link>

                                    <Link
                                        title={`Edit`}
                                        className={`edit-btn ml-3`}
                                        href={`/admin/customers/${customer.id}/edit`}
                                    >
                                        <FaPen/>
                                    </Link>

                                    <DeleteCustomer customer={customer}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    )
}
