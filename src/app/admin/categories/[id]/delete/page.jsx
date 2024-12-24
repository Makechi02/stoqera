'use client'

import {use, useActionState, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {SmallLoadingSpinner} from "@/components/ui/LoadingSpinner";
import {toast} from "react-toastify";
import {deleteCategory, getCategoryById} from "@/lib/categoryActions";

export default function Page(props) {
    const params = use(props.params);
    const [category, setCategory] = useState(null);
    const router = useRouter();

    const deleteCategoryWithId = deleteCategory.bind(null, category?.id);

    const [message, dispatch, isPending] = useActionState(deleteCategoryWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    useEffect(() => {
        const fetchCategoryById = async (id) => {
            const fetchedCategory = await getCategoryById(id);
            setCategory(fetchedCategory);
        }

        fetchCategoryById(params.id)
            .then(() => console.log("Category fetched successfully"));
    }, []);

    return (
        <main className={`p-8`}>
            <div className={`max-w-screen-lg mx-auto my-16`}>
                <div className={`rounded-lg bg-white p-8 shadow-2xl`}>
                    <h1 className={`text-xl font-bold font-gfs_didot`}>Are you sure you want to delete this category?</h1>
                    <p className={`mt-2 text-sm text-gray-500`}>You cannot undo this action.</p>

                    <div className={`font-bold py-4 pl-4 mt-4 border-l-4 border-l-primary bg-primary/10`}>
                        {category?.name ? (<p>{category?.name}</p>) : (
                            <div className={`border-black w-[50px]`}>
                                <SmallLoadingSpinner/>
                            </div>
                        )}
                    </div>

                    <form className={`mt-4 flex flex-wrap gap-3`} action={dispatch}>
                        <SubmitBtn pending={isPending}/>
                        <button
                            type={`button`}
                            onClick={() => router.back()}
                            className={`rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600`}>
                            No, go back
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

const SubmitBtn = ({pending}) => {
    return (
        <button
            type={`submit`}
            disabled={pending}
            aria-disabled={pending}
            className={`rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600 border-red-600`}
        >
            {pending ? <SmallLoadingSpinner/> : "Yes, I'm sure"}
        </button>
    )
}