import {Logo} from "@/components";
import Link from "next/link";

export default function Header() {
    return (
        <header className={`border-b border-teal-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`flex justify-between items-center py-4`}>
                    <Link href={`/`}>
                        <Logo textColor={`text-teal-600`}/>
                    </Link>

                    <Link
                        href={`/register`}
                        className={`bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors`}
                    >
                        Start Free Trial
                    </Link>
                </div>
            </div>
        </header>
    )
}