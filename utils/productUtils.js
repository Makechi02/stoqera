export function getStockStatus(product) {
    const inventory = product.inventory[0];

    if (inventory.quantity_available <= product.reorder_point) {
        return {status: 'low', color: 'text-red-400 bg-red-400/10', text: 'Low Stock'};
    } else if (inventory.quantity_available <= product.min_stock_level * 1.5) {
        return {status: 'medium', color: 'text-yellow-400 bg-yellow-400/10', text: 'Medium Stock'};
    } else {
        return {status: 'high', color: 'text-green-400 bg-green-400/10', text: 'In Stock'};
    }
}