import {ChartBarIcon, CubeIcon, PhotoIcon, TagIcon} from '@heroicons/react/24/outline';

export function getStockStatus(product) {
    const inventory = product.inventory[0];
    const quantityAvailable = inventory?.quantity_available || 0;

    if (quantityAvailable <= product.reorder_point) {
        return {status: 'low', color: 'text-red-400 bg-red-400/10', text: 'Low Stock'};
    } else if (quantityAvailable <= product.min_stock_level * 1.5) {
        return {status: 'medium', color: 'text-yellow-400 bg-yellow-400/10', text: 'Medium Stock'};
    } else {
        return {status: 'high', color: 'text-green-400 bg-green-400/10', text: 'In Stock'};
    }
}

export function generateSKU() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `SKU-${random}-${timestamp}`;
}

export const unitsOfMeasure = [
    'pcs', 'kg', 'liter', 'meter', 'box', 'pack', 'bottle', 'can', 'bag', 'roll', 'sheet', 'pair'
];

export const productFormTabs = [
    {id: 'basic', name: 'Basic Info', icon: CubeIcon, required: true},
    {id: 'pricing', name: 'Pricing & Stock', icon: ChartBarIcon, required: true},
    {id: 'variants', name: 'Variants', icon: TagIcon, required: false},
    {id: 'media', name: 'Media', icon: PhotoIcon, required: false}
]