'use client'

import {useState} from "react";

export default function SearchBar({placeholder}) {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <div className={`flex flex-col sm:flex-row gap-4`}>
            <div className={`flex-1`}>
                <input
                    type={`text`}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                />
            </div>
        </div>
    )
}