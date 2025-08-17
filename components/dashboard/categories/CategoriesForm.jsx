'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useParams, useRouter} from 'next/navigation';
import {HiOutlineCloudArrowUp, HiOutlinePhoto, HiOutlineXMark} from "react-icons/hi2";
import {toast} from "react-toastify";
import {addCategory, updateCategory} from "@/lib/queryCategories";

export default function CategoriesForm({categories, category, organizationId}) {
    const params = useParams();
    const router = useRouter();
    const isEditing = !!params.id;

    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: category?.name || '',
        description: category?.description || '',
        parent_id: category?.parent_id || '',
        image_url: category?.image_url || '',
        is_active: category?.is_active || false,
        sort_order: category?.sort_order || 1,
        organization_id: organizationId,
    });

    const [errors, setErrors] = useState({});

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setErrors(prev => ({...prev, image: 'Please select a valid image file'}));
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors(prev => ({...prev, image: 'Image size should be less than 5MB'}));
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                setFormData(prev => ({...prev, image_url: e.target.result}));
            };
            reader.readAsDataURL(file);

            // Clear any previous image errors
            if (errors.image) {
                setErrors(prev => ({...prev, image: ''}));
            }
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        setFormData(prev => ({...prev, image_url: ''}));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        }

        if (formData.sort_order < 1) {
            newErrors.sort_order = 'Sort order must be at least 1';
        }

        // Check for circular parent relationship
        if (formData.parent_id && isEditing && formData.parent_id === category.id) {
            newErrors.parent_id = 'A category cannot be its own parent';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (isEditing) {
            await handleEditSubmit();
        } else {
            await handleCreateSubmit();
        }
    };

    const handleEditSubmit = async () => {
        setSubmitting(true);

        try {
            const updatedCategory = await updateCategory(params.id, formData);

            toast.success(`Category ${updatedCategory?.name} updated successfully`, {
                    theme: 'dark',
                    autoClose: 5000,
                }
            );

            router.push(`/dashboard/categories`);
        } catch (error) {
            console.error('Error updating category: ', error);
            setErrors({submit: 'An error occurred while updating the category'});
        } finally {
            setSubmitting(false);
        }
    }

    const handleCreateSubmit = async () => {
        setSubmitting(true);

        try {
            const addedCategory = await addCategory(formData);
            toast.success(`Category ${addedCategory?.name} created successfully`, {
                    theme: 'dark',
                    autoClose: 5000,
                }
            );

            router.push(`/dashboard/categories`);
        } catch (error) {
            console.error('Error saving category:', error);
            setErrors({submit: 'An error occurred while saving the category'});
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`space-y-6`}>
            <div className={`bg-gray-800 rounded-lg border border-gray-700 p-6`}>
                {/* Basic Information */}
                <div className={`mb-6`}>
                    <h2 className={`text-xl font-semibold text-white mb-4`}>Basic Information</h2>

                    <div className={`grid grid-cols-1 gap-6`}>
                        {/* Name */}
                        <div>
                            <label htmlFor={`name`} className={`dashboard-form-label mb-2`}>Category Name *</label>
                            <input
                                type={`text`}
                                id={`name`}
                                name={`name`}
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`dashboard-form-input ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                                placeholder={`Enter category name`}
                            />
                            {errors.name && (
                                <p className={`mt-1 text-sm text-red-400`}>{errors.name}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor={`description`} className={`dashboard-form-label mb-2`}>Description *</label>
                            <textarea
                                id={`description`}
                                name={`description`}
                                rows={4}
                                value={formData.description}
                                onChange={handleInputChange}
                                className={`dashboard-form-input resize-none border-gray-600`}
                                placeholder={`Enter category description`}
                            />
                        </div>

                        {/* Parent Category */}
                        <div>
                            <label htmlFor={`parent_id`} className={`dashboard-form-label mb-2`}>Parent Category</label>
                            <select
                                id={`parent_id`}
                                name={`parent_id`}
                                value={formData.parent_id}
                                onChange={handleInputChange}
                                className={`dashboard-form-input ${errors.parent_id ? 'border-red-500' : 'border-gray-600'}`}
                            >
                                <option value="">Select a parent category (optional)</option>
                                {categories
                                    .filter(cat => !isEditing || cat.id !== params.id)
                                    .map((category) => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                            </select>
                            {errors.parent_id && (
                                <p className={`mt-1 text-sm text-red-400`}>{errors.parent_id}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Category Image */}
                <div className={`mb-6`}>
                    <h2 className={`text-xl font-semibold text-white mb-4`}>Category Image</h2>

                    <div className={`space-y-4`}>
                        {imagePreview ? (
                            <div className={`relative`}>
                                <img
                                    src={imagePreview}
                                    alt={`Category preview`}
                                    className={`w-full h-48 object-cover rounded-lg bg-gray-700`}
                                />
                                <button
                                    type={`button`}
                                    onClick={removeImage}
                                    className={`absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors duration-200`}
                                >
                                    <HiOutlineXMark className={`size-4`}/>
                                </button>
                            </div>
                        ) : (
                            <div className={`border-2 border-dashed border-gray-600 rounded-lg p-8`}>
                                <div className={`text-center`}>
                                    <HiOutlinePhoto className={`size-12 text-gray-400 mx-auto mb-4`}/>
                                    <p className={`text-gray-400 mb-4`}>No image uploaded</p>
                                    <label className={`cursor-pointer`}>
                                        <span
                                            className={`inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200`}>
                                            <HiOutlineCloudArrowUp className={`size-5 mr-2`}/>
                                            Upload Image
                                        </span>
                                        <input
                                            type={`file`}
                                            className={`hidden`}
                                            accept={`image/*`}
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}

                        {!imagePreview && (
                            <div className={`text-center`}>
                                <label className={`cursor-pointer`}>
                                    <span
                                        className={`inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors duration-200`}>
                                        <HiOutlineCloudArrowUp className={`size-5 mr-2`}/>
                                        Choose Image
                                    </span>
                                    <input
                                        type={`file`}
                                        className={`hidden`}
                                        accept={`image/*`}
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        )}

                        {errors.image && (
                            <p className={`text-sm text-red-400`}>{errors.image}</p>
                        )}

                        <p className={`text-sm text-gray-400`}>Supported formats: JPG, PNG, GIF. Max size: 5MB</p>
                    </div>
                </div>

                {/* Settings */}
                <div className={`mb-6`}>
                    <h2 className={`text-xl font-semibold text-white mb-4`}>Settings</h2>

                    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>
                        {/* Sort Order */}
                        <div>
                            <label htmlFor={`sort_order`} className={`dashboard-form-label mb-2`}>Sort Order</label>
                            <input
                                type={`number`}
                                id={`sort_order`}
                                name={`sort_order`}
                                min={1}
                                value={formData.sort_order}
                                onChange={handleInputChange}
                                className={`dashboard-form-input ${errors.sort_order ? 'border-red-500' : 'border-gray-600'}`}
                            />
                            {errors.sort_order && (
                                <p className={`mt-1 text-sm text-red-400`}>{errors.sort_order}</p>
                            )}
                        </div>

                        {/* Active Status */}
                        <div className={`flex items-center space-x-3 pt-6`}>
                            <input
                                type={`checkbox`}
                                id={`is_active`}
                                name={`is_active`}
                                checked={formData.is_active}
                                onChange={handleInputChange}
                                className={`size-4 text-teal-600 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 focus:ring-2`}
                            />
                            <label htmlFor={`is_active`} className={`dashboard-form-label`}>Active Category</label>
                        </div>
                    </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                    <div className={`mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg`}>
                        <p className={`text-red-400`}>{errors.submit}</p>
                    </div>
                )}

                {/* Form Actions */}
                <div className={`flex justify-end space-x-4`}>
                    <Link
                        href={`/dashboard/categories`}
                        className={`px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors duration-200`}
                    >
                        Cancel
                    </Link>
                    <button
                        type={`submit`}
                        disabled={submitting}
                        className={`px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
                    >
                        {submitting ? (
                            <>
                                <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2`}></div>
                                {isEditing ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>{isEditing ? 'Update Category' : 'Create Category'}</>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}