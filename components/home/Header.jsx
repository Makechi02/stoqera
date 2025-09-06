'use client'

import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import {useState} from "react";
import {Logo} from "@/components";
import Link from "next/link";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        {href: '#features', title: 'Features'},
        {href: '#pricing', title: 'Pricing'},
        // {href: '#testimonials', title: 'Testimonials'},
        // {href: '#contact', title: 'Contact'}
    ];

    return (
        <header className={`bg-white border-b border-gray-200 sticky top-0 z-50`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`flex justify-between items-center py-4`}>
                    <div className={`flex items-center`}>
                        <div className={` size-10 bg-gray-800 rounded-full`}>
                            <Logo/>
                        </div>
                        <span className={`ml-2 text-2xl font-bold text-gray-900 font-heading`}>Stoqera</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={`hidden md:flex space-x-8`}>
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className={`text-gray-600 hover:text-teal-600 transition-colors`}
                            >
                                {link.title}
                            </a>
                        ))}
                    </nav>

                    <div className={`hidden md:flex items-center space-x-4`}>
                        <Link
                            href={`/login`}
                            className={`text-gray-600 hover:text-teal-600 transition-colors`}
                        >
                            Sign In
                        </Link>
                        <Link
                            href={`/register`}
                            className={`bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors`}
                        >
                            Start Free Trial
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button className={`md:hidden`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? (
                            <XMarkIcon className={`size-6 text-gray-600 hover:text-teal-600 transition-colors`}/>
                        ) : (
                            <Bars3Icon className={`size-6 text-gray-600 hover:text-teal-600 transition-colors`}/>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={`md:hidden bg-white border-t border-gray-200`}>
                    <div className={`px-4 py-2 space-y-2`}>
                        {navLinks.map((link, index) => (
                            <a key={index} href={link.href} className={`block py-2 text-gray-600`}>{link.title}</a>
                        ))}
                        <div className={`pt-2 border-t border-gray-200`}>
                            <Link href={`/login`} className={`block w-full text-left py-2 text-gray-600`}>
                                Sign In
                            </Link>
                            <Link
                                href={`/register`}
                                className={`block text-center mt-2 w-full bg-teal-600 text-white py-2 px-2 rounded-lg`}
                            >
                                Start Free Trial
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}