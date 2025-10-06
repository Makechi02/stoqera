'use client'

import {useState} from 'react';
import {
    CheckCircleIcon,
    CheckIcon,
    Cog8ToothIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    PhotoIcon,
    PlusIcon,
    TagIcon,
    TrashIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {formatCurrency} from "@/utils/formatters";
import {generateSKU, productFormTabs, unitsOfMeasure} from "@/utils/productUtils";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {productFormSchema, productRegex} from "@/schema/productSchema";
import {addProduct, updateProduct} from "@/lib/products/queryProducts";
import {useRouter} from "next/navigation";
import {ProgressLoader} from "@/components";
import {z} from "zod";

export default function AddProductForm({categories, product = null}) {
    const router = useRouter();
    const isEditing = !!product?.id;

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        brand: '',
        category_id: '',
        unit_of_measure: 'pcs',
        barcode: '',
        qr_code: '',
        cost_price: '',
        selling_price: '',
        min_stock_level: '',
        max_stock_level: '',
        reorder_point: '',
        reorder_quantity: '',
        weight: '',
        dimensions: {length: '', width: '', height: ''},
        tags: [],
        is_active: true,
        is_trackable: true
    });

    const [variants, setVariants] = useState([]);
    const [images] = useState([]);
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

            if (isEditing) {
                const editSchema = productFormSchema.extend({
                    id: z.string().regex(productRegex.uuid, 'Product ID is required for editing'),
                }).partial().required({id: true});

                const result = editSchema.safeParse(submitData);
                if (!result.success) {
                    const errorMessages = JSON.parse(result.error.message);
                    for (let i = 0; i < errorMessages.length; i++) {
                        showErrorToast(errorMessages[i].message);
                    }
                    return;
                }

                await handleEditSubmit(submitData);
            }

            const result = productFormSchema.safeParse(submitData);
            if (!result.success) {
                const errorMessages = JSON.parse(result.error.message);
                for (let i = 0; i < errorMessages.length; i++) {
                    showErrorToast(errorMessages[i].message);
                }
                return;
            }

            console.log('Product:', submitData);
            // showSuccessToast('Product saved successfully! (Integration with Supabase needed)');

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

function InfoTooltip({text}) {
    return (
        <div className="group relative inline-block ml-2">
            <InformationCircleIcon className="w-4 h-4 text-gray-500 hover:text-teal-400 cursor-help"/>
            <div
                className="invisible group-hover:visible absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg border border-gray-700 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                {text}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-gray-800"></div>
                </div>
            </div>
        </div>
    )
}

