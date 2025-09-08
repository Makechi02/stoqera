import PaymentMethodsForm from "@/components/dashboard/sales/payment-methods/PaymentMethodsForm";
import {BackBtn} from "@/components/ui/buttons";

export default function Page() {
    return (
        <div className={`max-w-2xl mx-auto`}>
            <div className={`flex items-center mb-8`}>
                <BackBtn/>
                <div>
                    <h1 className={`text-3xl font-bold font-heading`}>Add Payment Method</h1>
                    <p className={`text-gray-400 mt-1`}>Create a new payment processing option</p>
                </div>
            </div>

            <PaymentMethodsForm/>
        </div>
    )
}