// Status utilities
export const transferStatuses = [
    {value: 'all', label: 'All Status'},
    {value: 'pending', label: 'Pending'},
    {value: 'approved', label: 'Approved'},
    {value: 'in_transit', label: 'In Transit'},
    {value: 'completed', label: 'Completed'},
    {value: 'cancelled', label: 'Cancelled'}
];

export const getStatusConfig = (status) => {
    const statusMap = {
        pending: {
            label: 'Pending',
            color: 'bg-yellow-900/20 text-yellow-400 border-yellow-400/20',
            iconColor: 'text-yellow-400',
            bgColor: 'bg-yellow-500/10'
        },
        in_transit: {
            label: 'In Transit',
            color: 'bg-blue-900/20 text-blue-400 border-blue-400/20',
            iconColor: 'text-blue-400',
            bgColor: 'bg-blue-500/10'
        },
        completed: {
            label: 'Completed',
            color: 'bg-green-900/20 text-green-400 border-green-400/20',
            iconColor: 'text-green-400',
            bgColor: 'bg-green-500/10'
        },
        cancelled: {
            label: 'Cancelled',
            color: 'bg-red-900/20 text-red-400 border-red-400/20',
            iconColor: 'text-red-400',
            bgColor: 'bg-red-500/10'
        }
    };

    return statusMap[status] || {
        label: status,
        color: 'bg-gray-900/20 text-gray-400 border-gray-400/20',
        iconColor: 'text-gray-400',
        bgColor: 'bg-gray-500/10'
    };
};

// Sort utilities
export const transferSortOptions = [
    {value: 'created_at', label: 'Created Date'},
    {value: 'updated_at', label: 'Updated Date'},
    {value: 'requested_at', label: 'Requested Date'},
    {value: 'transfer_number', label: 'Transfer Number'},
    {value: 'status', label: 'Status'}
];

export const transferSortOrderOptions = [
    {value: 'desc', label: 'Newest First'},
    {value: 'asc', label: 'Oldest First'}
];

// Date utilities
export const formatDate = (dateString) => {
    if (!dateString) return 'Not set';

    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    // If less than 24 hours ago, show relative time
    if (diffInHours < 24) {
        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 2) {
            return '1 hour ago';
        } else {
            return `${Math.floor(diffInHours)} hours ago`;
        }
    }

    // If less than 7 days ago, show days
    if (diffInHours < 168) {
        const days = Math.floor(diffInHours / 24);
        return days === 1 ? '1 day ago' : `${days} days ago`;
    }

    // Otherwise show full date
    return date.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatShortDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });
};

// Progress utilities
export const calculateTransferProgress = (transfer) => {
    const {totalQuantityRequested, totalQuantityShipped, totalQuantityReceived, status} = transfer;

    if (status === 'cancelled') return {percentage: 0, label: 'Cancelled'};
    if (status === 'completed') return {percentage: 100, label: 'Complete'};

    if (status === 'pending') {
        return {percentage: 0, label: 'Awaiting Approval'};
    }

    if (status === 'in_transit') {
        if (totalQuantityRequested === 0) return {percentage: 50, label: 'In Transit'};
        const shippedPercentage = (totalQuantityShipped / totalQuantityRequested) * 100;
        return {
            percentage: Math.min(shippedPercentage, 95), // Cap at 95% until fully received
            label: `${totalQuantityShipped}/${totalQuantityRequested} shipped`
        };
    }

    return {percentage: 0, label: 'Unknown'};
};

// Filter utilities
export const getActiveFiltersCount = (filters) => {
    let count = 0;
    if (filters.searchTerm?.trim()) count++;
    if (filters.status) count++;
    if (filters.fromLocationId) count++;
    if (filters.toLocationId) count++;
    if (filters.requestedBy) count++;
    if (filters.dateRange?.from || filters.dateRange?.to) count++;
    return count;
};

