'use client'

import {SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {useFormState} from "react-dom";
import {updateItem} from "@/lib/itemActions";
import {useEffect} from "react";
import {toast} from "react-toastify";

export default function ({item, categories}) {
    const updateItemWithId = updateItem.bind(null, item.id);
    const [message, dispatch] = useFormState(updateItemWithId, undefined);

    useEffect(() => {
        toast.error(message);
    }, [message]);

    return (
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
                            defaultValue={item.name}
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
                            defaultValue={item.brand}
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
                            defaultValue={item.model}
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
                            defaultValue={item.category.id}
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
                            defaultValue={item.costPrice}
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
                            defaultValue={item.retailPrice}
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
                            defaultValue={item.quantity}
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
                            defaultValue={item.stockAlert}
                            required={true}
                            className={`dashboard-input`}
                        />
                    </div>
                </div>
            </div>

            <SubmitBtn text={`Save item`}/>
        </form>
    )
}