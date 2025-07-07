'use client'

import Link from "next/link";
import {useEffect, useState} from "react";

export function PrimaryNavigation({navLinks}) {
    return (
        <nav aria-label={`Global`}>
            <ul className={`flex items-center gap-6`}>
                <NavLinks navLinks={navLinks}/>
            </ul>
        </nav>
    )
}

export function MobileNavigation({navLinks, toggleMenu}) {
    return (
        <nav aria-label={`Mobile`} className={`md:hidden`}>
            <ul className={`mt-4 pb-4 space-y-2`}>
                <NavLinks navLinks={navLinks} toggleMenu={toggleMenu}/>
            </ul>
        </nav>
    )
}

function NavLinks({navLinks, toggleMenu = () => {}}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const changeActive = (index) => setActiveIndex(index);

    useEffect(() => {
        const handleScroll = () => {
            const sections = navLinks.map(link => document.getElementById(link.href));
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section, index) => {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveIndex(index);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {navLinks.map((link, index) => (
                <li key={index}>
                    <Link
                        href={`#${link.href}`}
                        className={`hover:text-primary block ${activeIndex === index ? 'text-primary font-bold' : 'text-white'}`}
                        onClick={() => {
                            changeActive(index);
                            toggleMenu();
                        }}
                    >
                        {link.text}
                    </Link>
                </li>
            ))}
        </>
    )
}