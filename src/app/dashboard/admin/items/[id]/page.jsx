import Link from "next/link";
import {FaPen} from "react-icons/fa";
import DateUtil from "@/utils/dateUtil";
import {FaEllipsisVertical, FaTrashCan} from "react-icons/fa6";
import {BackBtn} from "@/components/ui/dashboard/Buttons";
import {getItemById} from "@/lib/itemActions";

export async function generateMetadata({params}) {
    const item = await getItemById(params.id);

    return {
        title: `${item.name} - Finviq`
    }
}

export default async function Page({params}) {
    const item = await getItemById(params.id);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <div className={`flex items-center gap-4`}>
                        <BackBtn/>
                        <h1 className={`page-heading`}>{item.name}</h1>
                    </div>

                    <div className={`flex gap-4 items-center`}>
                        <Link
                            title={`Edit item`}
                            className={`add-btn flex items-center gap-2`}
                            href={`/dashboard/admin/items/${item.id}/edit`}
                        >
                            <FaPen/> Edit item
                        </Link>

                        <Link
                            title={`Delete item`}
                            className={`delete-btn flex items-center gap-2`}
                            href={`/dashboard/admin/items/${item.id}/delete`}
                        >
                            <FaTrashCan/> Delete item
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
                        <h2 className={`font-bold font-gfs_didot text-2xl mb-2`}>Item details</h2>
                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Name:</span>
                            <span>{item.name}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Brand:</span>
                            <span>{item.brand}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Model:</span>
                            <span>{item.model}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Category:</span>
                            <span>{item.category?.name ? item.category.name : 'unknown'}</span>
                        </p>
                    </div>

                    <div>
                        <h2 className={`font-bold font-gfs_didot text-2xl mb-2`}>Item pricing</h2>
                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Cost price:</span>
                            <span>{item.costPrice}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Retail Price:</span>
                            <span>{item.retailPrice}</span>
                        </p>
                    </div>

                    <div>
                        <h2 className={`font-bold font-gfs_didot text-2xl mb-2`}>Stock</h2>
                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Quantity:</span>
                            <span>{item.quantity}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Stock alert:</span>
                            <span>{item.stockAlert}</span>
                        </p>
                    </div>

                    <div>
                        <h2 className={`font-bold font-gfs_didot text-2xl mb-2`}>Metadata</h2>
                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Created at:</span>
                            <span>{DateUtil.formatDate(item.createdAt)}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Created by:</span>
                            <span>{item.createdBy.name}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Last updated at:</span>
                            <span>{DateUtil.formatDate(item.updatedAt)}</span>
                        </p>

                        <p className={`space-x-2`}>
                            <span className={`font-bold`}>Last updated by:</span>
                            <span>{item.updatedBy.name}</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}
