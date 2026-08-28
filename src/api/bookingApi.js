import axiosClient from '../api/axiosClient'

export const bookingApi = (data) => {
    return axiosClient.post('/bookings/create', data);
}