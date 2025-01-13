export function FeatureCard({feature}) {
    return (
        <div className={`bg-gray-100 rounded-lg transition-transform transform hover:scale-105 duration-300 ease-in-out`}>
            <div className={`my-auto flex flex-col justify-center h-full p-6`}>
                <h3 className={`text-xl font-semibold text-gray-800 mb-2`}>{feature.title}</h3>
                <p className={`text-gray-600`}>{feature.description}</p>
            </div>
        </div>
    )
}