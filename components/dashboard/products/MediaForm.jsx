import React from "react";
import {PhotoIcon, PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";

export default function MediaForm({ formData, images, fileInputRef, handleImageUpload, removeImage, addTag, removeTag, currentTag, setCurrentTag }) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-4">
                    Product Images
                </label>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {images.map((image) => (
                        <div key={image.id} className="relative group">
                            <img
                                src={image.preview}
                                alt={image.name}
                                className="w-full h-32 object-cover rounded-lg border-2 border-gray-700 group-hover:border-teal-500 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(image.id)}
                                className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <XMarkIcon className="w-4 h-4"/>
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-32 border-2 border-dashed border-gray-600 hover:border-teal-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-teal-400 transition-colors"
                    >
                        <div className="text-center">
                            <PhotoIcon className="w-8 h-8 mx-auto mb-2"/>
                            <span className="text-sm">Add Image</span>
                        </div>
                    </button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-teal-600/20 text-teal-400 rounded-full text-sm"
                        >
              #{tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-2 text-teal-400 hover:text-red-400"
                            >
                <XMarkIcon className="w-3 h-3"/>
              </button>
            </span>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Add a tag..."
                    />
                    <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                    >
                        <PlusIcon className="w-5 h-5"/>
                    </button>
                </div>
                <p className="text-gray-400 text-sm mt-1">Press Enter or click + to add tags</p>
            </div>
        </div>
    );
};
