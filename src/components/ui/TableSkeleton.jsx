import React from "react";

const TableSkeleton = ({ rows = 5, columns = 5 }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {Array.from({ length: columns }).map((_, index) => (
                        <th key={index} className="table-heading">
                            <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="animate-pulse">
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <td key={colIndex} className="table-data">
                                <div className="h-4 bg-gray-200 rounded mx-auto"></div>
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeleton;
