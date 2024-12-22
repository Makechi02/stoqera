'use client'

import {FaEllipsisVertical, FaTrashCan} from "react-icons/fa6";
import Pagination from "@/components/ui/dashboard/admin/items/Pagination";
import Link from "next/link";
import {FaEye, FaPen} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";

export default function ItemsTable({items, totalPages}) {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        items.length === 0 ? (
            <div className={`my-16 font-bold text-xl`}>
                <p className={`text-center`}>No items found</p>
            </div>
        ) : (
            <>
                <div className={`overflow-x-auto`}>
                    <table className={`min-w-full divide-y divide-gray-200 hidden sm:table`}>
                        <thead className={`bg-gray-50`}>
                        <tr>
                            <th scope={`col`} className={`table-heading`}>Name</th>
                            <th scope={`col`} className={`table-heading`}>Brand</th>
                            <th scope={`col`} className={`table-heading`}>Model</th>
                            <th scope={`col`} className={`table-heading`}>SKU</th>
                            <th scope={`col`} className={`table-heading`}>Quantity</th>
                            <th scope={`col`} className={`table-heading`}>Cost Price</th>
                            <th scope={`col`} className={`table-heading`}>Category</th>
                            <th scope={`col`} className={`table-heading`}>Actions</th>
                        </tr>
                        </thead>

                        <tbody className={`bg-white divide-y divide-gray-200`}>
                        {items?.map((item, index) => (
                            <tr key={item.id}>
                                <td className={`table-data`}>{item.name}</td>
                                <td className={`table-data`}>{item.brand}</td>
                                <td className={`table-data`}>{item.model}</td>
                                <td className={`table-data`}>{item.sku}</td>
                                <td className={`table-data`}>{item.quantity}</td>
                                <td className={`table-data`}>{item.costPrice}</td>
                                <td className={`table-data`}>{item.category?.name || 'Unknown'}</td>
                                <td className={`table-data relative flex justify-center items-center`}>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`cursor-pointer hover:bg-gray-300 rounded-full h-[30px] aspect-square flex justify-center items-center`}>
                                        <FaEllipsisVertical/>
                                    </button>
                                    {activeDropdown === index && (
                                        <DropdownOptions item={item} dropdownRef={dropdownRef}/>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && <Pagination totalPages={totalPages}/>}
            </>
        )
    )
}

function DropdownOptions({item, dropdownRef}) {
    return (
        <div ref={dropdownRef} className={`absolute right-4 z-10 mt-2 w-48 bg-white border rounded-lg shadow-lg`}>
            <Link href={`/admin/items/${item.id}`} className={`block px-4 py-2 hover:bg-gray-100`}>
                <FaEye className={`inline mr-2`}/> View item
            </Link>

            <Link href={`/admin/items/${item.id}/edit`} className={`block px-4 py-2 hover:bg-gray-100`}>
                <FaPen className={`inline mr-2`}/> Edit item
            </Link>

            <Link href={`/admin/items/${item.id}/delete`} className={`block px-4 py-2 hover:bg-red-200`}>
                <FaTrashCan className={`inline mr-2`}/> Delete item
            </Link>

        </div>
    )
}