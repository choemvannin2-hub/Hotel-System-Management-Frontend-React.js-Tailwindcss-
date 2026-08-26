import { loginApi, registerApi } from "../api/authApi";

export const loginService = async (credentials) => {
    try {
        const response = await loginApi(credentials);
        return response.data;
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        throw error;
    }
} 

export const registerService = async (data) => {
    try {
        const response = await registerApi(data);
        return response.data;
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return error.response.data;
    }
}