import AddProductForm from "@/components/dashboard/products/AddProductForm";
import {BackBtn} from "@/components/ui/buttons";
import {getCategoriesForProducts} from "@/lib/products/queryProducts";

export default async function Page() {
    const categories = await getCategoriesForProducts();

    return (
        <div className={`max-w-7xl mx-auto py-4`}>
            <div className={`flex items-center mb-8`}>
                <BackBtn/>
                <div>
                    <h1 className={`text-3xl font-bold font-heading mb-2`}>Add New Product</h1>
                    <p className={`text-gray-400`}>Create a new product with variants for your inventory</p>
                </div>
            </div>

            <AddProductForm categories={categories}/>
        </div>
    )
}