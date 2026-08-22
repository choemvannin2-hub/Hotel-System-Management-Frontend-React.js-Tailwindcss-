import axios from "axios";

// axios instance
const api = axios.create({
    baseURL: "http://192.168.18.41:8080/api",
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;