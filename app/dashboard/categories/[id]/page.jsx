import Link from 'next/link';
import {
    HiOutlineArrowLeft,
    HiOutlineCheckCircle,
    HiOutlineChevronRight,
    HiOutlinePencilSquare,
    HiOutlineXCircle
} from "react-icons/hi2";
import CategoryDetails from "@/components/dashboard/categories/CategoryDetails";
import {getCategoryById, getProductsCountByCategory, getSubCategories} from "@/lib/queryCategories";
import DeleteCategoryBtn from "@/components/dashboard/categories/DeleteCategoryBtn";
import {notFound} from "next/navigation";

export default async function Page({params}) {
    const {id} = await params;

    const category = await getCategoryById(id);

    if (!category) notFound();

    const parentCategory = category.parent_id ? await getCategoryById(category.parent_id) : null;
    const subcategories = await getSubCategories(category.id);
    const productsByCategory = await getProductsCountByCategory(category.id);
    const productsCount = productsByCategory.length;

    return (
        <div className={`min-h-screen`}>
            <div className={`max-w-4xl mx-auto sm:px-6 py-6`}>
                {/* Header */}
                <div className={`mb-8`}>
                    <div className={`flex items-center space-x-2 text-sm text-gray-400 mb-4`}>
                        <Link
                            href={`/dashboard/categories`}
                            className={`hover:text-primary`}
                        >
                            Categories
                        </Link>
                        {parentCategory && (
                            <>
                                <HiOutlineChevronRight className={`size-4`}/>
                                <Link
                                    href={`/dashboard/categories/${parentCategory.id}`}
                                    className={`hover:text-primary`}
                                >
                                    {parentCategory.name}
                                </Link>
                            </>
                        )}
                        <HiOutlineChevronRight className={`size-4`}/>
                        <span className={`text-white`}>{category.name}</span>
                    </div>

                    <div className={`flex flex-wrap gap-4 justify-between items-start mb-6`}>
                        <div>
                            <h1 className={`text-3xl font-bold text-white mb-2 font-heading`}>{category.name}</h1>
                            <div className={`flex items-center space-x-4`}>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                        category.is_active
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-error/20 text-red-400 border border-error/30'
                                    }`}
                                >
                                    {category.is_active ? (
                                        <HiOutlineCheckCircle className={`size-4 mr-1`}/>
                                    ) : (
                                        <HiOutlineXCircle className={`size-4 mr-1`}/>
                                    )}
                                    {category.is_active ? 'Active' : 'Inactive'}
                                </span>
                                <span className={`text-gray-400 text-sm font-mono`}>ID: {category.id}</span>
                            </div>
                        </div>

                        <div className={`flex space-x-2`}>
                            <Link
                                href={`/dashboard/categories/${category.id}/edit`}
                                className={`inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200`}
                            >
                                <HiOutlinePencilSquare className={`size-5 mr-2`}/>
                                Edit
                            </Link>
                            <DeleteCategoryBtn category={category}/>
                        </div>
                    </div>

                    <Link
                        href={`/dashboard/categories`}
                        className={`inline-flex items-center text-gray-400 hover:text-primary transition-colors duration-200`}
                    >
                        <HiOutlineArrowLeft className={`size-5 mr-2`}/>
                        Back to Categories
                    </Link>
                </div>

                <CategoryDetails
                    category={category}
                    parentCategory={parentCategory}
                    subCategories={subcategories}
                    productsCount={productsCount}
                />
            </div>
        </div>
    );
}