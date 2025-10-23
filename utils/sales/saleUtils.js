export function getSaleStatusColor(status) {
    switch (status) {
        case 'completed':
            return 'bg-teal-500/20 text-teal-400';
        case 'draft':
            return 'bg-gray-500/20 text-gray-400';
        case 'cancelled':
            return 'bg-red-500/20 text-red-400';
        default:
            return 'bg-blue-500/20 text-blue-400';
    }
}

export function getSalePaymentStatusColor(status) {
    switch (status) {
        case 'paid':
            return 'bg-teal-500/20 text-teal-400';
        case 'partial':
            return 'bg-yellow-500/20 text-yellow-400';
        case 'pending':
            return 'bg-orange-500/20 text-orange-400';
        case 'overdue':
            return 'bg-red-500/20 text-red-400';
        default:
            return 'bg-gray-500/20 text-gray-400';
    }
}