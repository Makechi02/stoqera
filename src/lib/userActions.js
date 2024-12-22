'use server'

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function createUser(prevState, formData) {
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const role = formData.get('role') || '';

    if (name === '') {
        return "Name is blank";
    }

    if (email === '') {
        return "Email is blank";
    }

    if (!role || role === '') {
        return 'Please select a role';
    }

    const newUser = {name, email, role, password: role.toLowerCase()};

    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/auth/register`, {
        method: 'POST',
        body: JSON.stringify(newUser),
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

            if(status === 400) {
                return error?.errors?.join('. ');
            }

            console.error(error);
            return 'Failed to add user. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to add user. Try again';
        }
    } else {
        revalidatePath('/admin/users');
        redirect('/admin/users');
    }
}

export async function updateUser(id, prevState, formData) {
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const role = formData.get('role') || '';

    if (name === '') {
        return 'Name can\'t be blank';
    }

    if (email === '') {
        return 'Email can\'t be blank';
    }

    if (!role || role === "-- select role --") {
        return 'Please select a role';
    }

    const {accessToken} = await getServerSession(authOptions);

    const updatedUser = {name, email, role};

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedUser),
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
        return 'Failed to update user. Try again';
    } else {
        revalidatePath('/admin/users');
        redirect('/admin/users');
    }
}

export async function deleteUser(id, _) {
    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${id}`, {
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
            return 'Failed to delete user. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to delete user. Try again';
        }
    } else {
        revalidatePath('/admin/users');
        redirect('/admin/users');
    }
}