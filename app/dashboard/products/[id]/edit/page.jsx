import {BackBtn} from "@/components/ui/buttons";
import {getCategoriesForCurrentOrganization} from "@/lib/queryCategories";
import {getProductById} from "@/lib/products/queryProducts";
import {notFound} from "next/navigation";
import ProductForm from "@/components/dashboard/products/ProductForm";

export default async function Page({params}) {
    const {id} = await params;

    const product = await getProductById(id);
    const categories = await getCategoriesForCurrentOrganization();

    if (!product) notFound();

    return (
        <div className={`min-h-screen`}>
            <div className={`max-w-6xl mx-auto`}>
                {/* Header */}
                <div className={`flex items-center justify-between mb-8`}>
                    <div className={`flex items-center`}>
                        <BackBtn/>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Edit Product</h1>
                            <p className={`text-gray-400 mt-2`}>Update your product information</p>
                        </div>
                    </div>
                </div>

                <ProductForm categories={categories} product={product}/>
            </div>
        </div>
    );
}
