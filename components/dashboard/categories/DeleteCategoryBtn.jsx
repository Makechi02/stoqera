'use client'

import {HiOutlineTrash} from "react-icons/hi2";
import {deleteCategory} from "@/lib/queryCategories";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

export default function DeleteCategoryBtn({category}) {
    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(category.id);

            toast.success({
                title: 'Category deleted successfully.',
                description: 'The category has been deleted successfully.',
                status: 'success',
                duration: 5000,
                theme: 'dark',
            });

            router.push('/dashboard/categories');
        }
    };
    return (
        <button
            onClick={handleDelete}
            className={`inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200`}
        >
            <HiOutlineTrash className={`size-5 mr-2`}/>
            Delete
        </button>
    )
}