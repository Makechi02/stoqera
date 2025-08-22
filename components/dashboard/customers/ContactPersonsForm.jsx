import {PlusIcon, XMarkIcon} from "@heroicons/react/24/outline";

export default function ContactPersonsForm({errors, contacts, setContacts, addContact, removeContact, updateContact}) {
    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Contact Persons</h2>
                <button
                    type="button"
                    onClick={addContact}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1 transition-colors"
                >
                    <PlusIcon className="h-4 w-4"/>
                    Add Contact
                </button>
            </div>

            {errors.contacts && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm">{errors.contacts}</p>
                </div>
            )}

            <div className="space-y-4">
                {contacts.map((contact, index) => (
                    <div key={index} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-medium">Contact {index + 1}</h3>
                            {contacts.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeContact(index)}
                                    className="text-red-400 hover:text-red-300 p-1"
                                >
                                    <XMarkIcon className="h-4 w-4"/>
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={contact.name}
                                    onChange={(e) => updateContact(index, 'name', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Contact name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={contact.title}
                                    onChange={(e) => updateContact(index, 'title', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="Job title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={contact.email}
                                    onChange={(e) => updateContact(index, 'email', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="contact@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={contact.phone}
                                    onChange={(e) => updateContact(index, 'phone', e.target.value)}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    placeholder="+254 xxx xxx xxx"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={contact.is_primary}
                                    onChange={(e) => {
                                        // Ensure only one primary contact
                                        if (e.target.checked) {
                                            setContacts(prev => prev.map((c, i) => ({
                                                ...c,
                                                is_primary: i === index
                                            })));
                                        }
                                    }}
                                    className="rounded border-gray-600 bg-gray-700 text-teal-600 focus:ring-teal-500 focus:ring-offset-gray-800"
                                />
                                <span className="text-sm text-gray-300">Primary contact</span>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}