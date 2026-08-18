import api from "../api/AxiosClient"

export const getRooms = async ()=>{
    const response = await api.get("/rooms/all");
    return response.data.data;
}