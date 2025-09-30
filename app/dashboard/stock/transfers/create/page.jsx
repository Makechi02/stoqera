import RequestTransferForm from "@/components/dashboard/stock/transfers/RequestTransferForm";
import {BackBtn} from "@/components/ui/buttons";
import {getTransferLocations, getTransferProducts} from "@/lib/stock/queryStockTransfers";

export default async function Page(props) {
    const searchParams = await props.searchParams;

    const {productSearch} = searchParams;

    const locations = await getTransferLocations();
    const products = await getTransferProducts(productSearch);

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-4xl mx-auto`}>
                    <div className={`py-6`}>
                        <div className={`flex items-center justify-between`}>
                            <div className={`flex items-center`}>
                                <BackBtn/>
                                <div>
                                    <h1 className={`text-3xl font-bold font-heading`}>Request Stock Transfer</h1>
                                    <p className={`mt-1 text-sm text-gray-400`}>
                                        Transfer inventory between locations
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <RequestTransferForm locations={locations.data} products={products.data}/>
        </div>
    )
}