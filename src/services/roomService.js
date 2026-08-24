import api from "../api/axiosClient"
import { getAvailableRoomsApi, getRoomByIdApi, getRoomsApi } from "../api/roomApi";

export const getRoomsService = async () => {
    try {
        const response = await getRoomsApi();
        return response.data;
    } catch (error) {
        console.log("GET ROOM ERROR:", error);   
    }
}

export const getRoomByIdService = async (id) => {
    try {
        const response = await getRoomByIdApi(id);
        return response.data;
    } catch (error) {
        console.log("GET ROOM ERROR:", error);
    }
}

export const getAvailableRoomsService = async (data) => {
    try {
        const response = await getAvailableRoomsApi(data);
        return response.data;
    } catch (error) {
        console.log('GET ROOM ERROR:', error);
    }
}