export default function CustomerRelationshipForm({formData, handleInputChange, customerGroups, salesReps}) {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <h2 className={`text-lg font-semibold text-white mb-4`}>Customer Relationship</h2>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
                <div>
                    <label className={`dashboard-form-label mb-2`}>Customer Group</label>
                    <select
                        value={formData.customer_group_id}
                        onChange={(e) => handleInputChange('customer_group_id', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    >
                        <option value={``}>Select customer group</option>
                        {customerGroups.map((group) => (
                            <option key={group.id} value={group.id}>
                                {group.name} {group.discount_percentage > 0 && `(${group.discount_percentage}% discount)`}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Sales Representative</label>
                    <select
                        value={formData.assigned_to}
                        onChange={(e) => handleInputChange('assigned_to', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    >
                        <option value={``}>Select sales rep</option>
                        {salesReps.map((rep) => (
                            <option key={rep.id} value={rep.id}>{rep.full_name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className={`dashboard-form-label mb-2`}>Acquisition Source</label>
                    <select
                        value={formData.acquisition_source}
                        onChange={(e) => handleInputChange('acquisition_source', e.target.value)}
                        className={`dashboard-form-input border-gray-600`}
                    >
                        <option value={``}>Select source</option>
                        <option value={`referral`}>Referral</option>
                        <option value={`online`}>Online</option>
                        <option value={`walk-in`}>Walk-in</option>
                        <option value={`advertisement`}>Advertisement</option>
                        <option value={`social_media`}>Social Media</option>
                        <option value={`phone_call`}>Phone Call</option>
                        <option value={`trade_show`}>Trade Show</option>
                        <option value={`other`}>Other</option>
                    </select>
                </div>
            </div>
        </div>
    )
}