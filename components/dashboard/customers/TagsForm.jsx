'use client'

import {PlusIcon, TagIcon, XMarkIcon} from "@heroicons/react/24/outline";

export default function TagsForm({newTag, setNewTag, formData, setFormData}) {
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <h2 className={`text-lg font-semibold mb-4`}>Tags</h2>

            <div className={`flex items-center gap-2 mb-4`}>
                <input
                    type={`text`}
                    value={newTag}
                    placeholder={`Add a tag...`}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyUp={handleKeyPress}
                    className={`dashboard-form-input border-gray-600`}
                />
                <button
                    type={`button`}
                    onClick={addTag}
                    className={`bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg transition-colors`}
                >
                    <PlusIcon className={`size-4`}/>
                </button>
            </div>

            {formData.tags.length > 0 && (
                <div className={`flex flex-wrap gap-2`}>
                    {formData.tags.map((tag, index) => (
                        <span
                            key={index}
                            className={`inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm`}
                        >
                            <TagIcon className={`size-3`}/>
                            {tag}
                            <button
                                type={`button`}
                                onClick={() => removeTag(tag)}
                                className={`hover:text-teal-100 ml-1`}
                            >
                                <XMarkIcon className={`size-3`}/>
                            </button>
                        </span>
                    ))}
                </div>
            )}

            {formData.tags.length === 0 && (
                <div className={`text-center py-8 text-gray-500`}>
                    <TagIcon className={`size-8 mx-auto mb-2 text-gray-600`}/>
                    <p className={`text-sm`}>No tags added yet</p>
                    <p className={`text-xs text-gray-600 mt-1`}>Tags help you organize and filter customers</p>
                </div>
            )}
        </div>
    )
}