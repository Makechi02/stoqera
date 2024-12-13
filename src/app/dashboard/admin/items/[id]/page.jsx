"use client"

import Link from "next/link";
import {FaPen} from "react-icons/fa";
import {useEffect, useState} from "react";
import DateUtil from "@/utils/dateUtil";
import {FaTrashCan} from "react-icons/fa6";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {showConfirmDialog} from "@/utils/sweetalertUtil";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {ItemService} from "@/service";
import {BackBtn} from "@/components/ui/dashboard/Buttons";

const Page = ({params}) => {
    const [item, setItem] = useState({});
    const router = useRouter();

    const handleDelete = (item) => {
        showConfirmDialog(
            `Are you sure you want to delete this item?`,
            () => deleteItem(item)
        );
    };

    const deleteItem = (item) => {
        ItemService.deleteItem(item.id)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Item deleted successfully');
                    router.push("/dashboard/admin/items");
                }
            })
            .catch(error => console.error(error));
    };

    useEffect(() => {
        const fetchItemByID = () => {
            ItemService.getItemById(params.id)
                .then(response => setItem(response.data))
                .catch(error => console.error(error));
        }

        fetchItemByID();
    }, []);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Item Preview</h1>

                <div className={`mt-4 flex flex-wrap justify-end items-center gap-4`}>
                    <Link
                        title={`Edit`}
                        className={`edit-btn flex items-center gap-2`}
                        href={`/dashboard/admin/items/edit/${item.id}`}
                    >
                        <FaPen/>
                        Edit Item
                    </Link>

                    <button
                        title={`Delete`}
                        className={`ml-3 delete-btn flex items-center gap-2`}
                        onClick={() => handleDelete(item)}
                    >
                        <FaTrashCan/> Delete Item
                    </button>
                </div>

                <div className={`mt-4`}>
                    {item.name ? (
                        <div className={`flex flex-col gap-3`}>
                            <div className={`grid sm:grid-cols-2 gap-4`}>
                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Name:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.name}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Brand:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.brand}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Model:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.model}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Quantity:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.quantity}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Price:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.price}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Stock Alert:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.stockAlert}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Category:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.category?.name ? item.category.name : 'unknown'}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Supplier:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.supplier?.name ? item.supplier.name : 'unknown'}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Created At:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{DateUtil.formatDate(item.createdAt)}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Created By:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.createdBy.name}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Updated At:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{DateUtil.formatDate(item.updatedAt)}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Updated By:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{item.updatedBy.name}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <LoadingSpinner/>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Page;