'use client'

import {IoHomeOutline, IoNotificationsOutline} from "react-icons/io5";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Tabs() {
    const navLinks = [
        {path: '/admin', text: 'Dashboard', icon: <IoHomeOutline/>},
        {path: '/admin/getting-started', text: 'Getting Started', icon: <IoHomeOutline/>},
        {path: '/admin/notifications', text: 'Notifications', icon: <IoNotificationsOutline/>}
    ];

    const pathname = usePathname();

    return (
        <div>
            <div className={`sm:hidden`}>
                <label htmlFor={`Tab`} className={`sr-only`}>Tab</label>

                <select
                    id={`Tab`}
                    className={`w-full rounded-md border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white`}
                >
                    {navLinks.map((link, index) => (
                        <option key={index}>{link.text}</option>
                    ))}
                </select>
            </div>

            <div className={`hidden sm:block`}>
                <div>
                    <nav className={`-mb-px flex gap-6`} aria-label={`Tabs`}>
                        {navLinks.map((link, index) => {
                            const isActive = link.path === "/admin" ? pathname === link.path : pathname.startsWith(link.path);

                            return (
                                <Link
                                    key={index}
                                    href={link.path}
                                    className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-3 text-sm font-medium hover:border-primary
                                    ${isActive ? 'border-primary text-primary' : 'border-transparent'}`}
                                >
                                    {link.icon}
                                    {link.text}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </div>
    )
}