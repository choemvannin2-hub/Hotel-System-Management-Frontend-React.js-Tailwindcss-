import axiosClient from "./axiosClient"

export const loginApi = (credentials) => {
    return axiosClient.post("/auth/login", credentials)
}