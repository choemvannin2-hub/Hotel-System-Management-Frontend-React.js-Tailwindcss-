import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://192.168.18.41:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},
(error) => Promise.reject(error)
);

export default axiosClient;