'use client'

import {useState} from 'react';
import {
    BuildingOfficeIcon,
    CheckIcon,
    EnvelopeIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {updateOrganization} from "@/lib/organization/queryOrganizations";
import {ProgressLoader} from "@/components";

export default function OrganizationTab({organization, user, saving, setSaving}) {
    const [isEditingOrg, setIsEditingOrg] = useState(false);

    const [orgForm, setOrgForm] = useState({
        name: organization.name,
        email: organization.email,
        phone: organization.phone,
        address: organization.address,
        logo_url: organization.logo_url || ''
    });

    const canEditOrg = user.role === 'admin' || user.role === 'superadmin' || user.is_superadmin;

    const handleOrgEdit = () => {
        setIsEditingOrg(true);
    };

    const handleOrgCancel = () => {
        setOrgForm({
            name: organization.name,
            email: organization.email,
            phone: organization.phone,
            address: organization.address,
            logo_url: organization.logo_url || ''
        });
        setIsEditingOrg(false);
    };

    const handleOrgSave = async () => {
        setSaving(true);

        try {
            const response = await updateOrganization(orgForm);

            if (response) {
                showSuccessToast('Organization updated successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating organization: ', error);
            showErrorToast('Error updating organization');
        } finally {
            setSaving(false);
        }
    };

    const getPlanBadgeColor = (plan) => {
        const colors = {
            essential: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
            growth: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
            pro: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
        };
        return colors[plan] || colors.essential;
    };

    return (
        <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden`}>
            {/* Organization Header */}
            <div
                className={`px-6 py-4 border-b border-gray-800 flex flex-col sm:flex-row flex-wrap sm:items-center sm:justify-between gap-4`}
            >
                <div className={`flex items-center space-x-4`}>
                    <div className={`size-16 bg-gray-800 rounded-full flex items-center justify-center`}>
                        {organization.logo_url ? (
                            <img src={organization.logo_url} alt={`Logo`} className={`size-16 rounded-full`}/>
                        ) : (
                            <BuildingOfficeIcon className={`size-8 text-gray-600`}/>
                        )}
                    </div>
                    <div>
                        <h2 className={`text-xl font-semibold`}>{organization.name}</h2>
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getPlanBadgeColor(organization.subscription_plan)}`}
                        >
                            {organization.subscription_plan.charAt(0).toUpperCase() + organization.subscription_plan.slice(1)} Plan
                        </span>
                    </div>
                </div>

                {canEditOrg && !isEditingOrg ? (
                    <div className={`flex-1 flex justify-end`}>
                        <button
                            onClick={handleOrgEdit}
                            className={`flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors`}
                        >
                            <PencilIcon className={`size-4`}/>
                            <span>Edit Organization</span>
                        </button>
                    </div>
                ) : canEditOrg && isEditingOrg ? (
                    <div className={`flex-1 flex justify-end space-x-2`}>
                        <button
                            onClick={handleOrgCancel}
                            className={`flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors`}
                        >
                            <XMarkIcon className={`size-4`}/>
                            <span>Cancel</span>
                        </button>
                        <button
                            onClick={handleOrgSave}
                            disabled={saving}
                            className={`flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50`}
                        >
                            {saving ? (
                                <>
                                    <ProgressLoader/>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <CheckIcon className={`size-4`}/>
                                    <span>Save</span>
                                </>
                            )}
                        </button>
                    </div>
                ) : null}
            </div>

            {/* Organization Content */}
            <div className={`p-6 space-y-6`}>
                {!canEditOrg && (
                    <div className={`bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6`}>
                        <p className={`text-yellow-400 text-sm`}>
                            You don't have permission to edit organization details. Contact your administrator.
                        </p>
                    </div>
                )}

                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>Organization Name</label>
                        {isEditingOrg ? (
                            <input
                                type={`text`}
                                value={orgForm.name}
                                onChange={(e) => setOrgForm({...orgForm, name: e.target.value})}
                                className={`dashboard-form-input border-gray-700`}
                            />
                        ) : (
                            <p>{organization.name}</p>
                        )}
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Organization Slug</label>
                        <p className={`font-mono text-sm bg-gray-800 px-3 py-2 rounded-lg`}>{organization.slug}</p>
                        <p className={`text-xs text-gray-500 mt-1`}>Slug cannot be changed</p>
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Email</label>
                        {isEditingOrg ? (
                            <div className={`relative`}>
                                <EnvelopeIcon className={`absolute left-3 top-2.5 size-5 text-gray-500`}/>
                                <input
                                    type={`email`}
                                    value={orgForm.email}
                                    onChange={(e) => setOrgForm({...orgForm, email: e.target.value})}
                                    className={`dashboard-form-input-icon border-gray-700`}
                                />
                            </div>
                        ) : (
                            <div className={`flex items-center space-x-2`}>
                                <EnvelopeIcon className={`size-5 text-gray-500`}/>
                                <p>{organization.email}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Phone</label>
                        {isEditingOrg ? (
                            <div className={`relative`}>
                                <PhoneIcon className={`absolute left-3 top-2.5 size-5 text-gray-500`}/>
                                <input
                                    type={`tel`}
                                    value={orgForm.phone}
                                    onChange={(e) => setOrgForm({...orgForm, phone: e.target.value})}
                                    className={`dashboard-form-input-icon border-gray-700`}
                                />
                            </div>
                        ) : (
                            <div className={`flex items-center space-x-2`}>
                                <PhoneIcon className={`size-5 text-gray-500`}/>
                                <p>{organization.phone}</p>
                            </div>
                        )}
                    </div>

                    <div className={`md:col-span-2`}>
                        <label className={`dashboard-form-label mb-2`}>Address</label>
                        {isEditingOrg ? (
                            <div className={`relative`}>
                                <MapPinIcon className={`absolute left-3 top-2.5 size-5 text-gray-500`}/>
                                <textarea
                                    value={orgForm.address}
                                    onChange={(e) => setOrgForm({...orgForm, address: e.target.value})}
                                    rows={3}
                                    className={`dashboard-form-input-icon border-gray-700`}
                                />
                            </div>
                        ) : (
                            <div className={`flex items-start space-x-2`}>
                                <MapPinIcon className={`size-5 text-gray-500 mt-0.5`}/>
                                <p>{organization.address}</p>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Logo URL</label>
                        {isEditingOrg ? (
                            <input
                                type={`url`}
                                value={orgForm.logo_url}
                                onChange={(e) => setOrgForm({...orgForm, logo_url: e.target.value})}
                                placeholder={`https://example.com/logo.png`}
                                className={`dashboard-form-input border-gray-700`}
                            />
                        ) : (
                            <p className={`truncate`}>{organization.logo_url || 'No logo set'}</p>
                        )}
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Subscription Status</label>
                        <span
                            className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                                organization.subscription_status === 'active'
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                                {organization.subscription_status.charAt(0).toUpperCase() + organization.subscription_status.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}