"use client"

import {useActionState, useEffect, useState} from "react";
import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {getAllCategories} from "@/lib/categoryActions";
import {createItem} from "@/lib/itemActions";
import {toast} from "react-toastify";

export default function Page() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            const data = await getAllCategories();
            setCategories(data);
        };

        fetchAllCategories()
            .then(() => console.log('Finished fetching categories'));
    }, []);

    const [message, dispatch] = useActionState(createItem, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <div>
                        <h1 className={`page-heading`}>New item</h1>
                        <p className={`text-gray-600 text-sm`}>Please enter your item information</p>
                    </div>
                </div>
            </div>

            <div className={`max-w-screen-md my-6 mx-8`}>
                <form className={`space-y-6`} action={dispatch}>
                    <div className={`form-card`}>
                        <div className={`form-card-header`}>
                            <h2>Item Details</h2>
                            <p>Name, brand, model...</p>
                        </div>

                        <div className={`form-card-grid`}>
                            <div className={`input-box`}>
                                <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                                <input
                                    type={`text`}
                                    id={`name`}
                                    name={`name`}
                                    required={true}
                                    autoComplete={`off`}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`brand`} className={`dashboard-label`}>Brand:</label>
                                <input
                                    type={`text`}
                                    id={`brand`}
                                    name={`brand`}
                                    required={true}
                                    autoComplete={`off`}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`model`} className={`dashboard-label`}>Model:</label>
                                <input
                                    type={`text`}
                                    id={`model`}
                                    name={`model`}
                                    required={true}
                                    autoComplete={`off`}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`category`} className={`dashboard-label`}>Category:</label>
                                <select
                                    id={`category`}
                                    name={`category`}
                                    className={`dashboard-input`}
                                >
                                    <option>-- select category --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={`form-card`}>
                        <div className={`form-card-header`}>
                            <h2>Item pricing</h2>
                            <p>Retail price, cost price, VAT inclusive price...</p>
                        </div>

                        <div className={`form-card-grid`}>
                            <div className={`input-box`}>
                                <label htmlFor={`cost-price`} className={`dashboard-label`}>Cost Price:</label>
                                <input
                                    type={`number`}
                                    id={`cost-price`}
                                    name={`costPrice`}
                                    required={true}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`retail-price`} className={`dashboard-label`}>Retail Price:</label>
                                <input
                                    type={`number`}
                                    id={`retail-price`}
                                    name={`retailPrice`}
                                    required={true}
                                    className={`dashboard-input`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`form-card`}>
                        <div className={`form-card-header`}>
                            <h2>Item quantity</h2>
                            <p>Initial stock, alert threshold...</p>
                        </div>

                        <div className={`form-card-grid`}>
                            <div className={`input-box`}>
                                <label htmlFor={`quantity`} className={`dashboard-label`}>Quantity:</label>
                                <input
                                    type={`number`}
                                    id={`quantity`}
                                    name={`quantity`}
                                    required={true}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`stockAlert`} className={`dashboard-label`}>Stock Alert:</label>
                                <input
                                    type={`number`}
                                    id={`stockAlert`}
                                    name={`stockAlert`}
                                    required={true}
                                    className={`dashboard-input`}
                                />
                            </div>
                        </div>
                    </div>

                    <SubmitBtn text={`Add item`}/>
                </form>
            </div>
        </main>
    )
}