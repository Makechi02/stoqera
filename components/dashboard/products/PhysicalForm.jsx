import {QrCodeIcon, ScaleIcon} from "@heroicons/react/24/outline";

export default function PhysicalForm({formData, onChange}) {
    return (
        <div className={`space-y-6`}>
            <div>
                <label className={`dashboard-form-label mb-2`}>Weight (kg)</label>
                <div className={`relative`}>
                    <ScaleIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-gray-400`}/>
                    <input
                        type={`number`}
                        step={`0.001`}
                        min={0}
                        value={formData.weight}
                        placeholder={`0.000`}
                        onChange={(e) => onChange('weight', e.target.value)}
                        className={`dashboard-form-input-icon border-gray-600`}
                    />
                </div>
            </div>

            <div>
                <label className={`dashboard-form-label mb-4`}>Dimensions (cm)</label>
                <div className={`grid grid-cols-3 gap-4`}>
                    <div>
                        <label className={`block text-xs text-gray-400 mb-1`}>Length</label>
                        <input
                            type={`number`}
                            step={`0.1`}
                            min={0}
                            value={formData.dimensions.length}
                            placeholder={`0.0`}
                            onChange={(e) => onChange('dimensions.length', e.target.value)}
                            className={`dashboard-form-input border-gray-600`}
                        />
                    </div>
                    <div>
                        <label className={`block text-xs text-gray-400 mb-1`}>Width</label>
                        <input
                            type={`number`}
                            step={`0.1`}
                            min={0}
                            value={formData.dimensions.width}
                            placeholder={`0.0`}
                            onChange={(e) => onChange('dimensions.width', e.target.value)}
                            className={`dashboard-form-input border-gray-600`}
                        />
                    </div>
                    <div>
                        <label className={`block text-xs text-gray-400 mb-1`}>Height</label>
                        <input
                            type={`number`}
                            step={`0.1`}
                            min={0}
                            value={formData.dimensions.height}
                            placeholder={`0.0`}
                            onChange={(e) => onChange('dimensions.height', e.target.value)}
                            className={`dashboard-form-input border-gray-600`}
                        />
                    </div>
                </div>
            </div>

            <div>
                <label className={`dashboard-form-label mb-2`}>QR Code</label>
                <div className={`relative`}>
                    <QrCodeIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400`}/>
                    <input
                        type={`text`}
                        value={formData.qr_code}
                        placeholder={`QR code data`}
                        onChange={(e) => onChange('qr_code', e.target.value)}
                        className={`dashboard-form-input-icon border-gray-600`}
                    />
                </div>
            </div>
        </div>
    );
};
