import CategoriesForm from "@/components/dashboard/categories/CategoriesForm";
import Link from "next/link";
import {HiOutlineArrowLeft} from "react-icons/hi2";
import {getCategoriesForCurrentOrganization} from "@/lib/queryCategories";

export default async function Page() {
    const categories = await getCategoriesForCurrentOrganization();

    return (
        <div className={`min-h-screen bg-gray-900 text-gray-100`}>
            <div className={`max-w-2xl mx-auto px-4 sm:px-6 py-8`}>
                <div className={`mb-8`}>
                    <Link
                        href={`/dashboard/categories`}
                        className={`inline-flex items-center text-gray-400 hover:text-primary transition-colors duration-200 mb-4`}
                    >
                        <HiOutlineArrowLeft className={`size-5 mr-2`}/>
                        Back to Categories
                    </Link>

                    <h1 className={`text-3xl font-bold text-white font-heading`}>Add New Category</h1>
                    <p className={`text-gray-400 mt-2`}>Create a new category for your inventory</p>
                </div>

                <CategoriesForm categories={categories}/>
            </div>
        </div>
    )
}