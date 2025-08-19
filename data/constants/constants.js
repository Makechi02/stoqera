import {ChartBarIcon, CurrencyDollarIcon, DocumentTextIcon, PhotoIcon, ScaleIcon} from "@heroicons/react/24/outline";

export const productCreationTips = [
    'SKU must be unique across your organization',
    'Set reorder points to automate inventory management',
    'Add high-quality images to improve product visibility',
    'Use descriptive tags for better searchability',
    'Ensure selling price covers costs and desired profit margin',
];

export const productsFormTabs = [
    {id: 'basic', name: 'Basic Info', icon: DocumentTextIcon},
    {id: 'pricing', name: 'Pricing & Stock', icon: CurrencyDollarIcon},
    {id: 'inventory', name: 'Inventory', icon: ChartBarIcon},
    {id: 'physical', name: 'Physical', icon: ScaleIcon},
    {id: 'media', name: 'Media & Tags', icon: PhotoIcon}
];

export const units = [
    'pcs', 'kg', 'liter', 'meter', 'box', 'pack', 'bottle', 'can', 'bag', 'roll', 'sheet', 'pair'
];
