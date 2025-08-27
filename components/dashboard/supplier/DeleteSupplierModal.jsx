'use client'

import {ProgressLoader} from "@/components";

export default function DeleteSupplierModal({deleteModal, setDeleteModal, handleDelete, isLoading = false}) {
    return (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50`}>
            <div className={`bg-gray-800 rounded-lg max-w-md w-full p-6`}>
                <h3 className={`text-lg font-medium text-white mb-4`}>Delete Supplier</h3>
                <p className={`text-gray-400 mb-6`}>
                    Are you sure you want to delete "{deleteModal.supplier?.name}"? This action cannot be undone.
                </p>
                <div className={`flex justify-end space-x-3`}>
                    <button
                        onClick={() => setDeleteModal({open: false, supplier: null})}
                        disabled={isLoading}
                        className={`px-4 py-2 text-gray-400 hover:text-text transition-colors disabled:cursor-not-allowed disabled:opacity-50`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleDelete(deleteModal.supplier.id)}
                        disabled={isLoading}
                        className={`flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg transition-colors`}
                    >
                        {isLoading && <ProgressLoader />}
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}