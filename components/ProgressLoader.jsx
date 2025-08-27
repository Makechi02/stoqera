export default function ProgressLoader({size = 'md', color = 'white', className = ''}) {
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    const borderClasses = {
        sm: 'border',
        md: 'border-2',
        lg: 'border-2'
    };

    const dotClasses = {
        sm: 'w-0.5 h-0.5',
        md: 'w-1 h-1',
        lg: 'w-1.5 h-1.5'
    };

    const colorClasses = {
        white: 'border-white bg-white',
        teal: 'border-teal-600 bg-teal-600',
        gray: 'border-gray-600 bg-gray-600',
        black: 'border-black bg-black'
    };

    return (
        <div className={`inventory-loader relative ${className}`}>
            <div
                className={`border-dashed rounded-sm ${sizeClasses[size]} ${borderClasses[size]} ${colorClasses[color].split(' ')[0]}`}
            />
            <div className={`absolute inset-0 flex items-center justify-center`}>
                <div className={`rounded-full inventory-dot ${dotClasses[size]} ${colorClasses[color].split(' ')[1]}`}/>
            </div>
        </div>
    );
};
