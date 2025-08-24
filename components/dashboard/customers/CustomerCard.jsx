import {
    BuildingOfficeIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    UserIcon,
    XCircleIcon
} from "@heroicons/react/24/solid";
import {EllipsisVerticalIcon, EnvelopeIcon, MapPinIcon, PhoneIcon, TagIcon} from "@heroicons/react/24/outline";
import {formatCurrency, formatDate} from "@/utils/formatters";

export default function CustomerCard({customer}) {

    const getCustomerDisplayName = (customer) => {
        if (customer.type === 'business') {
            return customer.business_name || 'Unnamed Business';
        }
        return `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Unnamed Customer';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-400 bg-green-400/10';
            case 'inactive':
                return 'text-yellow-400 bg-yellow-400/10';
            case 'blocked':
                return 'text-red-400 bg-red-400/10';
            default:
                return 'text-gray-400 bg-gray-400/10';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return CheckCircleIcon;
            case 'inactive':
                return ExclamationTriangleIcon;
            case 'blocked':
                return XCircleIcon;
            default:
                return CheckCircleIcon;
        }
    };

    const StatusIcon = getStatusIcon(customer.status);

    return (
        <div
            className={`bg-gray-800 rounded-lg border border-gray-700 hover:border-teal-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/10 p-6`}
        >
            {/* Header */}
            <div className={`flex items-start justify-between mb-4`}>
                <div className={`flex items-center gap-3`}>
                    <div className={`p-2 bg-teal-500/10 rounded-lg`}>
                        {customer.type === 'business' ? (
                            <BuildingOfficeIcon className={`size-6 text-teal-500`}/>
                        ) : (
                            <UserIcon className={`size-6 text-teal-500`}/>
                        )}
                    </div>
                    <div>
                        <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(customer.status)}`}>
                            <StatusIcon className={`size-3`}/>
                            <span className={`capitalize`}>{customer.status}</span>
                        </div>
                    </div>
                </div>
                <button className={`text-gray-400 hover:text-text p-1 rounded`}>
                    <EllipsisVerticalIcon className={`size-5`}/>
                </button>
            </div>

            {/* Customer Info */}
            <div className={`mb-4`}>
                <h3 className={`font-semibold text-lg mb-1`}>{getCustomerDisplayName(customer)}</h3>
                <p className={`text-gray-400 text-sm font-mono`}>{customer.customer_code}</p>
            </div>

            {/* Contact Info */}
            <div className={`space-y-2 mb-4`}>
                {customer.email && (
                    <div className={`flex items-center gap-2 text-sm text-gray-300`}>
                        <EnvelopeIcon className={`size-4 text-gray-500`}/>
                        <span className={`truncate`}>{customer.email}</span>
                    </div>
                )}
                {customer.phone && (
                    <div className={`flex items-center gap-2 text-sm text-gray-300`}>
                        <PhoneIcon className={`size-4 text-gray-500`}/>
                        <span>{customer.phone}</span>
                    </div>
                )}
                {(customer.city || customer.country) && (
                    <div className={`flex items-center gap-2 text-sm text-gray-300`}>
                        <MapPinIcon className={`h-4 w-4 text-gray-500`}/>
                        <span className={`truncate`}>
                            {[customer.city, customer.country].filter(Boolean).join(', ')}
                        </span>
                    </div>
                )}
            </div>

            {/* Customer Group */}
            {customer.customer_groups && (
                <div className={`flex items-center gap-2 mb-4`}>
                    <div
                        className={`size-3 rounded-full`}
                        style={{backgroundColor: customer.customer_groups.color || '#14b8a6'}}
                    />
                    <span className={`text-sm text-gray-300`}>
                        {customer.customer_groups.name}
                    </span>
                    {customer.customer_groups.discount_percentage > 0 && (
                        <span className={`text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded`}>
                            {customer.customer_groups.discount_percentage}% off
                        </span>
                    )}
                </div>
            )}

            {/* Stats */}
            <div className={`grid grid-cols-2 gap-4 pt-4 border-t border-gray-700`}>
                <div>
                    <p className={`text-xs text-gray-400`}>Total Orders</p>
                    <p className={`font-semibold`}>{customer.total_orders || 0}</p>
                </div>
                <div>
                    <p className={`text-xs text-gray-400`}>Total Spent</p>
                    <p className={`font-semibold text-teal-400`}>{formatCurrency(customer.total_purchases)}</p>
                </div>
                <div>
                    <p className={`text-xs text-gray-400`}>Credit Limit</p>
                    <p className={`font-semibold`}>{formatCurrency(customer.credit_limit)}</p>
                </div>
                <div>
                    <p className={`text-xs text-gray-400`}>Last Purchase</p>
                    <p className={`font-semibold text-gray-300 text-xs`}>{formatDate(customer.last_purchase_date)}</p>
                </div>
            </div>

            {/* Tags */}
            {customer.tags && customer.tags.length > 0 && (
                <div className={`flex items-center gap-1 mt-3 pt-3 border-t border-gray-700`}>
                    <TagIcon className={`size-4 text-gray-500`}/>
                    <div className={`flex flex-wrap gap-1`}>
                        {customer.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className={`text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded`}>
                              {tag}
                            </span>
                        ))}
                        {customer.tags.length > 2 && (
                            <span className={`text-xs text-gray-500`}>+{customer.tags.length - 2} more</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}