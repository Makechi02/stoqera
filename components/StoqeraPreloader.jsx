'use client'

import {useEffect, useState} from 'react';
import Logo from "@/components/Logo";

export default function StoqeraPreloader({theme = 'dark'}) {
    const [loadingText, setLoadingText] = useState('Initializing...');

    useEffect(() => {
        const loadingMessages = [
            'Initializing...',
            'Loading inventory data...',
            'Connecting to database...',
            // 'Syncing products...',
            'Preparing dashboard...',
            'Loading...'
        ];

        let currentIndex = 0;
        const interval = setInterval(() => {
            setLoadingText(loadingMessages[currentIndex]);
            currentIndex = (currentIndex + 1) % loadingMessages.length;
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const isDark = theme === 'dark';

    return (
        <div className={`min-h-svh flex items-center justify-center relative overflow-hidden ${
            isDark
                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
                : 'bg-gradient-to-br from-slate-50 via-white to-teal-50'
        }`}
        >

            {/* Background decorative elements */}
            <div className={`absolute inset-0 overflow-hidden`}>
                <div className={`absolute -top-40 -right-40 size-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse 
                    ${isDark ? 'bg-teal-400/20' : 'bg-teal-100'}`}
                />

                <div className={`absolute -bottom-40 -left-40 size-80 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000 
                ${isDark ? 'bg-teal-500/20' : 'bg-teal-200'}`}
                />

                <div
                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin 
                        ${isDark ? 'bg-gradient-to-r from-teal-400/10 to-cyan-400/10' : 'bg-gradient-to-r from-teal-100 to-cyan-100'}`}
                    style={{animationDuration: '20s'}}
                />
            </div>

            {/* Main content */}
            <div className={`relative z-10 text-center px-6 max-w-md w-full`}>
                {/* Logo container */}
                <div className={`mb-8 flex justify-center`}>
                    <div className={`relative group`}>
                        <div className={`size-20 bg-surface rounded-2xl flex items-center justify-center shadow-2xl`}>
                            <Logo className={`size-12`}/>
                        </div>
                    </div>
                </div>

                {/* Company name */}
                <h1 className={`text-4xl font-bold font-heading mb-2 ${
                    isDark
                        ? 'bg-gradient-to-r from-teal-300 to-teal-100 bg-clip-text text-transparent'
                        : 'bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent'
                }`}>
                    Stoqera
                </h1>
                <p className={`text-lg mb-12 font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Inventory Management System
                </p>

                <LoadingBar isDark={isDark}/>

                {/* Loading text */}
                <p className={`font-medium animate-pulse ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    {loadingText}
                </p>

                {/* Additional subtle elements */}
                <div className={`mt-12 flex justify-center space-x-1`}>
                    <div className={`rounded-full animate-bounce size-2 ${isDark ? 'bg-teal-300' : 'bg-teal-400'}`}/>
                    <div
                        className={`rounded-full animate-bounce size-2 ${isDark ? 'bg-teal-300' : 'bg-teal-400'}`}
                        style={{animationDelay: '0.1s'}}
                    />
                    <div
                        className={`rounded-full animate-bounce size-2 ${isDark ? 'bg-teal-300' : 'bg-teal-400'}`}
                        style={{animationDelay: '0.2s'}}
                    />
                </div>
            </div>

            <LoadingFooter isDark={isDark}/>
        </div>
    );
};

function LoadingBar({isDark}) {
    return (
        <div className={`mb-6`}>
            <div className={`w-full ${isDark ? 'bg-slate-700' : 'bg-slate-200'} rounded-full h-2 overflow-hidden`}>
                <div className={`h-full rounded-full animate-indeterminate relative ${
                    isDark
                        ? 'bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500'
                        : 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600'
                }`}
                >
                    <div className={`absolute inset-0 ${isDark ? 'bg-white/10' : 'bg-white/20'} animate-pulse`}/>
                </div>
            </div>
        </div>
    )
}

function LoadingFooter({isDark}) {
    return (
        <footer className={`absolute bottom-8 left-0 right-0 text-center`}>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                © {new Date().getFullYear()} Stoqera. All rights reserved.
            </p>
        </footer>
    )
}
