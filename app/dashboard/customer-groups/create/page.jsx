import CustomerGroupForm from "@/components/dashboard/customers/groups/CustomerGroupForm";
import {BackBtn} from "@/components/ui/buttons";

export default function Page() {
    return (
        <div>
            <div className={`border-b border-b-gray-400 mb-8`}>
                <div className={`max-w-4xl mx-auto`}>
                    <div className={`flex items-center mb-4`}>
                        <BackBtn/>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Create Customer Group</h1>
                            <p className={`text-gray-400 mt-1`}>Add a new customer group to organize your customers</p>
                        </div>
                    </div>
                </div>
            </div>

            <CustomerGroupForm/>
        </div>
    )
}