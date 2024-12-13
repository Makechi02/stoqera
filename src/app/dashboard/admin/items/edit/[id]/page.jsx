"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {CategoryService, ItemService, SupplierService} from "@/service";

const Page = ({params}) => {
    const [item, setItem] = useState({});
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [stockAlert, setStockAlert] = useState('');
    const [category, setCategory] = useState('');
    const [supplier, setSupplier] = useState('');
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const itemID = params.id;

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await CategoryService.getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAllSuppliers = async () => {
            try {
                const response = await SupplierService.getAllSuppliers();
                setSuppliers(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchItemByID = async () => {
            try {
                const response = await ItemService.getItemById(itemID);
                const itemData = response.data;
                setItem(itemData);
                setName(itemData.name);
                setBrand(itemData.brand);
                setModel(itemData.model);
                setQuantity(itemData.quantity);
                setPrice(itemData.price);
                setStockAlert(itemData.stockAlert);
                setCategory(itemData.category.id);
                setSupplier(itemData.supplier.id);

                fetchAllCategories();
                fetchAllSuppliers();
            } catch (error) {
                console.error(error);
            }
        };

        fetchItemByID();
    }, [itemID]);

    const handleEditItem = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!name.trim()) {
            toast.error("Item name is required");
            setLoading(false);
            return;
        }

        if (!brand.trim()) {
            toast.error("Item brand is required");
            setLoading(false);
            return;
        }

        if (!model.trim()) {
            toast.error("Model is required");
            setLoading(false);
            return;
        }

        const numericQuantity = parseFloat(quantity);
        if (isNaN(numericQuantity) || numericQuantity <= 0) {
            toast.error("Quantity must be a positive number");
            setLoading(false);
            return;
        }

        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            toast.error("Price must be a positive number");
            setLoading(false);
            return;
        }

        const numericStockAlert = parseFloat(stockAlert);
        if (isNaN(numericStockAlert) || numericStockAlert <= 0) {
            toast.error("Stock alert must be a positive number");
            setLoading(false);
            return;
        }

        if (!category || category === "-- select category --") {
            toast.error("Please choose a category");
            setLoading(false);
            return;
        }

        if (!supplier || supplier === "-- select supplier --") {
            toast.error("Please choose a supplier");
            setLoading(false);
            return;
        }

        try {
            const updatedItem = {name, brand, model, quantity: numericQuantity, price: numericPrice, category, supplier, stockAlert};
            const response = await ItemService.updateItem(item.id, updatedItem);

            if (response.status === 200) {
                toast.success('Item updated successfully');
                setLoading(false);
                router.back();
            }
        } catch (e) {
            if (e.status === 400) {
                toast.error(e.response.data);
            } else {
                console.error(e);
                toast.error("Failed to update item");
            }
            setLoading(false);
        }
    };

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit item</h1>

                <div className={`mt-4`}>
                    <form className={`space-y-6`} onSubmit={handleEditItem}>
                        <div className={`grid sm:grid-cols-2 gap-4`}>
                            <div className={`input-box`}>
                                <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                                <input
                                    type={`text`}
                                    id={`name`}
                                    value={name}
                                    autoComplete={`off`}
                                    onChange={event => setName(event.target.value)}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`brand`} className={`dashboard-label`}>Brand:</label>
                                <input
                                    type={`text`}
                                    id={`brand`}
                                    value={brand}
                                    autoComplete={`off`}
                                    onChange={event => setBrand(event.target.value)}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`model`} className={`dashboard-label`}>Model:</label>
                                <input
                                    type={`text`}
                                    id={`model`}
                                    value={model}
                                    autoComplete={`off`}
                                    onChange={event => setModel(event.target.value)}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`quantity`} className={`dashboard-label`}>Quantity:</label>
                                <input
                                    type={`number`}
                                    id={`quantity`}
                                    value={quantity}
                                    onChange={event => setQuantity(event.target.value)}
                                    enterKeyHint={`next`}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`price`} className={`dashboard-label`}>Price:</label>
                                <input
                                    type={`number`}
                                    id={`price`}
                                    value={price}
                                    onChange={event => setPrice(event.target.value)}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`stockAlert`} className={`dashboard-label`}>Stock Alert:</label>
                                <input
                                    type={`number`}
                                    id={`stockAlert`}
                                    value={stockAlert}
                                    onChange={event => setStockAlert(event.target.value)}
                                    className={`dashboard-input`}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`category`} className={`dashboard-label`}>Category:</label>
                                <select
                                    id={`category`}
                                    className={`dashboard-input`}
                                    value={category}
                                    onChange={event => setCategory(event.target.value)}
                                >
                                    <option value="">-- select category --</option>
                                    {categories?.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`supplier`} className={`dashboard-label`}>Supplier:</label>
                                <select
                                    id={`supplier`}
                                    className={`dashboard-input`}
                                    value={supplier}
                                    onChange={event => setSupplier(event.target.value)}
                                >
                                    <option value="">-- select supplier --</option>
                                    {suppliers?.map((supp) => (
                                        <option key={supp.id} value={supp.id}>{supp.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <SubmitBtn loading={loading} text={`Save Item`} />
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Page;