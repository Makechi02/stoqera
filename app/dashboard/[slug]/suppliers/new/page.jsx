'use client';

import {useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {
    HiOutlineArrowLeft,
    HiOutlineBuildingOffice,
    HiOutlineCheck,
    HiOutlineCreditCard,
    HiOutlineDocumentText,
    HiOutlineEnvelope,
    HiOutlineMapPin,
    HiOutlinePhone,
    HiOutlineUser,
    HiOutlineXMark
} from "react-icons/hi2";

export default function Page() {
    const {slug, location, id} = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        contact_person: '',
        email: '',
        phone: '',
        address: '',
        tax_id: '',
        payment_terms: 30,
        notes: '',
        is_active: true
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Supplier name is required';
        }

        if (!formData.code.trim()) {
            newErrors.code = 'Supplier code is required';
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.payment_terms && (isNaN(formData.payment_terms) || formData.payment_terms < 0)) {
            newErrors.payment_terms = 'Payment terms must be a valid number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Add API call here
            console.log('Adding supplier:', formData);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            router.push(`/${slug}/${location}/dashboard/suppliers`);
        } catch (error) {
            console.error('Error adding supplier:', error);
            // Handle error - show toast or set form errors
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto px-4 py-6`}>
                    <div className={`flex items-center gap-4`}>
                        <button
                            onClick={router.back}
                            title={`Go Back`}
                            className={`bg-gray-700/50 hover:bg-gray-600 p-2 rounded-full transition-colors cursor-pointer`}
                        >
                            <HiOutlineArrowLeft className={`size-5`}/>
                        </button>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Add Supplier</h1>
                            <p className={`mt-2 text-gray-400`}>Enter new supplier information</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className={`max-w-4xl mx-auto px-4 py-8`}>
                <form onSubmit={handleSubmit} className={`space-y-8`}>
                    {/* Basic Information */}
                    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                        <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2`}>
                            <HiOutlineBuildingOffice className={`size-6 text-teal-400`}/>
                            Basic Information
                        </h2>

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                            <div>
                                <label htmlFor={`name`} className={`dashboard-form-label mb-2`}>Supplier Name *</label>
                                <input
                                    type={`text`}
                                    id={`name`}
                                    name={`name`}
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={`Enter supplier name`}
                                    className={`dashboard-form-input ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.name && (
                                    <p className={`mt-1 text-sm text-red-400`}>{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor={`code`} className={`dashboard-form-label mb-2`}>Supplier Code *</label>
                                <input
                                    type={`text`}
                                    id={`code`}
                                    name={`code`}
                                    value={formData.code}
                                    onChange={handleChange}
                                    placeholder={`e.g. SUP001`}
                                    className={`dashboard-form-input ${errors.code ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.code && (
                                    <p className={`mt-1 text-sm text-red-400`}>{errors.code}</p>
                                )}
                            </div>

                            <div className={`md:col-span-2`}>
                                <div className={`flex items-center gap-3`}>
                                    <input
                                        type={`checkbox`}
                                        id={`is_active`}
                                        name={`is_active`}
                                        checked={formData.is_active}
                                        onChange={handleChange}
                                        className={`size-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2`}
                                    />
                                    <label htmlFor={`is_active`} className={`dashboard-form-label`}>Active
                                        supplier</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                        <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2`}>
                            <HiOutlineUser className={`size-6 text-teal-400`}/>
                            Contact Information
                        </h2>

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                            <div>
                                <label htmlFor={`contact_person`} className={`dashboard-form-label mb-2`}>
                                    Contact Person
                                </label>
                                <input
                                    type={`text`}
                                    id={`contact_person`}
                                    name={`contact_person`}
                                    value={formData.contact_person}
                                    onChange={handleChange}
                                    placeholder={`Enter contact person name`}
                                    className={`dashboard-form-input border-gray-600`}
                                />
                            </div>

                            <div>
                                <label htmlFor={`email`} className={`dashboard-form-label mb-2`}>Email Address</label>
                                <div className={`relative`}>
                                    <HiOutlineEnvelope className={`size-5 absolute left-3 top-2.5 text-gray-400`}/>
                                    <input
                                        type={`email`}
                                        id={`email`}
                                        name={`email`}
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={`Enter email address`}
                                        className={`dashboard-form-input-icon ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className={`mt-1 text-sm text-red-400`}>{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor={`phone`} className={`dashboard-form-label mb-2`}>Phone Number</label>
                                <div className={`relative`}>
                                    <HiOutlinePhone className={`size-5 absolute left-3 top-2.5 text-gray-400`}/>
                                    <input
                                        type={`tel`}
                                        id={`phone`}
                                        name={`phone`}
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder={`Enter phone number`}
                                        className={`dashboard-form-input-icon border-gray-600`}
                                    />
                                </div>
                            </div>

                            <div className={`md:col-span-2`}>
                                <label htmlFor={`address`} className={`dashboard-form-label mb-2`}>Address</label>
                                <div className={`relative`}>
                                    <HiOutlineMapPin className={`size-5 absolute left-3 top-2.5 text-gray-400`}/>
                                    <textarea
                                        id={`address`}
                                        name={`address`}
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder={`Enter full address`}
                                        className={`dashboard-form-input-icon border-gray-600 resize-none`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Information */}
                    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                        <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2`}>
                            <HiOutlineDocumentText className={`size-6 text-teal-400`}/>
                            Business Information
                        </h2>

                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                            <div>
                                <label htmlFor={`tax_id`} className={`dashboard-form-label mb-2`}>Tax ID</label>
                                <input
                                    type={`text`}
                                    id={`tax_id`}
                                    name={`tax_id`}
                                    value={formData.tax_id}
                                    onChange={handleChange}
                                    placeholder={`Enter tax identification number`}
                                    className={`dashboard-form-input border-gray-600 font-mono`}
                                />
                            </div>

                            <div>
                                <label htmlFor={`payment_terms`} className={`dashboard-form-label mb-2`}>
                                    Payment Terms (days)
                                </label>
                                <div className={`relative`}>
                                    <HiOutlineCreditCard className={`size-5 absolute left-3 top-2.5 text-gray-400`}/>
                                    <input
                                        type={`number`}
                                        id={`payment_terms`}
                                        name={`payment_terms`}
                                        value={formData.payment_terms}
                                        onChange={handleChange}
                                        min={0}
                                        placeholder={`30`}
                                        className={`dashboard-form-input-icon ${errors.payment_terms ? 'border-red-500' : 'border-gray-600'}`}
                                    />
                                </div>
                                {errors.payment_terms && (
                                    <p className={`mt-1 text-sm text-red-400`}>{errors.payment_terms}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-6`}>
                        <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2`}>
                            <HiOutlineDocumentText className={`size-6 text-teal-400`}/>
                            Additional Notes
                        </h2>

                        <div>
                            <label htmlFor={`notes`} className={`dashboard-form-label mb-2`}>Notes</label>
                            <textarea
                                id={`notes`}
                                name={`notes`}
                                value={formData.notes}
                                onChange={handleChange}
                                rows={4}
                                placeholder={`Enter any additional notes about this supplier...`}
                                className={`dashboard-form-input border-gray-600 resize-none`}
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className={`flex items-center justify-end gap-4 pt-6 border-t border-gray-700`}>
                        <button
                            onClick={router.back}
                            className={`bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors`}
                        >
                            <HiOutlineXMark className={`size-5`}/>
                            Cancel
                        </button>
                        <button
                            type={`submit`}
                            disabled={loading}
                            className={`bg-teal-600 hover:bg-teal-700 disabled:bg-teal-700 disabled:opacity-50 px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors`}
                        >
                            {loading ? (
                                <>
                                    <div className={`animate-spin rounded-full h-5 w-5 border-b-2 border-white`}></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <HiOutlineCheck className={`size-5`}/>
                                    Add Supplier
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}