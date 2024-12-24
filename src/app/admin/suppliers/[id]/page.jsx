import Link from "next/link";
import {FaPen} from "react-icons/fa";
import DateUtil from "@/utils/dateUtil";
import {FaEllipsisVertical, FaTrashCan} from "react-icons/fa6";
import {getSupplierById} from "@/lib/supplierActions";
import {BackBtn} from "@/components/ui/dashboard/Buttons";

export async function generateMetadata(props) {
    const params = await props.params;
    const supplier = await getSupplierById(params.id);

    return {
        title: `${supplier.name} - Finviq`
    }
}

export default async function Page(props) {
    const params = await props.params;
    const supplier = await getSupplierById(params.id);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <div className={`flex items-center gap-4`}>
                        <BackBtn/>
                        <h1 className={`page-heading`}>{supplier.name}</h1>
                    </div>

                    <div className={`flex gap-4 items-center`}>
                        <Link
                            title={`Edit supplier`}
                            className={`add-btn flex items-center gap-2`}
                            href={`/admin/suppliers/${supplier.id}/edit`}
                        >
                            <FaPen/> Edit Supplier
                        </Link>

                        <Link
                            title={`Delete supplier`}
                            className={`delete-btn flex items-center gap-2`}
                            href={`/admin/suppliers/${supplier.id}/delete`}
                        >
                            <FaTrashCan/> Delete supplier
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

            <div className={`py-8 px-8 max-w-screen-md`}>
                <div className={`space-y-4`}>
                    <div>
                        <h2 className={`font-bold font-gfs_didot text-2xl mb-2`}>Supplier details</h2>
                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Name:</span>
                            <span>{supplier.name}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Phone:</span>
                            <span>{supplier.phone}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Address:</span>
                            <span>{supplier.address}</span>
                        </p>
                    </div>

                    <div>
                        <h2 className={`font-bold font-gfs_didot text-2xl mb-2`}>Metadata</h2>
                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Added at:</span>
                            <span>{DateUtil.formatDate(supplier.addedAt)}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Added by:</span>
                            <span>{supplier.addedBy.name}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Last updated at:</span>
                            <span>{DateUtil.formatDate(supplier.updatedAt)}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Last updated by:</span>
                            <span>{supplier.updatedBy.name}</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
