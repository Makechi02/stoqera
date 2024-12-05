import Link from "next/link";
import {navLinks} from "@/data/constants";

export const PrimaryNavigation = () => {
    return (
        <nav aria-label={`Global`}>
            <ul className={`flex items-center gap-6`}>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} className={`text-white hover:text-accent`}>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export const MobileNavigation = () => {
    return (
        <nav aria-label={`Mobile`} className={`md:hidden`}>
            <ul className={`mt-4 pb-4 space-y-2`}>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <Link href={link.href} className={`block text-white hover:text-primary`}>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}