'use client'

import {useState} from "react";
import {Logo} from "@/components/ui";
import Link from "next/link";
import {MobileNavigation, PrimaryNavigation} from "@/components/ui/Navigation";
import {FaTimes} from "react-icons/fa";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

    return (
        <header className={`bg-surface sticky top-0 z-10`}>
            <div className={`mx-auto max-w-screen-xl px-4 md:px-2`}>
                <div className={`flex h-16 items-center justify-between`}>
                    <div className={`md:flex md:items-center md:gap-12`}>
                        <Link href={`#`} className={`block`}>
                            <span className="sr-only">Home</span>
                            <Logo/>
                        </Link>
                    </div>

                    <div className={`hidden md:block`}>
                        <PrimaryNavigation/>
                    </div>

                    <div className={`flex items-center gap-4`}>
                        <div className={`sm:flex sm:gap-4`}>
                            <Link
                                href={`/accounts/login`}
                                className={`px-5 py-2.5 font-medium text-white hover:text-primary`}
                            >
                                Login
                            </Link>
                            <div className={`hidden sm:flex`}>
                                <Link
                                    href={`/accounts/register`}
                                    className={`rounded-md bg-primary px-5 py-2.5 font-medium hover:scale-105`}
                                >
                                    Register
                                </Link>
                            </div>
                        </div>

                        <div className={`block md:hidden`}>
                            <button
                                className={`rounded p-2 transition text-white`}
                                onClick={toggleMenu}
                            >
                                {isMenuOpen ? <FaTimes/> : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className={`h-5 w-5`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && <MobileNavigation toggleMenu={toggleMenu}/>}
            </div>
        </header>
    );
};

export default Header;
