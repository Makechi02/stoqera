export default function DeleteCustomerGroupModal({deleteModal, setDeleteModal, handleDelete}) {
    return (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50`}>
            <div className={`bg-gray-800 rounded-lg max-w-md w-full p-6`}>
                <h3 className={`text-lg font-medium text-white mb-4`}>Delete Customer Group</h3>
                <p className={`text-gray-400 mb-6`}>
                    Are you sure you want to delete "{deleteModal.group?.name}"? This action cannot be undone.
                </p>
                <div className={`flex justify-end space-x-3`}>
                    <button
                        onClick={() => setDeleteModal({open: false, group: null})}
                        className={`px-4 py-2 text-gray-400 hover:text-white transition-colors`}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => handleDelete(deleteModal.group.id)}
                        className={`px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors`}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}