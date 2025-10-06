'use client'

import {useState} from 'react';
import {CheckCircleIcon, CheckIcon, ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import {productFormTabs} from "@/utils/productUtils";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {productFormSchema} from "@/schema/productSchema";
import {addProduct, updateProduct} from "@/lib/products/queryProducts";
import {useRouter} from "next/navigation";
import {ProgressLoader} from "@/components";
import BasicInfoTab from "@/components/dashboard/products/BasicInfoTab";
import PricingTab from "@/components/dashboard/products/PricingTab";
import VariantsTab from "@/components/dashboard/products/VariantsTab";
import MediaTab from "@/components/dashboard/products/MediaTab";

export default function ProductForm({categories, product = null}) {
    const router = useRouter();
    const isEditing = !!product?.id;

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState({
        sku: product?.sku || '',
        name: product?.name || '',
        description: product?.description || '',
        brand: product?.brand || '',
        category_id: product?.category_id || '',
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
        dimensions: product?.dimensions || {length: '', width: '', height: ''},
        tags: product?.tags || [],
        is_active: product?.is_active || false,
        is_trackable: product?.is_trackable || false
    });

    const [variants, setVariants] = useState(product?.variants || []);
    const [images] = useState(product?.images || []);
    const [touchedTabs, setTouchedTabs] = useState({basic: true});

    // Tab completion status
    const getTabStatus = (tabId) => {
        if (tabId === 'basic') {
            return formData.name && formData.sku;
        }
        if (tabId === 'pricing') {
            return formData.cost_price && formData.selling_price;
        }
        return true;
    };

    const changeTab = (tabId) => {
        setActiveTab(tabId);
        setTouchedTabs(prev => ({...prev, [tabId]: true}));
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({...prev, [field]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check required productFormTabs
        const requiredTabs = productFormTabs.filter(tab => tab.required);
        const incompleteTabs = requiredTabs.filter(tab => !getTabStatus(tab.id));

        if (incompleteTabs.length > 0) {
            showErrorToast(`Please complete the following required sections: ${incompleteTabs.map(t => t.name).join(', ')}`);
            setActiveTab(incompleteTabs[0].id);
            return;
        }

        setLoading(true);

        try {
            const submitData = {
                ...formData,
                variants,
                cost_price: parseFloat(formData.cost_price),
                selling_price: parseFloat(formData.selling_price),
                min_stock_level: parseInt(formData.min_stock_level.trim() ? formData.min_stock_level.trim() : 0),
                max_stock_level: parseInt(formData.max_stock_level.trim() ? formData.max_stock_level.trim() : 0),
                reorder_point: parseInt(formData.reorder_point.trim() ? formData.reorder_point.trim() : 0),
                reorder_quantity: parseInt(formData.reorder_quantity.trim() ? formData.reorder_quantity.trim() : 0),
                weight: parseFloat(formData.weight.trim() ? formData.weight.trim() : 0),
            };

            const result = productFormSchema.safeParse(submitData);
            if (!result.success) {
                const errorMessages = JSON.parse(result.error.message);
                for (let i = 0; i < errorMessages.length; i++) {
                    showErrorToast(errorMessages[i].message);
                }
                return;
            }

            if (isEditing) {
                await handleEditSubmit(submitData);
            }

            await handleCreateSubmit(submitData);
        } catch (error) {
            console.error('Error adding product:', error);
            showErrorToast('An error has occurred!. Please try again');
        } finally {
            setLoading(false);
        }
    };

    const handleEditSubmit = async (submitData) => {
        const editedProduct = await updateProduct(product.id, submitData);

        if (!editedProduct) {
            showErrorToast('Failed to edit product');
            return;
        }

        showSuccessToast(`Product ${editedProduct?.name} updated successfully`)

        router.push(`/dashboard/products`);
    }

    const handleCreateSubmit = async (submitData) => {
        const addedProduct = await addProduct(submitData);

        if (!addedProduct) {
            showErrorToast('Failed to add product');
            return;
        }

        showSuccessToast(`Product ${addedProduct?.data.product?.name} created successfully`);

        router.push(`/dashboard/products`);
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Tabs */}
            <div className={`border-b border-gray-800 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0`}>
                <nav className={`flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide`}>
                    {productFormTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isComplete = getTabStatus(tab.id);
                        const isTouched = touchedTabs[tab.id];

                        return (
                            <button
                                key={tab.id}
                                type={`button`}
                                onClick={() => changeTab(tab.id)}
                                className={`flex items-center py-4 px-3 sm:px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap relative ${
                                    activeTab === tab.id
                                        ? 'border-teal-500 text-teal-500'
                                        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-700'
                                }`}
                            >
                                <Icon className={`size-5 mr-2 flex-shrink-0`}/>
                                <span className={`hidden sm:inline`}>{tab.name}</span>
                                <span className={`sm:hidden`}>{tab.name.split(' ')[0]}</span>
                                {tab.required && (
                                    <span className={`ml-1 text-red-400`}>*</span>
                                )}
                                {isTouched && isComplete && (
                                    <CheckCircleIcon className={`size-4 ml-2 text-green-500`}/>
                                )}
                                {isTouched && !isComplete && tab.required && (
                                    <ExclamationTriangleIcon className={`size-4 ml-2 text-yellow-500`}/>
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {activeTab === 'basic' && (
                <BasicInfoTab
                    formData={formData}
                    setFormData={setFormData}
                    updateFormData={updateFormData}
                    categories={categories}
                />
            )}

            {/* Pricing & Stock Tab */}
            {activeTab === 'pricing' && (
                <PricingTab formData={formData} updateProduct={updateFormData}/>
            )}

            {/* Variants Tab */}
            {activeTab === 'variants' && (
                <VariantsTab variants={variants} setVariants={setVariants}/>
            )}

            {/* Media Tab */}
            {activeTab === 'media' && (
                <MediaTab images={images}/>
            )}

            {/* Navigation & Action Buttons */}
            <div className={`flex flex-wrap gap-4 justify-between items-center mt-8`}>
                <button
                    type={`button`}
                    onClick={() => {
                        const currentIndex = productFormTabs.findIndex(t => t.id === activeTab);
                        if (currentIndex > 0) {
                            changeTab(productFormTabs[currentIndex - 1].id);
                        }
                    }}
                    disabled={activeTab === 'basic'}
                    className={`px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors border border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    Previous
                </button>

                {activeTab !== 'media' && (
                    <button
                        type={`button`}
                        onClick={() => {
                            const currentIndex = productFormTabs.findIndex(t => t.id === activeTab);
                            if (currentIndex < productFormTabs.length - 1) {
                                changeTab(productFormTabs[currentIndex + 1].id);
                            }
                        }}
                        className={`px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                    >
                        Next
                    </button>
                )}

                {activeTab === 'media' && (
                    <button
                        type={`submit`}
                        disabled={loading}
                        className={`px-8 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-600/50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center`}
                    >
                        {loading ? (
                            <>
                                <ProgressLoader className={`mr-2`}/>
                                {isEditing ? 'Updating Product...' : 'Creating Product...'}
                            </>
                        ) : (
                            <>
                                <CheckIcon className={`size-5 mr-2`}/>
                                {isEditing ? 'Update Product' : 'Create Product'}
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Progress indicator */}
            <div className={`mt-6 bg-gray-900 rounded-lg p-4 border border-gray-800`}>
                <div className={`flex justify-between items-center mb-2`}>
                    <span className={`text-sm font-medium text-gray-300`}>Completion Progress</span>
                    <span className={`text-sm text-gray-400`}>
                        {productFormTabs.filter(tab => getTabStatus(tab.id)).length} / {productFormTabs.filter(tab => tab.required).length} required sections
                    </span>
                </div>
                <div className={`w-full bg-gray-800 rounded-full h-2`}>
                    <div
                        className={`bg-teal-600 h-2 rounded-full transition-all duration-300`}
                        style={{
                            width: `${(productFormTabs.filter(tab => tab.required && getTabStatus(tab.id)).length / productFormTabs.filter(tab => tab.required).length) * 100}%`
                        }}
                    ></div>
                </div>
            </div>
        </form>
    );
}
