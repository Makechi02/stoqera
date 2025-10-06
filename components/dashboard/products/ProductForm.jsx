'use client'

import {useRef, useState} from "react";
import {CheckIcon, ExclamationTriangleIcon, InformationCircleIcon} from "@heroicons/react/24/outline";
import BasicInfoForm from "@/components/dashboard/products/BasicInfoForm";
import PricingForm from "@/components/dashboard/products/PricingForm";
import InventoryForm from "@/components/dashboard/products/InventoryForm";
import PhysicalForm from "@/components/dashboard/products/PhysicalForm";
import MediaForm from "@/components/dashboard/products/MediaForm";
import Link from "next/link";
import {productCreationTips, productsFormTabs} from "@/data/constants/constants";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {addProduct, updateProduct} from "@/lib/products/queryProducts";

export default function ProductForm({categories, product = null}) {
    const router = useRouter();
    const isEditing = !!product?.id;

    const [formData, setFormData] = useState({
        sku: product?.sku || '',
        name: product?.name || '',
        description: product?.description || '',
        category_id: product?.category_id || '',
        brand: product?.brand || '',
        unit_of_measure: product?.unit_of_measure || 'pcs',
        barcode: product?.barcode || '',
        qr_code: product?.qr_code || '',
        cost_price: product?.cost_price || '',
        selling_price: product?.selling_price || '',
        min_stock_level: product?.min_stock_level || '',
        max_stock_level: product?.max_stock_level || '',
        reorder_point: product?.reorder_point || '',
        reorder_quantity: product?.reorder_quantity || '',
        weight: product?.weight || '',
        dimensions: product?.dimensions || {
            length: '',
            width: '',
            height: ''
        },
        tags: product?.tags || [],
        is_active: product?.is_active || false,
        is_trackable: product?.is_trackable || false,
    });

    const [images, setImages] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [activeTab, setActiveTab] = useState('basic');
    const fileInputRef = useRef(null);

    const handleInputChange = (field, value) => {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({...prev, [field]: value}));
        }

        // Clear error when the user starts typing
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: null}));
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages(prev => [...prev, {
                    id: Date.now() + Math.random(),
                    file: file,
                    preview: e.target.result,
                    name: file.name
                }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (imageId) => {
        setImages(prev => prev.filter(img => img.id !== imageId));
    };

    const addTag = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.category_id) newErrors.category_id = 'Category is required';
        if (!formData.cost_price || parseFloat(formData.cost_price) < 0) {
            newErrors.cost_price = 'Valid cost price is required';
        }
        if (!formData.selling_price || parseFloat(formData.selling_price) < 0) {
            newErrors.selling_price = 'Valid selling price is required';
        }
        if (parseFloat(formData.selling_price) < parseFloat(formData.cost_price)) {
            newErrors.selling_price = 'Selling price should be greater than cost price';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const submitData = {
                ...formData,
                cost_price: parseFloat(formData.cost_price),
                selling_price: parseFloat(formData.selling_price),
                min_stock_level: parseInt(formData.min_stock_level.trim() ? formData.min_stock_level.trim() : 0),
                max_stock_level: parseInt(formData.max_stock_level.trim() ? formData.max_stock_level.trim() : 0),
                reorder_point: parseInt(formData.reorder_point.trim() ? formData.reorder_point.trim() : 0),
                reorder_quantity: parseInt(formData.reorder_quantity.trim() ? formData.reorder_quantity.trim() : 0),
                weight: parseFloat(formData.weight.trim() ? formData.weight.trim() : 0),
                images: images.map(img => img.preview)
            }

            if (isEditing) {
                await handleEditSubmit(submitData);
            } else {
                await handleCreateSubmit(submitData);
            }
        } catch (error) {
            console.error('Error adding product:', error);
            toast.error(`An error has occurred!. Please try again`, {
                    theme: 'dark',
                    autoClose: 5000,
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditSubmit = async (submitData) => {
        const editedProduct = await updateProduct(product.id, submitData);

        if (!editedProduct) {
            throw new Error('Failed to edit product');
        }

        toast.success(`Product ${editedProduct?.name} updated successfully`, {
                theme: 'dark',
                autoClose: 5000,
            }
        );

        router.push(`/dashboard/products`);
    }

    const handleCreateSubmit = async (submitData) => {
        const addedProduct = await addProduct(submitData);

        if (!addedProduct) {
            throw new Error('Failed to add product');
        }

        toast.success(`Product ${addedProduct?.name} created successfully`, {
                theme: 'dark',
                autoClose: 5000,
            }
        );

        router.push(`/dashboard/products`);
    }

    const nextTab = () => {
        const currentIndex = productsFormTabs.findIndex(tab => tab.id === activeTab);
        const nextIndex = (currentIndex + 1) % productsFormTabs.length;
        setActiveTab(productsFormTabs[nextIndex].id);
    };

    const prevTab = () => {
        const currentIndex = productsFormTabs.findIndex(tab => tab.id === activeTab);
        const prevIndex = (currentIndex - 1 + productsFormTabs.length) % productsFormTabs.length;
        setActiveTab(productsFormTabs[prevIndex].id);
    }

    return (
        <form>
            <div className={`flex flex-col lg:flex-row gap-8`}>
                {/* Sidebar Navigation */}
                <div className={`lg:w-64 flex-shrink-0`}>
                    <div className={`bg-gray-800 rounded-xl p-4 border border-gray-700 sticky top-8`}>
                        <nav className={`space-y-2`}>
                            {productsFormTabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        type={`button`}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-teal-600 text-white'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                        }`}
                                    >
                                        <Icon className={`size-5 mr-3`}/>
                                        {tab.name}
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Progress Indicator */}
                        <div className={`mt-6 pt-6 border-t border-gray-700`}>
                            <div className={`flex items-center text-sm text-gray-400`}>
                                <InformationCircleIcon className={`size-4 mr-2`}/>
                                <span>Fill required fields (*)</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className={`flex-1`}>
                    <div className={`bg-gray-800 rounded-xl border border-gray-700 p-8`}>
                        {activeTab === 'basic' && BasicInfoForm({
                            formData,
                            errors,
                            onChange: handleInputChange,
                            categories,
                        })}
                        {activeTab === 'pricing' && PricingForm({
                            formData,
                            errors,
                            onChange: handleInputChange
                        })}
                        {activeTab === 'inventory' && InventoryForm({formData, onChange: handleInputChange})}
                        {activeTab === 'physical' && PhysicalForm({formData, onChange: handleInputChange})}
                        {activeTab === 'media' && MediaForm({
                            formData,
                            images,
                            fileInputRef,
                            handleImageUpload,
                            removeImage,
                            addTag,
                            removeTag,
                            currentTag,
                            setCurrentTag
                        })}
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex justify-between items-center mt-8`}>
                        <Link
                            href={`/dashboard/products`}
                            className={`px-6 py-3 border border-gray-600 text-gray-400 hover:text-text hover:border-gray-500 rounded-lg transition-colors`}
                        >
                            Cancel
                        </Link>

                        <div className={`flex gap-4`}>
                            {activeTab !== 'basic' && (
                                <button
                                    type={`button`}
                                    disabled={isSubmitting}
                                    onClick={prevTab}
                                    className={`px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors`}
                                >
                                    Previous
                                </button>
                            )}

                            <button
                                type={`button`}
                                disabled={isSubmitting}
                                onClick={activeTab === 'media' ? handleSubmit : nextTab}
                                className={`px-8 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-600/50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex items-center`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                                    stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {isEditing ? 'Updating Product...' : 'Creating Product...'}
                                    </>
                                ) : (
                                    activeTab === 'media' ? (
                                        <>
                                            <CheckIcon className={`size-5 mr-2`}/>
                                            {isEditing ? 'Update Product' : 'Create Product'}
                                        </>
                                    ) : (
                                        <span>Next</span>
                                    )
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Form Validation Summary */}
                    {Object.keys(errors).length > 0 && (
                        <div className={`mt-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg`}>
                            <div className={`flex items-center mb-2`}>
                                <ExclamationTriangleIcon className={`size-5 text-red-400 mr-2`}/>
                                <h3 className={`text-red-400 font-medium`}>Please fix the following errors:</h3>
                            </div>
                            <ul className={`text-red-300 text-sm space-y-1 ml-7`}>
                                {Object.entries(errors).map(([field, error]) => (
                                    <li key={field}>• {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <HelpSection/>
                </div>
            </div>
        </form>
    )
}

function HelpSection() {
    return (
        <div className={`mt-8 p-6 bg-blue-900/20 border border-blue-500/50 rounded-lg`}>
            <div className={`flex items-start`}>
                <InformationCircleIcon className={`size-6 text-blue-400 mt-0.5 mr-3 flex-shrink-0`}/>
                <div>
                    <h3 className={`text-blue-400 font-medium mb-2`}>Product Creation Tips</h3>
                    <ul className={`text-blue-300 text-sm space-y-1 list-disc list-inside`}>
                        {productCreationTips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
