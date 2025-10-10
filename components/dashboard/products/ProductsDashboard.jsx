'use client'

import {useState} from 'react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FunnelIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    PhotoIcon,
    PlusIcon,
    TrashIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';

// Mock Supabase client - replace with actual Supabase client in production
const mockSupabase = {
    from: (table) => ({
        select: () => ({
            eq: () => ({
                order: () => Promise.resolve({data: mockProducts, error: null})
            })
        }),
        insert: (data) => Promise.resolve({data, error: null}),
        update: (data) => ({
            eq: () => Promise.resolve({data, error: null})
        }),
        delete: () => ({
            eq: () => Promise.resolve({error: null})
        })
    })
};

const mockProducts = [
    {
        id: '1',
        sku: 'PRD-001',
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with USB receiver',
        category_id: 'cat-1',
        brand: 'TechPro',
        cost_price: 15.99,
        selling_price: 29.99,
        min_stock_level: 10,
        is_active: true,
        tags: ['electronics', 'accessories'],
        images: []
    },
    {
        id: '2',
        sku: 'PRD-002',
        name: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard',
        category_id: 'cat-1',
        brand: 'KeyMaster',
        cost_price: 45.00,
        selling_price: 89.99,
        min_stock_level: 5,
        is_active: true,
        tags: ['electronics', 'gaming'],
        images: []
    }
];

export default function ProductsDashboard({products = []}) {
    const [currentPage, setCurrentPage] = useState('products');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <ProductsListPage
                products={filteredProducts}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                loading={loading}
            />

            {/*<AddProductPage*/}
            {/*    onNavigate={setCurrentPage}*/}
            {/*    onProductAdded={loadProducts}*/}
            {/*/>*/}
        </div>
    );
}

