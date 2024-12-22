import {getAllMetrics} from "@/lib/metricActions";
import Link from "next/link";

export const metadata = {
    title: 'Dashboard - Finviq'
}

export default async function Page() {
    const {totalItems, totalCategories, totalSuppliers, totalUsers} = await getAllMetrics();

    return (
        <main className={`p-8`}>
            <div className={`border rounded-lg w-fit overflow-hidden`}>
                <div className={`bg-gray-300 p-4`}>
                    <h2 className={`font-medium text-xl`}>Metrics</h2>
                </div>
                <div className={`py-4 flex divide-x-2`}>
                    <MetricCard value={totalItems} text={`total items`} path={`/admin/items`}/>
                    <MetricCard value={totalCategories} text={`total categories`} path={`/admin/categories`}/>
                    <MetricCard value={totalSuppliers} text={`total suppliers`} path={`/admin/suppliers`}/>
                    <MetricCard value={totalUsers} text={`total users`} path={`/admin/users`}/>
                </div>
            </div>
        </main>
    )
}

function MetricCard({value, text, path = '#'}) {
    return (
        <Link href={path} className={`text-center py-2 px-6 hover:bg-gray-200`}>
            <p className={`text-3xl font-bold font-gfs_didot`}>{value}</p>
            <p className={`mt-4 font-medium tracking-wide text-gray-600 capitalize`}>{text}</p>
        </Link>
    )
}