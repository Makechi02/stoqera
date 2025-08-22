'use client'

import {useState} from 'react';
import {
    BuildingOfficeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import BasicInfoForm from "@/components/dashboard/customers/BasicInfoForm";
import ContactPersonsForm from "@/components/dashboard/customers/ContactPersonsForm";
import ContactInfoForm from "@/components/dashboard/customers/ContactInfoForm";
import AddressForm from "@/components/dashboard/customers/AddressForm";
import CustomerRelationshipForm from "@/components/dashboard/customers/CustomerRelationshipForm";
import FinancialInfoForm from "@/components/dashboard/customers/FinancialInfoForm";
import TagsForm from "@/components/dashboard/customers/TagsForm";
import {addCustomer} from "@/lib/queryCustomers";
import {useRouter} from "next/navigation";

export default function CustomersForm({customerGroups, salesReps}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [newTag, setNewTag] = useState('');
    const [contacts, setContacts] = useState([{name: '', title: '', email: '', phone: '', is_primary: true}]);

    const [formData, setFormData] = useState({
        type: 'individual',
        // Individual fields
        first_name: '',
        last_name: '',
        // Business fields
        business_name: '',
        tax_id: '',
        // Common fields
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        // Address
        address_line_1: '',
        address_line_2: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'Kenya',
        // Relationship
        customer_group_id: '',
        assigned_to: '',
        acquisition_source: '',
        // Status
        status: 'active',
        credit_limit: 0,
        // Preferences
        preferred_contact_method: 'email',
        marketing_consent: false,
        // Metadata
        notes: '',
        tags: [],
        custom_fields: {}
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

    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const addContact = () => {
        setContacts(prev => [...prev, {name: '', title: '', email: '', phone: '', is_primary: false}]);
    };

    const removeContact = (index) => {
        if (contacts.length > 1) {
            setContacts(prev => prev.filter((_, i) => i !== index));
        }
    };

    const updateContact = (index, field, value) => {
        setContacts(prev => prev.map((contact, i) =>
            i === index ? {...contact, [field]: value} : contact
        ));
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
        setSuccess(false);

        try {
            const submitData = {
                ...formData,
                customer_group_id: formData.customer_group_id || null,
                assigned_to: formData.assigned_to || null,
                tags: formData.tags.map(tag => ({name: tag}))
            };

            const customer = await addCustomer(submitData, contacts.filter(c => c.name.trim()));

            if (customer.error) {
                throw new Error(customer.error);
            }

            setSuccess(true);

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    type: 'individual',
                    first_name: '',
                    last_name: '',
                    business_name: '',
                    tax_id: '',
                    email: '',
                    phone: '',
                    date_of_birth: '',
                    gender: '',
                    address_line_1: '',
                    address_line_2: '',
                    city: '',
                    state: '',
                    postal_code: '',
                    country: 'Kenya',
                    customer_group_id: '',
                    assigned_to: '',
                    acquisition_source: '',
                    status: 'active',
                    credit_limit: 0,
                    preferred_contact_method: 'email',
                    marketing_consent: false,
                    notes: '',
                    tags: [],
                    custom_fields: {}
                });
                setContacts([{name: '', title: '', email: '', phone: '', is_primary: true}]);
                setSuccess(false);

                router.push(`/dashboard/customers`);
            }, 3000);

        } catch (error) {
            console.error('Error creating customer:', error);
            setErrors({submit: error.message || 'Failed to create customer'});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
            {success && <SuccessMessage/>}

            <form onSubmit={handleSubmit} className={`space-y-8`}>
                <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                    <h2 className={`text-lg font-semibold text-white mb-4`}>Customer Type</h2>
                    <CustomerTypeButtons formData={formData} handleInputChange={handleInputChange}/>
                </div>

                <BasicInfoForm formData={formData} handleInputChange={handleInputChange} errors={errors}/>

                {/* Business Contacts */}
                {formData.type === 'business' && (
                    <ContactPersonsForm
                        contacts={contacts}
                        setContacts={setContacts}
                        errors={errors}
                        addContact={addContact}
                        removeContact={removeContact}
                        updateContact={updateContact}/>
                )}

                <ContactInfoForm formData={formData} handleInputChange={handleInputChange} errors={errors}/>
                <AddressForm formData={formData} handleInputChange={handleInputChange}/>

                <CustomerRelationshipForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    customerGroups={customerGroups}
                    salesReps={salesReps}/>

                <FinancialInfoForm formData={formData} handleInputChange={handleInputChange}/>

                <TagsForm
                    formData={formData}
                    newTag={newTag}
                    setNewTag={setNewTag}
                    addTag={addTag}
                    removeTag={removeTag}/>

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

                {errors.submit && <ErrorMessage errors={errors}/>}

                {/* Form Actions */}
                <div className={`flex justify-end gap-4 pt-6 border-t border-gray-700`}>
                    <button
                        type={`button`}
                        className={`px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors`}
                    >
                        Cancel
                    </button>
                    <button
                        type={`submit`}
                        disabled={loading}
                        className={`px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                    >
                        {loading ? (
                            <>
                                <div className={`animate-spin rounded-full size-4 border-b-2 border-white`}></div>
                                Creating...
                            </>
                        ) : (
                            <>
                                <CheckCircleIcon className={`size-4`}/>
                                Create Customer
                            </>
                        )}
                    </button>
                </div>
            </form>

            <HelperInfo/>
        </div>
    );
}

function SuccessMessage() {
    return (
        <div className={`mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4`}>
            <div className={`flex items-center gap-3`}>
                <CheckCircleIcon className={`size-5 text-green-400`}/>
                <div>
                    <h3 className={`text-green-400 font-medium`}>Customer Created Successfully!</h3>
                    <p className={`text-green-300/80 text-sm mt-1`}>
                        The customer has been added to your system and is now available in the customers
                        list.
                    </p>
                </div>
            </div>
        </div>
    )
}

function ErrorMessage({errors}) {
    return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400"/>
                <div>
                    <h3 className="text-red-400 font-medium">Error Creating Customer</h3>
                    <p className="text-red-300/80 text-sm mt-1">{errors.submit}</p>
                </div>
            </div>
        </div>
    )
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
                <div className="flex items-center gap-3">
                    <BuildingOfficeIcon className={`h-8 w-8 ${
                        formData.type === 'business' ? 'text-teal-400' : 'text-gray-400'
                    }`}/>
                    <div className="text-left">
                        <h3 className="font-medium text-white">Business</h3>
                        <p className="text-sm text-gray-400">Company or organization</p>
                    </div>
                </div>
            </button>
        </div>
    )
}

function HelperInfo() {
    return (
        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
                <InformationCircleIcon className="h-5 w-5 text-blue-400 mt-0.5"/>
                <div>
                    <h3 className="text-blue-400 font-medium">Customer Creation Tips</h3>
                    <ul className="text-blue-300/80 text-sm mt-1 space-y-1">
                        <li>• Customer codes are automatically generated if not provided</li>
                        <li>• Business customers can have multiple contact persons</li>
                        <li>• Email and phone validation is performed automatically</li>
                        <li>• Tags help you organize customers for better management</li>
                        <li>• All fields except name/business name are optional</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}