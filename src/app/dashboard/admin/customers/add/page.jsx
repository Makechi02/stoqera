"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {BackBtn, SubmitBtn} from "@/components/ui/dashboard/Buttons";
import {CustomerService} from "@/service";

const Page = () => {
    const [name, setName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAddCustomer = async (e) => {
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

        try {
            const newCustomer = {name, contactPerson, email, phone, address};
            const response = await CustomerService.addCustomer(newCustomer);
            if (response.status === 201) {
                toast.success('New customer added successfully');
                setLoading(false);
                router.back();
            }
        } catch (e) {
            if (e.status === 409) {
                toast.error(e.response.data.error);
            } else {
                console.error(e);
            }
            setLoading(false);
        }
    }

    return (
        <section className={`md:px-[10%]`}>
            <BackBtn/>

            <div className={`bg-white p-4 sm:p-8 rounded-lg mt-4 shadow-lg`}>
                <h1 className={`page-heading`}>Add customer</h1>

                <div className={`mt-4`}>
                    <form className={`flex flex-col gap-2`} onSubmit={handleAddCustomer}>
                        <div className={`grid sm:grid-cols-2 gap-4`}>
                            <div className={`input-box`}>
                                <label htmlFor={`name`} className={`dashboard-label`}>Name:</label>
                                <input
                                    type={`text`}
                                    id={`name`}
                                    value={name}
                                    autoComplete={`off`}
                                    className={`dashboard-input`}
                                    onChange={event => setName(event.target.value)}
                                />
                            </div>

                            <div className={`input-box`}>
                                <label htmlFor={`contact-person`} className={`dashboard-label`}>Contact Person:</label>
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

                        <SubmitBtn loading={loading} text={`Add Customer`}/>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Page;