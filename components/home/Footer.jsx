import {Logo} from "@/components";
import Link from "next/link";

export default function Footer() {
    const footerLinks = [
        {
            title: 'Product',
            links: [
                {name: 'Features', href: '#'},
                {name: 'Pricing', href: '/pricing'},
                // {name: 'API', href: '#'},
                // {name: 'Security', href: '#'}
            ]
        },
        {
            title: 'Company',
            links: [
                {name: 'About', href: '#'},
                {name: 'Blog', href: '#'},
                // {name: 'Careers', href: '#'},
                {name: 'Contact', href: '#'}
            ]
        },
        {
            title: 'Support',
            links: [
                {name: 'Help Center', href: '#'},
                {name: 'Documentation', href: '#'},
                // {name: 'Status', href: '#'},
                // {name: 'Community', href: '#'}
            ]
        }
    ];

    return (
        <footer className={`bg-gray-900 text-white py-10`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-8`}>
                    <div>
                        <div className={`flex items-center mb-4`}>
                            <Logo/>
                            <span className={`ml-2 text-2xl font-bold font-heading`}>Stoqera</span>
                        </div>
                        <p className={`text-gray-400 mb-4`}>
                            Leading inventory management platform helping small and medium businesses in Kenya
                            streamline operations and maximize profits.
                        </p>
                    </div>

                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h4 className={`text-lg font-semibold mb-4`}>{section.title}</h4>
                            <ul className={`space-y-2 text-gray-400`}>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link href={link.href} className={`hover:text-white transition-colors`}>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div
                    className={`border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}
                >
                    <p className={`text-gray-400`}>© {new Date().getFullYear()} Stoqera. All rights reserved.</p>
                    <div className={`flex space-x-6 mt-4 md:mt-0`}>
                        <a href="#" className={`text-gray-400 hover:text-white transition-colors`}>Privacy</a>
                        <a href="#" className={`text-gray-400 hover:text-white transition-colors`}>Terms</a>
                        <a href="#" className={`text-gray-400 hover:text-white transition-colors`}>Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}