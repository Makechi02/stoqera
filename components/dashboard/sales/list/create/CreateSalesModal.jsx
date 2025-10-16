'use client'

import {XMarkIcon} from "@heroicons/react/24/outline";

export default function CreateSalesModal({children, onClose, title, size = 'normal'}) {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80`} onClick={onClose}>
            <div
                className={`bg-gray-800 rounded-lg shadow-xl w-full ${size === 'large' ? 'max-w-2xl' : 'max-w-md'} max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`sticky top-0 bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between`}
                >
                    <h2 className={`text-xl font-bold`}>{title}</h2>
                    <button onClick={onClose} className={`p-2 hover:bg-gray-700 rounded-lg transition`}>
                        <XMarkIcon className={`size-6`}/>
                    </button>
                </div>
                <div className={`p-4 md:p-6`}>{children}</div>
            </div>
        </div>
    );
}