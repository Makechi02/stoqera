import {BackBtn} from "@/components/ui/buttons";
import {getCategoriesForCurrentOrganization} from "@/lib/queryCategories";
import ProductForm from "@/components/dashboard/products/ProductForm";
import {getProductById} from "@/lib/products/queryProducts";

export default async function Page({params}) {
    const {id} = await params;

    const product = await getProductById(id);
    const categories = await getCategoriesForCurrentOrganization();

    return (
        <div className={`min-h-screen`}>
            <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
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
