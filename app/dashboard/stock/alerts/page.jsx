import LowStockList from "@/components/dashboard/stock/alert/LowStockList";
import {getStockAlertsForCurrentOrganization} from "@/lib/stock/queryStockAlerts";

export default async function Page(props) {
    const searchParams = await props.searchParams;
    const {search, level, sortBy, sortOrder} = searchParams;
    const stockAlerts = await getStockAlertsForCurrentOrganization({search});

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto`}>
                    <div className={`py-6`}>
                        <div>
                            <h1 className={`text-3xl font-bold font-heading`}>Low Stock Alerts</h1>
                            <p className={`mt-1 text-sm text-gray-400`}>
                                Monitor and manage inventory levels across all locations
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <LowStockList stockAlerts={stockAlerts}/>
        </div>
    );
};