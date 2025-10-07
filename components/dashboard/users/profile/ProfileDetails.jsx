'use client'

import {useState} from 'react';
import ProfileTab from "@/components/dashboard/users/profile/ProfileTab";
import OrganizationTab from "@/components/dashboard/users/profile/OrganizationTab";

export default function ProfileDetails({user, organization}) {
    const [activeTab, setActiveTab] = useState('profile');
    const [saving, setSaving] = useState(false);

    return (
        <div>
            <div className={`max-w-5xl mx-auto`}>
                {/* Header */}
                <div className={`mb-8`}>
                    <h1 className={`text-3xl font-bold font-heading mb-2`}>Profile</h1>
                    <p className={`text-gray-400`}>Manage your profile and organization settings</p>
                </div>

                {/* Tabs */}
                <div className={`flex space-x-1 mb-6 border-b border-gray-800`}>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-3 font-medium transition-colors relative ${
                            activeTab === 'profile' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        My Profile
                        {activeTab === 'profile' && (
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500`}/>
                        )}
                    </button>

                    {!user.is_superadmin && (
                        <button
                            onClick={() => setActiveTab('organization')}
                            className={`px-6 py-3 font-medium transition-colors relative ${
                                activeTab === 'organization' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'
                            }`}
                        >
                            Organization
                            {activeTab === 'organization' && (
                                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500`}/>
                            )}
                        </button>
                    )}
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <ProfileTab user={user} saving={saving} setSaving={setSaving}/>
                )}

                {/* Organization Tab */}
                {activeTab === 'organization' && !user.is_superadmin && (
                    <OrganizationTab organization={organization} user={user} saving={saving} setSaving={setSaving}/>
                )}
            </div>
        </div>
    );
}
