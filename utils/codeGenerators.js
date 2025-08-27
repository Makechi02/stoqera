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
