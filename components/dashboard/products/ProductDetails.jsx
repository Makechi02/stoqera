'use client'

import {useState} from 'react';
import {
    CheckCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CubeIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    EyeIcon,
    PencilSquareIcon,
    QrCodeIcon,
    ScaleIcon,
    TagIcon,
    TrashIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import {formatCurrency, formatDescriptionDate} from "@/utils/formatters";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {deleteProduct} from "@/lib/queryProducts";

export default function ProductDetails({product}) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const variants = [
        {
            id: 'var-001',
            sku: 'LAPTOP-001-SG-512',
            name: 'Space Gray 512GB',
            attributes: {color: 'Space Gray', storage: '512GB'},
            cost_price: 1999.99,
            selling_price: 2499.99,
            is_active: true
        },
        {
            id: 'var-002',
            sku: 'LAPTOP-001-SG-1TB',
            name: 'Space Gray 1TB',
            attributes: {color: 'Space Gray', storage: '1TB'},
            cost_price: 2199.99,
            selling_price: 2699.99,
            is_active: true
        },
        {
            id: 'var-003',
            sku: 'LAPTOP-001-SV-512',
            name: 'Silver 512GB',
            attributes: {color: 'Silver', storage: '512GB'},
            cost_price: 1999.99,
            selling_price: 2499.99,
            is_active: true
        }
    ];

    const currentStock = 25;
    const stockStatus = currentStock <= product.min_stock_level ? 'low' : currentStock >= product.max_stock_level ? 'high' : 'normal';

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12`}>
                {/* Product Images */}
                <div className={`space-y-4`}>
                    <div className={`relative aspect-square bg-gray-800 rounded-2xl overflow-hidden`}>
                        <img
                            src={product.images[currentImageIndex]}
                            alt={product.name}
                            className={`w-full h-full object-cover`}
                        />
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors`}
                                >
                                    <ChevronLeftIcon className={`size-6`}/>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors`}
                                >
                                    <ChevronRightIcon className={`size-6`}/>
                                </button>
                            </>
                        )}
                        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2`}>
                            {product.images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`size-3 rounded-full transition-colors ${index === currentImageIndex ? 'bg-teal-500' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Thumbnail Images */}
                    <div className={`flex space-x-3`}>
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`size-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                    index === currentImageIndex ? 'border-teal-500' : 'border-transparent'
                                }`}
                            >
                                <img src={image} alt={``} className={`w-full h-full object-cover`}/>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className={`space-y-8`}>
                    <BasicInfo product={product} stockStatus={stockStatus}/>

                    {product?.variants?.length > 0 && (
                        <VariantsGrid
                            variants={product.variants}
                            selectedVariant={selectedVariant}
                            setSelectedVariant={setSelectedVariant}
                        />
                    )}

                    {/* Tags */}
                    {product.tags.length > 0 && (
                        <TagsGrid tags={product.tags}/>
                    )}
                </div>
            </div>

            {/* Detailed Information Tabs */}
            <div className={`mt-16`}>
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                    <StockInformation product={product} currentStock={currentStock} stockStatus={stockStatus}/>
                    <Specifications product={product}/>
                    <ActivityAndSettings product={product}/>
                </div>
            </div>

            {/* Low Stock Alert */}
            {stockStatus === 'low' && (
                <div className="mt-8 bg-red-900/20 border border-red-800 rounded-lg p-4">
                    <div className="flex items-center">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-3"/>
                        <div>
                            <h4 className="font-semibold text-red-400">Low Stock Alert</h4>
                            <p className="text-red-300 mt-1">
                                This product is running low on stock. Current level ({currentStock}) is at or below
                                the minimum threshold ({product.min_stock_level}).
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

function BasicInfo({product, stockStatus}) {
    const getStockStatusColor = (status) => {
        switch (status) {
            case 'low':
                return 'text-red-400 bg-red-900/20';
            case 'high':
                return 'text-green-400 bg-green-900/20';
            default:
                return 'text-teal-400 bg-teal-900/20';
        }
    };

    return (
        <div>
            <div className={`flex items-center justify-between mb-4`}>
                <div className={`flex items-center space-x-3`}>
                    <span className="px-3 py-1 text-xs bg-teal-900/30 text-teal-400 rounded-full">
                        {product.category}
                    </span>
                    <span
                        className={`px-3 py-1 text-xs rounded-full ${getStockStatusColor(stockStatus)}`}
                    >
                        {stockStatus === 'low' ? 'Low Stock' : stockStatus === 'high' ? 'High Stock' : 'In Stock'}
                    </span>
                </div>
                {product.is_active ? (
                    <CheckCircleIcon className={`size-6 text-green-500`}/>
                ) : (
                    <XCircleIcon className={`size-6 text-red-500`}/>
                )}
            </div>

            <h1 className={`text-3xl font-bold mb-2 font-heading`}>{product.name}</h1>
            <p className={`text-gray-400 mb-4`}>{product.brand}</p>

            <div className={`flex items-baseline space-x-4 mb-6`}>
                <span className={`text-3xl font-bold text-teal-400`}>{formatCurrency(product.selling_price)}</span>
                <span className={`text-lg text-gray-500 line-through`}>{formatCurrency(product.cost_price)}</span>
                <span className={`px-2 py-1 bg-green-900/30 text-green-400 text-sm rounded`}>
                    {Math.round(((product.selling_price - product.cost_price) / product.cost_price) * 100)}% markup
                </span>
            </div>

            <p className={`text-gray-300 leading-relaxed`}>{product.description}</p>
        </div>
    )
}

function VariantsGrid({variants, selectedVariant, setSelectedVariant}) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Variants</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {variants.map((variant) => (
                    <div
                        key={variant.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedVariant?.id === variant.id
                                ? 'border-teal-500 bg-teal-900/20'
                                : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => setSelectedVariant(variant)}
                    >
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-sm text-gray-400">{variant.sku}</div>
                        <div className="text-teal-400 font-semibold mt-1">
                            {formatCurrency(variant.selling_price)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TagsGrid({tags}) {
    return (
        <div>
            <h3 className={`text-lg font-semibold mb-3`}>Tags</h3>
            <div className={`flex flex-wrap gap-2`}>
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300`}
                    >
                        <TagIcon className={`size-4 mr-1`}/>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}

