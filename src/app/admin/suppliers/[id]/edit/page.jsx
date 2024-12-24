import UpdateSupplierForm from "@/app/admin/suppliers/[id]/edit/UpdateSupplierForm";
import {getSupplierById} from "@/lib/supplierActions";
import {BackBtn} from "@/components/ui/dashboard/Buttons";

export default async function Page(props) {
    const params = await props.params;
    const supplier = await getSupplierById(params.id);

    return (
        <main>
            <div className={`p-8 border-b`}>
                <div className={`flex gap-4 items-center`}>
                    <BackBtn/>
                    <h1 className={`page-heading`}>Edit supplier</h1>
                </div>
            </div>

            <div className={`my-4 max-w-screen-md mx-8`}>
                {supplier.name ? <UpdateSupplierForm supplier={supplier}/> : <p>Loading...</p>}
            </div>
        </main>
    )
}
