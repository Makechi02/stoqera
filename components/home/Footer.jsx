import {Logo} from "@/components";

export default function Footer() {
    return (
        <footer className={`bg-gray-900 text-white py-16`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-8`}>
                    <div>
                        <div className={`flex items-center mb-4`}>
                            <Logo/>
                            <span className={`ml-2 text-2xl font-bold font-heading`}>Finviq</span>
                        </div>
                        <p className={`text-gray-400 mb-4`}>
                            Streamline your inventory operations with the most intuitive management platform.
                        </p>
                    </div>

                    <div>
                        <h4 className={`text-lg font-semibold mb-4`}>Product</h4>
                        <ul className={`space-y-2 text-gray-400`}>
                            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className={`text-lg font-semibold mb-4`}>Company</h4>
                        <ul className={`space-y-2 text-gray-400`}>
                            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className={`text-lg font-semibold mb-4`}>Support</h4>
                        <ul className={`space-y-2 text-gray-400`}>
                            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                        </ul>
                    </div>
                </div>

                <div
                    className={`border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center`}>
                    <p className={`text-gray-400`}>© {new Date().getFullYear()} Finviq. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}