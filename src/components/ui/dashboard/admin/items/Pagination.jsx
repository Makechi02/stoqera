'use client'

import {usePathname, useSearchParams} from "next/navigation";
import Link from "next/link";
import {FaArrowLeftLong, FaArrowRightLong} from "react-icons/fa6";

export default function Pagination({totalPages}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageUrl = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div className={`flex justify-center items-center gap-8 mt-4`}>
            <PaginationArrow
                href={createPageUrl(currentPage - 1)}
                direction={`left`}
                isDisabled={currentPage <= 1}
            />

            <p className={`mx-2`}>{`Page ${currentPage} of ${totalPages}`}</p>

            <PaginationArrow
                href={createPageUrl(currentPage + 1)}
                direction={`right`}
                isDisabled={currentPage >= totalPages}
            />
        </div>
    );
};

function PaginationArrow({href, direction, isDisabled}) {
    const className = `px-4 py-2 border rounded-lg ${isDisabled ? 'bg-gray-200 pointer-events-none' : 'bg-accent text-white'}`;
    const icon = direction === 'left' ? <FaArrowLeftLong/> : <FaArrowRightLong/>;

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link href={href} className={className}>
            {icon}
        </Link>
    )
}