'use client'

import {useState} from "react";
import {HiOutlineBars3, HiOutlineXMark} from "react-icons/hi2";
import {Navigation} from "@/components/dashboard/Navigation";
import {Logo} from "@/components";

export default function Sidebar({organization, children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(prevState => !prevState);

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
                    <div className={`flex gap-4 items-center`}>
                        <Logo/>
                        <h1 className={`text-2xl font-bold text-teal-600 font-heading`}>Finviq</h1>
                    </div>
                    <button className={`lg:hidden text-gray-400 hover:text-gray-200`} onClick={toggleSidebar}>
                        <span className={`sr-only`}>Close sidebar</span>
                        <HiOutlineXMark/>
                    </button>
                </div>

                <div className={`overflow-y-auto`}>
                    <Navigation setSidebarOpen={setSidebarOpen}/>
                </div>
            </aside>

            <div className={`lg:absolute lg:left-64 right-0 top-0`}>
                <TopBar organization={organization} toggleSidebar={toggleSidebar}/>
                <main className={`p-4 lg:p-6`}>{children}</main>
            </div>
        </div>
    )
}

function TopBar({organization, toggleSidebar}) {
    return (
        <div
            className={`sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-gray-800 border-b border-gray-700 lg:px-6`}
        >
            <button
                className={`lg:hidden text-gray-400 hover:text-gray-200`}
                onClick={toggleSidebar}
            >
                <span className={`sr-only`}>Open sidebar</span>
                <HiOutlineBars3/>
            </button>

            <div className={`flex items-center space-x-4`}>
                <div className={`text-sm text-gray-400`}>
                    {organization.name}
                </div>
            </div>
        </div>
    )
}
