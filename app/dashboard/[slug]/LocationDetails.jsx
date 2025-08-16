'use client';

import {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    BuildingStorefrontIcon,
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    EnvelopeIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    TrashIcon,
    UserIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';

export default function LocationDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - replace with your actual API
    const mockLocation = {
      id: id,
      name: 'Downtown Store',
      type: 'store',
      code: 'LOC001',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'USA',
      phone: '+1 (555) 123-4567',
      email: 'downtown@company.com',
      is_active: true,
      manager_id: 'manager-1',
      manager_name: 'John Doe',
      manager_email: 'john.doe@company.com',
      settings: {
        operating_hours: {
          monday: '9:00 AM - 9:00 PM',
          tuesday: '9:00 AM - 9:00 PM',
          wednesday: '9:00 AM - 9:00 PM',
          thursday: '9:00 AM - 9:00 PM',
          friday: '9:00 AM - 10:00 PM',
          saturday: '9:00 AM - 10:00 PM',
          sunday: '10:00 AM - 8:00 PM'
        },
        features: ['POS System', 'Inventory Management', 'Customer WiFi', 'Security System']
      },
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-02-01T14:30:00Z'
    };

    setTimeout(() => {
      setLocation(mockLocation);
      setLoading(false);
    }, 500);
  }, [id]);

  const getLocationIcon = (type) => {
    switch (type) {
      case 'store':
        return <BuildingStorefrontIcon className="h-8 w-8 text-teal-400" />;
      case 'warehouse':
        return <BuildingOfficeIcon className="h-8 w-8 text-teal-400" />;
      case 'outlet':
        return <MapPinIcon className="h-8 w-8 text-teal-400" />;
      default:
        return <MapPinIcon className="h-8 w-8 text-teal-400" />;
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
      // Implement delete API call here
      router.push('/locations');
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

  if (!location) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Location Not Found</h2>
          <p className="text-gray-400 mb-4">The location you're looking for doesn't exist.</p>
          <Link
            href="/locations"
            className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-white font-medium transition-colors duration-200"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Locations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              href="/locations"
              className="mr-4 p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Location Details</h1>
              <p className="mt-1 text-gray-400">View and manage location information</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href={`/locations/${location.id}/edit`}
              className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white font-medium transition-colors duration-200"
            >
              <PencilIcon className="h-4 w-4 mr-2" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition-colors duration-200"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  {getLocationIcon(location.type)}
                  <div className="ml-4">
                    <h2 className="text-2xl font-bold text-white">{location.name}</h2>
                    <p className="text-gray-400">{location.code}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-900 text-teal-200 capitalize">
                    {location.type}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    location.is_active 
                      ? 'bg-green-900 text-green-200' 
                      : 'bg-red-900 text-red-200'
                  }`}>
                    {location.is_active ? (
                      <>
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="h-4 w-4 mr-1" />
                        Inactive
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <MapPinIcon className="h-5 w-5 mr-2 text-teal-400" />
                    Address
                  </h3>
                  <div className="text-gray-300 space-y-1">
                    <p>{location.address}</p>
                    <p>{location.city}, {location.state} {location.postal_code}</p>
                    <p>{location.country}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <PhoneIcon className="h-5 w-5 mr-3 text-teal-400" />
                      <a href={`tel:${location.phone}`} className="hover:text-teal-400 transition-colors">
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <EnvelopeIcon className="h-5 w-5 mr-3 text-teal-400" />
                      <a href={`mailto:${location.email}`} className="hover:text-teal-400 transition-colors">
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            {location.settings?.operating_hours && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-teal-400" />
                  Operating Hours
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(location.settings.operating_hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-2 px-3 bg-gray-700 rounded">
                      <span className="text-gray-300 capitalize font-medium">{day}</span>
                      <span className="text-gray-400">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {location.settings?.features && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {location.settings.features.map((feature, index) => (
                    <div key={index} className="flex items-center py-2 px-3 bg-gray-700 rounded">
                      <CheckCircleIcon className="h-4 w-4 mr-3 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Manager Information */}
            {location.manager_name && (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-teal-400" />
                  Manager
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-white font-medium">{location.manager_name}</p>
                    {location.manager_email && (
                      <a 
                        href={`mailto:${location.manager_email}`}
                        className="text-teal-400 hover:text-teal-300 transition-colors text-sm"
                      >
                        {location.manager_email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-teal-400" />
                Metadata
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Created</p>
                  <p className="text-white">{formatDate(location.created_at)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Last Updated</p>
                  <p className="text-white">{formatDate(location.updated_at)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location ID</p>
                  <p className="text-white font-mono text-sm">{location.id}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href={`/locations/${location.id}/edit`}
                  className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white font-medium transition-colors duration-200"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit Location
                </Link>
                <button
                  onClick={() => window.print()}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors duration-200"
                >
                  Print Details
                </button>
                <Link
                  href="/locations"
                  className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors duration-200"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}