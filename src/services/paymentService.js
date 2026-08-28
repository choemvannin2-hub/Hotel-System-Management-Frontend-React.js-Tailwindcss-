import { createPaymentApi } from "../api/paymentApi"

export const paymentsService = async (data) => {
    try {
        const response = await createPaymentApi(data);
        return response.data;
    } catch (error) {
        console.error("PAYMENTS FAILD:", error);
        console.log(error.response?.data);
        throw (error)
        
    }
}