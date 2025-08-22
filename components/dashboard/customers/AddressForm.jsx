export default function AddressForm({formData, handleInputChange}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <h2 className={`text-lg font-semibold mb-4`}>Address</h2>
            <div className={`grid grid-cols-1 gap-4`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>Address Line 1</label>
                    <input
                        type={`text`}
                        value={formData.address_line_1}
                        placeholder={`Street address`}
                        onChange={(e) => handleInputChange('address_line_1', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    />
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Address Line 2</label>
                    <input
                        type={`text`}
                        value={formData.address_line_2}
                        placeholder={`Apartment, suite, etc. (optional)`}
                        onChange={(e) => handleInputChange('address_line_2', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    />
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-4 gap-4`}>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>City</label>
                        <input
                            type={`text`}
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            className={`dashboard-form-input border-gray-600`}
                            placeholder={`City`}
                        />
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>State/County</label>
                        <input
                            type={`text`}
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className={`dashboard-form-input border-gray-600`}
                            placeholder={`State or county`}
                        />
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Postal Code</label>
                        <input
                            type={`text`}
                            value={formData.postal_code}
                            onChange={(e) => handleInputChange('postal_code', e.target.value)}
                            className={`dashboard-form-input border-gray-600`}
                            placeholder={`Postal code`}
                        />
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Country</label>
                        <input
                            type={`text`}
                            value={formData.country}
                            placeholder={`Country`}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className={`dashboard-form-input border-gray-600`}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}