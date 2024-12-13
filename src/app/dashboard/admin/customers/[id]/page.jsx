"use client"

import Link from "next/link";
import {FaPen} from "react-icons/fa";
import {useEffect, useState} from "react";
import DateUtil from "@/utils/dateUtil";
import {FaTrashCan} from "react-icons/fa6";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {showConfirmDialog} from "@/utils/sweetalertUtil";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {CustomerService} from "@/service";
import {BackBtn} from "@/components/ui/dashboard/Buttons";

const Page = ({params}) => {
    const [customer, setCustomer] = useState({});
    const router = useRouter();

    const handleDelete = (customer) => {
        showConfirmDialog(
            `Are you sure you want to delete ${customer.name} customer?`,
            () => deleteCustomer(customer)
        );
    }

    const deleteCustomer = (customer) => {
        CustomerService.deleteCustomer(customer.id)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Customer deleted successfully');
                    router.refresh();
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(() => {
        const fetchCustomerByID = () => {
            CustomerService.getCustomerById(params.id)
                .then(response => setCustomer(response.data))
                .catch(error => console.error(error));
        }

        fetchCustomerByID();
    }, []);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Customer Preview</h1>

                <div className={`mt-4 flex flex-wrap justify-end items-center gap-4`}>
                    <Link
                        title={`Edit`}
                        className={`edit-btn flex items-center gap-2`}
                        href={`/dashboard/admin/customers/edit/${customer.id}`}
                    >
                        <FaPen/> Edit Customer
                    </Link>

                    <button
                        title={`Delete`}
                        className={`ml-3 delete-btn flex items-center gap-2`}
                        onClick={() => handleDelete(customer)}
                    >
                        <FaTrashCan/> Delete Customer
                    </button>
                </div>

                <div className={`mt-4`}>
                    {customer.name ? (
                        <div className={`flex flex-col gap-3`}>
                            <div className={`grid sm:grid-cols-2 gap-4`}>
                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Name:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{customer.name}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Contact Person:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{customer.contactPerson}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Email:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{customer.email}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Phone:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{customer.phone}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Address:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{customer.address}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Added At:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{DateUtil.formatDate(customer.addedAt)}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Added By:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{customer?.addedBy?.name}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Updated At:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{DateUtil.formatDate(customer.updatedAt)}</p>
                                    </div>
                                </div>

                                <div className={`input-box`}>
                                    <p className={`dashboard-label`}>Updated By:</p>
                                    <div className={`dashboard-input`}>
                                        <p>{customer?.updatedBy?.name}</p>
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