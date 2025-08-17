'use client'

import {HiOutlineTrash} from "react-icons/hi2";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {deleteSupplier} from "@/lib/querySuppliers";

export default function DeleteSupplierBtn({supplier}) {
    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            await deleteSupplier(supplier.id);

            toast.success({
                title: 'Supplier deleted successfully.',
                status: 'success',
                duration: 5000,
                theme: 'dark',
            });

            router.push('/dashboard/suppliers');
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