import {FaChartLine, FaPlug, FaSync, FaUserFriends} from "react-icons/fa";
import {FaFacebook, FaGithub, FaInstagram, FaTwitter} from "react-icons/fa6";

export const aboutNavLinks = [
    {href: 'introduction', text: 'Intro'},
    {href: 'features', text: 'Features'},
    {href: 'benefits', text: 'Benefits'},
    {href: 'roadmap', text: 'Roadmap'}
];

export const adminNavLinks = [
    {
        href: '/admin',
        text: 'home',
        type: 'link'
    },
    {
        text: 'inventory',
        type: 'dropdown',
        subLinks: [
            {href: '/admin/items', text: 'items'},
            {href: '/admin/categories', text: 'categories'}
        ]
    },
    {
        text: 'sales',
        type: 'dropdown',
        subLinks: [
            {href: '/admin/customers', text: 'customers'},
            {href: '/admin/orders', text: 'sales orders'}
        ]
    },
    {
        text: 'purchases',
        type: 'dropdown',
        subLinks: [
            {href: '/admin/suppliers', text: 'suppliers'},
            {href: '/admin/orders', text: 'purchases orders'}
        ]
    },
    {
        href: '/admin/users',
        text: 'users',
        type: 'link'
    }
];

export const benefits = [
    {
        title: 'Real-Time Tracking',
        description: 'Monitor your inventory levels in real-time to prevent stockouts and overstocking.',
        icon: <FaSync />,
    },
    {
        title: 'Automated Reports',
        description: 'Generate insightful reports to make data-driven decisions effortlessly.',
        icon: <FaChartLine />,
    },
    {
        title: 'User-Friendly Interface',
        description: 'Intuitive design makes it easy for anyone to manage inventory effectively.',
        icon: <FaUserFriends />,
    },
    {
        title: 'Seamless Integration',
        description: 'Easily connect with other systems to streamline your operations.',
        icon: <FaPlug />,
    },
];

export const faqs = [
    {
        question: 'What features does the inventory management system offer?',
        answer: 'Our system provides real-time tracking, automated reporting, and user-friendly interfaces to manage your inventory effectively.',
    },
    {
        question: 'Is there a mobile app available?',
        answer: 'Yes, our inventory management system is fully responsive and can be accessed on mobile devices through any web browser.',
    },
    {
        question: 'How can I integrate the system with my existing tools?',
        answer: 'We offer API support for seamless integration with various third-party tools and platforms.',
    }
];

export const features = [
    {
        title: 'Inventory Tracking',
        description: 'With Finviq\'s real-time inventory management, you can automatically track stock levels across' +
            ' all your locations and warehouses. The system ensures accurate stock levels reduces human error, and' +
            ' helps prevent stockouts and overstocking. Our inventory tracking software integrates with your ' +
            'existing workflows to offer seamless inventory control.',
    },
    {
        title: 'Supplier and Customer Management',
        description: 'Efficient supplier management is crucial for maintaining smooth business operations. Finviq ' +
            'helps businesses manage supplier relationships, track supplier orders, and monitor payment statuses. ' +
            'Additionally, our customer relationship management (CRM) feature ensures you keep detailed records of' +
            ' customers and their purchase histories, improving customer satisfaction and retention.',
    },
    {
        title: 'Order Management',
        description: 'Finviq\'s order management system (OMS) ensures that every order is processed accurately and ' +
            'promptly. You can easily create, track, and fulfill orders, all while maintaining full visibility into' +
            ' their status. Whether managing purchase orders or sales orders, Finviq allows for end-to-end order ' +
            'management with minimal manual intervention.',
    },
    {
        title: 'Analytics and Reporting',
        description: 'Our powerful inventory analytics and business intelligence tools help you generate customized' +
            ' reports and insights on stock levels, sales performance, and order trends. Finviq\'s data-driven ' +
            'inventory management allows you to make informed decisions and optimize your stock levels, reducing ' +
            'excess inventory and improving cash flow.',
    },
    {
        title: 'User Permissions',
        description: 'Finviq offers customizable user roles, including administrators, managers, and staff, ensuring' +
            ' that everyone in your organization has the right level of access. You can restrict access to sensitive' +
            ' data, giving your team the ability to collaborate efficiently while maintaining data security and ' +
            'role-based access controls.',
    }
];

export const footerLinks = [
    {
        title: 'Services',
        links: [
            {href: '/services/inventory-tracking', text: 'Inventory Tracking'},
            {href: '/services/order-management', text: 'Order Management'},
            {href: '/services/customer-insights', text: 'Customer Insights'},
            {href: '/services/supplier-management', text: 'Supplier Management'}
        ]
    },
    {
        title: 'Company',
        links: [
            {href: '/about', text: 'About Us'}
        ]
    },
    {
        title: 'Helpful Links',
        links: [
            {href: '/faqs', text: 'FAQs'},
            {href: '/docs', text: 'Documentation'},
            {href: '/support', text: 'Support'}
        ]
    },
    {
        title: 'Legal',
        links: [
            {href: '/terms', text: 'Terms of Service'},
            {href: '/policy/privacy', text: 'Privacy Policy'},
            {href: '/policy/cookies', text: 'Cookie Policy'}
        ]
    }
];

export const navLinks = [
    {href: 'home', text: 'Home'},
    {href: 'features', text: 'Features'},
    {href: 'pricing', text: 'Pricing'},
    {href: 'faq', text: 'FAQ'},
    {href: 'contact', text: 'Contact'}
];

export const ourUsers = [
    'Retail Stores',
    'eCommerce Businesses',
    'Grocery Stores',
    'Convenience Stores',
    'Hospitality and Hotels',
    'And Many More..'
];

export const pricingPlans = [
    {
        title: 'Basic',
        sr_only_text: 'plan',
        amount: 'Ksh. 1000',
        billing: '/ month',
        most_popular: false,
        features: [
            'Single user',
            'Basic inventory tracking'
        ]
    },
    {
        title: 'Standard',
        sr_only_text: 'plan',
        amount: 'Ksh. 3000',
        billing: '/ month',
        most_popular: true,
        features: [
            'Up to 5 users',
            'Reporting',
            'Integrations'
        ]
    },
    {
        title: 'Premium',
        sr_only_text: 'plan',
        amount: 'Ksh. 8000',
        billing: '/ month',
        most_popular: false,
        features: [
            'Unlimited users',
            'API',
            'Priority support'
        ]
    }
];

export const socialLinks = [
    {
        href: 'https://web.facebook.com/people/Finviq/61569784992823',
        sr_only_text: 'Facebook',
        icon: <FaFacebook/>,
    },
    {
        href: '#',
        sr_only_text: 'Instagram',
        icon: <FaInstagram/>,
    },
    {
        href: '#',
        sr_only_text: 'Twitter',
        icon: <FaTwitter/>,
    },
    {
        href: 'https://github.com/Makechi02/Finviq',
        sr_only_text: 'GitHub',
        icon: <FaGithub/>,
    }
];