function StockInformation({product, currentStock, stockStatus}) {
    return (
        <div className="bg-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
                <CubeIcon className="h-6 w-6 mr-3 text-teal-400"/>
                Stock Information
            </h3>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-gray-400">Current Stock:</span>
                    <span className="font-semibold">{currentStock} {product.unit_of_measure}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Min Level:</span>
                    <span>{product.min_stock_level} {product.unit_of_measure}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Max Level:</span>
                    <span>{product.max_stock_level} {product.unit_of_measure}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Reorder Point:</span>
                    <span>{product.reorder_point} {product.unit_of_measure}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">Reorder Quantity:</span>
                    <span>{product.reorder_quantity} {product.unit_of_measure}</span>
                </div>

                {/* Stock Level Progress Bar */}
                <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Stock Level</span>
                        <span>{currentStock}/{product.max_stock_level}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full transition-all ${
                                stockStatus === 'low' ? 'bg-red-500' :
                                    stockStatus === 'high' ? 'bg-green-500' : 'bg-teal-500'
                            }`}
                            style={{width: `${(currentStock / product.max_stock_level) * 100}%`}}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Specifications({product}) {
    return (
        <div className={`bg-gray-800 rounded-2xl p-6`}>
            <h3 className={`text-xl font-semibold mb-6 flex items-center`}>
                <DocumentTextIcon className={`size-6 mr-3 text-teal-400`}/>
                Specifications
            </h3>
            <div className={`space-y-4`}>
                <div className={`flex justify-between`}>
                    <span className={`text-gray-400`}>SKU:</span>
                    <span className={`font-mono`}>{product.sku}</span>
                </div>
                <div className={`flex justify-between`}>
                    <span className={`text-gray-400`}>Unit:</span>
                    <span>{product.unit_of_measure}</span>
                </div>
                {product.weight && (
                    <div className={`flex justify-between`}>
                    <span className={`text-gray-400 flex items-center`}>
                      <ScaleIcon className={`size-4 mr-1`}/>
                      Weight:
                    </span>
                        <span>{product.weight} kg</span>
                    </div>
                )}
                {product.dimensions && (
                    <div className={`flex justify-between`}>
                        <span className={`text-gray-400`}>Dimensions:</span>
                        <span className={`text-sm`}>
                      {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                    </span>
                    </div>
                )}
                {product.barcode && (
                    <div className={`flex justify-between`}>
                        <span className={`text-gray-400`}>Barcode:</span>
                        <span className={`font-mono text-sm`}>{product.barcode}</span>
                    </div>
                )}
                {product.qr_code && (
                    <div className={`flex justify-between`}>
                    <span className={`text-gray-400 flex items-center`}>
                      <QrCodeIcon className={`size-4 mr-1`}/>
                      QR Code:
                    </span>
                        <span className={`font-mono text-sm`}>{product.qr_code}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

function ActivityAndSettings({product}) {
    const router = useRouter();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(product.id);

            toast.success({
                title: 'Product deleted successfully.',
                status: 'success',
                duration: 5000,
                theme: 'dark',
            });

            router.push('/dashboard/products');
        }
    };

    return (
        <div className={`bg-gray-800 rounded-2xl p-6`}>
            <h3 className={`text-xl font-semibold mb-6 flex items-center`}>
                <EyeIcon className={`size-6 mr-3 text-teal-400`}/>
                Activity & Settings
            </h3>
            <div className={`space-y-4`}>
                <div>
                    <span className={`text-gray-400`}>Status:</span>
                    <div className={`flex items-center mt-1`}>
                        {product.is_active ? (
                            <>
                                <CheckCircleIcon className={`size-5 text-green-500 mr-2`}/>
                                <span className={`text-green-400`}>Active</span>
                            </>
                        ) : (
                            <>
                                <XCircleIcon className={`size-5 text-red-500 mr-2`}/>
                                <span className={`text-red-400`}>Inactive</span>
                            </>
                        )}
                    </div>
                </div>

                <div>
                    <span className={`text-gray-400`}>Trackable:</span>
                    <div className={`flex items-center mt-1`}>
                        {product.is_trackable ? (
                            <>
                                <CheckCircleIcon className={`size-5 text-green-500 mr-2`}/>
                                <span className={`text-green-400`}>Yes</span>
                            </>
                        ) : (
                            <>
                                <XCircleIcon className={`size-5 text-red-500 mr-2`}/>
                                <span className={`text-red-400`}>No</span>
                            </>
                        )}
                    </div>
                </div>

                <div className={`pt-4 border-t border-gray-700`}>
                    <div className={`text-sm text-gray-400 space-y-2`}>
                        <div>Created: {formatDescriptionDate(product.created_at)}</div>
                        <div>Updated: {formatDescriptionDate(product.updated_at)}</div>
                    </div>
                </div>

                <div className={`pt-4 space-y-3`}>
                    <Link
                        href={`/dashboard/products/${product.id}/edit`}
                        className={`w-full flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors`}>
                        <PencilSquareIcon className={`size-4 mr-2`}/>
                        Edit Product
                    </Link>
                    <button
                        onClick={handleDelete}
                        className={`w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors`}
                    >
                        <TrashIcon className={`size-4 mr-2`}/>
                        Delete Product
                    </button>
                </div>
            </div>
        </div>
    )
}