function BasicInfoTab({formData, updateFormData, setFormData, categories}) {
    const [newTag, setNewTag] = useState('');

    const updateDimension = (field, value) => {
        setFormData(prev => ({
            ...prev,
            dimensions: {...prev.dimensions, [field]: value}
        }));
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

    return (
        <div className={`space-y-6 bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>Product Name *</label>
                    <input
                        type={`text`}
                        required
                        value={formData.name}
                        onChange={(e) => updateFormData('name', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Enter product name`}
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        SKU *
                        <InfoTooltip
                            text={`Stock Keeping Unit - A unique identifier for this product in your inventory system`}/>
                    </label>
                    <div className={`flex gap-2`}>
                        <input
                            type={`text`}
                            required
                            value={formData.sku}
                            onChange={(e) => updateFormData('sku', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`e.g., PROD-001`}
                        />
                        <button
                            type={`button`}
                            onClick={() => {
                                const generatedSku = generateSKU();
                                updateFormData('sku', generatedSku);
                            }}
                            className={`px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                            title={`Generate SKU`}
                        >
                            Generate
                        </button>
                    </div>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Category
                        <InfoTooltip text={`Select a category to organize and group similar products together`}/>
                    </label>
                    <select
                        value={formData.category_id}
                        onChange={(e) => updateFormData('category_id', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Brand</label>
                    <input
                        type={`text`}
                        value={formData.brand}
                        onChange={(e) => updateFormData('brand', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Enter brand name`}
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Unit of Measure
                        <InfoTooltip
                            text={`The standard unit used to measure this product (pieces, kilograms, liters, etc.)`}/>
                    </label>
                    <select
                        value={formData.unit_of_measure}
                        onChange={(e) => updateFormData('unit_of_measure', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                    >
                        {unitsOfMeasure.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        Barcode
                        <InfoTooltip text={`The barcode number for scanning this product at point of sale`}/>
                    </label>
                    <input
                        type={`text`}
                        value={formData.barcode}
                        onChange={(e) => updateFormData('barcode', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Enter barcode`}
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>
                        QR Code
                        <InfoTooltip text={`QR code data for quick product identification and tracking`}/>
                    </label>
                    <input
                        type={`text`}
                        value={formData.qr_code}
                        onChange={(e) => updateFormData('qr_code', e.target.value)}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Enter QR code`}
                    />
                </div>
            </div>

            <div>
                <label className={`dashboard-form-label mb-2`}>Description</label>
                <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateFormData('description', e.target.value)}
                    className={`dashboard-form-input border-gray-700`}
                    placeholder={`Enter product description`}
                />
            </div>

            {/* Tags */}
            <div>
                <label className={`dashboard-form-label mb-2`}>
                    Tags
                    <InfoTooltip text={`Add tags to categorize and easily search for this product`}/>
                </label>
                <div className={`flex gap-2 mb-3`}>
                    <input
                        type={`text`}
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className={`dashboard-form-input border-gray-700`}
                        placeholder={`Add a tag`}
                    />
                    <button
                        type={`button`}
                        onClick={addTag}
                        className={`px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                    >
                        Add
                    </button>
                </div>
                <div className={`flex flex-wrap gap-2`}>
                    {formData.tags.map((tag, index) => (
                        <span
                            key={index}
                            className={`inline-flex items-center gap-1 px-3 py-1 bg-teal-900/30 border border-teal-700 rounded-full text-sm text-teal-300`}
                        >
                            {tag}
                            <button
                                type={`button`}
                                onClick={() => removeTag(tag)}
                                className={`hover:text-teal-100`}
                            >
                                <XMarkIcon className={`size-4`}/>
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Dimensions */}
            <div>
                <label className={`dashboard-form-label mb-2`}>
                    Dimensions (cm)
                    <InfoTooltip text={`Product dimensions for shipping and storage calculations`}/>
                </label>
                <div className={`grid grid-cols-3 gap-4`}>
                    <input
                        type={`number`}
                        step={0.01}
                        value={formData.dimensions.length}
                        onChange={(e) => updateDimension('length', e.target.value)}
                        placeholder={`Length`}
                        className={`dashboard-form-input border-gray-700`}
                    />
                    <input
                        type={`number`}
                        step={0.01}
                        value={formData.dimensions.width}
                        onChange={(e) => updateDimension('width', e.target.value)}
                        placeholder={`Width`}
                        className={`dashboard-form-input border-gray-700`}
                    />
                    <input
                        type={`number`}
                        step={0.01}
                        value={formData.dimensions.height}
                        onChange={(e) => updateDimension('height', e.target.value)}
                        placeholder={`Height`}
                        className={`dashboard-form-input border-gray-700`}
                    />
                </div>
            </div>

            <div>
                <label className={`dashboard-form-label mb-2`}>Weight (kg)</label>
                <input
                    type={`number`}
                    step={0.001}
                    value={formData.weight}
                    onChange={(e) => updateFormData('weight', e.target.value)}
                    className={`dashboard-form-input border-gray-700`}
                    placeholder={`0.000`}
                />
            </div>

            {/* Toggles */}
            <div className={`flex gap-6`}>
                <label className={`flex items-center cursor-pointer`}>
                    <input
                        type={`checkbox`}
                        checked={formData.is_active}
                        onChange={(e) => updateFormData('is_active', e.target.checked)}
                        className={`size-5 text-teal-600 bg-gray-800 border-gray-700 rounded focus:ring-teal-500 focus:ring-2`}
                    />
                    <span className={`ml-2 text-sm text-gray-300`}>Active</span>
                </label>
                <label className={`flex items-center cursor-pointer`}>
                    <input
                        type={`checkbox`}
                        checked={formData.is_trackable}
                        onChange={(e) => updateFormData('is_trackable', e.target.checked)}
                        className={`size-5 text-teal-600 bg-gray-800 border-gray-700 rounded focus:ring-teal-500 focus:ring-2`}
                    />
                    <span className={`ml-2 text-sm text-gray-300`}>Track Inventory</span>
                </label>
            </div>
        </div>
    )
}

function PricingTab({formData, updateProduct}) {
    const calculateProfit = () => {
        const cost = parseFloat(formData.cost_price) || 0;
        const selling = parseFloat(formData.selling_price) || 0;
        const profit = selling - cost;
        const margin = cost > 0 ? ((profit / cost) * 100).toFixed(2) : 0;
        return {profit, margin, isProfit: profit >= 0};
    };

    const profit = calculateProfit();

    const guides = [
        {title: 'Minimum Stock', description: 'Safety buffer - alerts when stock is critically low'},
        {title: 'Reorder Point', description: 'Triggers reorder - should be above minimum to account for lead time'},
        {
            title: 'Reorder Quantity',
            description: 'Amount to restock - calculated based on demand and supplier minimums'
        },
        {title: 'Maximum Stock', description: 'Storage capacity limit - prevents overstocking'}
    ];

    return (
        <div className={`space-y-6`}>
            {/* Profit Calculator Card */}
            {(formData.cost_price && formData.selling_price) && (
                <div
                    className={`rounded-lg p-6 border-2 ${profit.isProfit ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'}`}>
                    <div className={`flex flex-wrap items-start justify-between gap-4`}>
                        <div>
                            <h3 className={`text-lg font-semibold text-white mb-1`}>
                                {profit.isProfit ? 'Profit Analysis' : 'Loss Warning'}
                            </h3>
                            <p className={`text-sm text-gray-400`}>Based on current pricing</p>
                        </div>
                        <div className={`flex-1 flex flex-col justify-end text-right`}>
                            <div
                                className={`text-3xl font-bold ${profit.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                                {formatCurrency(Math.abs(profit.profit))}
                            </div>
                            <div className={`text-sm ${profit.isProfit ? 'text-green-500' : 'text-red-500'}`}>
                                {profit.margin}% margin
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>
                            Cost Price *
                            <InfoTooltip text={`The amount you pay to acquire or produce this product`}/>
                        </label>
                        <div className={`relative`}>
                            <span className={`absolute left-2 top-3 text-gray-400 text-sm`}>Ksh.</span>
                            <input
                                type={`number`}
                                step={0.01}
                                required
                                value={formData.cost_price}
                                onChange={(e) => updateProduct('cost_price', e.target.value)}
                                className={`dashboard-form-input-icon border-gray-700`}
                                placeholder={`0.00`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>
                            Selling Price *
                            <InfoTooltip text={`The price at which you sell this product to customers`}/>
                        </label>
                        <div className={`relative`}>
                            <span className={`absolute left-2 top-3 text-gray-400 text-sm`}>Ksh.</span>
                            <input
                                type={`number`}
                                step={0.01}
                                required
                                value={formData.selling_price}
                                onChange={(e) => updateProduct('selling_price', e.target.value)}
                                className={`dashboard-form-input-icon border-gray-700`}
                                placeholder={`0.00`}
                            />
                        </div>
                    </div>

                    <div>
                        <label className={`flex items-center text-sm font-medium text-gray-300 mb-2`}>
                            Minimum Stock Level
                            <InfoTooltip
                                text={`The lowest quantity you want to maintain in stock before receiving alerts`}/>
                        </label>
                        <input
                            type={`number`}
                            value={formData.min_stock_level}
                            onChange={(e) => updateProduct('min_stock_level', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`0`}
                        />
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>
                            Maximum Stock Level
                            <InfoTooltip
                                text={`The maximum quantity you can or want to store (based on warehouse capacity)`}/>
                        </label>
                        <input
                            type={`number`}
                            value={formData.max_stock_level}
                            onChange={(e) => updateProduct('max_stock_level', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`0`}
                        />
                    </div>

                    <div>
                        <label className={`flex items-center text-sm font-medium text-gray-300 mb-2`}>
                            Reorder Point
                            <InfoTooltip
                                text={`When stock reaches this level, the system will trigger a reorder alert. Set this higher than minimum stock to account for delivery time.`}/>
                        </label>
                        <input
                            type={`number`}
                            value={formData.reorder_point}
                            onChange={(e) => updateProduct('reorder_point', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`0`}
                        />
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>
                            Reorder Quantity
                            <InfoTooltip
                                text={`The standard quantity to order when restocking. This should bring you back to optimal stock levels.`}/>
                        </label>
                        <input
                            type={`number`}
                            value={formData.reorder_quantity}
                            onChange={(e) => updateProduct('reorder_quantity', e.target.value)}
                            className={`dashboard-form-input border-gray-700`}
                            placeholder={`0`}
                        />
                    </div>
                </div>

                <div className={`bg-gray-800 rounded-lg p-4 border border-gray-700`}>
                    <h4 className={`text-sm font-medium text-gray-300 mb-3 flex items-center`}>
                        <InformationCircleIcon className={`size-5 mr-2 text-teal-400`}/>
                        Stock Management Guide
                    </h4>
                    <div className={`space-y-2 text-sm text-gray-400`}>
                        {guides.map((guide, index) => (
                            <div key={index} className={`flex items-start`}>
                                <div className={`size-2 bg-teal-500 rounded-full mt-1.5 mr-3 flex-shrink-0`}/>
                                <div>
                                    <span className={`text-teal-400 font-medium`}>{guide.title}:</span>{' '}
                                    {guide.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function VariantsTab({variants, setVariants}) {
    const addVariant = () => {
        setVariants(prev => [...prev, {
            id: Date.now(),
            sku: '',
            name: '',
            attributes: {color: '', size: ''},
            cost_price: '',
            selling_price: '',
            barcode: '',
            is_active: true
        }]);
    };

    const updateVariant = (id, field, value) => {
        setVariants(prev => prev.map(v =>
            v.id === id ? {...v, [field]: value} : v
        ));
    };

    const updateVariantAttribute = (id, attr, value) => {
        setVariants(prev => prev.map(v =>
            v.id === id ? {...v, attributes: {...v.attributes, [attr]: value}} : v
        ));
    };

    const removeVariant = (id) => {
        setVariants(prev => prev.filter(v => v.id !== id));
    };

    // Calculate variant profit
    const calculateVariantProfit = (variant) => {
        const cost = parseFloat(variant.cost_price) || 0;
        const selling = parseFloat(variant.selling_price) || 0;
        const profit = selling - cost;
        return {profit, isProfit: profit >= 0};
    };

    return (
        <div className={`space-y-6`}>
            <div className={`flex flex-wrap justify-between items-center gap-4`}>
                <div>
                    <h3 className={`text-lg font-semibold`}>Product Variants</h3>
                    <p className={`text-sm text-gray-400 mt-1`}>
                        Add variants like size, color, or material (optional)
                    </p>
                </div>
                <div className={`flex-1 flex justify-end`}>
                    <button
                        type={`button`}
                        onClick={addVariant}
                        className={`flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                    >
                        <PlusIcon className={`size-5`}/>
                        Add Variant
                    </button>
                </div>
            </div>

            {variants.length === 0 ? (
                <div className={`bg-gray-800 rounded-lg p-12 border border-gray-700 text-center`}>
                    <TagIcon className={`size-12 text-gray-600 mx-auto mb-4`}/>
                    <h4 className={`text-lg font-medium text-gray-400 mb-2`}>No variants added yet</h4>
                    <p className={`text-sm text-gray-500 mb-6`}>
                        Add variants to track different versions of this product
                    </p>
                    <button
                        type={`button`}
                        onClick={addVariant}
                        className={`inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg font-medium transition-colors`}
                    >
                        <PlusIcon className={`size-5`}/>
                        Add First Variant
                    </button>
                </div>
            ) : (
                <div className={`space-y-4`}>
                    {variants.map((variant, index) => {
                        const variantProfit = calculateVariantProfit(variant);

                        return (
                            <div key={variant.id} className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
                                <div className={`flex justify-between items-start mb-4`}>
                                    <div className={`flex-1`}>
                                        <h4 className={`text-md font-semibold mb-1`}>Variant {index + 1}</h4>
                                        {(variant.cost_price && variant.selling_price) && (
                                            <div
                                                className={`text-sm font-medium ${variantProfit.isProfit ? 'text-green-400' : 'text-red-400'}`}>
                                                {variantProfit.isProfit ? 'Profit' : 'Loss'}:{' '}
                                                {formatCurrency(Math.abs(variantProfit.profit))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        type={`button`}
                                        onClick={() => removeVariant(variant.id)}
                                        className={`text-red-400 hover:text-red-300 transition-colors`}
                                    >
                                        <TrashIcon className={`size-5`}/>
                                    </button>
                                </div>

                                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`}>
                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Variant SKU *</label>
                                        <div className={`relative`}>
                                            <input
                                                type={`text`}
                                                required
                                                value={variant.sku}
                                                onChange={(e) => updateVariant(variant.id, 'sku', e.target.value)}
                                                className={`dashboard-form-input border-gray-700`}
                                                placeholder={`e.g., PROD-001-RED-M`}
                                            />
                                            <button
                                                type={`button`}
                                                onClick={() => {
                                                    const generatedSku = generateSKU();
                                                    updateVariant(variant.id, 'sku', generatedSku);
                                                }}
                                                className={`absolute right-2 top-2 text-sm bg-primary p-1 rounded-lg`}
                                                title={`Generate SKU`}
                                            >
                                                <Cog8ToothIcon className={`size-4`}/>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Variant Name *</label>
                                        <input
                                            type={`text`}
                                            required
                                            value={variant.name}
                                            onChange={(e) => updateVariant(variant.id, 'name', e.target.value)}
                                            className={`dashboard-form-input border-gray-700`}
                                            placeholder={`e.g., Red - Medium`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Barcode</label>
                                        <input
                                            type={`text`}
                                            value={variant.barcode}
                                            onChange={(e) => updateVariant(variant.id, 'barcode', e.target.value)}
                                            className={`dashboard-form-input border-gray-700`}
                                            placeholder={`Variant barcode`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Color</label>
                                        <input
                                            type={`text`}
                                            value={variant.attributes.color}
                                            onChange={(e) => updateVariantAttribute(variant.id, 'color', e.target.value)}
                                            className={`dashboard-form-input border-gray-700`}
                                            placeholder={`e.g., Red`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Size</label>
                                        <input
                                            type={`text`}
                                            value={variant.attributes.size}
                                            onChange={(e) => updateVariantAttribute(variant.id, 'size', e.target.value)}
                                            className={`dashboard-form-input border-gray-700`}
                                            placeholder={`e.g., M`}
                                        />
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Cost Price</label>
                                        <div className={`relative`}>
                                            <span className={`absolute left-3 top-3 text-gray-400 text-sm`}>Ksh.</span>
                                            <input
                                                type={`number`}
                                                step={0.01}
                                                value={variant.cost_price}
                                                onChange={(e) => updateVariant(variant.id, 'cost_price', e.target.value)}
                                                className={`dashboard-form-input-icon border-gray-700`}
                                                placeholder={`0.00`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`dashboard-form-label mb-2`}>Selling Price</label>
                                        <div className={`relative`}>
                                            <span className={`absolute left-3 top-3 text-gray-400 text-sm`}>Ksh.</span>
                                            <input
                                                type={`number`}
                                                step={0.01}
                                                value={variant.selling_price}
                                                onChange={(e) => updateVariant(variant.id, 'selling_price', e.target.value)}
                                                className={`dashboard-form-input-icon border-gray-700`}
                                                placeholder={`0.00`}
                                            />
                                        </div>
                                    </div>

                                    <div className={`flex items-end`}>
                                        <label className={`flex items-center cursor-pointer`}>
                                            <input
                                                type={`checkbox`}
                                                checked={variant.is_active}
                                                onChange={(e) => updateVariant(variant.id, 'is_active', e.target.checked)}
                                                className={`size-5 text-teal-600 bg-gray-800 border-gray-700 rounded focus:ring-teal-500 focus:ring-2`}
                                            />
                                            <span className={`ml-2 text-sm text-gray-300`}>Active</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

function MediaTab({images}) {
    return (
        <div className={`space-y-6 bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <div>
                <h3 className={`text-lg font-semibold mb-2`}>Product Images</h3>
                <p className={`text-sm text-gray-400 mb-4`}>Upload images to showcase your product (optional)</p>

                <div
                    className={`border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-teal-500 transition-colors cursor-pointer`}
                >
                    <PhotoIcon className={`size-12 text-gray-600 mx-auto mb-4`}/>
                    <p className={`text-gray-400 mb-2`}>Click to upload or drag and drop</p>
                    <p className={`text-sm text-gray-500`}>PNG, JPG, GIF up to 10MB</p>
                </div>

                {images.length > 0 && (
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-4`}>
                        {images.map((img, index) => (
                            <div key={index} className={`relative aspect-square bg-gray-800 rounded-lg`}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}