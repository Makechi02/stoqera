import PaymentMethodsGrid from "@/components/dashboard/sales/payment-methods/PaymentMethodsGrid";
import React from "react";
import Link from "next/link";
import {PlusIcon} from "@heroicons/react/24/outline";
import {getPaymentMethodsForCurrentOrganization} from "@/lib/sales/queryPaymentMethods";

export default async function Page() {
    const paymentMethods = await getPaymentMethodsForCurrentOrganization();

    return (
        <div className={`max-w-7xl mx-auto`}>
            <div className={`flex flex-wrap gap-4 justify-between items-center mb-8`}>
                <div>
                    <h1 className={`text-3xl font-bold font-heading`}>Payment Methods</h1>
                    <p className={`text-gray-400 mt-2`}>Manage your payment processing options</p>
                </div>
                <div className={`flex-1 flex items-center justify-end`}>
                    <Link
                        href={`/dashboard/sales/payment-methods/create`}
                        className={`bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                    >
                        <PlusIcon className={`size-5`}/>
                        Add Payment Method
                    </Link>
                </div>
            </div>

            <PaymentMethodsGrid paymentMethods={paymentMethods}/>
        </div>
    )
}