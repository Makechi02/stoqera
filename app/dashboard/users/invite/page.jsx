'use client'

import {useState} from "react";
import {EnvelopeIcon} from "@heroicons/react/24/outline";
import {BackBtn} from "@/components/ui/buttons";
import {ProgressLoader} from "@/components";

export default function Page() {
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        full_name: '',
        role: 'user',
        send_invite: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        // Simulate API call
        setTimeout(() => {
            // onSave(formData);
            setSaving(false);
        }, 1000);

        /* Real Supabase implementation:
        // 1. Create user in auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: formData.email,
          email_confirm: !formData.send_invite
        });

        // 2. Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: formData.email,
            full_name: formData.full_name,
            role: formData.role,
            organization_id: currentOrgId
          });

        // 3. Send invite email if requested
        if (formData.send_invite) {
          // Use Supabase auth invite or custom email service
        }
        */
    };

    return (
        <div className={`py-4`}>
            <div className={`max-w-3xl mx-auto`}>
                {/* Header */}
                <div className={`flex items-center mb-8`}>
                    <BackBtn/>
                    <div>
                        <h1 className={`text-3xl font-bold mb-2 font-heading`}>Add New User</h1>
                        <p className={`text-gray-400`}>Invite a new user to your organization</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}
                      className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden`}>
                    <div className={`p-6 space-y-6`}>
                        <div>
                            <label className={`dashboard-form-label mb-2`}>
                                Email Address <span className={`text-red-400`}>*</span>
                            </label>
                            <div className={`relative`}>
                                <EnvelopeIcon className={`absolute left-3 top-2.5 size-5 text-gray-500`}/>
                                <input
                                    type={`email`}
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    placeholder={`user@example.com`}
                                    className={`dashboard-form-input-icon border-gray-700`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={`dashboard-form-label mb-2`}>Full Name</label>
                            <input
                                type={`text`}
                                value={formData.full_name}
                                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                placeholder={`John Doe`}
                                className={`dashboard-form-input border-gray-700`}
                            />
                        </div>

                        <div>
                            <label className={`dashboard-form-label mb-2`}>
                                Role <span className={`text-red-400`}>*</span>
                            </label>
                            <select
                                required
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className={`dashboard-form-input border-gray-700`}
                            >
                                <option value={`viewer`}>Viewer - Read-only access</option>
                                <option value={`user`}>User - Standard access</option>
                                <option value={`manager`}>Manager - Can manage locations</option>
                                <option value={`admin`}>Admin - Full access</option>
                            </select>
                            <p className={`text-xs text-gray-500 mt-1`}>
                                You can assign specific location access after creating the user
                            </p>
                        </div>

                        <div className={`bg-gray-800 rounded-lg p-4`}>
                            <label className={`flex items-start space-x-3 cursor-pointer`}>
                                <input
                                    type={`checkbox`}
                                    checked={formData.send_invite}
                                    onChange={(e) => setFormData({...formData, send_invite: e.target.checked})}
                                    className={`mt-1 size-4 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-2 focus:ring-teal-500`}
                                />
                                <div>
                                    <div className={`text-sm font-medium`}>Send invitation email</div>
                                    <div className={`text-xs text-gray-400 mt-1`}>
                                        The user will receive an email with instructions to set up their account
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={`px-6 py-4 bg-gray-800 border-t border-gray-700 flex justify-end space-x-3`}>
                        <button
                            type={`button`}
                            className={`dashboard-cancel-btn`}
                        >
                            Cancel
                        </button>
                        <button
                            type={`submit`}
                            disabled={saving}
                            className={`dashboard-submit-btn`}
                        >
                            {saving ? (
                                <>
                                    <ProgressLoader/>
                                    <span>Adding User...</span>
                                </>
                            ) : (
                                <>
                                    <span>Add User</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
