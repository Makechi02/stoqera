import 'animate.css/animate.min.css';
import "./globals.css";
import {figtree, gfs_didot} from "@/app/font";
import {ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    metadataBase: new URL("https://www.stoqera.co.ke"),
    title: "Stoqera | Best Inventory Management Software in Kenya for SMEs",
    description: "Stoqera is Kenya’s best inventory management software for SMEs. Track stock, manage sales, and get real-time reports. Start free today!",
    keywords: [
        "Stoqera",
        "inventory management software Kenya",
        "stock management system Kenya",
        "IMS Kenya",
        "inventory tracking Kenya",
        "business software Kenya",
        "inventory system for SMEs",
        "warehouse management Kenya",
        "sales and stock control Kenya",
        "small business inventory software Kenya"
    ],
    openGraph: {
        title: "Stoqera | Best Inventory Management Software in Kenya for SMEs",
        description: "Stoqera is Kenya’s leading inventory management system for SMEs. Track stock, manage sales, and prevent stockouts with ease. Start free today!",
        type: "website",
        url: "https://stoqera.co.ke",
        siteName: "Stoqera",
        locale: "en_KE",
        images: [
            {
                url: "https://stoqera.co.ke/assets/images/screenshots/dashboard-screenshot.png",
                width: 1200,
                height: 630,
                alt: "Stoqera - Best Inventory Management Software in Kenya for SMEs",
            },
        ],
    },
    authors: [
        {name: "Makechi Eric", url: "https://github.com/Makechi02"},
    ],
    verification: {
        google: 'UOBykR8irWtCb4yjmlPjHtamLDooAlRdqC2dkRyeG8s'
    },
    alternates: {
        canonical: "/"
    }
};

export const viewport = {
    themeColor: "#0F766E",
}

export default function RootLayout({children}) {
    return (
        <html lang={`en`} className={`${figtree} ${gfs_didot} font-sans bg-background text-text antialiased`}>
        <body>
        {children}
        <ToastContainer transition={Zoom}/>
        </body>
        </html>
    );
}
