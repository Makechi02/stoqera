'use client'

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {InformationCircleIcon, SwatchIcon, TagIcon, UserGroupIcon} from '@heroicons/react/24/outline';
import {addCustomerGroup, updateCustomerGroup} from "@/lib/queryCustomerGroups";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";

const colorOptions = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
    '#f43f5e', '#64748b', '#6b7280', '#374151'
];

export default function CustomerGroupForm({customerGroup = null}) {
    const router = useRouter();
    const isEdit = !!customerGroup?.id;

    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: customerGroup?.name || '',
        description: customerGroup?.description || '',
        discount_percentage: customerGroup?.discount_percentage || 0,
        color: customerGroup?.color || '#14b8a6',
        is_default: customerGroup?.is_default || false
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
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Group name is required';
        }

        if (formData.discount_percentage < 0 || formData.discount_percentage > 100) {
            newErrors.discount_percentage = 'Discount must be between 0 and 100';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSaving(true);
        try {
            const payload = {
                name: formData.name.trim(),
                description: formData.description.trim() || null,
                discount_percentage: parseFloat(formData.discount_percentage),
                color: formData.color,
                is_default: formData.is_default
            };

            if (isEdit) {
                const updatedCategory = await updateCustomerGroup(payload, customerGroup.id);

                if (!updatedCategory) {
                    showErrorToast('Failed to update customer group. Please try again.');
                }

                showSuccessToast('Customer group updated successfully');
            } else {
                const addedCustomerGroup = await addCustomerGroup(payload);

                if (!addedCustomerGroup) {
                    showErrorToast('Failed to add customer group. Please try again.');
                }

                showSuccessToast('Customer group added successfully');
            }

            router.push('/dashboard/customer-groups');
        } catch (error) {
            console.error('Error saving customer group:', error);
            setErrors({submit: 'Failed to save customer group. Please try again.'});
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className={`max-w-2xl mx-auto`}>
                <form onSubmit={handleSubmit} className={`space-y-6`}>
                    {/* Basic Information */}
                    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                        <h2 className={`text-lg font-medium mb-4 flex items-center`}>
                            <UserGroupIcon className={`size-5 mr-2`}/>
                            Basic Information
                        </h2>

                        <div className={`space-y-4`}>
                            <div>
                                <label className={`dashboard-form-label mb-2`}>Group Name *</label>
                                <input
                                    type={`text`}
                                    name={`name`}
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={`e.g., VIP Customers, Wholesale, Regular`}
                                    className={`dashboard-form-input ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                                />
                                {errors.name && (
                                    <p className={`mt-1 text-sm text-red-400`}>{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className={`dashboard-form-label mb-2`}>Description</label>
                                <textarea
                                    name={`description`}
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className={`dashboard-form-input border-gray-600`}
                                    placeholder={`Brief description of this customer group...`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Settings */}
                    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                        <h2 className={`text-lg font-medium mb-4 flex items-center`}>
                            <TagIcon className={`size-5 mr-2`}/>
                            Pricing & Settings
                        </h2>

                        <div className={`space-y-4`}>
                            <div>
                                <label className={`dashboard-form-label mb-2`}>Discount Percentage</label>
                                <div className={`relative`}>
                                    <input
                                        type={`number`}
                                        name={`discount_percentage`}
                                        value={formData.discount_percentage}
                                        onChange={handleChange}
                                        min={0}
                                        max={100}
                                        step={0.01}
                                        placeholder={`0`}
                                        className={`dashboard-form-input ${errors.discount_percentage ? 'border-red-500' : 'border-gray-600'}`}
                                    />
                                    <span
                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400`}>
                                        %
                                    </span>
                                </div>
                                {errors.discount_percentage && (
                                    <p className={`mt-1 text-sm text-red-400`}>{errors.discount_percentage}</p>
                                )}
                                <p className={`mt-1 text-sm text-gray-400`}>
                                    Default discount percentage for customers in this group
                                </p>
                            </div>

                            <div>
                                <label className={`flex items-center`}>
                                    <input
                                        type={`checkbox`}
                                        name={`is_default`}
                                        checked={formData.is_default}
                                        onChange={handleChange}
                                        className={`rounded border-gray-600 text-teal-600 shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 bg-gray-700`}
                                    />
                                    <span className={`ml-2 text-sm text-gray-300`}>
                                        Set as default group
                                    </span>
                                </label>
                                <p className={`mt-1 text-sm text-gray-400`}>
                                    New customers will be automatically assigned to this group
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Appearance */}
                    <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                        <h2 className={`text-lg font-medium text-white mb-4 flex items-center`}>
                            <SwatchIcon className={`size-5 mr-2`}/>
                            Appearance
                        </h2>

                        <div>
                            <label className={`dashboard-form-label mb-3`}>Group Color</label>
                            <div className={`grid grid-cols-10 gap-2`}>
                                {colorOptions.map((color) => (
                                    <button
                                        key={color}
                                        type={`button`}
                                        onClick={() => setFormData(prev => ({...prev, color}))}
                                        className={`size-8 rounded-full border-2 transition-all ${
                                            formData.color === color
                                                ? 'border-white scale-110'
                                                : 'border-gray-600 hover:border-gray-400'
                                        }`}
                                        style={{backgroundColor: color}}
                                    />
                                ))}
                            </div>
                            <p className={`mt-2 text-sm text-gray-400`}>
                                This color will be used to identify the group in the interface
                            </p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {errors.submit && (
                        <div className={`bg-red-900/20 border border-red-800 rounded-lg p-4`}>
                            <div className={`flex items-center`}>
                                <InformationCircleIcon className={`size-5 text-red-400 mr-2`}/>
                                <p className={`text-red-400`}>{errors.submit}</p>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className={`flex justify-end space-x-3 pt-6 border-t border-gray-700`}>
                        <button
                            onClick={router.back}
                            className={`px-4 py-2 text-gray-400 hover:text-text transition-colors`}
                        >
                            Cancel
                        </button>
                        <button
                            type={`submit`}
                            disabled={saving}
                            className={`px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center`}
                        >
                            {saving ? (
                                <>
                                    <div
                                        className={`animate-spin rounded-full h-4 w-4 border-b-2 border-text mr-2`}></div>
                                    Saving...
                                </>
                            ) : (
                                isEdit ? 'Update Group' : 'Create Group'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}