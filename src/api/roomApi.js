import axiosClient from "./axiosClient"

export const getRoomsApi = () => {
    return axiosClient.get("/rooms/all");
}

export const getRoomByIdApi = (id) => {
    return axiosClient.get(`/rooms/${id}`)
}

export const getAvailableRoomsApi = (data) => {
    return axiosClient.post("/rooms/available", data);
}