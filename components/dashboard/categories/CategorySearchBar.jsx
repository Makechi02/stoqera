'use client'

import {HiOutlineFunnel, HiOutlineMagnifyingGlass} from "react-icons/hi2";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import useDebounce from "@/hooks/useDebounce";

export default function CategorySearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [activeFilter, setActiveFilter] = useState(searchParams.get('filter') || '');

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }

        if (activeFilter) {
            params.set("filter", activeFilter);
        } else {
            params.delete("filter");
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, activeFilter, router, searchParams]);

    return (
        <div className={`flex flex-col sm:flex-row gap-4 mb-6`}>
            <div className={`relative flex-1`}>
                <HiOutlineMagnifyingGlass
                    className={`size-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`}/>
                <input
                    type={`text`}
                    placeholder={`Search categories...`}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    className={`dashboard-form-input-icon border-gray-700`}
                />
            </div>
            <div className={`flex items-center space-x-2`}>
                <HiOutlineFunnel className={`size-5 text-gray-400`}/>
                <select
                    value={activeFilter}
                    onChange={(event) => setActiveFilter(event.target.value)}
                    className={`px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                >
                    <option value={``}>All Categories</option>
                    <option value={`active`}>Active Only</option>
                    <option value={`inactive`}>Inactive Only</option>
                </select>
            </div>
        </div>
    )
}