export const getFilterSummary = (filters, locations = [], users = []) => {
    const active = [];

    if (filters.searchTerm?.trim()) {
        active.push(`Search: "${filters.searchTerm}"`);
    }

    if (filters.status) {
        const statusConfig = getStatusConfig(filters.status);
        active.push(`Status: ${statusConfig.label}`);
    }

    if (filters.fromLocationId) {
        const location = locations.find(l => l.id === filters.fromLocationId);
        active.push(`From: ${location?.name || 'Unknown'}`);
    }

    if (filters.toLocationId) {
        const location = locations.find(l => l.id === filters.toLocationId);
        active.push(`To: ${location?.name || 'Unknown'}`);
    }

    if (filters.requestedBy) {
        const user = users.find(u => u.id === filters.requestedBy);
        active.push(`By: ${user?.full_name || 'Unknown'}`);
    }

    if (filters.dateRange?.from || filters.dateRange?.to) {
        const from = filters.dateRange.from ? new Date(filters.dateRange.from).toLocaleDateString() : 'Start';
        const to = filters.dateRange.to ? new Date(filters.dateRange.to).toLocaleDateString() : 'End';
        active.push(`Date: ${from} - ${to}`);
    }

    return active;
};

// Export utilities
export const exportTransfersToCSV = (transfers) => {
    const headers = [
        'Transfer Number',
        'Status',
        'From Location',
        'To Location',
        'Requested By',
        'Requested Date',
        'Approved Date',
        'Shipped Date',
        'Received Date',
        'Total Items',
        'Quantity Requested',
        'Quantity Shipped',
        'Quantity Received',
        'Notes'
    ];

    const rows = transfers.map(transfer => [
        transfer.transfer_number,
        transfer.status,
        transfer.from_location?.name || '',
        transfer.to_location?.name || '',
        transfer.requester?.full_name || '',
        transfer.requested_at ? new Date(transfer.requested_at).toLocaleDateString() : '',
        transfer.approved_at ? new Date(transfer.approved_at).toLocaleDateString() : '',
        transfer.shipped_at ? new Date(transfer.shipped_at).toLocaleDateString() : '',
        transfer.received_at ? new Date(transfer.received_at).toLocaleDateString() : '',
        transfer.totalItems || 0,
        transfer.totalQuantityRequested || 0,
        transfer.totalQuantityShipped || 0,
        transfer.totalQuantityReceived || 0,
        transfer.notes || ''
    ]);

    const csvContent = [headers, ...rows]
        .map(row => row.map(cell => `"${cell}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transfers_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
};

// Bulk operation utilities
export const getBulkActionOptions = (selectedTransfers) => {
    if (!selectedTransfers || selectedTransfers.length === 0) return [];

    const actions = [];

    // Check if all selected transfers can be cancelled
    const canCancelAll = selectedTransfers.every(t => t.status === 'pending');
    if (canCancelAll) {
        actions.push({
            key: 'cancel',
            label: 'Cancel Selected',
            icon: 'XMarkIcon',
            color: 'bg-red-600 hover:bg-red-700',
            confirmMessage: `Are you sure you want to cancel ${selectedTransfers.length} transfer(s)?`
        });
    }

    // Export action (always available)
    actions.push({
        key: 'export',
        label: 'Export Selected',
        icon: 'DocumentArrowDownIcon',
        color: 'bg-blue-600 hover:bg-blue-700'
    });

    return actions;
};

// URL utilities for filters
export const buildTransferListURL = (filters, basePath = '/transfers') => {
    const params = new URLSearchParams();

    if (filters.searchTerm?.trim()) params.set('search', filters.searchTerm);
    if (filters.status) params.set('status', filters.status);
    if (filters.fromLocationId) params.set('from', filters.fromLocationId);
    if (filters.toLocationId) params.set('to', filters.toLocationId);
    if (filters.requestedBy) params.set('by', filters.requestedBy);
    if (filters.dateRange?.from) params.set('date_from', filters.dateRange.from);
    if (filters.dateRange?.to) params.set('date_to', filters.dateRange.to);
    if (filters.sortBy !== 'created_at') params.set('sort', filters.sortBy);
    if (filters.sortOrder !== 'desc') params.set('order', filters.sortOrder);
    if (filters.page !== 1) params.set('page', filters.page.toString());
    if (filters.limit !== 20) params.set('limit', filters.limit.toString());

    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
};

export const parseTransferListURL = (searchParams) => {
    return {
        searchTerm: searchParams.get('search') || '',
        status: searchParams.get('status') || '',
        fromLocationId: searchParams.get('from') || '',
        toLocationId: searchParams.get('to') || '',
        requestedBy: searchParams.get('by') || '',
        dateRange: {
            from: searchParams.get('date_from') || null,
            to: searchParams.get('date_to') || null
        },
        sortBy: searchParams.get('sort') || 'created_at',
        sortOrder: searchParams.get('order') || 'desc',
        page: parseInt(searchParams.get('page') || '1'),
        limit: parseInt(searchParams.get('limit') || '20')
    };
};

// Notification utilities
export const getTransferNotificationMessage = (transfer, action) => {
    const transferNum = transfer.transfer_number;

    switch (action) {
        case 'created':
            return {
                type: 'success',
                title: 'Transfer Created',
                message: `Transfer ${transferNum} has been created successfully.`
            };
        case 'approved':
            return {
                type: 'success',
                title: 'Transfer Approved',
                message: `Transfer ${transferNum} has been approved and is now in transit.`
            };
        case 'rejected':
            return {
                type: 'info',
                title: 'Transfer Rejected',
                message: `Transfer ${transferNum} has been cancelled.`
            };
        case 'received':
            return {
                type: 'success',
                title: 'Transfer Completed',
                message: `Transfer ${transferNum} has been completed successfully.`
            };
        case 'updated':
            return {
                type: 'info',
                title: 'Transfer Updated',
                message: `Transfer ${transferNum} has been updated.`
            };
        default:
            return {
                type: 'info',
                title: 'Transfer Modified',
                message: `Transfer ${transferNum} has been modified.`
            };
    }
};

// Permission utilities
export const canUserPerformAction = (user, transfer, action) => {
    if (!user || !transfer) return false;

    // Add your role-based permission logic here
    // For now, basic checks based on transfer status and user

    switch (action) {
        case 'approve':
            return transfer.status === 'pending' && user.id !== transfer.requested_by;
        case 'reject':
            return transfer.status === 'pending' && user.id !== transfer.requested_by;
        case 'ship':
            return transfer.status === 'pending';
        case 'receive':
            return transfer.status === 'in_transit';
        case 'edit':
            return transfer.status === 'pending' && (
                user.id === transfer.requested_by ||
                user.role === 'admin' ||
                user.role === 'manager'
            );
        case 'delete':
            return transfer.status === 'pending' && (
                user.id === transfer.requested_by ||
                user.role === 'admin'
            );
        case 'view':
            return true; // Most users can view transfers
        default:
            return false;
    }
};

// Analytics utilities
export const calculateTransferMetrics = (transfers) => {
    if (!transfers || transfers.length === 0) {
        return {
            totalTransfers: 0,
            completionRate: 0,
            averageProcessingTime: 0,
            totalItemsTransferred: 0,
            accuracyRate: 0
        };
    }

    const completed = transfers.filter(t => t.status === 'completed');
    const completionRate = (completed.length / transfers.length) * 100;

    // Calculate average processing time for completed transfers
    const processingTimes = completed
        .filter(t => t.requested_at && t.received_at)
        .map(t => new Date(t.received_at) - new Date(t.requested_at));

    const averageProcessingTime = processingTimes.length > 0
        ? processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length
        : 0;

    // Calculate total items transferred
    const totalItemsTransferred = completed.reduce(
        (sum, t) => sum + (t.totalQuantityReceived || 0), 0
    );

    // Calculate accuracy rate (received vs requested)
    const transfersWithData = completed.filter(
        t => t.totalQuantityRequested > 0 && t.totalQuantityReceived > 0
    );

    const accuracyRate = transfersWithData.length > 0
        ? transfersWithData.reduce((sum, t) => {
        const accuracy = Math.min((t.totalQuantityReceived / t.totalQuantityRequested) * 100, 100);
        return sum + accuracy;
    }, 0) / transfersWithData.length
        : 0;

    return {
        totalTransfers: transfers.length,
        completionRate: Math.round(completionRate * 100) / 100,
        averageProcessingTime: Math.round(averageProcessingTime / (1000 * 60 * 60 * 24)), // Days
        totalItemsTransferred,
        accuracyRate: Math.round(accuracyRate * 100) / 100
    };
};
