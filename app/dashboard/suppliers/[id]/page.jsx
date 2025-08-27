import Link from 'next/link';
import {
    HiOutlineBuildingOffice,
    HiOutlineCalendar,
    HiOutlineClock,
    HiOutlineCreditCard,
    HiOutlineDocumentText,
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePencil,
    HiOutlinePhone,
    HiOutlineUser
} from "react-icons/hi2";
import {getSupplierById} from "@/lib/querySuppliers";
import {formatDescriptionDate} from "@/utils/formatters";
import DeleteSupplierBtn from "@/components/dashboard/supplier/DeleteSupplierBtn";
import {notFound} from "next/navigation";
import {BackBtn} from "@/components/ui/buttons";

export default async function Page({params}) {
    const {id} = await params;
    const supplier = await getSupplierById(id);

    if (!supplier) notFound();

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto py-6`}>
                    <div className={`flex flex-wrap gap-4 items-center justify-between`}>
                        <div className={`flex items-center`}>
                            <BackBtn/>

                            <div>
                                <h1 className={`text-3xl font-bold font-heading`}>{supplier.name}</h1>
                                <div className={`flex items-center gap-4 mt-2`}>
                                    <p className={`text-teal-400 font-mono text-sm`}>{supplier.code}</p>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${supplier.is_active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}
                                    >
                                        {supplier.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={`flex items-center gap-3 flex-1 justify-end`}>
                            <Link
                                href={`/dashboard/suppliers/${supplier.id}/edit`}
                                className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors`}
                            >
                                <HiOutlinePencil className={`size-5`}/>
                                Edit
                            </Link>
                            <DeleteSupplierBtn supplier={supplier}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className={`max-w-7xl mx-auto py-8`}>
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                    {/* Main Information */}
                    <div className={`lg:col-span-2 space-y-8`}>
                        {/* Contact Information */}
                        <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                            <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2`}>
                                <HiOutlineUser className={`size-6 text-teal-400`}/>
                                Contact Information
                            </h2>

                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                                {supplier.contact_person && (
                                    <div>
                                        <label className={`block text-sm font-medium text-gray-400 mb-2`}>
                                            Contact Person
                                        </label>
                                        <p>{supplier.contact_person}</p>
                                    </div>
                                )}

                                {supplier.email && (
                                    <div>
                                        <span className={`block text-sm font-medium text-gray-400 mb-2`}>
                                            Email Address
                                        </span>
                                        <div className={`flex items-center gap-2`}>
                                            <HiOutlineEnvelope className={`size-4 text-gray-500`}/>
                                            <a
                                                href={`mailto:${supplier.email}`}
                                                className={`text-teal-400 hover:text-teal-300`}
                                            >
                                                {supplier.email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {supplier.phone && (
                                    <div>
                                        <span className={`block text-sm font-medium text-gray-400 mb-2`}>
                                            Phone Number
                                        </span>
                                        <div className={`flex items-center gap-2`}>
                                            <HiOutlinePhone className={`size-4 text-gray-500`}/>
                                            <a
                                                href={`tel:${supplier.phone}`}
                                                className={`text-teal-400 hover:text-teal-300`}
                                            >
                                                {supplier.phone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {supplier.address && (
                                    <div className={`md:col-span-2`}>
                                        <span className={`block text-sm font-medium text-gray-400 mb-2`}>
                                            Address
                                        </span>
                                        <div className={`flex items-start gap-2`}>
                                            <HiOutlineMapPin className={`size-4 text-gray-500 mt-1 flex-shrink-0`}/>
                                            <p>{supplier.address}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Business Information */}
                        <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                            <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2`}>
                                <HiOutlineBuildingOffice className={`size-6 text-teal-400`}/>
                                Business Information
                            </h2>

                            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                                {supplier.tax_id && (
                                    <div>
                                        <span className={`block text-sm font-medium text-gray-400 mb-2`}>
                                            Tax ID
                                        </span>
                                        <div className={`flex items-center gap-2`}>
                                            <HiOutlineDocumentText className={`size-4 text-gray-500`}/>
                                            <p className={`font-mono`}>{supplier.tax_id}</p>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <span className={`block text-sm font-medium text-gray-400 mb-2`}>
                                        Payment Terms
                                    </span>
                                    <div className={`flex items-center gap-2`}>
                                        <HiOutlineCreditCard className={`size-4 text-gray-500`}/>
                                        <p>{supplier.payment_terms} days</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {supplier.notes && (
                            <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                                <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2`}>
                                    <HiOutlineDocumentText className={`size-6 text-teal-400`}/>
                                    Notes
                                </h2>
                                <p className={`text-gray-300 leading-relaxed`}>{supplier.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className={`space-y-6`}>
                        {/* Status Card */}
                        <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                            <h3 className={`text-lg font-semibold mb-4`}>Status</h3>
                            <div className={`space-y-4`}>
                                <div className={`flex items-center justify-between`}>
                                    <span className={`text-gray-400`}>Current Status</span>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            supplier.is_active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                                        }`}
                                    >
                                        {supplier.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Timestamps */}
                        <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                            <h3 className={`text-lg font-semibold text-white mb-4 flex items-center gap-2`}>
                                <HiOutlineClock className={`size-5 text-teal-400`}/>
                                Timeline
                            </h3>

                            <div className={`space-y-4`}>
                                <div>
                                    <div className={`flex items-center gap-2 mb-1`}>
                                        <HiOutlineCalendar className={`size-4 text-gray-500`}/>
                                        <span className={`text-sm font-medium text-gray-400`}>Created</span>
                                    </div>
                                    <p className={`text-sm text-white ml-6`}>
                                        {formatDescriptionDate(supplier.created_at)}
                                    </p>
                                </div>

                                <div>
                                    <div className={`flex items-center gap-2 mb-1`}>
                                        <HiOutlineCalendar className={`h-4 w-4 text-gray-500`}/>
                                        <span className={`text-sm font-medium text-gray-400`}>Last Updated</span>
                                    </div>
                                    <p className={`text-sm text-white ml-6`}>
                                        {formatDescriptionDate(supplier.updated_at)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                            <h3 className={`text-lg font-semibold text-white mb-4`}>Quick Actions</h3>
                            <div className={`space-y-3`}>
                                {supplier.email && (
                                    <a
                                        href={`mailto:${supplier.email}`}
                                        className={`w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors`}
                                    >
                                        <HiOutlineEnvelope className={`size-4`}/>
                                        Send Email
                                    </a>
                                )}

                                {supplier.phone && (
                                    <a
                                        href={`tel:${supplier.phone}`}
                                        className={`w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors`}
                                    >
                                        <HiOutlinePhone className={`size-4`}/>
                                        Call
                                    </a>
                                )}

                                <Link
                                    href={`/dashboard/suppliers/${supplier.id}/edit`}
                                    className={`w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors`}
                                >
                                    <HiOutlinePencil className={`size-4`}/>
                                    Edit Supplier
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}