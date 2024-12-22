'use server'

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/items`;

export async function getAllItems(query, currentPage) {
    const {accessToken} = await getServerSession(authOptions);

    const queryString = new URLSearchParams();
    if (query) queryString.append('query', query);
    if (currentPage) queryString.append('page', String(currentPage - 1));

    const response = await fetch(`${API_BASE_URL}?${queryString.toString()}`, {
        cache: 'force-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch items');
    }

    return await response.json();
}

export async function getItemById(id) {
    const {accessToken} = await getServerSession(authOptions);

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        console.error(response);
        throw new Error('Failed to fetch item');
    }

    return await response.json();
}

export async function createItem(prevState, formData) {
    const name = formData.get('name') || '';
    const brand = formData.get('brand') || '';
    const model = formData.get('model') || '';
    const category = formData.get('category') || '';
    const costPrice = formData.get('costPrice') || '';
    const retailPrice = formData.get('retailPrice') || '';
    const quantity = formData.get('quantity') || '';
    const stockAlert = formData.get('stockAlert') || '';

    if (!name.trim()) {
        return 'Item name is required';
    }

    if (!brand.trim()) {
        return 'Item brand is required';
    }

    if (!model.trim()) {
        return 'Model is required';
    }

    if (!category || category === "-- select category --") {
        return 'Please choose a category';
    }

    const numericCostPrice = parseFloat(costPrice);
    if (isNaN(numericCostPrice) || numericCostPrice <= 0) {
        return 'Cost price must be a positive number';
    }

    const numericRetailPrice = parseFloat(retailPrice);
    if (isNaN(numericRetailPrice) || numericRetailPrice <= 0) {
        return 'Retail price must be a positive number';
    }

    const numericQuantity = parseFloat(quantity);
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
        return 'Quantity must be a positive number';
    }

    const numericStockAlert = parseFloat(stockAlert);
    if (isNaN(numericStockAlert) || numericStockAlert <= 0) {
        return 'Stock alert must be a positive number';
    }

    const {accessToken} = await getServerSession(authOptions);
    const newItem = {name, brand, model, category, costPrice, retailPrice, quantity, stockAlert};

    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(newItem),
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
            return 'Failed to add item. Please try again';
        } catch (e) {
            console.error(e);
            return 'Failed to add item. Please try again';
        }
    } else {
        revalidatePath('/admin/items');
        redirect('/admin/items');
    }
}

export async function updateItem(id, prevState, formData) {
    const name = formData.get('name') || '';
    const brand = formData.get('brand') || '';
    const model = formData.get('model') || '';
    const category = formData.get('category') || '';
    const costPrice = formData.get('costPrice') || '';
    const retailPrice = formData.get('retailPrice') || '';
    const quantity = formData.get('quantity') || '';
    const stockAlert = formData.get('stockAlert') || '';

    if (!name.trim()) {
        return 'Item name is required';
    }

    if (!brand.trim()) {
        return 'Item brand is required';
    }

    if (!model.trim()) {
        return 'Model is required';
    }

    if (!category || category === "-- select category --") {
        return 'Please choose a category';
    }

    const numericCostPrice = parseFloat(costPrice);
    if (isNaN(numericCostPrice) || numericCostPrice <= 0) {
        return 'Cost price must be a positive number';
    }

    const numericRetailPrice = parseFloat(retailPrice);
    if (isNaN(numericRetailPrice) || numericRetailPrice <= 0) {
        return 'Retail price must be a positive number';
    }

    const numericQuantity = parseFloat(quantity);
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
        return 'Quantity must be a positive number';
    }

    const numericStockAlert = parseFloat(stockAlert);
    if (isNaN(numericStockAlert) || numericStockAlert <= 0) {
        return 'Stock alert must be a positive number';
    }

    const {accessToken} = await getServerSession(authOptions);
    const updatedItem = {
        name,
        brand,
        model,
        category,
        costPrice: numericCostPrice,
        retailPrice: numericRetailPrice,
        quantity: numericQuantity,
        stockAlert
    };

    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedItem),
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
        return 'Failed to update item. Try again';
    } else {
        revalidatePath('/admin/items');
        redirect('/admin/items');
    }
}

export async function deleteItem(id) {
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
            return 'Failed to delete item. Try again';
        } catch (e) {
            console.error(e);
            return 'Failed to delete item. Try again';
        }
    } else {
        revalidatePath('/admin/items');
        redirect('/admin/items');
    }
}