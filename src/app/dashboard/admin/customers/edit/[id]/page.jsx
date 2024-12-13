"use client"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {CustomerService} from "@/service";

const Page = ({params}) => {
    const customerID = params.id;
    const [loading, setLoading] = useState(false);

    const [customer, setCustomer] = useState({});
    const [name, setName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const router = useRouter();

    const handleEditCustomer = (e) => {
        e.preventDefault();
        setLoading(true);

        if (name === '') {
            toast.error("Customer name is blank");
            setLoading(false);
            return;
        }

        if (contactPerson === '') {
            toast.error("Customer contact person is blank");
            setLoading(false);
            return;
        }

        if (email === '') {
            toast.error("Customer email is blank");
            setLoading(false);
            return;
        }

        if (phone === '') {
            toast.error("Customer contact is blank");
            setLoading(false);
            return;
        }

        if (address === '') {
            toast.error("Customer address is blank");
            setLoading(false);
            return;
        }

        const updatedCustomer = {name, contactPerson, email, phone, address};
        updateCustomer(updatedCustomer);
    }

    const updateCustomer = (data) => {
        CustomerService.updateCustomer(customerID, data)
            .then(response => {
                if (response.status === 200) {
                    toast.success('Customer updated successfully');
                    setLoading(false);
                    router.back();
                }
            }).catch(error => {
                if (error.status === 400 || error.status === 409) {
                    toast.error(error.response.data);
                } else {
                    console.error(error);
                    toast.error("Failed to update customer. Please try again!");
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        const fetchCustomerById =  () => {
            CustomerService.getCustomerById(customerID)
                .then(response => setCustomer(response?.data))
                .catch(error => console.error(error));
        }

        fetchCustomerById();
    }, []);

    useEffect(() => {
        setName(customer.name);
        setContactPerson(customer.contactPerson);
        setEmail(customer.email);
        setPhone(customer.phone);
        setAddress(customer.address);
    }, [customer]);

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Edit Customer</h1>

                <div className={`mt-4`}>
                    {customer.name ? (
                        <form className={`flex flex-col gap-2`} onSubmit={handleEditCustomer}>
                            <div className={`grid sm:grid-cols-2 gap-4`}>
                                <div className={`input-box`}>
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
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`contact-person`} className={`dashboard-label`}>Contact
                                        Person:</label>
                                    <input
                                        type={`text`}
                                        id={`contact-person`}
                                        value={contactPerson}
                                        autoComplete={`off`}
                                        className={`dashboard-input`}
                                        onChange={event => setContactPerson(event.target.value)}
                                    />
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`email`} className={`dashboard-label`}>Email:</label>
                                    <input
                                        type={`email`}
                                        id={`email`}
                                        value={email}
                                        autoComplete={`off`}
                                        className={`dashboard-input`}
                                        onChange={event => setEmail(event.target.value)}
                                    />
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`phone`} className={`dashboard-label`}>Phone:</label>
                                    <input
                                        type={`text`}
                                        id={`phone`}
                                        value={phone}
                                        enterKeyHint={`done`}
                                        autoComplete={`off`}
                                        className={`dashboard-input`}
                                        onChange={event => setPhone(event.target.value)}
                                    />
                                </div>

                                <div className={`input-box`}>
                                    <label htmlFor={`address`} className={`dashboard-label`}>Address:</label>
                                    <input
                                        type={`text`}
                                        id={`address`}
                                        value={address}
                                        enterKeyHint={`done`}
                                        autoComplete={`off`}
                                        className={`dashboard-input`}
                                        onChange={event => setAddress(event.target.value)}
                                    />
                                </div>
                            </div>

                            <SubmitBtn loading={loading} text={`Save Customer`}/>
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