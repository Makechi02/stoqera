export default function FinancialInfoForm({formData, handleInputChange}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <h2 className={`text-lg font-semibold mb-4`}>Financial Information</h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>Customer Status</label>
                    <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    >
                        <option value={`active`}>Active</option>
                        <option value={`inactive`}>Inactive</option>
                        <option value={`blocked`}>Blocked</option>
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Credit Limit (KES)</label>
                    <input
                        type={`number`}
                        min={0}
                        step={0.01}
                        value={formData.credit_limit}
                        onChange={(e) => handleInputChange('credit_limit', parseFloat(e.target.value) || 0)}
                        className={`dashboard-form-input border-gray-600`}
                        placeholder={`0.00`}
                    />
                    <p className={`text-xs text-gray-400 mt-1`}>Maximum credit amount this customer can have</p>
                </div>
            </div>
        </div>
    )
}