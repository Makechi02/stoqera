'use client'

import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

export default function CustomerGroupSearchBar() {
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    const router = useRouter();

    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        router.replace(`?${params.toString()}`);
    }, [debouncedSearch, router, searchParams]);

    return (
        <div className={`mb-6`}>
            <div className={`relative max-w-md`}>
                <MagnifyingGlassIcon
                    className={`h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400`}/>
                <input
                    type={`text`}
                    placeholder={`Search groups...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`dashboard-form-input-icon border-gray-700`}
                />
            </div>
        </div>
    )
}