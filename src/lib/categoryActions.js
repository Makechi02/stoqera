'use server'

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`;

export async function getCategoryById(id) {
    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch category');
    }

    return await response.json();
}

export async function createCategory(prevState, formData) {
    const name = formData.get('name') || '';

    if (name === '') {
        return 'Category name is blank';
    }

    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify({name}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        try {
            const status = response.status;
            const error = await response.json();

            if (status === 409) {
                return error.message;
            }

            console.error(error);
            return 'Failed to add category. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to add category. Try again';
        }
    } else {
        revalidatePath('/dashboard/admin/categories');
        redirect('/dashboard/admin/categories');
    }
}

export async function updateCategory(id, prevState, formData) {
    const name = formData.get('name') || '';

    if (name === '') {
        return 'Customer name is blank';
    }

    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({name}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        const status = response.status;
        const error = await response.json();

        if (status === 400 || status === 409) {
            return error.message;
        }

        console.error(error);
        return 'Failed to update category. Try again';
    } else {
        revalidatePath('/dashboard/admin/categories');
        redirect('/dashboard/admin/categories');
    }
}

export async function deleteCategory(id) {
    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        try {
            const error = await response.json();
            console.error(error);
            return 'Failed to delete category. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to delete category. Try again';
        }
    } else {
        revalidatePath('/dashboard/admin/categories');
        redirect('/dashboard/admin/categories');
    }
}