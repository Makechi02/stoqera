'use client'

import {useState} from 'react';
import {
    ArrowRightIcon,
    BuildingStorefrontIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClipboardDocumentListIcon,
    CubeIcon,
    MapPinIcon,
    PlayIcon,
    SparklesIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function FinviqOnboarding() {
    const [currentStep, setCurrentStep] = useState('welcome');
    const [completedSetups, setCompletedSetups] = useState(new Set());

    const setupSteps = [
        {
            id: 'locations',
            title: 'Add Your First Location',
            description: 'Set up warehouses, stores, or facilities to track inventory across multiple locations',
            icon: MapPinIcon,
            time: '2 min',
            color: 'bg-teal-500'
        },
        {
            id: 'products',
            title: 'Create Product Categories',
            description: 'Organize your inventory with categories and subcategories for better management',
            icon: CubeIcon,
            time: '3 min',
            color: 'bg-blue-500'
        },
        {
            id: 'team',
            title: 'Invite Team Members',
            description: 'Add colleagues and assign roles to collaborate on inventory management',
            icon: UserGroupIcon,
            time: '1 min',
            color: 'bg-purple-500'
        },
        {
            id: 'suppliers',
            title: 'Add Suppliers',
            description: 'Connect with your suppliers to streamline procurement and ordering',
            icon: BuildingStorefrontIcon,
            time: '2 min',
            color: 'bg-orange-500'
        }
    ];

    const features = [
        {
            title: 'Real-time Inventory Tracking',
            description: 'Monitor stock levels across all locations in real-time',
            icon: ChartBarIcon
        },
        {
            title: 'Automated Reorder Points',
            description: 'Never run out of stock with smart reorder notifications',
            icon: ClipboardDocumentListIcon
        },
        {
            title: 'Multi-location Management',
            description: 'Manage inventory across warehouses, stores, and facilities',
            icon: MapPinIcon
        }
    ];

    const handleStepComplete = (stepId) => {
        setCompletedSetups(prev => new Set([...prev, stepId]));
    };

    const handleSkipToApp = () => {
        // Navigate to main app
        console.log('Navigating to main app...');
    };

    const WelcomeScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-teal-500 rounded-full mb-6">
                        <SparklesIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to <span className="text-teal-600">Finviq</span>!
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Your intelligent inventory management system is ready. Let's get you set up for success.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="text-center p-4">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-3">
                                        <Icon className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setCurrentStep('setup')}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            <PlayIcon className="w-5 h-5" />
                            Start Quick Setup
                        </button>
                        <button
                            onClick={handleSkipToApp}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                        >
                            Skip for Now
                            <ArrowRightIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500">
                    You can always access these setup options later from your dashboard
                </div>
            </div>
        </div>
    );

    const SetupScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Setup</h1>
                    <p className="text-gray-600">Complete these steps to get the most out of Finviq</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {setupSteps.map((step) => {
                        const Icon = step.icon;
                        const isCompleted = completedSetups.has(step.id);

                        return (
                            <div
                                key={step.id}
                                className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer hover:shadow-md ${
                                    isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-teal-200'
                                }`}
                                onClick={() => handleStepComplete(step.id)}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                                        isCompleted ? 'bg-green-500' : step.color
                                    }`}>
                                        {isCompleted ? (
                                            <CheckCircleIcon className="w-6 h-6 text-white" />
                                        ) : (
                                            <Icon className="w-6 h-6 text-white" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className={`font-semibold ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
                                                {step.title}
                                            </h3>
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {step.time}
                      </span>
                                        </div>
                                        <p className={`text-sm ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                                            {isCompleted ? 'Completed!' : step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-white rounded-xl p-6 text-center">
                    <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">
                            Progress: {completedSetups.size} of {setupSteps.length} completed
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(completedSetups.size / setupSteps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {completedSetups.size === setupSteps.length ? (
                            <button
                                onClick={handleSkipToApp}
                                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <CheckCircleIcon className="w-5 h-5" />
                                Complete Setup
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleSkipToApp}
                                    className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                                >
                                    Continue to Dashboard
                                    <ArrowRightIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setCurrentStep('welcome')}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Back
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return currentStep === 'welcome' ? <WelcomeScreen /> : <SetupScreen />;
}