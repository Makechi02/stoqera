import 'animate.css/animate.min.css';
import "@/styles/globals.css";
import {figtree, gfs_didot} from "@/app/font";
import {ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        { name: "Makechi Eric", url: "https://github.com/Makechi02" },
    ],
    verification: {
        google: 'bQPyIAZERspa3jutIVff6Ihh6UntNx1H408VQYHIO2I'
    }
};

export const viewport = {
    themeColor: "#14B8A6",
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className={`${figtree} ${gfs_didot} font-figtree antialiased`}>
        <body>
        {children}
        <ToastContainer transition={Zoom}/>
        </body>
        </html>
    );
}
