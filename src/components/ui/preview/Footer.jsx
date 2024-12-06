'use client'

import Link from "next/link";
import {footerLinks, socialLinks} from "@/data/constants";
import {Logo} from "@/components/ui";

const Footer = () => {
    return (
        <footer className={`bg-surface text-white`}>
            <div className={`mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8`}>
                <div className={`grid grid-cols-1 gap-8 lg:grid-cols-3`}>
                    <div>
                        <div className={`text-primary flex items-center gap-2`}>
                            <Logo/>
                            <p className={`font-bold font-gfs_didot text-3xl`}>Finviq</p>
                        </div>

                        <p className={`mt-4 max-w-xs text-gray-500 dark:text-gray-400`}>
                            Your go-to solution for seamless stock control and management.
                        </p>

                        <ul className={`mt-8 flex gap-6`}>
                            {socialLinks.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        rel={`noreferrer`}
                                        target={`_blank`}
                                        className={`text-xl transition hover:opacity-75`}
                                    >
                                        <span className={`sr-only`}>{link.sr_only_text}</span>
                                        {link.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4`}>
                        {footerLinks.map((footerLink, index) => (
                            <div key={index}>
                                <p className={`font-medium`}>{footerLink.title}</p>
                                <ul className={`mt-6 space-y-4 text-sm`}>
                                    {footerLink.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.href}
                                                className={`transition hover:opacity-75 hover:text-primary`}
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <p className={`text-sm text-gray-500 dark:text-gray-400`}>
                    &copy; {new Date().getFullYear()}. Finviq. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
