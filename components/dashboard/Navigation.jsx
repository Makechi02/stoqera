import {useParams, usePathname} from "next/navigation";
import {getTenantAdminNavigation} from "@/data/constants";
import Link from "next/link";
import {useState} from "react";
import {HiOutlineChevronDown, HiOutlineChevronUp} from "react-icons/hi2";

export function Navigation({setSidebarOpen}) {
    const params = useParams();

    const navigation = getTenantAdminNavigation(params.slug);

    const pathname = usePathname();

    return (
        <nav className={`mt-4 px-4`}>
            {navigation.map((item, index) => {
                const isActive = item.href === `/dashboard/${params.slug}` ?
                    pathname === item.href :
                    pathname.startsWith(item.href);

                const [showSubItems, setShowSubItems] = useState(false);
                const toggleSubItems = () => setShowSubItems(prevState => !prevState);

                return (
                    <div key={index}>
                        {item.href ? (
                            <Link
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`w-full flex items-center px-4 py-1 mb-2 text-left rounded-lg transition-colors duration-200 ${
                                    isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-secondary hover:text-white'
                                }`}
                            >
                                <span className={`mr-3 text-lg`}>{item.icon}</span>
                                {item.name}
                            </Link>
                        ) : (
                            <p
                                className={`w-full flex items-center px-4 py-1 mb-2 text-left rounded-lg transition-colors duration-200 text-gray-300 hover:bg-secondary hover:text-white ${
                                    showSubItems && 'bg-secondary text-white'
                                }`}
                                onClick={toggleSubItems}
                            >
                                {item.name}
                                {showSubItems ?
                                    <HiOutlineChevronUp className={`ml-auto`}/> :
                                    <HiOutlineChevronDown className={`ml-auto`}/>
                                }
                            </p>
                        )}

                        {item.subItems && item.subItems.map((subItem, index) => {
                            const isActive = pathname.startsWith(subItem.href);
                            
                            return (
                                <div key={index} className={`pl-4`}>
                                    <Link
                                        href={subItem.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`w-full items-center px-4 py-1 mb-2 text-left rounded-lg transition-colors duration-200 
                                    ${isActive ? 'bg-primary text-white' : 'text-gray-300 hover:bg-secondary hover:text-white'}
                                    ${showSubItems ? 'flex' : 'hidden'}
                                `}
                                    >
                                        <span className={`mr-3 text-lg`}>{subItem.icon}</span>
                                        {subItem.name}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )

            })}
        </nav>
    )
}