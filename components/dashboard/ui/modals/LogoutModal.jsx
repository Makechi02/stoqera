import {useEffect, useRef} from "react";
import {ArrowRightEndOnRectangleIcon, ExclamationTriangleIcon} from "@heroicons/react/24/outline";
import {ProgressLoader} from "@/components";

export default function LogoutModal({isOpen, onClose, onConfirm, userName, isLoading = false}) {
    const modalRef = useRef(null);

    // Handle escape key
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Focus management
    useEffect(() => {
        if (isOpen && modalRef.current) {
            modalRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-50 overflow-y-auto`}>
            {/* Backdrop */}
            <div className={`flex min-h-full items-center justify-center p-4 text-center sm:p-0`}>
                <div className={`fixed inset-0 bg-gray-900/75 transition-opacity`} onClick={onClose}/>

                {/* Modal */}
                <div
                    ref={modalRef}
                    className={`relative transform overflow-hidden rounded-lg bg-gray-800 border border-gray-700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg`}
                    tabIndex={-1}
                >
                    {/* Header */}
                    <div className={`px-6 pt-6 pb-4`}>
                        <div className={`flex items-center`}>
                            <div
                                className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-900 bg-opacity-50 sm:mx-0 sm:h-10 sm:w-10`}>
                                <ExclamationTriangleIcon className={`size-6 text-red-400`}/>
                            </div>
                            <div className={`ml-4 text-left`}>
                                <h3 className={`text-lg font-semibold leading-6 font-heading`}>Confirm Logout</h3>
                                <p className={`mt-1 text-sm text-gray-400`}>Are you sure you want to sign out?</p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={`px-6 pb-4`}>
                        <p className={`text-sm text-gray-300`}>
                            You will be signed out of your account{userName && ` as ${userName}`}.
                            Any unsaved changes may be lost.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className={`bg-gray-750 px-6 py-4 sm:flex sm:flex-row-reverse sm:gap-3`}>
                        <button
                            type={`button`}
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 sm:w-auto transition-colors duration-150`}
                        >
                            {isLoading ? (
                                <div className={`flex items-center gap-2`}>
                                    <ProgressLoader/>
                                    Signing Out...
                                </div>
                            ) : (
                                <>
                                    <ArrowRightEndOnRectangleIcon className={`size-4 mr-2`}/>
                                    Sign Out
                                </>
                            )}
                        </button>
                        <button
                            type={`button`}
                            onClick={onClose}
                            disabled={isLoading}
                            className={`mt-3 inline-flex w-full justify-center rounded-md bg-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 sm:mt-0 sm:w-auto transition-colors duration-150`}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}