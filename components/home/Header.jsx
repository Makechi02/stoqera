'use client'

import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import {useState} from "react";
import {Logo} from "@/components";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className={`bg-white border-b border-gray-200 sticky top-0 z-50`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`flex justify-between items-center py-4`}>
                    <div className={`flex items-center`}>
                        <div className={` size-10 bg-gray-800 rounded-full`}>
                            <Logo/>
                        </div>
                        <span className={`ml-2 text-2xl font-bold text-gray-900 font-heading`}>Finviq</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className={`hidden md:flex space-x-8`}>
                        <a href={`#features`}
                           className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
                        <a href={`#pricing`} className="text-gray-600 hover:text-teal-600 transition-colors">Pricing</a>
                        <a href={`#testimonials`}
                           className="text-gray-600 hover:text-teal-600 transition-colors">Testimonials</a>
                        <a href={`#contact`} className="text-gray-600 hover:text-teal-600 transition-colors">Contact</a>
                    </nav>

                    <div className={`hidden md:flex items-center space-x-4`}>
                        <button className={`text-gray-600 hover:text-teal-600 transition-colors`}>Sign In</button>
                        <button
                            className={`bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors`}>
                            Start Free Trial
                        </button>
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
                        <a href={`#features`} className="block py-2 text-gray-600">Features</a>
                        <a href={`#pricing`} className="block py-2 text-gray-600">Pricing</a>
                        <a href={`#testimonials`} className="block py-2 text-gray-600">Testimonials</a>
                        <a href={`#contact`} className="block py-2 text-gray-600">Contact</a>
                        <div className="pt-2 border-t border-gray-200">
                            <button className="block w-full text-left py-2 text-gray-600">Sign In</button>
                            <button className="mt-2 w-full bg-teal-600 text-white py-2 rounded-lg">
                                Start Free Trial
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}