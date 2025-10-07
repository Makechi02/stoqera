'use client'

import {useState} from 'react';
import {CheckIcon, EnvelopeIcon, PencilIcon, UserCircleIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {formatDescriptionDate} from "@/utils/formatters";
import {showErrorToast, showSuccessToast} from "@/utils/toastUtil";
import {updateUser} from "@/lib/users/queryUsers";
import {ProgressLoader} from "@/components";

export default function ProfileTab({user, saving, setSaving}) {
    const [profileForm, setProfileForm] = useState({
        full_name: user.full_name,
        email: user.email,
        avatar_url: user.avatar_url || ''
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleProfileEdit = () => {
        setIsEditingProfile(true);
    };

    const handleProfileCancel = () => {
        setProfileForm({
            full_name: user.full_name,
            email: user.email,
            avatar_url: user.avatar_url || ''
        });
        setIsEditingProfile(false);
    };

    const handleProfileSave = async () => {
        setSaving(true);

        try {
            const response = await updateUser(profileForm);

            if (response) {
                showSuccessToast('Profile updated successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating profile: ', error);
            showErrorToast('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            superadmin: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            admin: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
            manager: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            user: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
            viewer: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
        };
        return colors[role] || colors.user;
    };

    return (
        <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden`}>
            {/* Profile Header */}
            <div
                className={`px-6 py-4 border-b border-gray-800 flex flex-col sm:flex-row flex-wrap sm:items-center sm:justify-between gap-4`}
            >
                <div className={`flex items-center space-x-4`}>
                    <div className={`size-16 bg-gray-800 rounded-full flex items-center justify-center`}>
                        {user.avatar_url ? (
                            <img src={user.avatar_url} alt="Avatar" className={`size-16 rounded-full`}/>
                        ) : (
                            <UserCircleIcon className={`size-10 text-gray-600`}/>
                        )}
                    </div>
                    <div>
                        <h2 className={`text-xl font-semibold`}>{user.full_name}</h2>
                        <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getRoleBadgeColor(user.role)}`}
                        >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                    </div>
                </div>

                {!isEditingProfile ? (
                    <div className={`flex-1 flex justify-end`}>
                        <button
                            onClick={handleProfileEdit}
                            className={`flex items-center space-x-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors`}
                        >
                            <PencilIcon className={`size-4`}/>
                            <span>Edit Profile</span>
                        </button>
                    </div>
                ) : (
                    <div className={`flex-1 flex justify-end space-x-2`}>
                        <button
                            onClick={handleProfileCancel}
                            className={`flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors`}
                        >
                            <XMarkIcon className={`size-4`}/>
                            <span>Cancel</span>
                        </button>
                        <button
                            onClick={handleProfileSave}
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
                )}
            </div>

            {/* Profile Content */}
            <div className={`p-6 space-y-6`}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
                    <div>
                        <label className={`dashboard-form-label mb-2`}>Full Name</label>
                        {isEditingProfile ? (
                            <input
                                type={`text`}
                                value={profileForm.full_name}
                                onChange={(e) => setProfileForm({
                                    ...profileForm,
                                    full_name: e.target.value
                                })}
                                className={`dashboard-form-input border-gray-700`}
                            />
                        ) : (
                            <p>{user.full_name}</p>
                        )}
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Email</label>
                        <div className={`flex items-center space-x-2`}>
                            <EnvelopeIcon className={`size-5 text-gray-500`}/>
                            <p>{user.email}</p>
                        </div>
                        <p className={`text-xs text-gray-500 mt-1`}>Email cannot be changed here</p>
                    </div>

                    <div>
                        <label className={`dashboard-form-label mb-2`}>Avatar URL</label>
                        {isEditingProfile ? (
                            <input
                                type={`url`}
                                value={profileForm.avatar_url}
                                onChange={(e) => setProfileForm({
                                    ...profileForm,
                                    avatar_url: e.target.value
                                })}
                                placeholder={`https://example.com/avatar.jpg`}
                                className={`dashboard-form-input border-gray-700`}
                            />
                        ) : (
                            <p className={`truncate`}>{user.avatar_url || 'No avatar set'}</p>
                        )}
                    </div>

                    <div>
                        <label className={`block text-sm font-medium text-gray-400 mb-2`}>Last Login</label>
                        <p>{formatDescriptionDate(user.last_login)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