function ProductsListPage({products, searchQuery, setSearchQuery, loading}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            {/* Actions Bar */}
            <div className={`flex flex-col sm:flex-row gap-4 mb-6`}>
                <div className={`flex-1 relative`}>
                    <MagnifyingGlassIcon
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                    <input
                        type={`search`}
                        placeholder={`Search products by name, SKU, or brand...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`dashboard-form-input-icon border-gray-800`}
                    />
                </div>
                <button
                    className={`flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors`}>
                    <FunnelIcon className={`size-5`}/>
                    Filter
                </button>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    Loading products...
                </div>
            ) : paginatedProducts.length === 0 ? (
                <div className="text-center py-12">
                    <div className="bg-gray-900 rounded-lg border border-gray-800 p-12">
                        <PhotoIcon className="h-16 w-16 text-gray-700 mx-auto mb-4"/>
                        <p className="text-gray-500">No products found</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-gray-900 rounded-lg border border-gray-800 hover:border-teal-800 transition-all duration-300 overflow-hidden group"
                            >
                                {/* Product Image Placeholder */}
                                <div
                                    className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-b border-gray-800">
                                    <PhotoIcon className="h-16 w-16 text-gray-700"/>
                                </div>

                                {/* Product Info */}
                                <div className="p-5">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-teal-400 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-mono">{product.sku}</p>
                                        </div>
                                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                                            product.is_active
                                                ? 'bg-teal-900/30 text-teal-400 border border-teal-800'
                                                : 'bg-gray-800 text-gray-400 border border-gray-700'
                                        }`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                                    </div>

                                    {/* Description */}
                                    {product.description && (
                                        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}

                                    {/* Brand */}
                                    {product.brand && (
                                        <div className="mb-4">
                      <span
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300 border border-gray-700">
                        {product.brand}
                      </span>
                                        </div>
                                    )}

                                    {/* Pricing */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
                                            <p className="text-xs text-gray-500 mb-1">Cost Price</p>
                                            <p className="text-lg font-semibold text-gray-300">
                                                ${product.cost_price?.toFixed(2) || '0.00'}
                                            </p>
                                        </div>
                                        <div className="bg-gray-950 rounded-lg p-3 border border-gray-800">
                                            <p className="text-xs text-gray-500 mb-1">Selling Price</p>
                                            <p className="text-lg font-semibold text-teal-400">
                                                ${product.selling_price?.toFixed(2) || '0.00'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    {product.tags && product.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {product.tags.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-800/50 text-gray-400"
                                                >
                          #{tag}
                        </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-4 border-t border-gray-800">
                                        <button
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-750 rounded-lg text-gray-300 hover:text-teal-400 transition-colors">
                                            <PencilIcon className="h-4 w-4"/>
                                            <span className="text-sm font-medium">Edit</span>
                                        </button>
                                        <button
                                            className="p-2.5 bg-gray-800 hover:bg-red-900/20 rounded-lg text-gray-400 hover:text-red-400 transition-colors border border-gray-800 hover:border-red-800">
                                            <TrashIcon className="h-4 w-4"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div
                            className="mt-8 flex items-center justify-between bg-gray-900 rounded-lg border border-gray-800 px-6 py-4">
                            <div className="text-sm text-gray-400">
                                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, products.length)} of {products.length} products
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-gray-800 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeftIcon className="h-5 w-5 text-gray-400"/>
                                </button>
                                <span className="px-4 py-2 text-sm text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-gray-800 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400"/>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

function AddProductPage({onNavigate, onProductAdded}) {
    const [formData, setFormData] = useState({
        sku: '',
        name: '',
        description: '',
        brand: '',
        unit_of_measure: 'pcs',
        barcode: '',
        cost_price: '',
        selling_price: '',
        min_stock_level: '',
        max_stock_level: '',
        reorder_point: '',
        reorder_quantity: '',
        weight: '',
        tags: '',
        is_active: true,
        is_trackable: true
    });

    const [variants, setVariants] = useState([]);
    const [showVariants, setShowVariants] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {
        setSaving(true);

        const productData = {
            ...formData,
            cost_price: parseFloat(formData.cost_price) || 0,
            selling_price: parseFloat(formData.selling_price) || 0,
            min_stock_level: parseInt(formData.min_stock_level) || 0,
            max_stock_level: parseInt(formData.max_stock_level) || null,
            reorder_point: parseInt(formData.reorder_point) || 0,
            reorder_quantity: parseInt(formData.reorder_quantity) || 0,
            weight: parseFloat(formData.weight) || null,
            tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
            organization_id: 'org-id-here' // Replace with actual org ID
        };

        // In production, replace with actual Supabase calls
        const {data: product, error} = await mockSupabase
            .from('products')
            .insert([productData]);

        if (!error && variants.length > 0) {
            // Insert variants
            const variantData = variants.map(v => ({
                ...v,
                product_id: product?.[0]?.id || 'product-id',
                cost_price: parseFloat(v.cost_price) || null,
                selling_price: parseFloat(v.selling_price) || null
            }));

            await mockSupabase.from('product_variants').insert(variantData);
        }

        setSaving(false);
        onProductAdded();
        onNavigate('products');
    };

    const addVariant = () => {
        setVariants([...variants, {
            sku: '',
            name: '',
            attributes: {},
            cost_price: '',
            selling_price: '',
            barcode: '',
            is_active: true
        }]);
    };

    const removeVariant = (index) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const updateVariant = (index, field, value) => {
        const updated = [...variants];
        updated[index] = {...updated[index], [field]: value};
        setVariants(updated);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => onNavigate('products')}
                    className="flex items-center gap-2 text-gray-400 hover:text-teal-400 mb-4 transition-colors"
                >
                    <ChevronLeftIcon className="h-5 w-5"/>
                    Back to Products
                </button>
                <h1 className="text-3xl font-bold text-white mb-2">Add New Product</h1>
                <p className="text-gray-400">Fill in the product details and add variants if needed</p>
            </div>

            <div>
                {/* Basic Information */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Basic Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Enter product name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                SKU <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.sku}
                                onChange={(e) => setFormData({...formData, sku: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="PRD-001"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                rows="3"
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Enter product description"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
                            <input
                                type="text"
                                value={formData.brand}
                                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Brand name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Unit of Measure</label>
                            <select
                                value={formData.unit_of_measure}
                                onChange={(e) => setFormData({...formData, unit_of_measure: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                                <option value="pcs">Pieces</option>
                                <option value="kg">Kilograms</option>
                                <option value="liter">Liters</option>
                                <option value="box">Box</option>
                                <option value="carton">Carton</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Barcode</label>
                            <input
                                type="text"
                                value={formData.barcode}
                                onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Barcode number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="electronics, gadgets (comma separated)"
                            />
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Pricing & Stock</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Cost Price</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.cost_price}
                                onChange={(e) => setFormData({...formData, cost_price: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Selling Price</label>
                            <input
                                type="number"
                                step="0.01"
                                value={formData.selling_price}
                                onChange={(e) => setFormData({...formData, selling_price: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Min Stock Level</label>
                            <input
                                type="number"
                                value={formData.min_stock_level}
                                onChange={(e) => setFormData({...formData, min_stock_level: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Reorder Point</label>
                            <input
                                type="number"
                                value={formData.reorder_point}
                                onChange={(e) => setFormData({...formData, reorder_point: e.target.value})}
                                className="w-full px-4 py-2.5 bg-gray-950 border border-gray-800 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="0"
                            />
                        </div>
                    </div>
                </div>

                {/* Variants Section */}
                <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-1">Product Variants</h2>
                            <p className="text-sm text-gray-400">Add variants like different colors, sizes, etc.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowVariants(!showVariants)}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-750 rounded-lg text-gray-300 transition-colors"
                        >
                            {showVariants ? 'Hide Variants' : 'Show Variants'}
                        </button>
                    </div>

                    {showVariants && (
                        <div className="space-y-4">
                            {variants.map((variant, index) => (
                                <div key={index} className="p-4 bg-gray-950 border border-gray-800 rounded-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium text-gray-300">Variant {index + 1}</h3>
                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-red-400 transition-colors"
                                        >
                                            <XMarkIcon className="h-5 w-5"/>
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Variant
                                                SKU</label>
                                            <input
                                                type="text"
                                                value={variant.sku}
                                                onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                placeholder="VAR-001"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Variant
                                                Name</label>
                                            <input
                                                type="text"
                                                value={variant.name}
                                                onChange={(e) => updateVariant(index, 'name', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                placeholder="e.g., Red / Large"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                className="block text-sm font-medium text-gray-400 mb-2">Barcode</label>
                                            <input
                                                type="text"
                                                value={variant.barcode}
                                                onChange={(e) => updateVariant(index, 'barcode', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                placeholder="Barcode"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Cost
                                                Price</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={variant.cost_price}
                                                onChange={(e) => updateVariant(index, 'cost_price', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                placeholder="0.00"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-2">Selling
                                                Price</label>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={variant.selling_price}
                                                onChange={(e) => updateVariant(index, 'selling_price', e.target.value)}
                                                className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addVariant}
                                className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-800 hover:border-teal-600 rounded-lg text-gray-400 hover:text-teal-400 transition-colors w-full justify-center"
                            >
                                <PlusIcon className="h-5 w-5"/>
                                Add Variant
                            </button>
                        </div>
                    )}
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => onNavigate('products')}
                        className="px-6 py-2.5 border border-gray-800 rounded-lg text-gray-300 hover:bg-gray-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={saving}
                        className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </div>
        </div>
    );
}