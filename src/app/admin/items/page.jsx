import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import Link from "next/link";
import {FaEllipsisVertical, FaPlus} from "react-icons/fa6";
import {Suspense} from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ItemsTable from "@/app/admin/items/ItemsTable";
import {getAllItems} from "@/lib/itemActions";

export const metadata = {
    title: 'Items - Finviq'
}

export default async function Page({searchParams}) {
    const {query, page} = searchParams;
    const currentPage = Number(page) || 1;

    const data = await getAllItems(query, currentPage);
    const totalPages = data.page.totalPages;

    return (
        <main>
            <div className={`p-8 border-b`}>
                <h1 className={`page-heading`}>Items</h1>

                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <SearchForm/>
                    <div className={`flex gap-4 items-center`}>
                        <Link href={`/admin/items/add`} className={`add-btn flex items-center gap-2`}>
                            <FaPlus/> New item
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
                <Suspense fallback={<TableSkeleton/>}>
                    <ItemsTable items={data.content} totalPages={totalPages}/>
                </Suspense>
            </div>
        </main>
    );
};
