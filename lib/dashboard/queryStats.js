'use server'

import {createClient} from '@/lib/supabase/server';

export async function getDashboardStats() {
    const supabase = await createClient();

    // Get date ranges for comparison
    const now = new Date()
    const startOfCurrentPeriod = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastPeriod = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastPeriod = new Date(now.getFullYear(), now.getMonth(), 0)

    // Fetch Total Products
    const {count: totalProducts} = await supabase
        .from('products')
        .select('*', {count: 'exact', head: true})
        .eq('is_active', true)

    const {count: totalVariants} = await supabase
        .from('product_variants')
        .select('*', {count: 'exact', head: true})

    const {count: productsLastMonth} = await supabase
        .from('products')
        .select('*', {count: 'exact', head: true})
        .eq('is_active', true)
        .lte('created_at', endOfLastPeriod.toISOString())

    // Fetch Total Sales
    const {data: currentSales} = await supabase
        .from('sales')
        .select('total_amount')
        .gte('created_at', startOfCurrentPeriod.toISOString())
        .eq('status', 'completed')

    const {data: lastMonthSales} = await supabase
        .from('sales')
        .select('total_amount')
        .gte('created_at', startOfLastPeriod.toISOString())
        .lt('created_at', startOfCurrentPeriod.toISOString())
        .eq('status', 'completed')

    const {count: transactionCount} = await supabase
        .from('sales')
        .select('*', {count: 'exact', head: true})
        .gte('created_at', startOfCurrentPeriod.toISOString())
        .eq('status', 'completed')

    const currentSalesTotal = currentSales?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0
    const lastMonthSalesTotal = lastMonthSales?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0

    // Fetch Active Customers
    const {data: activeCustomers} = await supabase
        .from('customers')
        .select('id, customer_group_id')
        .eq('is_active', true)

    const {data: activeCustomersLastMonth} = await supabase
        .from('customers')
        .select('id')
        .eq('is_active', true)
        .lte('created_at', endOfLastPeriod.toISOString());

    const uniqueGroups = new Set(activeCustomers?.map(c => c.customer_group_id).filter(Boolean))

    // Fetch Low Stock Alerts (unacknowledged alerts only)
    const {count: currentLowStockAlerts} = await supabase
        .from('low_stock_alerts')
        .select('*', {count: 'exact', head: true})
        .eq('is_acknowledged', false);

    // Get alerts from last month for comparison
    const {count: lastMonthLowStockAlerts} = await supabase
        .from('low_stock_alerts')
        .select('*', {count: 'exact', head: true})
        .gte('created_at', startOfLastPeriod.toISOString())
        .lt('created_at', startOfCurrentPeriod.toISOString())
        .eq('is_acknowledged', false);

    // // Calculate percentage changes
    const productChange = calculatePercentageChange(totalProducts || 0, productsLastMonth || 0);
    const salesChange = calculatePercentageChange(currentSalesTotal, lastMonthSalesTotal);
    const customerChange = calculatePercentageChange(
        activeCustomers?.length || 0,
        activeCustomersLastMonth?.length || 0
    );
    const lowStockChange = calculatePercentageChange(
        currentLowStockAlerts || 0,
        lastMonthLowStockAlerts || 0
    );

    return {
        totalProducts: {
            value: totalProducts || 0,
            change: productChange,
            variants: totalVariants || 0
        },
        totalSales: {
            value: currentSalesTotal,
            change: salesChange,
            transactions: transactionCount || 0
        },
        activeCustomers: {
            value: activeCustomers?.length || 0,
            change: customerChange,
            groups: uniqueGroups.size
        },
        lowStockAlerts: {
            value: currentLowStockAlerts || 0,
            change: lowStockChange
        }
    }
}

function calculatePercentageChange(current, previous) {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}