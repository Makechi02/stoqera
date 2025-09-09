import 'animate.css/animate.min.css';
import "./globals.css";
import {figtree, gfs_didot} from "@/app/font";
import {ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Metrics from "@/app/metrics";

export const metadata = {
    title: "Finviq - Streamline Your Inventory Management",
    description: "Finviq is a modern inventory management system designed to help businesses of all sizes track, manage, and report their inventory effortlessly.",
    keywords: [
        "Finviq",
        "inventory management system",
        "IMS",
        "inventory tracking",
        "business software",
        "inventory analytics",
        "streamline inventory",
    ],
    authors: [
        {name: "Makechi Eric", url: "https://github.com/Makechi02"},
    ],
    verification: {
        google: 'bQPyIAZERspa3jutIVff6Ihh6UntNx1H408VQYHIO2I'
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
        <Metrics/>
        </body>
        </html>
    );
}
