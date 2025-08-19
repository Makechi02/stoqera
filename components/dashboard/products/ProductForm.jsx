import React, {useState} from "react";
import BasicInfoForm from "@/components/dashboard/products/BasicInfoForm";
import PricingForm from "@/components/dashboard/products/PricingForm";
import InventoryForm from "@/components/dashboard/products/InventoryForm";
import PhysicalForm from "@/components/dashboard/products/PhysicalForm";
import MediaForm from "@/components/dashboard/products/MediaForm";

export default function ProductForm({ formData, errors, onChange, categories, units }) {
    const [activeTab, setActiveTab] = useState("basic");

    const tabs = [
        { id: "basic", name: "Basic Info", component: BasicInfoForm },
        { id: "pricing", name: "Pricing & Stock", component: PricingForm },
        { id: "inventory", name: "Inventory", component: InventoryForm },
        { id: "physical", name: "Physical", component: PhysicalForm },
        { id: "media", name: "Media & Tags", component: MediaForm },
    ];

    const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
                <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 sticky top-8">
                    <nav className="space-y-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                                    activeTab === tab.id
                                        ? "bg-teal-600 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-700"
                                }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Active Form */}
            <div className="flex-1 bg-gray-800 rounded-xl border border-gray-700 p-8">
                {ActiveComponent && (
                    <ActiveComponent
                        formData={formData}
                        errors={errors}
                        onChange={onChange}
                        categories={categories}
                        units={units}
                    />
                )}
            </div>
        </div>
    );
};
