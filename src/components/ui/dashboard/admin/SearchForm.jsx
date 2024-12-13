'use client'

import {FaSearch} from "react-icons/fa";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import useDebounce from "@/hooks/useDebounce";

const SearchForm = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const [term, setTerm] = useState(searchParams.get("query") || "");

    const debouncedTerm = useDebounce(term, 500);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        if (debouncedTerm) {
            params.set("query", debouncedTerm);
        } else {
            params.delete("query");
        }

        replace(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        handleSearch();
    }, [debouncedTerm]);

    return (
        <div className={`bg-gray-200 border-2 w-full md:max-w-md rounded-lg flex gap-2 px-2`}>
            <input
                type={`search`}
                className={`border w-full bg-transparent py-2 outline-0`}
                placeholder={`Search anything...`}
                value={term}
                onChange={event => setTerm(event.target.value)}
            />
            <button onClick={handleSearch}>
                <span className={`sr-only`}>search</span>
                <FaSearch/>
            </button>
        </div>
    );
};

export default SearchForm;
