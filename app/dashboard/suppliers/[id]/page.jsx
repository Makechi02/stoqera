import {getSupplierById} from "@/lib/querySuppliers";
import {notFound} from "next/navigation";
import SupplierDetails from "@/components/dashboard/supplier/SupplierDetails";

export default async function Page({params}) {
    const {id} = await params;
    const supplier = await getSupplierById(id);

    if (!supplier) notFound();

    return (
        <SupplierDetails supplier={supplier}/>
    );
}