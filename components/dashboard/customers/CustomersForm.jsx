'use client'

import {useState} from 'react';
import {BuildingOfficeIcon, CheckIcon, InformationCircleIcon, UserIcon, XMarkIcon,} from '@heroicons/react/24/outline';
import BasicInfoForm from "@/components/dashboard/customers/BasicInfoForm";
import ContactPersonsForm from "@/components/dashboard/customers/ContactPersonsForm";
import ContactInfoForm from "@/components/dashboard/customers/ContactInfoForm";
import AddressForm from "@/components/dashboard/customers/AddressForm";
import CustomerRelationshipForm from "@/components/dashboard/customers/CustomerRelationshipForm";
import FinancialInfoForm from "@/components/dashboard/customers/FinancialInfoForm";
import TagsForm from "@/components/dashboard/customers/TagsForm";
import {addCustomer} from "@/lib/queryCustomers";
import {useRouter} from "next/navigation";
import {ProgressLoader} from "@/components";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";

export default function CustomersForm({customer = null, customerGroups, salesReps}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [newTag, setNewTag] = useState('');
    const [contacts, setContacts] = useState([{name: '', title: '', email: '', phone: '', is_primary: true}]);

    const isEditing = !!customer?.id;

    const [formData, setFormData] = useState({
        type: customer?.type || 'individual',
        // Individual fields
        first_name: customer?.first_name || '',
        last_name: customer?.last_name || '',
        // Business fields
        business_name: customer?.business_name || '',
        tax_id: customer?.tax_id || '',
        // Common fields
        email: customer?.email || '',
        phone: customer?.phone || '',
        date_of_birth: customer?.date_of_birth || '',
        gender: customer?.gender || '',
        // Address
        address_line_1: customer?.address_line_1 || '',
        address_line_2: customer?.address_line_2 || '',
        city: customer?.city || '',
        state: customer?.state || '',
        postal_code: customer?.postal_code || '',
        country: customer?.country || 'Kenya',
        // Relationship
        customer_group_id: customer?.customer_group_id || '',
        assigned_to: customer?.assigned_to || '',
        acquisition_source: customer?.acquisition_source || '',
        // Status
        status: customer?.status || 'active',
        credit_limit: customer?.credit_limit || 0,
        // Preferences
        preferred_contact_method: customer?.preferred_contact_method || 'email',
        marketing_consent: customer?.marketing_consent || false,
        // Metadata
        notes: customer?.notes || '',
        tags: customer?.tags?.map(tag => JSON.parse(tag).name) || [],
        custom_fields: customer?.custom_fields || {}
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when a user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Generate customer code if not provided
        if (!formData.customer_code) {
            const prefix = formData.type === 'business' ? 'BUS' : 'IND';
            const timestamp = Date.now().toString().slice(-6);
            formData.customer_code = `${prefix}${timestamp}`;
        }

        // Type-specific validation
        if (formData.type === 'individual') {
            if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
            if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        } else {
            if (!formData.business_name.trim()) newErrors.business_name = 'Business name is required';
        }

        // Email validation
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (formData.phone && !/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Business contacts validation
        if (formData.type === 'business') {
            const validContacts = contacts.filter(c => c.name.trim());
            if (validContacts.length === 0) {
                newErrors.contacts = 'At least one contact is required for business customers';
            }
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
            const submitData = {
                ...formData,
                customer_group_id: formData.customer_group_id || null,
                assigned_to: formData.assigned_to || null,
                tags: formData.tags.map(tag => ({name: tag}))
            };

            const customer = await addCustomer(submitData, contacts.filter(c => c.name.trim()));
            showSuccessToast(`${customer?.type} customer created successfully`);
            router.push(`/dashboard/customers`);
        } catch (error) {
            console.error('Error creating customer:', error);
            showErrorToast('An error occurred while creating the customer. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`max-w-4xl mx-auto py-8`}>
            <form onSubmit={handleSubmit} className={`space-y-8`}>
                <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                    <h2 className={`text-lg font-semibold mb-4`}>Customer Type</h2>
                    <CustomerTypeButtons formData={formData} handleInputChange={handleInputChange}/>
                </div>

                <BasicInfoForm formData={formData} handleInputChange={handleInputChange} errors={errors}/>

                {/* Business Contacts */}
                {formData.type === 'business' && (
                    <ContactPersonsForm contacts={contacts} setContacts={setContacts} errors={errors}/>
                )}

                <ContactInfoForm formData={formData} handleInputChange={handleInputChange} errors={errors}/>
                <AddressForm formData={formData} handleInputChange={handleInputChange}/>

                <CustomerRelationshipForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    customerGroups={customerGroups}
                    salesReps={salesReps}/>

                <FinancialInfoForm formData={formData} handleInputChange={handleInputChange}/>

                <TagsForm formData={formData} setFormData={setFormData} newTag={newTag} setNewTag={setNewTag}/>

                {/* Notes */}
                <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                    <h2 className={`text-lg font-semibold mb-4`}>Additional Notes</h2>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={4}
                        className={`dashboard-form-input border-gray-600 resize-none`}
                        placeholder={`Add any additional notes about this customer...`}
                    />
                    <p className={`text-xs text-gray-400 mt-1`}>
                        These notes are for internal use only and won't be visible to the customer
                    </p>
                </div>

                {/* Form Actions */}
                <div className={`flex justify-end gap-4 pt-6 border-t border-gray-700`}>
                    <button
                        type={`button`}
                        className={`dashboard-cancel-btn`}
                        onClick={() => router.push(`/dashboard/customers`)}
                        disabled={loading}
                        aria-label={`Cancel and go back to customers list`}
                    >
                        <XMarkIcon className={`size-4`}/>
                        Cancel
                    </button>
                    <button
                        type={`submit`}
                        disabled={loading}
                        className={`dashboard-submit-btn`}
                        aria-label={`Create customer`}
                    >
                        {loading ? (
                            <>
                                <ProgressLoader/>
                                {isEditing ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>
                                <CheckIcon className={`size-4`}/>
                                {isEditing ? 'Update Customer' : 'Create Customer'}
                            </>
                        )}
                    </button>
                </div>
            </form>

            <HelperInfo/>
        </div>
    );
}

function CustomerTypeButtons({handleInputChange, formData}) {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
            <button
                type={`button`}
                onClick={() => handleInputChange('type', 'individual')}
                className={`p-4 rounded-lg border-2 transition-all ${
                    formData.type === 'individual'
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
            >
                <div className={`flex items-center gap-3`}>
                    <UserIcon
                        className={`size-8 ${formData.type === 'individual' ? 'text-teal-400' : 'text-gray-400'}`}/>
                    <div className={`text-left`}>
                        <h3 className={`font-medium`}>Individual</h3>
                        <p className={`text-sm text-gray-400`}>Personal customer</p>
                    </div>
                </div>
            </button>

            <button
                type={`button`}
                onClick={() => handleInputChange('type', 'business')}
                className={`p-4 rounded-lg border-2 transition-all ${
                    formData.type === 'business'
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
            >
                <div className={`flex items-center gap-3`}>
                    <BuildingOfficeIcon
                        className={`size-8 ${formData.type === 'business' ? 'text-teal-400' : 'text-gray-400'}`}/>
                    <div className={`text-left`}>
                        <h3 className={`font-medium`}>Business</h3>
                        <p className={`text-sm text-gray-400`}>Company or organization</p>
                    </div>
                </div>
            </button>
        </div>
    )
}

function HelperInfo() {
    return (
        <div className={`mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4`}>
            <div className={`flex items-start gap-3`}>
                <InformationCircleIcon className={`size-5 text-blue-400 mt-0.5`}/>
                <div>
                    <h3 className={`text-blue-400 font-medium`}>Customer Creation Tips</h3>
                    <ul className={`text-blue-300/80 text-sm mt-1 space-y-1 list-disc list-inside`}>
                        <li>Customer codes are automatically generated if not provided</li>
                        <li>Business customers can have multiple contact persons</li>
                        <li>Email and phone validation is performed automatically</li>
                        <li>Tags help you organize customers for better management</li>
                        <li>All fields except name/business name are optional</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}