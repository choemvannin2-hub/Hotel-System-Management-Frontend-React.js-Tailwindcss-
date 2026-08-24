import api from "../api/axiosClient"

export const getRooms = async ()=>{
    const response = await api.get("/rooms/all");
    return response.data;
}

export const getRoomById = async(id)=>{
    const response = await api.get(`/rooms/${id}`);
    return response.data;
}

export const getAvailableRooms = async(data)=>{
    const response = await api.post("rooms/available", data);
    return response.data;
}