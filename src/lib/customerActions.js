'use server'

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/customers`;

export async function getCustomerById(id) {
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
        throw new Error('Failed to fetch customer');
    }

    return await response.json();
}

export async function createCustomer(prevState, formData) {
    const name = formData.get('name') || '';
    const contactPerson = formData.get('contactPerson') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const address = formData.get('address') || '';

    if (name === '') {
        return 'Customer name is blank';
    }

    if (contactPerson === '') {
        return 'Customer contact person is blank';
    }

    if (email === '') {
        return 'Customer email is blank';
    }

    if (phone === '') {
        return 'Customer contact is blank';
    }

    if (address === '') {
        return 'Customer address is blank';
    }

    const newCustomer = {name, contactPerson, email, phone, address};
    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newCustomer),
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
            return 'Failed to add customer. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to add customer. Try again';
        }
    } else {
        revalidatePath('/admin/customers');
        redirect('/admin/customers');
    }
}

export async function updateCustomer(id, prevState, formData) {
    const name = formData.get('name') || '';
    const contactPerson = formData.get('contactPerson') || '';
    const email = formData.get('email') || '';
    const phone = formData.get('phone') || '';
    const address = formData.get('address') || '';

    if (name === '') {
        return 'Customer name is blank';
    }

    if (contactPerson === '') {
        return 'Customer contact person is blank';
    }

    if (email === '') {
        return 'Customer email is blank';
    }

    if (phone === '') {
        return 'Customer contact is blank';
    }

    if (address === '') {
        return 'Customer address is blank';
    }

    const updatedCustomer = {name, contactPerson, email, phone, address};
    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedCustomer),
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
        return 'Failed to update customer. Try again';
    } else {
        revalidatePath('/admin/customers');
        redirect('/admin/customers');
    }
}

export async function deleteCustomer(id, _) {
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
            return 'Failed to delete customer. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to delete customer. Try again';
        }
    } else {
        revalidatePath('/admin/customers');
        redirect('/admin/customers');
    }
}