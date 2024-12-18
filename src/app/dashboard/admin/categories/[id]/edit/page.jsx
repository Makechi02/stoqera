import {BackBtn} from "@/components/ui/dashboard/Buttons";
import {getCategoryById} from "@/lib/categoryActions";
import UpdateCategoryForm from "@/app/dashboard/admin/categories/[id]/edit/UpdateCategoryForm";

export default async function Page({params}) {
    const category = await getCategoryById(params.id);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>Edit category</h1>
                </div>
            </div>


            <div className={`my-4 max-w-screen-md mx-8`}>
                <UpdateCategoryForm category={category}/>
            </div>
        </main>
    )
}
