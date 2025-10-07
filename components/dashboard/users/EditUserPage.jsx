'use client'

import {useState} from "react";
import {ShieldCheckIcon, UserCircleIcon} from "@heroicons/react/24/outline";
import {BackBtn} from "@/components/ui/buttons";

export default function EditUserPage({user, locations}) {
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');

    const [formData, setFormData] = useState({
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
        avatar_url: user.avatar_url || ''
    });

    // Mock locations data
    // const [locations, setLocations] = useState([
    //     {id: '1', name: 'Main Warehouse', address: 'New York, NY'},
    //     {id: '2', name: 'West Coast Hub', address: 'Los Angeles, CA'},
    //     {id: '3', name: 'East Coast Depot', address: 'Boston, MA'}
    // ]);

    const [userLocations, setUserLocations] = useState([
        {location_id: '1', role: 'manager'},
        {location_id: '2', role: 'user'}
    ]);

    // Mock permissions
    const [permissions, setPermissions] = useState({
        inventory: {
            view: true,
            create: true,
            edit: true,
            delete: false
        },
        orders: {
            view: true,
            create: true,
            edit: false,
            delete: false
        },
        reports: {
            view: true,
            create: false,
            edit: false,
            delete: false
        },
        users: {
            view: false,
            create: false,
            edit: false,
            delete: false
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        setTimeout(() => {
            // onSave({...formData, permissions, userLocations});
            setSaving(false);
        }, 1000);
    };

    const handleLocationToggle = (locationId) => {
        const exists = userLocations.find(ul => ul.location_id === locationId);
        if (exists) {
            setUserLocations(userLocations.filter(ul => ul.location_id !== locationId));
        } else {
            setUserLocations([...userLocations, {location_id: locationId, role: 'user'}]);
        }
    };

    const handleLocationRoleChange = (locationId, role) => {
        setUserLocations(userLocations.map(ul =>
            ul.location_id === locationId ? {...ul, role} : ul
        ));
    };

    const handlePermissionToggle = (module, action) => {
        setPermissions({
            ...permissions,
            [module]: {
                ...permissions[module],
                [action]: !permissions[module][action]
            }
        });
    };

    return (
            <div className={`max-w-5xl mx-auto py-4`}>
                {/* Header */}
                <div className={`mb-8`}>
                        <div className={`flex items-center space-x-4`}>
                            <BackBtn/>
                            <div className={`size-14 bg-gray-800 rounded-full flex items-center justify-center`}>
                                {user.avatar_url ? (
                                    <img src={user.avatar_url} alt={``} className={`size-14 rounded-full`}/>
                                ) : (
                                    <UserCircleIcon className={`size-10 text-gray-600`}/>
                                )}
                            </div>
                            <div>
                                <h1 className={`text-3xl font-bold font-heading mb-1`}>{user.full_name}</h1>
                                <p className={`text-gray-400`}>{user.email}</p>
                            </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={`flex space-x-1 mb-6 border-b border-gray-800`}>
                    <button
                        onClick={() => setActiveTab('basic')}
                        className={`px-6 py-3 font-medium transition-colors relative ${
                            activeTab === 'basic' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        Basic Info
                        {activeTab === 'basic' && <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500`}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('locations')}
                        className={`px-6 py-3 font-medium transition-colors relative ${
                            activeTab === 'locations' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        Location Access
                        {activeTab === 'locations' &&
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500`}/>}
                    </button>
                    <button
                        onClick={() => setActiveTab('permissions')}
                        className={`px-6 py-3 font-medium transition-colors relative ${
                            activeTab === 'permissions' ? 'text-teal-400' : 'text-gray-400 hover:text-gray-300'
                        }`}
                    >
                        Permissions
                        {activeTab === 'permissions' &&
                            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500`}/>}
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Basic Info Tab */}
                    {activeTab === 'basic' && (
                        <div className={`bg-gray-800 rounded-lg border border-gray-700 p-4 space-y-6`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                                        className={`dashboard-form-input border-gray-700`}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Role
                                    </label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        className={`dashboard-form-input border-gray-700`}
                                    >
                                        <option value="viewer">Viewer</option>
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Avatar URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.avatar_url}
                                        onChange={(e) => setFormData({...formData, avatar_url: e.target.value})}
                                        placeholder="https://example.com/avatar.jpg"
                                        className={`dashboard-form-input border-gray-700`}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-2 focus:ring-teal-500"
                                    />
                                    <div>
                                        <div className="text-sm font-medium text-white">Active User</div>
                                        <div className="text-xs text-gray-400">
                                            Inactive users cannot log in to the system
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Location Access Tab */}
                    {activeTab === 'locations' && (
                        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Location Access</h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Select which locations this user can access and their role at each location
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {userLocations.length} of {locations.length} locations
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {locations.map((location) => {
                                        const userLocation = userLocations.find(ul => ul.location_id === location.id);
                                        const hasAccess = !!userLocation;

                                        return (
                                            <div
                                                key={location.id}
                                                className={`border rounded-lg p-4 transition-colors ${
                                                    hasAccess
                                                        ? 'border-teal-500/30 bg-teal-500/5'
                                                        : 'border-gray-800 bg-gray-800/50'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3 flex-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={hasAccess}
                                                            onChange={() => handleLocationToggle(location.id)}
                                                            className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-2 focus:ring-teal-500"
                                                        />
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-white">
                                                                {location.name}
                                                            </div>
                                                            <div
                                                                className="text-xs text-gray-400">{location.address}</div>
                                                        </div>
                                                    </div>

                                                    {hasAccess && (
                                                        <div className="ml-4">
                                                            <select
                                                                value={userLocation.role}
                                                                onChange={(e) => handleLocationRoleChange(location.id, e.target.value)}
                                                                className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                                            >
                                                                <option value="viewer">Viewer</option>
                                                                <option value="user">User</option>
                                                                <option value="manager">Manager</option>
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {locations.length === 0 && (
                                    <div className="text-center py-12 border border-gray-800 rounded-lg">
                                        <p className="text-gray-400">No locations available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Permissions Tab */}
                    {activeTab === 'permissions' && (
                        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                            <div className="p-6">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-white">Module Permissions</h3>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Control what actions this user can perform in each module
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {Object.entries(permissions).map(([module, actions]) => (
                                        <div key={module} className="border border-gray-800 rounded-lg overflow-hidden">
                                            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
                                                <h4 className="text-sm font-semibold text-white capitalize flex items-center space-x-2">
                                                    <ShieldCheckIcon className="w-5 h-5 text-teal-400"/>
                                                    <span>{module}</span>
                                                </h4>
                                            </div>
                                            <div className="p-4">
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {Object.entries(actions).map(([action, enabled]) => (
                                                        <label
                                                            key={action}
                                                            className="flex items-center space-x-3 cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={enabled}
                                                                onChange={() => handlePermissionToggle(module, action)}
                                                                className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-2 focus:ring-teal-500"
                                                            />
                                                            <span className="text-sm text-gray-300 capitalize">
                                {action}
                              </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                    <div className="flex items-start space-x-3">
                                        <ShieldCheckIcon className="w-5 h-5 text-blue-400 mt-0.5"/>
                                        <div className="text-sm text-blue-300">
                                            <p className="font-medium mb-1">Permission Inheritance</p>
                                            <p className="text-blue-300/80">
                                                Permissions set here are in addition to role-based permissions.
                                                Admin users have full access regardless of these settings.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            // onClick={onBack}
                            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
        </div>
    );
}
