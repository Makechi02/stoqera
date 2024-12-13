"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {CategoryService} from "@/service";

const Page =  ({params}) => {
    const categoryID = params.id;
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({});
    const [name, setName] = useState('');
    const router = useRouter();

    const handleEditCategory = (e) => {
        e.preventDefault();
        setLoading(true);

        if (name === '') {
            toast.error("Category name is required");
            setLoading(false);
            return;
        }

        const updatedCategory = {name: name.trim()};

        updateCategory(updatedCategory);
    }

    const updateCategory = (data) => {
        CategoryService.updateCategory(categoryID, data)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Category updated successfully');
                    setLoading(false);
                    router.back();
                }
            }).catch(error => {
                if (error.status === 400 || error.status === 409) {
                    toast.error(error.response.data);
                } else {
                    console.error(error);
                    toast.error("Failed to update category. Please try again!");
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        const fetchCategoryById =  () => {
            CategoryService.getCategoryById(categoryID)
                .then(response => setCategory(response?.data))
                .catch(error => console.error(error));
        }

        fetchCategoryById();
    }, []);

    useEffect(() => {
        setName(category.name);
    }, [category]);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit category</h1>

                <div className={`mt-4`}>
                    {category.name ? (
                        <form className={`flex flex-col gap-2`} onSubmit={handleEditCategory}>
                            <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                            <input
                                type={`text`}
                                id={`name`}
                                value={name}
                                enterKeyHint={`done`}
                                autoComplete={`off`}
                                className={`dashboard-input`}
                                onChange={event => setName(event.target.value)}
                            />

                            <SubmitBtn loading={loading} text={`Update Category`}/>
                        </form>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;