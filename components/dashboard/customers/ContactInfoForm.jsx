export default function ContactInfoForm({formData, handleInputChange, errors}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <h2 className={`text-lg font-semibold mb-4`}>Contact Information</h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>Email</label>
                    <input
                        type={`email`}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`dashboard-form-input ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                        placeholder={`customer@example.com`}
                    />
                    {errors.email && (<p className={`text-red-400 text-sm mt-1`}>{errors.email}</p>)}
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Phone</label>
                    <input
                        type={`tel`}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`dashboard-form-input ${errors.phone ? 'border-red-500' : 'border-gray-600'}`}
                        placeholder={`+254 xxx xxx xxx`}
                    />
                    {errors.phone && (<p className={`text-red-400 text-sm mt-1`}>{errors.phone}</p>)}
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Preferred Contact Method</label>
                    <select
                        value={formData.preferred_contact_method}
                        onChange={(e) => handleInputChange('preferred_contact_method', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    >
                        <option value={`email`}>Email</option>
                        <option value={`phone`}>Phone</option>
                        <option value={`sms`}>SMS</option>
                    </select>
                </div>

                <div className={`flex items-center`}>
                    <label className={`flex items-center gap-2 mt-6`}>
                        <input
                            type={`checkbox`}
                            checked={formData.marketing_consent}
                            onChange={(e) => handleInputChange('marketing_consent', e.target.checked)}
                            className={`rounded border-gray-600 bg-gray-700 text-teal-600 focus:ring-teal-500 focus:ring-offset-gray-800`}
                        />
                        <span className={`text-sm text-gray-300`}>Marketing consent</span>
                    </label>
                </div>
            </div>
        </div>
    )
}