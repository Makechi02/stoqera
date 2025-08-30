'use client'

import {useState} from 'react';
import {
    BanknotesIcon,
    CalendarDaysIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    CreditCardIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    ShoppingCartIcon,
    StarIcon,
    TagIcon,
    UserIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';
import {BuildingOfficeIcon as BuildingOfficeIconSolid, UserIcon as UserIconSolid,} from '@heroicons/react/24/solid';
import {BackBtn} from "@/components/ui/buttons";
import Link from "next/link";
import {formatCurrency, formatDate} from "@/utils/formatters";

export default function CustomerDetails({customer, contacts, interactions}) {
    const customerGroup = customer?.customer_groups;
    const [activeTab, setActiveTab] = useState('overview');

    const getStatusBadge = (status) => {
        const statusConfig = {
            active: {color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-300', icon: CheckCircleIcon},
            inactive: {color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300', icon: XCircleIcon},
            blocked: {
                color: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
                icon: ExclamationTriangleIcon
            }
        };

        const config = statusConfig[status] || statusConfig.active;
        const Icon = config.icon;

        return (
            <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
            >
                <Icon className={`size-3`}/>
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </span>
        );
    };

    const tabs = [
        {id: 'overview', name: 'Overview', icon: UserIcon},
        {id: 'interactions', name: 'Interactions', icon: ChatBubbleLeftRightIcon},
        {id: 'financial', name: 'Financial', icon: CreditCardIcon},
    ];

    return (
        <div>
            <div className={`border-b border-gray-700`}>
                <div className={`max-w-7xl mx-auto`}>
                    <div className={`flex flex-wrap gap-4 items-center justify-between py-6`}>
                        <div className={`flex items-center space-x-4`}>
                            <BackBtn/>
                            <div className={`flex items-center space-x-3`}>
                                <div className={`p-3 bg-teal-600 rounded-lg`}>
                                    {customer.type === 'business' ? (
                                        <BuildingOfficeIconSolid className={`size-6`}/>
                                    ) : (
                                        <UserIconSolid className={`size-6`}/>
                                    )}
                                </div>
                                <div>
                                    <h1 className={`text-2xl font-bold`}>
                                        {customer.type === 'business' ? customer.business_name : `${customer.first_name} ${customer.last_name}`}
                                    </h1>
                                    <p className={`text-gray-400`}>
                                        {customer.customer_code} • {customer.type === 'business' ? 'Business' : 'Individual'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={`flex items-center space-x-3 flex-1 justify-end`}>
                            {getStatusBadge(customer.status)}
                            <Link
                                href={`/dashboard/customers/${customer.id}/edit`}
                                className={`bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors`}
                            >
                                <PencilIcon className={`size-4`}/>
                                <span>Edit</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className={`max-w-7xl mx-auto py-6`}>
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8`}>
                    <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                        <div className={`flex items-center space-x-3`}>
                            <div className={`p-2 bg-teal-600/20 rounded-lg`}>
                                <BanknotesIcon className={`size-6 text-teal-400`}/>
                            </div>
                            <div>
                                <p className={`text-sm text-gray-400`}>Total Purchases</p>
                                <p className={`text-2xl font-bold`}>{formatCurrency(customer.total_purchases)}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                        <div className={`flex items-center space-x-3`}>
                            <div className={`p-2 bg-blue-600/20 rounded-lg`}>
                                <ShoppingCartIcon className={`size-6 text-blue-400`}/>
                            </div>
                            <div>
                                <p className={`text-sm text-gray-400`}>Total Orders</p>
                                <p className={`text-2xl font-bold`}>{customer.total_orders}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                        <div className={`flex items-center space-x-3`}>
                            <div className={`p-2 bg-yellow-600/20 rounded-lg`}>
                                <StarIcon className={`size-6 text-yellow-400`}/>
                            </div>
                            <div>
                                <p className={`text-sm text-gray-400`}>Loyalty Points</p>
                                <p className={`text-2xl font-bold`}>{customer.loyalty_points?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className={`bg-gray-800 p-6 rounded-xl border border-gray-700`}>
                        <div className={`flex items-center space-x-3`}>
                            <div className={`p-2 bg-purple-600/20 rounded-lg`}>
                                <CreditCardIcon className={`size-6 text-purple-400`}/>
                            </div>
                            <div>
                                <p className={`text-sm text-gray-400`}>Credit Balance</p>
                                <p className={`text-2xl font-bold`}>{formatCurrency(customer.current_credit_balance)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className={`border-b border-gray-700 mb-8`}>
                    <nav className={`flex space-x-8`}>
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                                        activeTab === tab.id
                                            ? 'border-teal-500 text-teal-400'
                                            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className={`size-5`}/>
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Tab Content */}
                <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
                    {activeTab === 'overview' && (
                        <>
                            {/* Main Info */}
                            <div className={`lg:col-span-2 space-y-6`}>
                                {/* Personal/Business Information */}
                                <div className={`bg-gray-800 rounded-xl border border-gray-700 p-6`}>
                                    <h3 className={`text-lg font-semibold mb-4`}>
                                        {customer.type === 'business' ? 'Business Information' : 'Personal Information'}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {customer.type === 'business' ? (
                                            <>
                                                <div>
                                                    <label className="text-sm text-gray-400">Business Name</label>
                                                    <p className="text-white font-medium">{customer.business_name}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-gray-400">Tax ID</label>
                                                    <p className="text-white font-medium">{customer.tax_id || 'N/A'}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <label className="text-sm text-gray-400">First Name</label>
                                                    <p className="text-white font-medium">{customer.first_name}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-gray-400">Last Name</label>
                                                    <p className="text-white font-medium">{customer.last_name}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-gray-400">Date of Birth</label>
                                                    <p className="text-white font-medium">{formatDate(customer.date_of_birth)}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm text-gray-400">Gender</label>
                                                    <p className="text-white font-medium">{customer.gender || 'N/A'}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                                    <div className="space-y-3">
                                        {customer.email && (
                                            <div className="flex items-center space-x-3">
                                                <EnvelopeIcon className="h-5 w-5 text-gray-400"/>
                                                <span className="text-white">{customer.email}</span>
                                            </div>
                                        )}
                                        {customer.phone && (
                                            <div className="flex items-center space-x-3">
                                                <PhoneIcon className="h-5 w-5 text-gray-400"/>
                                                <span className="text-white">{customer.phone}</span>
                                            </div>
                                        )}
                                        {(customer.address_line_1 || customer.city) && (
                                            <div className="flex items-start space-x-3">
                                                <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5"/>
                                                <div className="text-white">
                                                    {customer.address_line_1 && <p>{customer.address_line_1}</p>}
                                                    {customer.address_line_2 && <p>{customer.address_line_2}</p>}
                                                    {customer.city && (
                                                        <p>
                                                            {customer.city}
                                                            {customer.state && `, ${customer.state}`}
                                                            {customer.postal_code && ` ${customer.postal_code}`}
                                                        </p>
                                                    )}
                                                    {customer.country && <p>{customer.country}</p>}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Business Contacts */}
                                {customer.type === 'business' && contacts.length > 0 && (
                                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Business Contacts</h3>
                                        <div className="space-y-4">
                                            {contacts.map((contact) => (
                                                <div key={contact.id}
                                                     className="border border-gray-700 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-medium text-white">{contact.name}</h4>
                                                        {contact.is_primary && (
                                                            <span
                                                                className="bg-teal-600 text-white text-xs px-2 py-1 rounded-full">Primary</span>
                                                        )}
                                                    </div>
                                                    {contact.title &&
                                                        <p className="text-gray-400 text-sm mb-2">{contact.title}</p>}
                                                    <div className="space-y-1">
                                                        {contact.email && (
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <EnvelopeIcon className="h-4 w-4 text-gray-400"/>
                                                                <span
                                                                    className="text-gray-300">{contact.email}</span>
                                                            </div>
                                                        )}
                                                        {contact.phone && (
                                                            <div className="flex items-center space-x-2 text-sm">
                                                                <PhoneIcon className="h-4 w-4 text-gray-400"/>
                                                                <span
                                                                    className="text-gray-300">{contact.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Customer Group */}
                                {customerGroup && (
                                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Customer Group</h3>
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{backgroundColor: customerGroup.color || '#14B8A6'}}
                                            ></div>
                                            <div>
                                                <p className="font-medium text-white">{customerGroup.name}</p>
                                                {customerGroup.discount_percentage > 0 && (
                                                    <p className="text-sm text-teal-400">{customerGroup.discount_percentage}%
                                                        discount</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Account Details */}
                                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="text-sm text-gray-400">Credit Limit</label>
                                            <p className="text-white font-medium">{formatCurrency(customer.credit_limit)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400">Acquisition Source</label>
                                            <p className="text-white font-medium">{customer.acquisition_source || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400">Last Purchase</label>
                                            <p className="text-white font-medium">{formatDate(customer.last_purchase_date)}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400">Preferred Contact</label>
                                            <p className="text-white font-medium capitalize">{customer.preferred_contact_method}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-400">Marketing Consent</label>
                                            <p className="text-white font-medium">{customer.marketing_consent ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tags */}
                                {customer.tags && customer.tags.length > 0 && (
                                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {customer.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-teal-600/20 text-teal-300 px-2 py-1 rounded-md text-sm flex items-center space-x-1"
                                                >
                            <TagIcon className="h-3 w-3"/>
                            <span>{tag}</span>
                          </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Notes */}
                                {customer.notes && (
                                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                        <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">{customer.notes}</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {activeTab === 'interactions' && (
                        <div className="lg:col-span-3">
                            <div className="bg-gray-800 rounded-xl border border-gray-700">
                                <div className="p-6 border-b border-gray-700">
                                    <h3 className="text-lg font-semibold text-white">Recent Interactions</h3>
                                </div>
                                <div className="divide-y divide-gray-700">
                                    {interactions.length > 0 ? (
                                        interactions.map((interaction) => (
                                            <div key={interaction.id} className="p-6">
                                                <div className="flex items-start space-x-4">
                                                    <div className="p-2 bg-teal-600/20 rounded-lg">
                                                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-teal-400"/>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-medium text-white">{interaction.subject || interaction.type}</h4>
                                                            <span className="text-sm text-gray-400">
                                  {formatDate(interaction.created_at)}
                                </span>
                                                        </div>
                                                        {interaction.description && (
                                                            <p className="text-gray-300 text-sm mb-2">{interaction.description}</p>
                                                        )}
                                                        <div
                                                            className="flex items-center space-x-4 text-sm text-gray-400">
                                                            <span>Type: {interaction.type}</span>
                                                            {interaction.outcome &&
                                                                <span>Outcome: {interaction.outcome}</span>}
                                                            {interaction.profiles?.full_name && (
                                                                <span>By: {interaction.profiles.full_name}</span>
                                                            )}
                                                        </div>
                                                        {interaction.follow_up_date && (
                                                            <div className="mt-2">
                                  <span
                                      className="inline-flex items-center space-x-1 text-xs bg-yellow-600/20 text-yellow-300 px-2 py-1 rounded-md">
                                    <CalendarDaysIcon className="h-3 w-3"/>
                                    <span>Follow up: {formatDate(interaction.follow_up_date)}</span>
                                  </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-12 text-center">
                                            <ChatBubbleLeftRightIcon
                                                className="h-12 w-12 text-gray-600 mx-auto mb-4"/>
                                            <p className="text-gray-400">No interactions recorded yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'financial' && (
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Credit Information */}
                                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Credit Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Credit Limit</span>
                                            <span
                                                className="text-white font-medium">{formatCurrency(customer.credit_limit)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Current Balance</span>
                                            <span
                                                className="text-white font-medium">{formatCurrency(customer.current_credit_balance)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Available Credit</span>
                                            <span className="text-teal-400 font-medium">
                                                {formatCurrency(customer.credit_limit - customer.current_credit_balance)}
                                            </span>
                                        </div>
                                        {customer.credit_limit > 0 && (
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className="bg-teal-600 h-2 rounded-full"
                                                    style={{
                                                        width: `${Math.min((customer.current_credit_balance / customer.credit_limit) * 100, 100)}%`
                                                    }}
                                                ></div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Purchase Summary */}
                                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Purchase Summary</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Total Purchases</span>
                                            <span
                                                className="text-white font-medium">{formatCurrency(customer.total_purchases)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Total Orders</span>
                                            <span className="text-white font-medium">{customer.total_orders}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Average Order Value</span>
                                            <span className="text-white font-medium">
                                                {customer.total_orders > 0
                                                    ? formatCurrency(customer.total_purchases / customer.total_orders)
                                                    : formatCurrency(0)
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Loyalty Points</span>
                                            <span
                                                className="text-yellow-400 font-medium">{customer.loyalty_points?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}