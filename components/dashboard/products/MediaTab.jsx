import {PhotoIcon} from '@heroicons/react/24/outline';

export default function MediaTab({images}) {
    return (
        <div className={`space-y-6 bg-gray-800 rounded-lg p-6 border border-gray-700`}>
            <div>
                <h3 className={`text-lg font-semibold mb-2`}>Product Images</h3>
                <p className={`text-sm text-gray-400 mb-4`}>Upload images to showcase your product (optional)</p>

                <div
                    className={`border-2 border-dashed border-gray-700 rounded-lg p-12 text-center hover:border-teal-500 transition-colors cursor-pointer`}
                >
                    <PhotoIcon className={`size-12 text-gray-600 mx-auto mb-4`}/>
                    <p className={`text-gray-400 mb-2`}>Click to upload or drag and drop</p>
                    <p className={`text-sm text-gray-500`}>PNG, JPG, GIF up to 10MB</p>
                </div>

                {images.length > 0 && (
                    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mt-4`}>
                        {images.map((img, index) => (
                            <div key={index} className={`relative aspect-square bg-gray-800 rounded-lg`}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}