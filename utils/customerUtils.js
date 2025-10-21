export function getCustomerDisplayName(customer) {
    if (customer?.type === 'business') {
        return customer?.business_name || 'Unnamed Business';
    }
    return `${customer?.first_name || ''} ${customer?.last_name || ''}`.trim() || 'Unnamed Customer';
}