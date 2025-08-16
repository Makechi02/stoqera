import {getOrganizationBySlug} from "@/lib/queryOrganizations";
import CategoriesGrid from "@/components/dashboard/categories/CategoriesGrid";
import {AddBtn} from "@/components/ui/buttons";
import CategorySearchBar from "@/components/dashboard/categories/CategorySearchBar";
import {getAllCategories} from "@/lib/queryCategories";

export default async function Page({params}) {
    const {slug} = await params;
    const organization = await getOrganizationBySlug(slug);
    const categories = await getAllCategories(organization.id);

    return (
        <div className={`space-y-6`}>
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
                <div>
                    <h2 className={`text-3xl font-bold font-heading`}>Categories</h2>
                    <p className="text-gray-400 mt-2">Manage your inventory categories</p>
                </div>
                <AddBtn href={`/dashboard/${slug}/categories/new`} text={`Add Category`}/>
            </div>

            <CategorySearchBar/>
            <CategoriesGrid categories={categories}/>
        </div>
    )
}