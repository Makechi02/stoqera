import CreateSalePage from "@/components/dashboard/sales/list/create/CreateSalePage";
import {generateSaleNumber, getActiveProducts} from "@/lib/sales/querySales";
import {BackBtn} from "@/components/ui/buttons";

export default async function Page({searchParams}) {
    const {search} = await searchParams;
    const products = await getActiveProducts(search);

    const saleNumber = await generateSaleNumber();

    return (
        <div>
            <div className={`border-b border-gray-700 pb-4`}>
                <div className={`max-w-7xl mx-auto flex items-center`}>
                    <BackBtn/>
                    <div>
                        <h1 className={`text-3xl font-bold font-heading`}>Create New Sale</h1>
                        <p className={`text-sm text-gray-400 mt-1`}>Add products and complete the transaction</p>
                    </div>
                </div>
            </div>

            <CreateSalePage products={products} generatedSaleNumber={saleNumber}/>
        </div>
    )
}