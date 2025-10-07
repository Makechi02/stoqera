'use client'

import {useEffect, useRef, useState} from "react";
import {Navigation} from "@/components/dashboard/Navigation";
import {Logo} from "@/components";
import {
    ArrowRightEndOnRectangleIcon,
    Bars3Icon,
    BellIcon,
    ChevronDownIcon,
    CogIcon,
    QuestionMarkCircleIcon,
    UserCircleIcon,
    UserIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import LogoutModal from "@/components/dashboard/ui/modals/LogoutModal";
import {useRouter} from "next/navigation";
import {signOut} from "@/lib/users/queryUsers";
import {showErrorToast} from "@/utils/toastUtil";

export default function Sidebar({organization, currentUser, children}) {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prevState => !prevState);

    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleSignOutClick = () => {
        setLogoutModalOpen(true);
    };

    const handleLogoutCancel = () => {
        setLogoutModalOpen(false);
    };

    const handleLogoutConfirm = async () => {
        setIsLoggingOut(true);

        try {
            await signOut();

            setLogoutModalOpen(false);
            router.push('/login');
        } catch (error) {
            console.error('Error signing out:', error);
            showErrorToast('Error signing out. Please try again later.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div>
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div className={`fixed inset-0 z-40 bg-secondary/70 lg:hidden`} onClick={toggleSidebar}/>
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:inset-0 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className={`flex items-center justify-between h-16 px-4 bg-gray-800 border-b border-gray-700`}>
                    <Logo textColor={`text-text`} size={`sm`}/>
                    <button className={`lg:hidden text-gray-400 hover:text-gray-200`} onClick={toggleSidebar}>
                        <span className={`sr-only`}>Close sidebar</span>
                        <XMarkIcon className={`size-5`}/>
                    </button>
                </div>

                <div className={`overflow-y-auto`}>
                    <Navigation setSidebarOpen={setSidebarOpen}/>
                </div>
            </aside>

            <div className={`lg:absolute lg:left-64 right-0 top-0`}>
                <TopBar
                    user={currentUser}
                    organization={organization}
                    toggleSidebar={toggleSidebar}
                    handleSignOut={handleSignOutClick}
                />
                <main className={`p-4 lg:p-6`}>{children}</main>
            </div>

            <LogoutModal
                isOpen={logoutModalOpen}
                onClose={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
                userName={currentUser.full_name}
                isLoading={isLoggingOut}
            />
        </div>
    )
}


function TopBar({user, organization, toggleSidebar, handleSignOut}) {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleProfileDropdown = () => setProfileDropdownOpen(prevState => !prevState);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-700 bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8`}>
            {/* Mobile menu button */}
            <button type={`button`} className={`-m-2.5 p-2.5 text-gray-400 lg:hidden`} onClick={toggleSidebar}>
                <span className={`sr-only`}>Open sidebar</span>
                <Bars3Icon className={`size-6`}/>
            </button>

            {/* Separator */}
            <div className={`h-6 w-px bg-gray-600 lg:hidden`}/>

            <div className={`flex flex-1 gap-x-4 self-stretch lg:gap-x-6`}>
                <p className={`text-sm text-gray-400 flex-1 flex items-center uppercase`}>{organization.name}</p>

                <div className={`flex items-center gap-x-4 lg:gap-x-6`}>
                    {/* Notifications */}
                    <button
                        type={`button`}
                        className={`-m-2.5 p-2.5 text-gray-400 hover:text-gray-300 transition-colors duration-150`}
                    >
                        <BellIcon className={`size-6`}/>
                    </button>

                    {/* Separator */}
                    <div className={`hidden lg:block lg:h-6 lg:w-px lg:bg-gray-600`}/>

                    {/* Profile dropdown */}
                    <div className={`relative`} ref={dropdownRef}>
                        <ProfileDropdownToggler
                            user={user}
                            toggleProfileDropdown={toggleProfileDropdown}
                            profileDropdownOpen={profileDropdownOpen}
                        />

                        {/* Dropdown menu */}
                        {profileDropdownOpen && (
                            <ProfileDropdown
                                user={user}
                                toggleProfileDropdown={toggleProfileDropdown}
                                handleSignOut={handleSignOut}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function ProfileDropdownToggler({toggleProfileDropdown, profileDropdownOpen, user}) {
    return (
        <button
            type={`button`}
            className={`flex items-center gap-x-2 p-1.5 text-sm leading-6 text-white hover:bg-gray-700 rounded-md transition-colors duration-150`}
            onClick={toggleProfileDropdown}
        >
            <div className={`flex items-center gap-x-2`}>
                {user.avatar_url ? (
                    <div className={`relative size-8`}>
                        <img
                            className={`rounded-full bg-gray-50 object-cover object-center`}
                            src={user.avatar_url}
                            alt={`Avatar of ${user.full_name}`}
                        />
                    </div>
                ) : (
                    <UserCircleIcon className={`size-8 text-gray-400`}/>
                )}
                <div className={`hidden lg:block text-left`}>
                    <div className={`text-sm font-semibold`}>{user.full_name}</div>
                    <div className={`text-xs text-gray-400`}>{user.role}</div>
                </div>
            </div>
            <ChevronDownIcon
                className={`size-4 text-gray-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`}
            />
        </button>
    )
}

function ProfileDropdown({user, toggleProfileDropdown, handleSignOut}) {
    const profileMenuItems = [
        {name: 'Your Profile', icon: <UserIcon/>, href: '/dashboard/users/profile'},
        {name: 'Settings', icon: <CogIcon/>, href: '/dashboard/settings'},
        // {name: 'Security', icon: <ShieldCheckIcon/>, href: '/dashboard/security'},
        {name: 'Help & Support', icon: <QuestionMarkCircleIcon/>, href: '/help'},
    ];

    return (
        <div
            className={`absolute right-0 z-50 mt-4 w-56 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-gray-700 ring-opacity-100 focus:outline-none`}>
            {/* User info section */}
            <div className={`px-4 py-3 border-b border-gray-700`}>
                <p className={`text-sm font-medium`}>{user.full_name}</p>
                <p className={`text-xs text-gray-400 truncate`}>{user.email}</p>
                <span
                    className={`inline-flex items-center rounded-full bg-teal-900 px-2 py-1 text-xs font-medium text-teal-200 mt-2`}
                >
                    {user.role}
                </span>
            </div>

            {/* Menu items */}
            <div className={`py-1`}>
                {profileMenuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={toggleProfileDropdown}
                        className={`group flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150`}
                    >
                        <span className={`mr-3 size-4 text-gray-400 group-hover:text-teal-300`}>{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
            </div>

            {/* Sign out */}
            <div className={`border-t border-gray-700 py-1`}>
                <button
                    type={`button`}
                    onClick={handleSignOut}
                    className={`group flex w-full items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150`}
                >
                    <ArrowRightEndOnRectangleIcon className={`mr-3 size-4 text-gray-400 group-hover:text-red-400`}/>
                    Sign out
                </button>
            </div>
        </div>
    )
}