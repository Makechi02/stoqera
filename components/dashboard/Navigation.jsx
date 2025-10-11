import {usePathname} from "next/navigation";
import {
    getSuperAdminNavigation,
    getTenantAdminNavigation,
    getTenantManagerNavigation
} from "@/data/constants/navigation";
import Link from "next/link";
import {useState} from "react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";

export function Navigation({setSidebarOpen, currentUser}) {
    let navigation = [];
    switch (currentUser.role) {
        case 'superadmin':
            navigation = getSuperAdminNavigation();
            break;
        case 'admin':
            navigation = getTenantAdminNavigation();
            break;
        case 'manager':
            navigation = getTenantManagerNavigation();
            break;
    }

    const pathname = usePathname();

    return (
        <nav className={`mt-4 px-4`}>
            {navigation.map((item, index) => {
                let isActive;
                switch (currentUser.role) {
                    case 'superadmin':
                        isActive = item.href === '/platform' ? pathname === item.href : pathname.startsWith(item.href);
                        break;
                    default:
                        isActive = item.href === '/dashboard' ? pathname === item.href : pathname.startsWith(item.href);
                }

                const [showSubItems, setShowSubItems] = useState(false);
                const toggleSubItems = () => setShowSubItems(prevState => !prevState);

                return (
                    <div key={index}>
                        {item.href ? (
                            <Link
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`w-full flex items-center px-4 py-1 mb-2 text-left rounded-lg transition-colors duration-200 ${
                                    isActive ? 'bg-primary text-text' : 'text-gray-300 hover:bg-secondary hover:text-text'
                                }`}
                            >
                                <span className={`mr-3 text-lg size-5`}>{item.icon}</span>
                                {item.name}
                            </Link>
                        ) : (
                            <p
                                className={`w-full flex items-center px-4 py-1 mb-2 text-left rounded-lg transition-colors duration-200 text-gray-300 hover:bg-secondary hover:text-text ${
                                    showSubItems && 'bg-secondary text-text'
                                }`}
                                onClick={toggleSubItems}
                            >
                                {item.name}
                                {showSubItems ?
                                    <ChevronUpIcon className={`ml-auto size-5`}/> :
                                    <ChevronDownIcon className={`ml-auto size-5`}/>
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
                                            ${isActive ? 'bg-primary text-text' : 'text-gray-300 hover:bg-secondary hover:text-text'}
                                            ${showSubItems ? 'flex' : 'hidden'}
                                        `}
                                    >
                                        <span className={`mr-3 text-lg size-5`}>{subItem.icon}</span>
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