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
    HiOutlineGlobeAlt,
    HiOutlineHome,
    HiOutlineMapPin,
    HiOutlineStar,
    HiOutlineTag,
    HiOutlineTrophy,
    HiOutlineTruck,
    HiOutlineUser,
    HiOutlineUserGroup,
    HiOutlineUsers
} from "react-icons/hi2";

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
        {name: 'Dashboard', icon: <HiOutlineHome/>, href: `/dashboard`},
        {name: 'Inventory',
            subItems: [
                {name: 'Products', icon: <HiOutlineCube/>, href: `/dashboard/products`},
                {name: 'Categories', icon: <HiOutlineTag/>, href: `/dashboard/categories`},
                {name: 'Stock Levels', icon: <HiOutlineArchiveBox/>, href: `/dashboard/stock/levels`},
                {name: 'Stock Transfers', icon: <HiOutlineArrowsRightLeft/>, href: `/dashboard/stock/transfers`},
                {name: 'Low Stock Alerts', icon: <HiOutlineExclamationTriangle/>, href: `/dashboard/stock/alerts`},
            ]
        },
        {name: 'Locations', icon: <HiOutlineMapPin/>, href: `/dashboard/locations`},
        {name: 'Suppliers', icon: <HiOutlineTruck/>, href: `/dashboard/suppliers`},
        {name: 'Purchase Orders', icon: <HiOutlineClipboardDocumentList/>, href: `/dashboard/purchases`},
        {name: 'Sales Management',
            subItems: [
                {name: 'Sales', icon: <HiOutlineBanknotes/>, href: `/dashboard/sales`},
                {name: 'Sales Channels', icon: <HiOutlineGlobeAlt/>, href: `/dashboard/sales-channels`},
                {name: 'Payment Methods', icon: <HiOutlineCreditCard/>, href: `/dashboard/payment-methods`},
            ]
        },
        {name: 'Customers', icon: <HiOutlineUserGroup/>, href: `/dashboard/customers`},
        {name: 'Customer Groups', icon: <HiOutlineUsers/>, href: `/dashboard/customer-groups`},
        {name: 'Marketing',
            subItems: [
                {name: 'Promotions', icon: <HiOutlineGift/>, href: `/dashboard/promotions`},
                {name: 'Loyalty Programs', icon: <HiOutlineStar/>, href: `/dashboard/loyalty-programs`},
            ]
        },
        {name: 'Users & Access', icon: <HiOutlineUser/>, href: `/dashboard/users`},
        {name: 'Reports & Analytics', icon: <HiOutlineChartBarSquare/>, href: `/dashboard/dashboard/reports`},
        {name: 'Settings', icon: <HiOutlineCog/>, href: `/dashboard/settings`},
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