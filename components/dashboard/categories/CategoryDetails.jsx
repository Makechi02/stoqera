'use client'

import {HiOutlineCalendar, HiOutlineChevronRight, HiOutlinePhoto} from "react-icons/hi2";
import Link from "next/link";
import {useParams} from "next/navigation";
import {formatDescriptionDate} from "@/utils/formatters";

export default function CategoryDetails({category, subCategories, parentCategory, productsCount}) {
    const {slug} = useParams();

    return (
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
            {/* Main Content */}
            <div className={`lg:col-span-2 space-y-6`}>
                {/* Category Image */}
                <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden`}>
                    <div className={`h-64 bg-gray-700 relative`}>
                        {category.image_url ? (
                            <img
                                src={category.image_url}
                                alt={category.name}
                                className={`w-full h-full object-cover`}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div
                            className={`w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center`}>
                            <HiOutlinePhoto className={`size-16 text-gray-500`}/>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className={`bg-gray-800 rounded-lg border border-gray-700 p-6`}>
                    <h2 className={`text-xl font-semibold text-white mb-4`}>Description</h2>
                    <p className={`text-gray-300 leading-relaxed`}>
                        {category.description || 'No description provided.'}
                    </p>
                </div>

                {/* Subcategories */}
                {subCategories.length > 0 && (
                    <div className={`bg-gray-800 rounded-lg border border-gray-700 p-6`}>
                        <h2 className={`text-xl font-semibold text-white mb-4`}>Subcategories</h2>
                        <div className={`space-y-3`}>
                            {subCategories.map((sub) => (
                                <Link
                                    key={sub.id}
                                    href={`/dashboard/${slug}/categories/${sub.id}`}
                                    className={`flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200`}
                                >
                                    <div className={`flex items-center space-x-3`}>
                                        <div
                                            className={`w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center`}
                                        >
                                            <span className={`text-white font-semibold`}>
                                                {sub.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className={`text-white font-medium`}>{sub.name}</h3>
                                            <p className={`text-gray-400 text-sm`}>{sub.description}</p>
                                        </div>
                                    </div>
                                    <HiOutlineChevronRight className={`size-5 text-gray-400`}/>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className={`space-y-6`}>
                {/* Category Details */}
                <div className={`bg-gray-800 rounded-lg border border-gray-700 p-6`}>
                    <h2 className={`text-xl font-semibold text-white mb-4`}>Details</h2>
                    <div className={`space-y-4`}>
                        <div>
                            <label className={`block text-sm font-medium text-gray-400 mb-1`}>Category ID</label>
                            <p className={`text-white font-mono text-sm`}>{category.id}</p>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium text-gray-400 mb-1`}>Organization ID</label>
                            <p className={`text-white font-mono text-sm`}>{category.organization_id}</p>
                        </div>

                        {parentCategory && (
                            <div>
                                <label className={`block text-sm font-medium text-gray-400 mb-1`}>Parent Category</label>
                                <Link
                                    href={`/dashboard/${slug}/categories/${parentCategory.id}`}
                                    className={`text-teal-400 hover:text-teal-300 transition-colors duration-200`}
                                >
                                    {parentCategory.name}
                                </Link>
                            </div>
                        )}

                        <div>
                            <label className={`block text-sm font-medium text-gray-400 mb-1`}>Sort Order</label>
                            <p className={`text-white`}>{category.sort_order}</p>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium text-gray-400 mb-1`}>Status</label>
                            <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                                    category.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                }`}
                            >
                                {category.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium text-gray-400 mb-1`}>
                                <HiOutlineCalendar className={`size-4 inline mr-1`}/>
                                Created
                            </label>
                            <p className={`text-white`}>{formatDescriptionDate(category.created_at)}</p>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium text-gray-400 mb-1`}>
                                <HiOutlineCalendar className={`size-4 inline mr-1`}/>
                                Last Updated
                            </label>
                            <p className={`text-white`}>{formatDescriptionDate(category.updated_at)}</p>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className={`bg-gray-800 rounded-lg border border-gray-700 p-6`}>
                    <h2 className={`text-xl font-semibold text-white mb-4`}>Statistics</h2>
                    <div className={`space-y-3`}>
                        <div className={`flex justify-between items-center`}>
                            <span className={`text-gray-400`}>Subcategories</span>
                            <span className={`text-white font-semibold`}>{subCategories.length}</span>
                        </div>
                        <div className={`flex justify-between items-center`}>
                            <span className={`text-gray-400`}>Products</span>
                            <span className={`text-white font-semibold`}>{productsCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}