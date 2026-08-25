import { loginApi } from "../api/authApi";

export const loginService = async (credentials) => {
    try {
        const response = await loginApi(credentials);
        return response.data;
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        throw error;
    }
} 