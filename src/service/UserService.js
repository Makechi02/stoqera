import axios from "axios";

const USERS_API_BASE_URL = "/api/users";
const USERS_AUTH_API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/auth`;

export const UserAuthService = {
    updateUserPassword: (userId, data) => {
        return axios.post(`${USERS_AUTH_API_BASE_URL}/update-password/${userId}`, data, {
            headers: { "Content-Type": "application/json" }
        });
    },

    login: (credentials) => {
        return axios.post(`${USERS_AUTH_API_BASE_URL}/login`, credentials, {
            headers: { "Content-Type": "application/json" }
        })
    },
}

export const UserService = {
    updateUser: (id, user) => {
        return axios.put(`${USERS_API_BASE_URL}/${id}`, user);
    },

    deleteUser: (id) => {
        return axios.delete(`${USERS_API_BASE_URL}/${id}`);
    }
};
