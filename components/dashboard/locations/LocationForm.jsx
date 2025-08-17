'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {CheckIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import {toast} from "react-toastify";
import {addLocation, updateLocation} from "@/lib/queryLocations";

export default function LocationForm({organizationId, users, location = null, initialData = null}) {
    const router = useRouter();
    const isEditing = !!location?.id;

    const [formData, setFormData] = useState({
        name: location?.name || '',
        type: location?.type || 'store',
        code: location?.code || '',
        address: location?.address || '',
        city: location?.city || '',
        state: location?.state || '',
        postal_code: location?.postal_code || '',
        country: location?.country || 'Kenya',
        phone: location?.phone || '',
        email: location?.email || '',
        manager_id: location?.manager_id || '',
        is_active: location?.is_active || false,
        operating_hours: location?.settings?.operating_hours || {
            monday: '9:00 AM - 5:00 PM',
            tuesday: '9:00 AM - 5:00 PM',
            wednesday: '9:00 AM - 5:00 PM',
            thursday: '9:00 AM - 5:00 PM',
            friday: '9:00 AM - 5:00 PM',
            saturday: '10:00 AM - 4:00 PM',
            sunday: 'Closed'
        },
        features: location?.settings?.features || []
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [availableFeatures] = useState([
        'POS System',
        'Inventory Management',
        'Customer WiFi',
        'Security System',
        'Drive-through',
        'Parking',
        'Loading Dock',
        'Climate Control',
        'CCTV',
        'Backup Generator'
    ]);

    const storeTypes = [
        {value: 'store', label: 'Store'},
        {value: 'warehouse', label: 'Warehouse'},
        {value: 'outlet', label: 'Outlet'}
    ];

    // Load initial data and managers
    useEffect(() => {
        if (initialData) {
            setFormData({
                ...formData,
                ...initialData,
                operating_hours: initialData.settings?.operating_hours || formData.operating_hours,
                features: initialData.settings?.features || []
            });
        }
    }, [initialData]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Location name is required';
        }

        if (!formData.code.trim()) {
            newErrors.code = 'Location code is required';
        } else if (!/^[A-Z0-9]{3,10}$/.test(formData.code.toUpperCase())) {
            newErrors.code = 'Code must be 3-10 uppercase letters and numbers';
        }

        if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
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

    const handleOperatingHoursChange = (day, value) => {
        setFormData(prev => ({
            ...prev,
            operating_hours: {
                ...prev.operating_hours,
                [day]: value
            }
        }));
    };

    const handleFeatureToggle = (feature) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.includes(feature)
                ? prev.features.filter(f => f !== feature)
                : [...prev.features, feature]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Prepare data for API
        const submitData = {
            ...formData,
            organization_id: organizationId,
            code: formData.code.toUpperCase(),
            settings: {
                operating_hours: formData.operating_hours,
                features: formData.features
            }
        };

        // Remove operating_hours and features from top level
        delete submitData.operating_hours;
        delete submitData.features;

        if (isEditing) {
            await handleEditSubmit(submitData);
        } else {
            await handleCreateSubmit(submitData);
        }
    };

    const handleEditSubmit = async (submitData) => {
        setLoading(true);

        try {
            const updatedLocation = await updateLocation(location.id, submitData);

            toast.success(`Location ${updatedLocation.name} updated successfully`, {
                    theme: 'dark',
                    autoClose: 5000,
                }
            );

            router.push(`/dashboard/locations`);
        } catch (error) {
            console.error('Error updating location: ', error);
            setErrors({submit: 'An error occurred while updating the location'});
        } finally {
            setLoading(false);
        }
    }

    const handleCreateSubmit = async (submitData) => {
        setLoading(true);

        const addedLocation = await addLocation(submitData);

        if (!addedLocation) {
            setLoading(false);
            console.error('Error saving location');
            setErrors({submit: 'An error occurred while saving the location'});
            return;
        }

        setLoading(false);

        toast.success(`Location ${addedLocation.name} created successfully`, {
                theme: 'dark',
                autoClose: 5000,
            }
        );

        router.push(`/dashboard/locations`);
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-8`}>
            {/* Basic Information */}
            <div className={`bg-gray-800 rounded-lg p-6`}>
                <h2 className={`text-xl font-semibold text-white mb-6`}>Basic Information</h2>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                    {/* Location Name */}
                    <div>
                        <label htmlFor={`name`} className={`dashboard-form-label mb-2`}>Location Name *</label>
                        <input
                            type={`text`}
                            id={`name`}
                            name={`name`}
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={`Enter location name`}
                            className={`dashboard-form-input ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                        />
                        {errors.name && (
                            <p className={`mt-1 text-sm text-red-400 flex items-center`}>
                                <ExclamationTriangleIcon className={`size-4 mr-1`}/>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Location Code */}
                    <div>
                        <label htmlFor={`code`} className={`dashboard-form-label mb-2`}>Location Code *</label>
                        <input
                            type={`text`}
                            id={`code`}
                            name={`code`}
                            value={formData.code}
                            onChange={handleInputChange}
                            placeholder={`LOC001`}
                            style={{textTransform: 'uppercase'}}
                            className={`dashboard-form-input ${errors.code ? 'border-red-500' : 'border-gray-600'}`}
                        />
                        {errors.code && (
                            <p className={`mt-1 text-sm text-red-400 flex items-center`}>
                                <ExclamationTriangleIcon className={`size-4 mr-1`}/>
                                {errors.code}
                            </p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <label htmlFor={`type`} className={`dashboard-form-label mb-2`}>Location Type</label>
                        <select
                            id={`type`}
                            name={`type`}
                            value={formData.type}
                            onChange={handleInputChange}
                            className={`dashboard-form-input border-gray-600`}
                        >
                            {storeTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Manager */}
                    <div>
                        <label htmlFor={`manager_id`} className={`dashboard-form-label mb-2`}>Manager</label>
                        <select
                            id={`manager_id`}
                            name={`manager_id`}
                            value={formData.manager_id}
                            onChange={handleInputChange}
                            className={`dashboard-form-input border-gray-600`}
                        >
                            <option value={``}>Select a manager</option>
                            {users.map(manager => (
                                <option key={manager.id} value={manager.id}>
                                    {manager.full_name} ({manager.email})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Status */}
                <div className={`mt-6`}>
                    <label className={`flex items-center`}>
                        <input
                            type={`checkbox`}
                            name={`is_active`}
                            checked={formData.is_active}
                            onChange={handleInputChange}
                            className={`size-4 text-teal-600 focus:ring-teal-500 border-gray-600 rounded bg-gray-700`}
                        />
                        <span className={`ml-2 text-sm text-gray-300`}>Location is active</span>
                    </label>
                </div>
            </div>

            {/* Address Information */}
            <div className={`bg-gray-800 rounded-lg p-6`}>
                <h2 className={`text-xl font-semibold mb-6`}>Address Information</h2>

                <div className={`space-y-6`}>
                    {/* Address */}
                    <div>
                        <label htmlFor={`address`} className={`dashboard-form-label mb-2`}>Street Address</label>
                        <input
                            type={`text`}
                            id={`address`}
                            name={`address`}
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`dashboard-form-input ${errors.address ? 'border-red-500' : 'border-gray-600'}`}
                            placeholder={`123 Main Street`}
                        />
                        {errors.address && (
                            <p className={`mt-1 text-sm text-red-400 flex items-center`}>
                                <ExclamationTriangleIcon className={`size-4 mr-1`}/>
                                {errors.address}
                            </p>
                        )}
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6`}>
                        {/* City */}
                        <div>
                            <label htmlFor={`city`} className={`dashboard-form-label mb-2`}>City</label>
                            <input
                                type={`text`}
                                id={`city`}
                                name={`city`}
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder={`Nairobi`}
                                className={`dashboard-form-input ${errors.city ? 'border-red-500' : 'border-gray-600'}`}
                            />
                            {errors.city && (
                                <p className={`mt-1 text-sm text-red-400 flex items-center`}>
                                    <ExclamationTriangleIcon className={`size-4 mr-1`}/>
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* State */}
                        <div>
                            <label htmlFor={`state`} className={`dashboard-form-label mb-2`}>State</label>
                            <input
                                type={`text`}
                                id={`state`}
                                name={`state`}
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder={`NRB`}
                                className={`dashboard-form-input ${errors.state ? 'border-red-500' : 'border-gray-600'}`}
                            />
                            {errors.state && (
                                <p className={`mt-1 text-sm text-red-400 flex items-center`}>
                                    <ExclamationTriangleIcon className={`size-4 mr-1`}/>
                                    {errors.state}
                                </p>
                            )}
                        </div>

                        {/* Postal Code */}
                        <div>
                            <label htmlFor={`postal_code`} className={`dashboard-form-label mb-2`}>Postal Code</label>
                            <input
                                type={`text`}
                                id={`postal_code`}
                                name={`postal_code`}
                                value={formData.postal_code}
                                onChange={handleInputChange}
                                placeholder={`10001`}
                                className={`dashboard-form-input ${errors.postal_code ? 'border-red-500' : 'border-gray-600'}`}
                            />
                            {errors.postal_code && (
                                <p className={`mt-1 text-sm text-red-400 flex items-center`}>
                                    <ExclamationTriangleIcon className={`size-4 mr-1`}/>
                                    {errors.postal_code}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Country */}
                    <div className={`md:w-1/3`}>
                        <label htmlFor={`country`} className={`dashboard-form-label mb-2`}>Country</label>
                        <input
                            type={`text`}
                            id={`country`}
                            name={`country`}
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder={`Kenya`}
                            className={`dashboard-form-input border-gray-600`}
                        />
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className={`bg-gray-800 rounded-lg p-6`}>
                <h2 className={`text-xl font-semibold text-white mb-6`}>Contact Information</h2>

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                    {/* Phone */}
                    <div>
                        <label htmlFor={`phone`} className={`dashboard-form-label mb-2`}>Phone Number</label>
                        <input
                            type={`tel`}
                            id={`phone`}
                            name={`phone`}
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`dashboard-form-input ${errors.phone ? 'border-red-500' : 'border-gray-600'}`}
                            placeholder={`+1 (555) 123-4567`}
                        />
                        {errors.phone && (
                            <p className={`mt-1 text-sm text-red-400 flex items-center`}>
                                <ExclamationTriangleIcon className={`size-4 mr-1`}/>
                                {errors.phone}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor={`email`} className={`dashboard-form-label mb-2`}>Email Address</label>
                        <input
                            type={`email`}
                            id={`email`}
                            name={`email`}
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`dashboard-form-input ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                            placeholder={`location@company.com`}
                        />
                        {errors.email && (
                            <p className={`mt-1 text-sm text-red-400 flex items-center`}>
                                <ExclamationTriangleIcon className={`size-4 mr-1`}/>
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Operating Hours */}
            <div className={`bg-gray-800 rounded-lg p-6`}>
                <h2 className={`text-xl font-semibold text-white mb-6`}>Operating Hours</h2>

                <div className={`space-y-4`}>
                    {Object.entries(formData.operating_hours).map(([day, hours]) => (
                        <div key={day} className={`flex items-center space-x-4`}>
                            <div className={`w-24`}>
                                <span className={`text-sm font-medium text-gray-300 capitalize`}>{day}</span>
                            </div>
                            <div className={`flex-1`}>
                                <input
                                    type={`text`}
                                    value={hours}
                                    onChange={(e) => handleOperatingHoursChange(day, e.target.value)}
                                    className={`dashboard-form-input border-gray-600`}
                                    placeholder={`9:00 AM - 5:00 PM or Closed`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className={`bg-gray-800 rounded-lg p-6`}>
                <h2 className={`text-xl font-semibold text-white mb-6`}>Features & Amenities</h2>

                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`}>
                    {availableFeatures.map((feature) => (
                        <label key={feature} className={`flex items-center`}>
                            <input
                                type={`checkbox`}
                                checked={formData.features.includes(feature)}
                                onChange={() => handleFeatureToggle(feature)}
                                className={`size-4 text-teal-600 focus:ring-teal-500 border-gray-600 rounded bg-gray-700`}
                            />
                            <span className={`ml-2 text-sm text-gray-300`}>{feature}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Form Actions */}
            <div className={`flex items-center justify-end space-x-4 pt-6`}>
                <Link
                    href={`/dashboard/locations`}
                    className={`px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors duration-200`}
                >
                    Cancel
                </Link>
                <button
                    type={`submit`}
                    disabled={loading}
                    className={`px-6 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 rounded-lg text-white font-medium transition-colors duration-200 flex items-center`}
                >
                    {loading ? (
                        <>
                            <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2`}/>
                            {isEditing ? 'Updating...' : 'Creating...'}
                        </>
                    ) : (
                        <>
                            <CheckIcon className={`size-4 mr-2`}/>
                            {isEditing ? 'Update Location' : 'Create Location'}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}