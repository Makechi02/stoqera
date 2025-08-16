'use client'

import {useState} from "react";
import {useRouter} from "next/navigation";
import {HiOutlineChevronLeft} from "react-icons/hi2";

export default function Page() {
    const [categories] = useState([
        {id: 'cat-1', name: 'Electronics', description: 'Electronic devices and components'},
        {id: 'cat-2', name: 'Clothing', description: 'Apparel and accessories'},
        {id: 'cat-3', name: 'Books', description: 'Books and publications'}
    ])

    const [formData, setFormData] = useState({
        name: '',
        sku: '',
        categoryId: '',
        quantity: 0,
        price: 0,
        minStock: 0
    })

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const router = useRouter();

    return (
        <div className={`space-y-8 max-w-2xl mx-auto`}>

            <div className={`flex gap-4`}>
                <button
                    title={`Go Back`}
                    onClick={() => router.back()}
                    className={`border border-secondary rounded-full p-2 bg-secondary/80 hover:bg-secondary cursor-pointer`}
                >
                    <HiOutlineChevronLeft size={20}/>
                </button>
                <h2 className={`text-3xl font-bold text-gray-100 font-heading`}>Add New Item</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">SKU</label>
                    <input
                        type="text"
                        required
                        value={formData.sku}
                        onChange={(e) => setFormData(prev => ({...prev, sku: e.target.value}))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                    <select
                        required
                        value={formData.categoryId}
                        onChange={(e) => setFormData(prev => ({...prev, categoryId: e.target.value}))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Quantity</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={formData.quantity}
                            onChange={(e) => setFormData(prev => ({...prev, quantity: parseInt(e.target.value) || 0}))}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                        <input
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={(e) => setFormData(prev => ({...prev, price: parseFloat(e.target.value) || 0}))}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Min Stock</label>
                        <input
                            type="number"
                            required
                            min="0"
                            value={formData.minStock}
                            onChange={(e) => setFormData(prev => ({...prev, minStock: parseInt(e.target.value) || 0}))}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        // onClick={onCancel}
                        className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}