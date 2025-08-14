'use client'

import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

export default function TogglePasswordBtn({showPassword, toggleShowPassword}) {
    return (
        <button
            type={`button`}
            onClick={toggleShowPassword}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600`}
        >
            {showPassword ? (
                <EyeSlashIcon className={`size-5`}/>
            ) : (
                <EyeIcon className={`size-5`}/>
            )}
        </button>
    )
}