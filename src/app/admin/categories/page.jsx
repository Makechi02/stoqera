import {FaPen} from "react-icons/fa";
import {FaEllipsisVertical, FaPlus} from "react-icons/fa6";
import Link from "next/link";
import SearchForm from "@/components/ui/dashboard/admin/SearchForm";
import DateUtil from "@/utils/dateUtil";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Suspense} from "react";
import TableSkeleton from "@/components/ui/TableSkeleton";
import DeleteCategory from "@/components/ui/dashboard/admin/categories/DeleteCategory";

async function getAllCategories(query) {
    const {accessToken} = await getServerSession(authOptions);
    const queryString = query ? `?query=${query}` : '';

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories${queryString}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch categories');
    }

    return await response.json();
}

export const metadata = {
    title: 'Categories - Finviq'
}

export default async function Page({searchParams}) {
    const {query} = searchParams;
    const categories = await getAllCategories(query);

    const columns = [
        {key: 'name', header: 'Name'}
    ];

    return (
        <main>
            <div className={`p-8 border-b`}>
                <h1 className={`page-heading`}>Categories</h1>

                <div className={`mt-4 flex flex-wrap gap-4 justify-between items-center`}>
                    <SearchForm/>
                    <div className={`flex gap-4 items-center`}>
                        <Link href={`/admin/categories/add`} className={`add-btn flex items-center gap-2`}>
                            <FaPlus/> New category
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
                    <CategoriesTable categories={categories}/>
                </Suspense>
            </div>

        </main>
    )
}

const CategoriesTable = ({categories}) => {
    return (
        categories.length === 0 ? (
            <div>
                <p className={`text-center`}>No categories found</p>
            </div>
        ) : (
            <>
                <div className={`overflow-x-auto`}>
                    <table className={`min-w-full divide-y divide-gray-200 hidden sm:table`}>
                        <thead className={`bg-gray-50`}>
                        <tr>
                            <th scope={`col`} className={`table-heading`}>S/No</th>
                            <th scope={`col`} className={`table-heading`}>Name</th>
                            <th scope={`col`} className={`table-heading`}>Created By</th>
                            <th scope={`col`} className={`table-heading`}>Created At</th>
                            <th scope={`col`} className={`table-heading`}>Updated By</th>
                            <th scope={`col`} className={`table-heading`}>Updated At</th>
                            <th scope={`col`} className={`table-heading`}>Actions</th>
                        </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200`}>
                        {categories?.map((category, index) => (
                            <tr key={category.id}>
                                <td className={`table-data`}>{index + 1}</td>
                                <td className={`table-data`}>{category.name}</td>
                                <td className={`table-data`}>{category?.createdBy?.name}</td>
                                <td className={`table-data`}>{DateUtil.formatDate(category.createdAt)}</td>
                                <td className={`table-data`}>{category?.updatedBy?.name}</td>
                                <td className={`table-data`}>{DateUtil.formatDate(category.updatedAt)}</td>
                                <td className={`table-data flex`}>
                                    <Link
                                        title={`Edit`}
                                        className={`edit-btn`}
                                        href={`/admin/categories/${category.id}/edit`}
                                    >
                                        <FaPen/>
                                    </Link>

                                    <DeleteCategory category={category}/>
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
