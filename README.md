# Finviq (IMS) - Frontend

This repository contains the frontend of **Finviq (IMS)** built using **Next.js**. The frontend interacts with the backend API (built using **Spring Boot**) to manage items, categories, suppliers, users, and other inventory-related operations.

## Features

- User authentication (with JWT integration).
- Inventory management (items, categories, suppliers).
- Pagination and search functionality for items.
- Item filtering by category, price, and other attributes.
- CRUD operations for items, categories, and users.
- Responsive design with mobile and desktop views.
- Integration with the Spring Boot API backend.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Axios](https://axios-http.com/) - For HTTP requests
- [React Icons](https://react-icons.github.io/react-icons/) - For UI icons
- [React Toastify](https://fkhadra.github.io/react-toastify/) - For notifications

## Getting Started

### Prerequisites

Before setting up the project, ensure that you have the following installed:

- [Node.js](https://nodejs.org/en/) (v20 or above)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager

### Installation

1. **Clone the repository**:

```bash
git clone https://github.com/Makechi02/Inventory-Management-System.git
cd Inventory-Management-System
```

2. **Install dependencies**:

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### Running the Application

To start the application in development mode:

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

By default, the application runs on `http://localhost:5173`.

### Building for Production

To build the application for production:

```bash
npm run build
```

This will create an optimized build in the `out` folder, ready for deployment.

## Environment Variables

To configure the application, you need to set up environment variables.

Create a `.env` file in the root directory and add the following variables:

```bash
AUTH_SECRET=your-auth-secret-key
```

- `AUTH_SECRET`: The Secret key for next auth.

### Key Pages

- **/**: Home page
- **/accounts/login**: User login page
- **/dashboard/admin**: Main dashboard after login
- **/dashboard/admin/items**: Item management (list, add, edit, delete)
- **/dashboard/admin/categories**: Category management
- **/dashboard/admin/suppliers**: Supplier management
- **/dashboard/admin/users**: User management
- **/dashboard/admin/profile**: Update user profile

## API Integration

The frontend communicates with the backend (Spring Boot API) using **Axios** for HTTP requests. The API endpoints for the items, categories, users, and suppliers are defined in the backend and consumed by the frontend via service files located in `src/service`.

### Example Service

```javascript
import axios from 'axios';

const API_BASE_URL = '/api/items';

export const ItemService = {
    getAllItems: (params) => axios.get(`${API_BASE_URL}/items`, { params }),
    getItemById: (id) => axios.get(`${API_BASE_URL}/items/${id}`),
    createItem: (data) => axios.post(`${API_BASE_URL}/items`, data),
    updateItem: (id, data) => axios.put(`${API_BASE_URL}/items/${id}`, data),
    deleteItem: (id) => axios.delete(`${API_BASE_URL}/items/${id}`),
};
```

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.