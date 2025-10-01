export default function DashboardQuickActionButton({icon: Icon, label, onClick, variant = 'default', badge}) {
    return (
        <button
            onClick={onClick}
            className={`
                relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95
                ${variant === 'primary'
                ? 'bg-teal-600 hover:bg-teal-700 border-teal-500 text-white'
                : 'bg-gray-800/50 hover:bg-gray-700/50 border-gray-700/50 hover:border-teal-500/30 text-gray-300'
            }
            `}
        >
            <Icon className={`size-6 mb-2`}/>
            <span className={`text-sm font-medium text-center`}>{label}</span>
            {badge && (
                <span
                    className={`absolute -top-2 -right-2 bg-red-500 text-text text-xs rounded-full w-5 h-5 flex items-center justify-center`}
                >
                    {badge}
                </span>
            )}
        </button>
    )
}