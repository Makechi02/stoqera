import {getCorsHeaders} from "@/app/api/options";
import axios from "axios";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

const USERS_BASE_URL = 'https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/users';

export const PUT = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const updatedUser = await request.json();

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.put(`${USERS_BASE_URL}/${params.id}`, updatedUser,{
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return new Response(JSON.stringify(response?.data), { status: 200, headers });
    } catch (e) {
        if (e.response.status === 400) {
            return new Response(e.response.data.message, { status: 400, headers });
        } else if (e.status === 409) {
            return new Response(e.response.data.message, { status: 409, headers });
        } else {
            console.error(e.response);
            return new Response("Failed to update user", { status: 500, headers });
        }
    }
};

export const DELETE = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.delete(`${USERS_BASE_URL}/${params.id}`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });
        return new Response(response.data, { status: 200, headers });
    } catch (e) {
        console.error(e);
        return new Response("Failed to delete user", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, { status: 200, headers });
};
