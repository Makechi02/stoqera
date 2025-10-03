import {getProductsForCurrentOrganization} from "@/lib/queryProducts";
import {CubeIcon, FunnelIcon, PlusIcon} from "@heroicons/react/24/outline";
import ProductsGrid from "@/components/dashboard/products/ProductsGrid";
import Link from "next/link";
import {getCategoriesForCurrentOrganization} from "@/lib/queryCategories";

export default async function Page(props) {
    const {search, category} = await props.searchParams;
    const products = await getProductsForCurrentOrganization();
    const categories = await getCategoriesForCurrentOrganization();

    return (
        <div className={`min-h-screen`}>
            <div className={`max-w-7xl mx-auto py-4`}>
                <div className={`flex flex-wrap items-center gap-4 mb-8 border-b border-gray-700 pb-6`}>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>Products</h1>
                        <p className={`text-gray-400 mt-1`}>Manage your inventory and product catalog</p>
                    </div>

                    <div className={`flex-1 flex justify-end`}>
                        <Link
                            href={`/dashboard/products/new`}
                            className={`sm:mt-0 inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 text-text rounded-lg font-medium transition-colors`}
                        >
                            <PlusIcon className={`size-5 mr-2`}/>
                            Add Product
                        </Link>
                    </div>
                </div>

                <Stats products={products} categories={categories}/>
                <ProductsGrid categories={categories} products={products}/>
            </div>
        </div>
    )
}

function Stats({products, categories}) {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8`}>
            <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Total Products</p>
                        <p className={`text-2xl font-bold`}>{products.length}</p>
                    </div>
                    <div className={`p-3 bg-teal-600/20 rounded-full`}>
                        <CubeIcon className={`size-6 text-teal-400`}/>
                    </div>
                </div>
            </div>

            <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                <div className={`flex items-center justify-between`}>
                    <div>
                        <p className={`text-gray-400 text-sm`}>Categories</p>
                        <p className={`text-2xl font-bold`}>{categories.length}</p>
                    </div>
                    <div className={`p-3 bg-blue-600/20 rounded-full`}>
                        <FunnelIcon className={`size-6 text-blue-400`}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
