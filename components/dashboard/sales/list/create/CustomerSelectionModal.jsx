'use client'

import CreateSalesModal from "@/components/dashboard/sales/list/create/CreateSalesModal";
import {useEffect, useState} from "react";
import {getCustomersForCurrentOrganization} from "@/lib/queryCustomers";
import {ProgressLoader} from "@/components";
import {getCustomerDisplayName} from "@/utils/customerUtils";

export default function CustomerSelectionModal({setCustomerType, setSelectedCustomer, customerType, setShowCustomerModal}) {
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
        <CreateSalesModal onClose={() => setShowCustomerModal(false)} title={`Select Customer`}>
            <div className={`space-y-4`}>
                <div className={`grid grid-cols-2 gap-3`}>
                    <button
                        onClick={() => {
                            setCustomerType('walk_in');
                            setSelectedCustomer(null);
                            setShowCustomerModal(false);
                        }}
                        className={`py-3 rounded-lg font-semibold ${customerType === 'walk_in' ? 'bg-teal-600' : 'bg-gray-700'}`}
                    >
                        Walk-in
                    </button>
                    <button
                        onClick={() => setCustomerType('registered')}
                        className={`py-3 rounded-lg font-semibold ${customerType === 'registered' ? 'bg-teal-600' : 'bg-gray-700'}`}
                    >
                        Registered
                    </button>
                </div>

                {customerType === 'registered' && (
                    <div>
                        {loading ? (
                            <div className={`flex justify-center items-center h-20`}><ProgressLoader size={`lg`}/></div>
                        ) : (
                            <div className={`space-y-2`}>
                                {customers.map(customer => (
                                    <button
                                        key={customer.id}
                                        onClick={() => {
                                            setSelectedCustomer(customer);
                                            setShowCustomerModal(false);
                                        }}
                                        className={`w-full bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-left transition`}
                                    >
                                        <p className={`font-semibold`}>{getCustomerDisplayName(customer)}</p>
                                        <p className={`text-sm text-gray-400`}>{customer.phone}</p>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </CreateSalesModal>
    )
}