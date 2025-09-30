export default function StatsCardSkeleton() {
    return (
        <div className={`bg-gray-800 rounded-lg p-6 animate-pulse`}>
            <div className={`flex items-center justify-between mb-4`}>
                <div className={`w-8 h-8 bg-gray-700 rounded`}/>
                <div className={`w-16 h-4 bg-gray-700 rounded`}/>
            </div>
            <div className={`w-20 h-8 bg-gray-700 rounded mb-2`}/>
            <div className={`w-24 h-4 bg-gray-700 rounded`}/>
        </div>
    )
}