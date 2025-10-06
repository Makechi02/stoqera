import {InformationCircleIcon} from '@heroicons/react/24/outline';

export default function InfoTooltip({text}) {
    return (
        <div className={`group relative inline-block ml-2`}>
            <InformationCircleIcon className={`size-4 text-gray-500 hover:text-teal-400 cursor-help`}/>
            <div
                className={`invisible group-hover:visible absolute z-10 w-64 px-3 py-2 text-sm text-text bg-gray-800 rounded-lg shadow-lg border border-gray-700 bottom-full left-1/2 transform -translate-x-1/2 mb-2`}
            >
                {text}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 -mt-1`}>
                    <div className={`border-4 border-transparent border-t-gray-800`}/>
                </div>
            </div>
        </div>
    )
}