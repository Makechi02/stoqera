import PaymentMethodsForm from "@/components/dashboard/sales/payment-methods/PaymentMethodsForm";
import {BackBtn} from "@/components/ui/buttons";
import {getPaymentMethodById} from "@/lib/sales/queryPaymentMethods";

export default async function Page({params}) {
    const {id} = await params;
    const paymentMethod = await getPaymentMethodById(id);

    return (
        <div className={`max-w-2xl mx-auto`}>
            <div className={`flex items-center mb-8`}>
                <BackBtn/>
                <div>
                    <h1 className={`text-3xl font-bold font-heading`}>Edit Payment Method</h1>
                    <p className={`text-gray-400 mt-1`}>Update payment method details</p>
                </div>
            </div>

            <PaymentMethodsForm paymentMethod={paymentMethod}/>
        </div>
    )
}