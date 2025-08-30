import CustomerDetails from "@/components/dashboard/customers/CustomerDetails";
import {getCustomerById, getCustomerContacts, getRecentCustomerInteractions} from "@/lib/queryCustomers";
import {notFound} from "next/navigation";

export async function generateMetadata({params}) {
    const {id} = await params;
    const customer = await getCustomerById(id);

    return {
        title: `${customer.type === 'business' ? customer.business_name : `${customer.first_name} ${customer.last_name}`} - Customer Details | Finviq`,
    }
}

export default async function Page({params}) {
    const {id} = await params;
    const customer = await getCustomerById(id);
    const customerContacts = await getCustomerContacts(id);
    const recentCustomerInteractions = await getRecentCustomerInteractions(id);

    if (!customer) notFound();

    return (
        <div>
            <CustomerDetails customer={customer} contacts={customerContacts} interactions={recentCustomerInteractions}/>
        </div>
    )
}