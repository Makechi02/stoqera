'use client'

import {useEffect} from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <div className={`min-h-screen w-full flex flex-col items-center justify-center gap-4`}>
            <h2>Something went wrong!</h2>
            <button
                onClick={() => reset()}
                className={`bg-primary px-3 py-2 rounded-lg`}
            >
                Try again
            </button>
        </div>
    )
}