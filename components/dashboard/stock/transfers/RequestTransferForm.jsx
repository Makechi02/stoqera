'use client'

import {useState} from 'react';
import {ArrowRightIcon, BuildingStorefrontIcon} from '@heroicons/react/24/outline';
import {ProgressLoader} from "@/components";
import ProductSearchModal from "@/components/dashboard/stock/transfers/ProductSearchModal";
import TransferItemsForm from "@/components/dashboard/stock/transfers/TransferItemsForm";
import {useRouter} from "next/navigation";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {createTransfer} from "@/lib/stock/queryStockTransfers";

export default function RequestTransferForm({locations, products}) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        from_location_id: '',
        to_location_id: '',
        notes: '',
        items: []
    });
    const [showProductSearch, setShowProductSearch] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when field is updated
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };


    const validateForm = () => {
        const newErrors = {};

        if (!formData.from_location_id) {
            newErrors.from_location_id = 'Please select a source location';
        }

        if (!formData.to_location_id) {
            newErrors.to_location_id = 'Please select a destination location';
        }

        if (formData.from_location_id === formData.to_location_id) {
            newErrors.to_location_id = 'Destination must be different from source';
        }

        if (formData.items.length === 0) {
            newErrors.items = 'Please add at least one item to transfer';
        }

        // Validate item quantities
        formData.items.forEach((item, index) => {
            if (item.quantity > item.current_stock) {
                newErrors[`item_${index}`] = `Quantity exceeds available stock (${item.current_stock})`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await createTransfer(formData);

            if (response.data.transfer) {
                setFormData({
                    from_location_id: '',
                    to_location_id: '',
                    notes: '',
                    items: []
                });

                showSuccessToast('Transfer request created successfully!');
                router.push('/dashboard/stock/transfers');
            }
        } catch (error) {
            console.error('Error creating transfer:', error);
            showErrorToast('Error creating transfer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`max-w-4xl mx-auto py-8`}>
            <div className={`space-y-8`}>
                {/* Transfer Details */}
                <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                    <h2 className={`text-lg font-medium mb-6`}>Transfer Details</h2>

                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                        {/* From Location */}
                        <div>
                            <label className={`dashboard-form-label mb-2`}>From Location *</label>
                            <select
                                value={formData.from_location_id}
                                onChange={(e) => updateFormData('from_location_id', e.target.value)}
                                className={`dashboard-form-input ${errors.from_location_id ? 'border-red-500' : 'border-gray-600'}`}
                            >
                                <option value="">Select source location</option>
                                {locations.map(location => (
                                    <option key={location.id} value={location.id}>{location.name}</option>
                                ))}
                            </select>
                            {errors.from_location_id && (
                                <p className={`mt-1 text-sm text-red-400`}>{errors.from_location_id}</p>
                            )}
                        </div>

                        {/* To Location */}
                        <div>
                            <label className={`dashboard-form-label mb-2`}>To Location *</label>
                            <select
                                value={formData.to_location_id}
                                onChange={(e) => updateFormData('to_location_id', e.target.value)}
                                className={`dashboard-form-input ${errors.to_location_id ? 'border-red-500' : 'border-gray-600'}`}
                            >
                                <option value="">Select destination location</option>
                                {locations
                                    .filter(location => location.id !== formData.from_location_id)
                                    .map(location => (
                                        <option key={location.id} value={location.id}>{location.name}</option>
                                    ))}
                            </select>
                            {errors.to_location_id && (
                                <p className={`mt-1 text-sm text-red-400`}>{errors.to_location_id}</p>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className={`mt-6`}>
                        <label className={`dashboard-form-label mb-2`}>Notes</label>
                        <textarea
                            value={formData.notes}
                            onChange={(e) => updateFormData('notes', e.target.value)}
                            rows={3}
                            className={`dashboard-form-input border-gray-600`}
                            placeholder={`Add any notes about this transfer...`}
                        />
                    </div>
                </div>

                {formData.from_location_id && formData.to_location_id && (
                    <RouteVisualization formData={formData} locations={locations}/>
                )}

                <TransferItemsForm
                    formData={formData}
                    setFormData={setFormData}
                    setShowProductSearch={setShowProductSearch}
                    errors={errors}
                />

                {/* Submit Button */}
                <div className={`flex justify-end space-x-4`}>
                    <button type={`button`} className={`dashboard-cancel-btn`}>Cancel</button>
                    <button
                        type={`button`}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`dashboard-submit-btn`}
                    >
                        {isSubmitting ? (
                            <>
                                <ProgressLoader/>
                                Requesting Transfer...
                            </>
                        ) : 'Request Transfer'}
                    </button>
                </div>
            </div>

            {showProductSearch && (
                <ProductSearchModal
                    formData={formData}
                    setFormData={setFormData}
                    setShowProductSearch={setShowProductSearch}
                    products={products}
                />
            )}
        </div>
    );
};


function RouteVisualization({locations, formData}) {
    const getLocationName = (id) => {
        const location = locations.find(loc => loc.id === id);
        return location ? location.name : '';
    };

    return (
        <div className={`bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700`}>
            <h3 className={`text-lg font-medium mb-4`}>Transfer Route</h3>
            <div className={`flex items-center justify-center space-x-4`}>
                <div className={`flex items-center bg-gray-700 rounded-lg p-4`}>
                    <BuildingStorefrontIcon className={`size-8 text-teal-400 mr-3`}/>
                    <div>
                        <p className={`text-sm text-gray-400`}>From</p>
                        <p className={`font-medium`}>{getLocationName(formData.from_location_id)}</p>
                    </div>
                </div>
                <div className={`flex-shrink-0`}>
                    <ArrowRightIcon className={`size-5 text-gray-400`}/>
                </div>
                <div className={`flex items-center bg-gray-700 rounded-lg p-4`}>
                    <BuildingStorefrontIcon className={`size-8 text-blue-400 mr-3`}/>
                    <div>
                        <p className={`text-sm text-gray-400`}>To</p>
                        <p className={`font-medium`}>{getLocationName(formData.to_location_id)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
