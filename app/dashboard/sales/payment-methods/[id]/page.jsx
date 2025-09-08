import {getPaymentMethodById} from "@/lib/sales/queryPaymentMethods";
import {notFound} from "next/navigation";
import {BackBtn} from "@/components/ui/buttons";
import PaymentMethodDetails from "@/components/dashboard/sales/payment-methods/PaymentMethodDetails";

export default async function Page({params}) {
    const {id} = await params;
    const paymentMethod = await getPaymentMethodById(id);

    if (!paymentMethod) notFound();

    return (
        <div className={`max-w-4xl mx-auto`}>
            <div className={`flex items-center mb-8`}>
                <BackBtn/>
                <div>
                    <h1 className={`text-3xl font-bold font-heading`}>Payment Method Details</h1>
                    <p className={`text-gray-400 mt-1`}>View and manage payment method information</p>
                </div>
            </div>

            <PaymentMethodDetails paymentMethod={paymentMethod}/>
        </div>
    );
};