import {BackBtn} from "@/components/ui/dashboard/Buttons";
import UpdateCustomerForm from "@/app/admin/customers/[id]/edit/UpdateCustomerForm";
import {getCustomerById} from "@/lib/customerActions";

const Page = async ({params}) => {
    const customer = await getCustomerById(params.id);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>Edit customer</h1>
                </div>
            </div>

            <div className={`my-4 max-w-screen-md mx-8`}>
                <UpdateCustomerForm customer={customer}/>
            </div>
        </main>
    )
}

export default Page;