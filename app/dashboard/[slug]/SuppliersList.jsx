// app/suppliers/page.jsx
'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {
    AdjustmentsHorizontalIcon,
    BuildingOfficeIcon,
    EnvelopeIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    PhoneIcon,
    PlusIcon,
    TrashIcon,
    UserIcon
} from '@heroicons/react/24/outline';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockSuppliers = [
      {
        id: '1',
        name: 'TechCorp Industries',
        code: 'TECH001',
        contact_person: 'John Smith',
        email: 'john@techcorp.com',
        phone: '+1-555-0123',
        address: '123 Tech Street, Silicon Valley, CA 94000',
        tax_id: 'TAX123456789',
        payment_terms: 30,
        is_active: true,
        created_at: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Global Supplies Ltd',
        code: 'GLOB002',
        contact_person: 'Sarah Johnson',
        email: 'sarah@globalsupplies.com',
        phone: '+1-555-0456',
        address: '456 Supply Avenue, New York, NY 10001',
        tax_id: 'TAX987654321',
        payment_terms: 15,
        is_active: true,
        created_at: '2024-02-20T14:15:00Z'
      },
      {
        id: '3',
        name: 'Warehouse Solutions',
        code: 'WARE003',
        contact_person: 'Mike Davis',
        email: 'mike@warehousesol.com',
        phone: '+1-555-0789',
        address: '789 Storage Road, Chicago, IL 60601',
        tax_id: 'TAX456789123',
        payment_terms: 45,
        is_active: false,
        created_at: '2024-01-08T09:45:00Z'
      }
    ];
    
    setTimeout(() => {
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 500);
  }, []);

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contact_person?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && supplier.is_active) ||
                         (filterActive === 'inactive' && !supplier.is_active);
    
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      // Add delete API call here
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Suppliers</h1>
              <p className="mt-2 text-gray-400">Manage your supplier relationships</p>
            </div>
            <Link
              href="/suppliers/add"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              Add Supplier
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-400" />
            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Suppliers</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>

        {/* Suppliers Grid */}
        {filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-400 mb-2">No suppliers found</h3>
            <p className="text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first supplier'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-teal-500 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {supplier.name}
                    </h3>
                    <p className="text-teal-400 text-sm font-mono">
                      {supplier.code}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      supplier.is_active
                        ? 'bg-green-900 text-green-300'
                        : 'bg-red-900 text-red-300'
                    }`}
                  >
                    {supplier.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-6">
                  {supplier.contact_person && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <UserIcon className="h-4 w-4 text-gray-500" />
                      {supplier.contact_person}
                    </div>
                  )}
                  {supplier.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <EnvelopeIcon className="h-4 w-4 text-gray-500" />
                      {supplier.email}
                    </div>
                  )}
                  {supplier.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <PhoneIcon className="h-4 w-4 text-gray-500" />
                      {supplier.phone}
                    </div>
                  )}
                </div>

                {/* Payment Terms */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400">
                    Payment Terms: <span className="text-white">{supplier.payment_terms} days</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/suppliers/${supplier.id}`}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <EyeIcon className="h-4 w-4" />
                    View
                  </Link>
                  <Link
                    href={`/suppliers/${supplier.id}/edit`}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(supplier.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}