export default function ProgressLoader({size = 'md', color = 'white', className = ''}) {
    const sizeClasses = {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-8'
    };

    const borderClasses = {
        sm: 'border',
        md: 'border-2',
        lg: 'border-2'
    };

    const dotClasses = {
        sm: 'size-0.5',
        md: 'size-1',
        lg: 'size-2'
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
