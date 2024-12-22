'use server'

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/suppliers`;

export async function getSupplierById(id) {
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
        throw new Error('Failed to fetch supplier');
    }

    return await response.json();
}

export async function createSupplier(prevState, formData) {
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const address = formData.get('address') || '';

    if (name === '') {
        return 'Supplier name is blank';
    }

    if (phone === '') {
        return 'Supplier contact is blank';
    }

    if (address === '') {
        return 'Supplier address is blank';
    }

    const newSupplier = {name, phone, address};

    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newSupplier),
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
            return 'Failed to add supplier. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to add supplier. Try again';
        }
    } else {
        revalidatePath('/admin/suppliers');
        redirect('/admin/suppliers');
    }
}

export async function updateSupplier(id, prevState, formData) {
    const name = formData.get('name') || '';
    const phone = formData.get('phone') || '';
    const address = formData.get('address') || '';

    if (name === '') {
        return 'Supplier name is blank';
    }

    if (phone === '') {
        return 'Supplier contact is blank';
    }

    if (address === '') {
        return 'Supplier address is blank';
    }

    const {accessToken} = await getServerSession(authOptions);

    const updatedSupplier = {name, phone, address};

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedSupplier),
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
        return 'Failed to update supplier. Try again';
    } else {
        revalidatePath('/admin/suppliers');
        redirect('/admin/suppliers');
    }
}

export async function deleteSupplier(id, _) {
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
            return 'Failed to delete supplier. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to delete supplier. Try again';
        }
    } else {
        revalidatePath('/dashboard/admin/suppliers');
        redirect('/dashboard/admin/suppliers');
    }
}