import {getCorsHeaders} from "@/app/api/options";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

const CATEGORIES_BASE_URL = 'https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/categories';

export const GET = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const {accessToken} = await getServerSession(authOptions);

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    try {
        const response = await axios.get(`${CATEGORIES_BASE_URL}${query && '?query=' + query}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        const categories = response?.data;
        return new Response(JSON.stringify(categories), { headers });
    } catch (e) {
        console.log(e);
        if (!e.response) {
            return new Response("No server response", {status: 500, headers});
        }
        return new Response("Failed to fetch all categories", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};
