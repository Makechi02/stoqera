import {
    HiOutlineArchiveBox,
    HiOutlineArrowsRightLeft,
    HiOutlineBanknotes,
    HiOutlineBell,
    HiOutlineBuildingOffice,
    HiOutlineChartBar,
    HiOutlineChartBarSquare,
    HiOutlineChartPie,
    HiOutlineClipboardDocumentList,
    HiOutlineCog,
    HiOutlineCreditCard,
    HiOutlineCube,
    HiOutlineDocumentText,
    HiOutlineExclamationTriangle,
    HiOutlineGift,
    HiOutlineHome,
    HiOutlineTrophy,
    HiOutlineTruck,
    HiOutlineUserGroup,
} from "react-icons/hi2";

import {
    ArchiveBoxIcon,
    ArrowsRightLeftIcon,
    BanknotesIcon,
    ChartBarSquareIcon,
    ClipboardDocumentListIcon,
    CreditCardIcon,
    CubeIcon,
    ExclamationTriangleIcon,
    GlobeAltIcon,
    HomeIcon,
    MapPinIcon,
    TagIcon,
    TruckIcon,
    UserGroupIcon,
    UserIcon,
    UsersIcon
} from "@heroicons/react/24/outline";

export function getSuperAdminNavigation(slug, location) {
    return [
        {name: 'Dashboard', icon: <HiOutlineChartBar/>, href: `/${slug}/${location}/dashboard`},
        {name: 'Organizations', icon: <HiOutlineBuildingOffice/>, href: `/${slug}/${location}/dashboard/locations`},
        {name: 'Subscription Plans', icon: <HiOutlineCreditCard/>, href: `/${slug}/${location}/dashboard/suppliers`},
        {name: 'Platform Settings', icon: <HiOutlineCog/>, href: `/${slug}/${location}/dashboard/purchases`},
        {name: 'System Notifications', icon: <HiOutlineBell/>, href: `/${slug}/${location}/dashboard/customers`},
        {name: 'Audit Logs', icon: <HiOutlineDocumentText/>, href: `/${slug}/${location}/dashboard/customer-groups`},
        {name: 'Usage Analytics', icon: <HiOutlineChartPie/>, href: `/${slug}/${location}/dashboard/users`}
    ];
}

export function getTenantAdminNavigation() {
    return [
        {name: 'Dashboard', icon: <HomeIcon/>, href: `/dashboard`},
        {name: 'Products',
            subItems: [
                {name: 'Products', icon: <CubeIcon/>, href: `/dashboard/products`},
                {name: 'Categories', icon: <TagIcon/>, href: `/dashboard/categories`}
            ]
        },
        {name: 'Inventory',
            subItems: [
                {name: 'Locations', icon: <MapPinIcon/>, href: `/dashboard/locations`},
                {name: 'Stock Levels', icon: <ArchiveBoxIcon/>, href: `/dashboard/stock/levels`},
                {name: 'Stock Transfers', icon: <ArrowsRightLeftIcon/>, href: `/dashboard/stock/transfers`},
                {name: 'Low Stock Alerts', icon: <ExclamationTriangleIcon/>, href: `/dashboard/stock/alerts`},
            ]
        },
        {name: 'Sales',
            subItems: [
                {name: 'Customers', icon: <UserGroupIcon/>, href: `/dashboard/customers`},
                {name: 'Customer Groups', icon: <UsersIcon/>, href: `/dashboard/customer-groups`},
                {name: 'Sales', icon: <BanknotesIcon/>, href: `/dashboard/sales/list`},
                {name: 'Sales Channels', icon: <GlobeAltIcon/>, href: `/dashboard/sales/channels`},
                {name: 'Payment Methods', icon: <CreditCardIcon/>, href: `/dashboard/sales/payment-methods`},
            ]
        },
        {name: 'Purchases',
            subItems: [
                {name: 'Suppliers', icon: <TruckIcon/>, href: `/dashboard/suppliers`},
                {name: 'Purchase Orders', icon: <ClipboardDocumentListIcon/>, href: `/dashboard/purchases`},
            ]
        },
        // TODO: Add marketing features
        // {name: 'Marketing',
        //     subItems: [
        //         {name: 'Promotions', icon: <GiftIcon/>, href: `/dashboard/marketing/promotions`},
        //         {name: 'Loyalty Programs', icon: <StarIcon/>, href: `/dashboard/marketing/loyalty-programs`},
        //     ]
        // },
        {name: 'Users & Access', icon: <UserIcon/>, href: `/dashboard/users`},
        {name: 'Reports & Analytics', icon: <ChartBarSquareIcon/>, href: `/dashboard/reports`},
    ];
}

