import {getProductById} from "@/lib/queryProducts";
import ProductDetails from "@/components/dashboard/products/ProductDetails";
import {ArrowLeftIcon, PencilSquareIcon, ShareIcon} from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Page({params}) {
    const {id} = await params;
    const product = await getProductById(id);

    return (
        <div>
            <div className={`bg-gray-900/90 backdrop-blur-sm border-b border-gray-800`}>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                    <div className={`flex items-center justify-between py-4`}>
                        <div className={`flex items-center space-x-4`}>
                            <Link
                                href={`/dashboard/products`}
                                className={`flex items-center text-gray-400 hover:text-white transition-colors`}
                            >
                                <ArrowLeftIcon className={`size-5 mr-2`}/>
                                Back to Products
                            </Link>
                        </div>
                        <div className={`flex items-center space-x-3`}>
                            <button className={`p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors`}>
                                <ShareIcon className={`size-5 text-gray-400`}/>
                            </button>
                            <Link
                                href={`/dashboard/products/${product.id}/edit`}
                                className={`flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors`}
                            >
                                <PencilSquareIcon className={`size-4 mr-2`}/>
                                Edit Product
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <ProductDetails product={product}/>
        </div>
    )
}