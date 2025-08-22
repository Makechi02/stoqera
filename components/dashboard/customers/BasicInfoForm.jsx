export default function BasicInfoForm({formData, handleInputChange, errors}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>

            {formData.type === 'individual' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            First Name *
                        </label>
                        <input
                            type="text"
                            value={formData.first_name}
                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                            className={`w-full bg-gray-700 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                errors.first_name ? 'border-red-500' : 'border-gray-600'
                            }`}
                            placeholder="Enter first name"
                        />
                        {errors.first_name && (
                            <p className="text-red-400 text-sm mt-1">{errors.first_name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Last Name *
                        </label>
                        <input
                            type="text"
                            value={formData.last_name}
                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                            className={`w-full bg-gray-700 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                errors.last_name ? 'border-red-500' : 'border-gray-600'
                            }`}
                            placeholder="Enter last name"
                        />
                        {errors.last_name && (
                            <p className="text-red-400 text-sm mt-1">{errors.last_name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            value={formData.date_of_birth}
                            onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Gender
                        </label>
                        <select
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Business Name *
                        </label>
                        <input
                            type="text"
                            value={formData.business_name}
                            onChange={(e) => handleInputChange('business_name', e.target.value)}
                            className={`w-full bg-gray-700 border rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                                errors.business_name ? 'border-red-500' : 'border-gray-600'
                            }`}
                            placeholder="Enter business name"
                        />
                        {errors.business_name && (
                            <p className="text-red-400 text-sm mt-1">{errors.business_name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tax ID
                        </label>
                        <input
                            type="text"
                            value={formData.tax_id}
                            onChange={(e) => handleInputChange('tax_id', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter tax identification number"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}