export function getTenantManagerNavigation(slug, location) {
    return [
        {name: 'Dashboard', icon: <HiOutlineHome/>, href: `/${slug}/${location}/dashboard`},
        {name: 'Inventory',
            subItems: [
                {name: 'Products', icon: <HiOutlineCube/>, href: `/${slug}/${location}/dashboard/items`},
                {name: 'Stock Levels', icon: <HiOutlineArchiveBox/>, href: `/${slug}/${location}/dashboard/stock-levels`},
                {name: 'Stock Transfers', icon: <HiOutlineArrowsRightLeft/>, href: `/${slug}/${location}/dashboard/stock-transfers`},
                {name: 'Low Stock Alerts', icon: <HiOutlineExclamationTriangle/>, href: `/${slug}/${location}/dashboard/low-stock-alerts`},
            ]
        },
        {name: 'Purchase Orders', icon: <HiOutlineClipboardDocumentList/>, href: `/${slug}/${location}/dashboard/purchases`},
        {name: 'Sales', icon: <HiOutlineBanknotes/>, href: `/${slug}/${location}/dashboard/sales`},
        {name: 'Customers', icon: <HiOutlineUserGroup/>, href: `/${slug}/${location}/dashboard/customers`},
        {name: 'Suppliers', icon: <HiOutlineTruck/>, href: `/${slug}/${location}/dashboard/suppliers`},
        {name: 'Reports', icon: <HiOutlineChartBarSquare/>, href: `/${slug}/${location}/dashboard/reports`},
    ];
}

export function getTenantStaffNavigation(slug, location) {
    return [
        {name: 'Dashboard', icon: <HiOutlineHome/>, href: `/${slug}/${location}/dashboard`},
        {name: 'Inventory',
            subItems: [
                {name: 'Products', icon: <HiOutlineCube/>, href: `/${slug}/${location}/dashboard/items`},
                {name: 'Stock Check', icon: <HiOutlineArchiveBox/>, href: `/${slug}/${location}/dashboard/stock-levels`},
                {name: 'Stock Movements', icon: <HiOutlineArrowsRightLeft/>, href: `/${slug}/${location}/dashboard/stock-transfers`},
            ]
        },
        {name: 'Sales', icon: <HiOutlineBanknotes/>, href: `/${slug}/${location}/dashboard/sales`},
        {name: 'Customers', icon: <HiOutlineUserGroup/>, href: `/${slug}/${location}/dashboard/customers`},
    ];
}

export function getTenantSalesRepNavigation(slug, location) {
    return [
        {name: 'Dashboard', icon: <HiOutlineHome/>, href: `/${slug}/${location}/dashboard`},
        {name: 'Customers', icon: <HiOutlineUserGroup/>, href: `/${slug}/${location}/dashboard/customers`},
        {name: 'Sales', icon: <HiOutlineBanknotes/>, href: `/${slug}/${location}/dashboard/sales`},
        {name: 'Products', icon: <HiOutlineCube/>, href: `/${slug}/${location}/dashboard/items`},
        {name: 'Promotions', icon: <HiOutlineGift/>, href: `/${slug}/${location}/dashboard/items`},
        {name: 'My Performance', icon: <HiOutlineTrophy/>, href: `/${slug}/${location}/dashboard/items`},
    ];
}