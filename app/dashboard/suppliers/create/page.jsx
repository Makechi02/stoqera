import SupplierForm from "@/components/dashboard/supplier/SupplierForm";
import {BackBtn} from "@/components/ui/buttons";
import {getNewSupplierCode} from "@/lib/querySuppliers";

export default async function Page() {
    const newSupplierCode = await getNewSupplierCode();

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto py-6`}>
                    <div className={`flex items-center`}>
                        <BackBtn/>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Add Supplier</h1>
                            <p className={`mt-2 text-gray-400`}>Enter new supplier information</p>
                        </div>
                    </div>
                </div>
            </div>

            <SupplierForm newSupplierCode={newSupplierCode}/>
        </div>
    );
}