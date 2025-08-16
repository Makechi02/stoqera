// app/suppliers/[id]/page.jsx
'use client';

import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    ClockIcon,
    CreditCardIcon,
    DocumentTextIcon,
    EnvelopeIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    TrashIcon,
    UserIcon
} from '@heroicons/react/24/outline';

export default function SupplierDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockSupplier = {
      id: id,
      name: 'TechCorp Industries',
      code: 'TECH001',
      contact_person: 'John Smith',
      email: 'john@techcorp.com',
      phone: '+1-555-0123',
      address: '123 Tech Street, Silicon Valley, CA 94000',
      tax_id: 'TAX123456789',
      payment_terms: 30,
      notes: 'Reliable supplier with excellent quality products. Has been our partner for over 3 years. Offers competitive pricing and fast delivery.',
      is_active: true,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-03-10T15:45:00Z'
    };

    setTimeout(() => {
      setSupplier(mockSupplier);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this supplier? This action cannot be undone.')) {
      // Add delete API call here
      router.push('/suppliers');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BuildingOfficeIcon className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-400 mb-2">Supplier not found</h2>
          <Link
            href="/suppliers"
            className="text-teal-400 hover:text-teal-300 font-medium"
          >
            Back to suppliers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/suppliers"
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">{supplier.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-teal-400 font-mono text-sm">{supplier.code}</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      supplier.is_active
                        ? 'bg-green-900 text-green-300'
                        : 'bg-red-900 text-red-300'
                    }`}
                  >
                    {supplier.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/suppliers/${supplier.id}/edit`}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <PencilIcon className="h-5 w-5" />
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <UserIcon className="h-6 w-6 text-teal-400" />
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supplier.contact_person && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Contact Person
                    </label>
                    <p className="text-white">{supplier.contact_person}</p>
                  </div>
                )}

                {supplier.email && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="h-4 w-4 text-gray-500" />
                      <a
                        href={`mailto:${supplier.email}`}
                        className="text-teal-400 hover:text-teal-300"
                      >
                        {supplier.email}
                      </a>
                    </div>
                  </div>
                )}

                {supplier.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="h-4 w-4 text-gray-500" />
                      <a
                        href={`tel:${supplier.phone}`}
                        className="text-teal-400 hover:text-teal-300"
                      >
                        {supplier.phone}
                      </a>
                    </div>
                  </div>
                )}

                {supplier.address && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Address
                    </label>
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                      <p className="text-white">{supplier.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Business Information */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <BuildingOfficeIcon className="h-6 w-6 text-teal-400" />
                Business Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supplier.tax_id && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Tax ID
                    </label>
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="h-4 w-4 text-gray-500" />
                      <p className="text-white font-mono">{supplier.tax_id}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Payment Terms
                  </label>
                  <div className="flex items-center gap-2">
                    <CreditCardIcon className="h-4 w-4 text-gray-500" />
                    <p className="text-white">{supplier.payment_terms} days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {supplier.notes && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="h-6 w-6 text-teal-400" />
                  Notes
                </h2>
                <p className="text-gray-300 leading-relaxed">{supplier.notes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Current Status</span>
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
              </div>
            </div>

            {/* Timestamps */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-teal-400" />
                Timeline
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-400">Created</span>
                  </div>
                  <p className="text-sm text-white ml-6">
                    {formatDate(supplier.created_at)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-400">Last Updated</span>
                  </div>
                  <p className="text-sm text-white ml-6">
                    {formatDate(supplier.updated_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {supplier.email && (
                  <a
                    href={`mailto:${supplier.email}`}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <EnvelopeIcon className="h-4 w-4" />
                    Send Email
                  </a>
                )}

                {supplier.phone && (
                  <a
                    href={`tel:${supplier.phone}`}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    Call
                  </a>
                )}

                <Link
                  href={`/suppliers/${supplier.id}/edit`}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit Supplier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}