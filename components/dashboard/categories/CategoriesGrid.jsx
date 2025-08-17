'use client'

import Link from "next/link";
import {HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash} from "react-icons/hi2";
import {AddBtn} from "@/components/ui/buttons";
import {formatDate} from "@/utils/formatters";
import {deleteCategory} from "@/lib/queryCategories";
import {toast} from "react-toastify";

export default function CategoriesGrid({categories}) {
    const getParentName = (parentId) => {
        const parent = categories.find(cat => cat.id === parentId);
        return parent ? parent.name : null;
    };

    if (!categories || categories.length === 0) {
        return (
            <div className={`text-center py-12`}>
                <div className={`text-gray-400 text-lg mb-4`}>No categories found</div>
                <AddBtn text={`Create your first category`} href={`/dashboard/categories/new`}/>
            </div>
        )
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} getParentName={getParentName}/>
            ))}
        </div>
    )
}

function CategoryCard({category, getParentName}) {
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(id);

            toast.success({
                title: 'Category deleted successfully.',
                description: 'The category has been deleted successfully.',
                status: 'success',
                duration: 5000,
                theme: 'dark',
            });

            window.location.reload();
        }
    };

    return (
        <div
            className={`bg-gray-800 rounded-lg border-2 border-gray-700 overflow-hidden hover:shadow-lg hover:border-primary transition-all duration-200`}
        >
            {/* Category Image */}
            <div className={`h-48 bg-gray-700 relative`}>
                {category.image_url ? (
                    <img
                        src={category.image_url}
                        alt={category.name}
                        className={`w-full h-full object-cover`}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center`}>
                    <span className={`text-2xl font-bold text-gray-400`}>
                      {category.name.charAt(0).toUpperCase()}
                    </span>
                </div>

                {/* Status Badge */}
                <div className={`absolute top-2 right-2`}>
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${category.is_active ? 'bg-green-500 text-white' : 'bg-error text-white'}`}
                    >
                      {category.is_active ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            {/* Category Info */}
            <div className={`p-4`}>
                <div className={`mb-3`}>
                    <h3 className={`text-lg font-semibold text-white mb-1`}>
                        {category.name}
                    </h3>
                    {getParentName(category.parent_id) && (
                        <p className={`text-sm text-teal-400`}>
                            Parent: {getParentName(category.parent_id)}
                        </p>
                    )}
                    <p className={`text-gray-400 text-sm line-clamp-2`}>
                        {category.description}
                    </p>
                </div>

                <div className={`text-xs text-gray-500 mb-4`}>
                    Created: {formatDate(category.created_at)}
                </div>

                {/* Action Buttons */}
                <div className={`flex space-x-2`}>
                    <Link
                        href={`/dashboard/categories/${category.id}`}
                        className={`category-card-btn bg-gray-700 hover:bg-gray-600 text-gray-300`}
                    >
                        <HiOutlineEye className={`size-4 sm:mr-1`}/>
                        <span className={`hidden sm:inline`}>View</span>
                    </Link>
                    <Link
                        href={`/dashboard/categories/${category.id}/edit`}
                        className={`category-card-btn bg-primary hover:bg-primary/70 text-white`}
                    >
                        <HiOutlinePencilSquare className={`size-4 sm:mr-1`}/>
                        <span className={`hidden sm:inline`}>Edit</span>
                    </Link>
                    <button
                        onClick={() => handleDelete(category.id)}
                        className={`category-card-btn bg-red-600 hover:bg-red-700 text-white`}
                    >
                        <HiOutlineTrash className={`size-4 sm:mr-1`}/>
                        <span className={`hidden sm:inline`}>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    )
}