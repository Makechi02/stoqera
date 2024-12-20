import {BackBtn} from "@/components/ui/dashboard/Buttons";
import {getItemById} from "@/lib/itemActions";
import {getAllCategories} from "@/lib/categoryActions";
import UpdateItemForm from "@/app/dashboard/admin/items/[id]/edit/UpdateItemForm";

const Page = async ({params}) => {
    const item = await getItemById(params.id);
    const categories = await getAllCategories();

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>Edit item</h1>
                </div>
            </div>

            <div className={`my-4 max-w-screen-md mx-8`}>
                <UpdateItemForm item={item} categories={categories} />
            </div>
        </main>
    )
}

export default Page;