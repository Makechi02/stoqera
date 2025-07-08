# Categories Module Documentation

## Overview

The Category module is responsible for managing categories within the inventory management system. Categories help organize items and facilitate easier searching and filtering within the application.

## Table of Contents

1. [Data Model](#data-model)
2. [API Endpoints](#api-endpoints)
3. [Validation & Sanitization](#validation--sanitization)
4. [Client-Side Components](#client-side-components)
5. [Error Handling](#error-handling)
6. [Security](#security)

## Data Model

### Category Schema

The `Category` model represents a category in the database.

- **Fields:**
    - `name`: (String) The name of the category (required).
    - `createdBy`: (String) User ID of the creator (required).
    - `updatedBy`: (String) User ID of the last user who updated the category (required).
    - `createdAt`: (Date) Timestamp of when the category was created (automatically generated).
    - `updatedAt`: (Date) Timestamp of the last update (automatically generated).

### Example:

```json
{
  "_id": "64f8231b92f0f913e7a3",
  "name": "Electronics",
  "createdBy": "64f8231b92f0f913e7a3",
  "updatedBy": "64f8231b92f0f913e7a3",
  "createdAt": "2023-08-01T12:34:56.789Z",
  "updatedAt": "2023-08-01T12:34:56.789Z"
}
```

## API Endpoints

### POST /api/categories

**Description:**
Create a new category.

**Request:**
- **Headers:**
    - `Content-Type: application/json`
- **Body:**
    - `name`: (String) Name of the category (required).
    - `createdBy`: (String) User ID of the creator (required).
    - `updatedBy`: (String) User ID of the updater (required).

**Response:**
- **201 Created:**
    - Returns the newly created category.
- **400 Bad Request:**
    - Returns an array of validation error messages.
- **500 Internal Server Error:**
    - Returns an error message indicating the creation failed.

**Example Request:**

```json
{
  "name": "Electronics",
  "createdBy": "64f8231b92f0f913e7a3",
  "updatedBy": "64f8231b92f0f913e7a3"
}
```

**Example Response:**

```json
{
  "_id": "64f8231b92f0f913e7a3",
  "name": "Electronics",
  "createdBy": "64f8231b92f0f913e7a3",
  "updatedBy": "64f8231b92f0f913e7a3",
  "createdAt": "2023-08-01T12:34:56.789Z",
  "updatedAt": "2023-08-01T12:34:56.789Z"
}
```

## Validation & Sanitization

### Validation

The `validateCategory` function checks that:
- `name` is provided and is a string.
- `createdBy` is provided and is a string.
- `updatedBy` is provided and is a string.

### Sanitization

The `sanitizeCategory` function ensures that:
- `name`, `createdBy`, and `updatedBy` fields are trimmed of any excess whitespace.
- Data is formatted properly before saving to the database.

**Example:**

```javascript
import { validateCategory, sanitizeCategory } from "@/utils/validationUtils";

// Validate and sanitize before saving
const errors = validateCategory({ name, createdBy, updatedBy });
if (errors.length > 0) {
    // Handle errors
}
const sanitizedCategory = sanitizeCategory({ name, createdBy, updatedBy });
```

## Client-Side Components

### AddCategoryForm Component

**Description:**
The `AddCategoryForm` is a React component that allows users to add new categories through a form interface.

**Props:**
- `userID`: The ID of the logged-in user (required).

**Example Usage:**

```javascript
import AddCategoryForm from "@/components/ui/dashboard/admin/categories/AddCategoryForm";

// Usage in a page or component
<AddCategoryForm userID={user.id} />
```

### Client-Side Validation

The form includes client-side validation for the following:
- Ensures the `name` field is not blank.
- Displays an error message if validation fails.

## Error Handling

The module handles errors through the following mechanisms:
- Client-side validation errors are displayed to the user.
- Server-side validation errors return a 400 status with error details.
- Unexpected server errors return a 500 status.

## Security

- The `POST` endpoint requires the user's `userID` for `createdBy` and `updatedBy` fields to ensure accountability.
- Data is validated and sanitized to prevent injection attacks and ensure data integrity.

## Future Enhancements

- Implement pagination for categories.
- Add functionality for updating and deleting categories.
- Enhance the user interface for better user experience.
