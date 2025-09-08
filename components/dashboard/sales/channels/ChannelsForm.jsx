'use client'

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {ProgressLoader} from "@/components";
import {HiOutlineCheck} from "react-icons/hi2";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {addSaleChannel, updateSaleChannel} from "@/lib/sales/querySales";

export default function ChannelsForm({channel}) {
    const [formData, setFormData] = useState({
        name: channel?.name || '',
        type: channel?.type || 'pos',
        description: channel?.description || '',
        is_active: channel?.is_active || false
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const isEditing = !!channel?.id;

    const channelTypes = [
        {value: 'pos', label: 'Point of Sale'},
        {value: 'online', label: 'Online'},
        {value: 'phone', label: 'Phone'},
        {value: 'wholesale', label: 'Wholesale'}
    ];

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when the user starts typing
        if (errors[name]) {
            setErrors(prev => ({...prev, [name]: ''}));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Channel name is required';
        }

        if (!formData.type) {
            newErrors.type = 'Channel type is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        if (isEditing) {
            await handleEditSubmit();
        } else {
            await handleCreateSubmit();
        }
    };

    const handleEditSubmit = async () => {
        setLoading(true);

        try {
            const updatedChannel = await updateSaleChannel(channel.id, formData);
            showSuccessToast(`Sale channel ${updatedChannel?.name} updated successfully`);
            router.push(`/dashboard/sales/channels`);
        } catch (error) {
            console.error('Error updating sale channel: ', error);
            showErrorToast('An error occurred while updating the sale channel. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    const handleCreateSubmit = async () => {
        setLoading(true);

        try {
            const addedChannel = await addSaleChannel(formData);
            showSuccessToast(`Sale channel ${addedChannel?.name} created successfully`);
            router.push(`/dashboard/sales/channels`);
        } catch (error) {
            console.error('Error adding sale channel:', error);
            showErrorToast('An error occurred while creating the sale channel');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`bg-gray-800 rounded-lg p-6`}>
            <form onSubmit={handleSubmit} className={`space-y-6`}>
                {/* Name */}
                <div>
                    <label htmlFor={`name`} className={`dashboard-form-label mb-2`}>Channel Name *</label>
                    <input
                        type={`text`}
                        id={`name`}
                        name={`name`}
                        value={formData.name}
                        onChange={handleChange}
                        className={`dashboard-form-input ${errors.name ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-teal-500'}`}
                        placeholder={`Enter channel name`}
                    />
                    {errors.name && (
                        <p className={`mt-1 text-sm text-red-400`}>{errors.name}</p>
                    )}
                </div>

                {/* Type */}
                <div>
                    <label htmlFor={`type`} className={`dashboard-form-label mb-2`}>Channel Type *</label>
                    <select
                        id={`type`}
                        name={`type`}
                        value={formData.type}
                        onChange={handleChange}
                        className={`dashboard-form-input ${errors.type ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-teal-500'}`}
                    >
                        {channelTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                    {errors.type && (
                        <p className={`mt-1 text-sm text-red-400`}>{errors.type}</p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor={`description`} className={`dashboard-form-label mb-2`}>Description</label>
                    <textarea
                        id={`description`}
                        name={`description`}
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className={`dashboard-form-input border-gray-600`}
                        placeholder={`Enter channel description (optional)`}
                    />
                </div>

                {/* Active Status */}
                <div className={`flex items-center`}>
                    <input
                        type={`checkbox`}
                        id={`is_active`}
                        name={`is_active`}
                        checked={formData.is_active}
                        onChange={handleChange}
                        className={`size-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2`}
                    />
                    <label htmlFor={`is_active`} className={`ml-3 text-sm font-medium text-gray-300`}>
                        Channel is active
                    </label>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                    <div className={`bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg`}>
                        {errors.submit}
                    </div>
                )}

                {/* Actions */}
                <div className={`flex items-center justify-end gap-4 pt-6 border-t border-gray-700`}>
                    <button
                        type={`button`}
                        onClick={router.back}
                        disabled={loading}
                        className={`dashboard-cancel-btn`}
                    >
                        Cancel
                    </button>
                    <button
                        type={`submit`}
                        disabled={loading}
                        className={`dashboard-submit-btn`}
                    >
                        {loading ? (
                            <>
                                <ProgressLoader/>
                                {isEditing ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>
                                <HiOutlineCheck className={`size-5`}/>
                                {isEditing ? 'Update Channel' : 'Create Channel'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
