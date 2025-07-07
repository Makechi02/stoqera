import {Building, Home, Lightbulb, Shield, Wrench, Zap} from "lucide-react";

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
        title: "Real-time Tracking",
        description: "Monitor stock levels across multiple locations with instant updates and alerts."
    },
    {
        title: "Smart Analytics",
        description: "Make data-driven decisions with powerful reporting and predictive insights."
    },
    {
        title: "Seamless Integration",
        description: "Connect with your existing tools including e-commerce platforms and accounting software."
    },
    {
        title: "Customizable Workflows",
        description: "Tailor the system to match your specific business processes and requirements."
    },
    {
        title: "Mobile Access",
        description: "Manage inventory on-the-go with our responsive mobile interface."
    },
    {
        title: "Secure Data",
        description: "Rest easy knowing your inventory data is protected with enterprise-grade security."
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

export const SITE_INFO = {
    title: 'Humwise Electricals',
    description: 'Professional Electrical Solutions',
    phone: '+254 (718) 876-507',
    email: 'info@humwiseelectricals.com'
};

// export const navLinks = [
//     {link: 'about', text: 'About'},
//     {link: 'services', text: 'Services'},
//     {link: 'projects', text: 'Projects'},
//     {link: 'contact', text: 'Contact'}
// ];

export const stats = [
    {title: 'Projects Completed', value: '500+'},
    {title: 'Years Experience', value: '10+'},
    {title: 'Emergency Service', value: '24/7'},
    {title: 'Satisfaction Rate', value: '100%'}
];

export const services = [
    {
        icon: <Home className={`size-8`}/>,
        title: "Residential Electrical",
        description: "Complete home electrical installations, repairs, and upgrades including panel upgrades, outlet installations, and lighting solutions."
    },
    {
        icon: <Building className={`size-8`}/>,
        title: "Commercial Electrical",
        description: "Professional commercial electrical services for offices, retail spaces, and industrial facilities with code compliance guarantee."
    },
    {
        icon: <Lightbulb className={`size-8`}/>,
        title: "Smart Home Solutions",
        description: "Modern smart home installations including automated lighting, smart switches, and integrated home automation systems."
    },
    {
        icon: <Shield className={`size-8`}/>,
        title: "Safety Inspections",
        description: "Comprehensive electrical safety inspections and code compliance audits to ensure your property meets all safety standards."
    },
    {
        icon: <Zap className={`size-8`}/>,
        title: "Emergency Repairs",
        description: "24/7 emergency electrical repair services for urgent electrical issues and power outages."
    },
    {
        icon: <Wrench className={`size-8`}/>,
        title: "Maintenance Services",
        description: "Preventive maintenance programs to keep your electrical systems running efficiently and safely."
    }
];

export const projects = [
    {
        title: "Modern Office Complex",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=300&fit=crop",
        description: "Complete electrical installation for 50,000 sq ft office building including LED lighting and smart controls."
    },
    {
        title: "Luxury Home Automation",
        category: "Residential",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
        description: "Full smart home electrical system with automated lighting, security, and climate control integration."
    },
    {
        title: "Industrial Facility Upgrade",
        category: "Industrial",
        image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500&h=300&fit=crop",
        description: "High-voltage electrical system upgrade for manufacturing facility with enhanced safety features."
    },
    {
        title: "Restaurant Chain Expansion",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&h=300&fit=crop",
        description: "Electrical installations for multiple restaurant locations with specialized kitchen equipment wiring."
    },
    {
        title: "Residential Solar Integration",
        category: "Residential",
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=500&h=300&fit=crop",
        description: "Solar panel system integration with home electrical systems and battery backup solutions."
    },
    {
        title: "Data Center Infrastructure",
        category: "Commercial",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop",
        description: "Critical power infrastructure for data center with redundant systems and UPS integration."
    }
];

export const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Homeowner",
        content: "Humwise Electricals transformed our home with their smart automation system. Professional, reliable, and exceptional quality work.",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Business Owner",
        content: "Outstanding service for our office renovation. They completed the project on time and within budget. Highly recommended!",
        rating: 5
    },
    {
        name: "David Rodriguez",
        role: "Property Manager",
        content: "We've used Humwise for multiple commercial properties. Their expertise and attention to detail is unmatched.",
        rating: 5
    }
];
