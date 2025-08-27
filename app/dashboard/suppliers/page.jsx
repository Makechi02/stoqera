import Link from 'next/link';
import {HiOutlinePlus} from "react-icons/hi2";
import SuppliersSearchBar from "@/components/dashboard/supplier/SuppliersSearchBar";
import SuppliersGrid from "@/components/dashboard/supplier/SuppliersGrid";
import {getSuppliersForCurrentOrganization} from "@/lib/querySuppliers";

export default async function Page(props) {
    const {search, status} = await props.searchParams;
    const suppliers = await getSuppliersForCurrentOrganization({ searchTerm: search, status: status});

    return (
        <div>
            <div className={`max-w-7xl mx-auto p-4 border-b border-gray-700`}>
                <div className={`flex flex-wrap gap-4 items-center justify-between`}>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>Suppliers</h1>
                        <p className={`mt-2 text-gray-400`}>Manage your supplier relationships</p>
                    </div>
                    <div className={`flex-1 flex justify-end`}>
                        <Link
                            href={`/dashboard/suppliers/new`}
                            className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors`}
                        >
                            <HiOutlinePlus className={`size-5`}/>
                            Add Supplier
                        </Link>
                    </div>
                </div>
            </div>

            <div className={`max-w-7xl mx-auto p-4 py-6`}>
                <SuppliersSearchBar/>
                <SuppliersGrid suppliers={suppliers}/>
            </div>
        </div>
    );
}