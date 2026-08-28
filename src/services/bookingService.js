import { bookingApi } from "../api/bookingApi";

export const bookingService = async (data) => {
    try {
        const response = await bookingApi(data)
        return response.data;
    } catch (error) {
        console.error("BOOKING FAILD:", error);
        throw (error)
    }
}