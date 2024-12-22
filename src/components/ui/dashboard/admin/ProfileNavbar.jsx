"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import {signOut} from "next-auth/react";

const ProfileNavbar = () => {
    const profileNavLinks = [
        {href: "/admin/profile", text: "personal information"},
        {href: "/admin/profile/security", text: "security"}
    ];

    const handleLogout = async () => {
        await signOut({callbackUrl: '/accounts/login'});
    }

    const pathname = usePathname();

    return (
        <ul className={`my-10 pl-4 flex md:flex-col gap-3 text-gray-600`}>
            {profileNavLinks.map((link, index) => {
                const isActive = pathname.endsWith(link.href);

                return (
                    <li key={index} className={`capitalize ${isActive && 'font-bold text-black text-lg'}`}>
                        <Link href={link.href}>{link.text}</Link>
                    </li>
                )
            })}
            <li>
                <button onClick={handleLogout}>Logout</button>
            </li>
        </ul>
    )
}

export default ProfileNavbar;