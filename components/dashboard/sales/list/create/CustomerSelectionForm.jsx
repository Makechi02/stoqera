'use client'

import {UserPlusIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {UserIcon} from '@heroicons/react/24/solid';
import {useEffect, useState} from "react";
import {ProgressLoader} from "@/components";
import {getCustomersForCurrentOrganization} from "@/lib/queryCustomers";
import Link from "next/link";

export default function CustomerSelectionForm() {
    const [customer, setCustomer] = useState(null);
    const [showCustomerModal, setShowCustomerModal] = useState(false);
    const [customerType, setCustomerType] = useState('walk_in');

    const getCustomerDisplayName = (customer) => {
        if (customer.type === 'business') {
            return customer.business_name || 'Unnamed Business';
        }
        return `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Unnamed Customer';
    };

    return (
        <>
            <div className={`bg-slate-800 rounded-xl border border-slate-700 p-6`}>
                <div className={`flex items-center justify-between mb-4`}>
                    <h2 className={`text-lg font-semibold flex items-center space-x-2`}>
                        <UserIcon className={`size-5 text-teal-500`}/>
                        <span>Customer</span>
                    </h2>
                    <button
                        onClick={() => setShowCustomerModal(true)}
                        className={`p-2 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors`}
                    >
                        <UserPlusIcon className={`size-4`}/>
                    </button>
                </div>

                <div className={`space-y-4`}>
                    <div>
                        <label className={`block text-sm font-medium text-slate-300 mb-2`}>Customer Type</label>
                        <select
                            value={customerType}
                            onChange={(e) => setCustomerType(e.target.value)}
                            className={`w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500`}
                        >
                            <option value={`walk_in`}>Walk-in Customer</option>
                            <option value={`registered`}>Registered Customer</option>
                        </select>
                    </div>

                    {customer ? (
                        <div className={`p-3 bg-slate-700 rounded-lg`}>
                            <div className={`flex items-center justify-between`}>
                                <div>
                                    <p className={`font-medium text-white`}>{getCustomerDisplayName(customer)}</p>
                                    <p className={`text-sm text-slate-400`}>{customer.email}</p>
                                    <p className={`text-sm text-slate-400`}>{customer.phone}</p>
                                </div>
                                <button
                                    onClick={() => setCustomer(null)}
                                    className={`text-slate-400 hover:text-white`}
                                >
                                    <XMarkIcon className={`size-4`}/>
                                </button>
                            </div>
                        </div>
                    ) : customerType === 'registered' ? (
                        <button
                            onClick={() => setShowCustomerModal(true)}
                            className={`w-full p-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors`}
                        >
                            Select Customer
                        </button>
                    ) : (
                        <div className={`p-3 bg-slate-700 rounded-lg text-center text-slate-400`}>
                            Walk-in Customer
                        </div>
                    )}
                </div>

                {/* Customer Selection Modal */}
                {showCustomerModal && (
                    <CustomerSelectionModal
                        setCustomer={setCustomer}
                        setShowCustomerModal={setShowCustomerModal}
                        getCustomerDisplayName={getCustomerDisplayName}
                    />
                )}
            </div>
        </>
    )
}

function CustomerSelectionModal({setShowCustomerModal, setCustomer, getCustomerDisplayName}) {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchCustomers = async () => {
            return await getCustomersForCurrentOrganization();
        };

        fetchCustomers()
            .then(response => setCustomers(response.customers))
            .catch(error => console.error('Error fetching customers:', error))
            .finally(() => setLoading(false));

    }, []);

    return (
        <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50`}>
            <div className={`bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full mx-4`}>
                <div className={`p-6 border-b border-slate-700`}>
                    <div className={`flex items-center justify-between`}>
                        <h3 className={`text-lg font-semibold`}>Select Customer</h3>
                        <button
                            onClick={() => setShowCustomerModal(false)}
                            className={`p-2 hover:bg-slate-700 rounded-lg transition-colors`}
                        >
                            <XMarkIcon className={`size-5`}/>
                        </button>
                    </div>
                </div>

                <div className={`p-6`}>
                    {loading ? (
                        <div className={`flex justify-center items-center h-20`}>
                            <ProgressLoader size={`lg`}/>
                        </div>
                    ) : (
                        <div className={`space-y-3 max-h-64 overflow-y-auto`}>
                            {customers.map((cust) => (
                                <button
                                    key={cust.id}
                                    onClick={() => {
                                        setCustomer(cust);
                                        setShowCustomerModal(false);
                                    }}
                                    className={`w-full p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-left`}
                                >
                                    <p className={`font-medium text-white`}>{getCustomerDisplayName(cust)}</p>
                                    <p className={`text-sm text-slate-400`}>{cust.email}</p>
                                    <p className={`text-sm text-slate-400`}>{cust.phone}</p>
                                </button>
                            ))}
                        </div>
                    )}

                    <Link
                        href={`/dashboard/customers/create`}
                        className={`inline-block w-full mt-4 p-3 border-2 border-dashed border-slate-600 rounded-lg text-slate-400 hover:border-teal-500 hover:text-teal-500 transition-colors`}
                    >
                        + Add New Customer
                    </Link>
                </div>
            </div>
        </div>
    )
}