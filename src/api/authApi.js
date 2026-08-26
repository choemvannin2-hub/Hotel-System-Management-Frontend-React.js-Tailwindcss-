import axiosClient from "./axiosClient"

export const loginApi = (credentials) => {
    return axiosClient.post("/auth/login", credentials)
}

export const registerApi = (data) => {
    return axiosClient.post("/auth/register", data)
}