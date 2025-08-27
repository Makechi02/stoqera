'use client'

import {
    HiOutlineBuildingOffice,
    HiOutlineEnvelope,
    HiOutlineEye,
    HiOutlinePencil,
    HiOutlinePhone,
    HiOutlineTrash,
    HiOutlineUser
} from "react-icons/hi2";
import Link from "next/link";
import {deleteSupplier} from "@/lib/querySuppliers";
import {useSearchParams} from "next/navigation";
import {useState} from "react";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import DeleteSupplierModal from "@/components/dashboard/supplier/DeleteSupplierModal";

export default function SuppliersGrid({suppliers}) {
    const searchParams = useSearchParams();
    const searchTerm = searchParams.get('search') || '';

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [deleteModal, setDeleteModal] = useState({open: false, supplier: null});

    const handleDelete = async (supplierId) => {
        setLoadingDelete(true);

        try {
            await deleteSupplier(supplierId);

            setDeleteModal({open: false, supplier: null});
            showSuccessToast('Supplier deleted successfully.');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting supplier:', error);
            showErrorToast('Error deleting supplier. Please try again later.');
        } finally {
            setLoadingDelete(false);
        }
    };

    return (
        <>
            {suppliers.length === 0 ? (
                <div className={`text-center py-12`}>
                    <HiOutlineBuildingOffice className={`h-12 w-12 text-gray-600 mx-auto mb-4`}/>
                    <h3 className={`text-lg font-medium text-gray-400 mb-2`}>No suppliers found</h3>
                    <p className={`text-gray-500`}>
                        {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first supplier'}
                    </p>
                </div>
            ) : (
                <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6`}>
                        {suppliers.map((supplier) => (
                            <SuppliersCard key={supplier.id} supplier={supplier} setDeleteModal={setDeleteModal}/>
                        ))}
                    </div>

                    {deleteModal.open && (
                        <DeleteSupplierModal
                            setDeleteModal={setDeleteModal}
                            deleteModal={deleteModal}
                            handleDelete={handleDelete}
                            isLoading={loadingDelete}/>
                    )}
                </>
            )}
        </>
    )
}

function SuppliersCard({supplier, setDeleteModal}) {
    return (
        <div
            className={`bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-colors flex flex-col`}
        >
            {/* Header */}
            <div className={`flex items-start justify-between mb-4`}>
                <div className={`flex-1`}>
                    <h3 className={`text-lg font-semibold mb-1`}>{supplier.name}</h3>
                    <p className={`text-teal-400 text-sm font-mono`}>{supplier.code}</p>
                </div>
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${supplier.is_active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}
                >
                    {supplier.is_active ? 'Active' : 'Inactive'}
                </span>
            </div>

            {/* Contact Info */}
            <div className={`space-y-2 mb-6`}>
                {supplier.contact_person && (
                    <div className={`flex items-center gap-2 text-sm text-gray-300`}>
                        <HiOutlineUser className={`size-4 text-gray-500`}/>
                        {supplier.contact_person}
                    </div>
                )}
                {supplier.email && (
                    <div className={`flex items-center gap-2 text-sm text-gray-300`}>
                        <HiOutlineEnvelope className={`size-4 text-gray-500`}/>
                        {supplier.email}
                    </div>
                )}
                {supplier.phone && (
                    <div className={`flex items-center gap-2 text-sm text-gray-300`}>
                        <HiOutlinePhone className={`size-4 text-gray-500`}/>
                        {supplier.phone}
                    </div>
                )}
            </div>

            {/* Payment Terms */}
            <div className={`mb-6 mt-auto`}>
                <p className={`text-sm text-gray-400`}>
                    Payment Terms: <span className={`text-text`}>{supplier.payment_terms} days</span>
                </p>
            </div>

            {/* Actions */}
            <div className={`flex items-center gap-2`}>
                <Link
                    href={`/dashboard/suppliers/${supplier.id}`}
                    className={`flex-1 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors`}
                >
                    <HiOutlineEye className={`size-4`}/>
                    View
                </Link>
                <Link
                    href={`/dashboard/suppliers/${supplier.id}/edit`}
                    className={`flex-1 bg-teal-600 hover:bg-teal-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors`}
                >
                    <HiOutlinePencil className={`size-4`}/>
                    Edit
                </Link>
                <button
                    onClick={() => setDeleteModal({open: true, supplier})}
                    className={`bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors`}
                >
                    <HiOutlineTrash className={`size-4`}/>
                </button>
            </div>
        </div>
    )
}