import {BackBtn} from "@/components/ui/buttons";
import {getCategoriesForCurrentOrganization} from "@/lib/queryCategories";
import AddProductForm from "@/components/dashboard/products/AddProductForm";

export default async function Page() {
    const categories = await getCategoriesForCurrentOrganization();

    return (
        <div className={`min-h-screen`}>
            <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8`}>
                {/* Header */}
                <div className={`flex items-center justify-between mb-8`}>
                    <div className={`flex items-center`}>
                        <BackBtn/>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Add New Product</h1>
                            <p className={`text-gray-400 mt-2`}>Create a new product for your inventory</p>
                        </div>
                    </div>
                </div>

                <AddProductForm categories={categories}/>
            </div>
        </div>
    );
}
