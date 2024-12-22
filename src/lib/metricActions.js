'use server'

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/metrics`;

export async function getAllMetrics() {
    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(API_BASE_URL, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch metrics');
    }

    return await response.json();
}
