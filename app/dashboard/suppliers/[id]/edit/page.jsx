import {HiOutlineArrowLeft} from "react-icons/hi2";
import SupplierForm from "@/components/dashboard/supplier/SupplierForm";
import Link from "next/link";
import {getSupplierById} from "@/lib/querySuppliers";

export default async function Page({params}) {
    const {id} = await params;
    const supplier = await getSupplierById(id);

    return (
        <div>
            {/* Header */}
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto px-4 py-6`}>
                    <div className={`flex items-center gap-4`}>
                        <Link
                            href={`/dashboard/suppliers`}
                            title={`Back to suppliers`}
                            className={`bg-gray-700/50 hover:bg-gray-600 p-2 rounded-full transition-colors cursor-pointer`}
                        >
                            <HiOutlineArrowLeft className={`size-5`}/>
                        </Link>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Update Supplier</h1>
                            <p className={`mt-2 text-gray-400`}>Update supplier information</p>
                        </div>
                    </div>
                </div>
            </div>

            <SupplierForm supplier={supplier}/>
        </div>
    );
}