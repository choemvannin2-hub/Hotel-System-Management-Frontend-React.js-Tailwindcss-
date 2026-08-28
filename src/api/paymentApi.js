import axiosClient from "./axiosClient"

export const createPaymentApi = (data) => {
    return axiosClient.post('/payments', data);
}