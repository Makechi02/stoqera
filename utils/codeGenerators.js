import crypto from "crypto";

function randomCode(length = 6) {
    return crypto.randomBytes(length)
        .toString("base64")
        .replace(/[^a-zA-Z0-9]/g, '')
        .substring(0, length)
        .toUpperCase();
}

export function generateSupplierCode(orgName) {
    const prefix = orgName.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase();
    return `${prefix}-SUP-${randomCode(6)}`;
}

export function generateTransferNumber() {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TR-${timestamp}-${random}`;
}

export function generateSaleNumber() {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV-${timestamp}-${random}`;
}