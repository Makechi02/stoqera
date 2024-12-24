import {FaEllipsisVertical, FaPlus, FaTrashCan} from "react-icons/fa6";
import Link from "next/link";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Suspense} from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import {FaEye, FaPen} from "react-icons/fa";

async function getAllSuppliers(query) {
    const {accessToken} = await getServerSession(authOptions);
    const queryString = query ? `?query=${query}` : '';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/suppliers${queryString}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch suppliers');
    }

    return await response.json();
}

export const metadata = {
    title: 'Suppliers - Finviq'
}

export default async function Page(props) {
    const searchParams = await props.searchParams;
    const {query} = searchParams;
    const suppliers = await getAllSuppliers(query);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <h1 className={`page-heading`}>Suppliers</h1>

                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <SearchForm/>
                    <div className={`flex gap-4 items-center`}>
                        <Link href={`/admin/suppliers/add`} className={`add-btn flex items-center gap-2`}>
                            <FaPlus/> New supplier
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
                <Suspense fallback={<TableSkeleton rows={10}/>}>
                    <SuppliersTable suppliers={suppliers}/>
                </Suspense>
            </div>
        </main>
    );
}

function SuppliersTable({suppliers}) {
    return (
        suppliers.length === 0 ? (
            <div className={`my-16 font-bold text-xl`}>
                <p className={`text-center`}>No suppliers found</p>
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
                        {suppliers?.map((supplier, index) => (
                            <tr key={supplier.id}>
                                <td className={`table-data`}>{index + 1}</td>
                                <td className={`table-data`}>{supplier.name}</td>
                                <td className={`table-data`}>{supplier.phone}</td>
                                <td className={`table-data`}>{supplier.address}</td>
                                <td className={`table-data flex`}>
                                    <Link
                                        title={`Preview`}
                                        className={`edit-btn`}
                                        href={`/admin/suppliers/${supplier.id}`}
                                    >
                                        <FaEye/>
                                    </Link>

                                    <Link
                                        title={`Edit`}
                                        className={`edit-btn ml-3`}
                                        href={`/admin/suppliers/${supplier.id}/edit`}
                                    >
                                        <FaPen/>
                                    </Link>

                                    <Link
                                        title={`Delete supplier`}
                                        className={`delete-btn ml-3`}
                                        href={`/admin/suppliers/${supplier.id}/delete`}
                                    >
                                        <FaTrashCan/>
                                    </Link>
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

