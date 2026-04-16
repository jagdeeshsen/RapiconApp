import { authorizedFetch } from "../utils/apiClient";

const API_BASE_URL = 'https://rapiconinfra.com';

export const orderService = {

    // get order details
    getOrderByUser: async (userId) => {
        try{
            const response = await authorizedFetch(`${API_BASE_URL}/api/orders/${userId}`, {
                method: 'GET',
            });

            if(!response.ok){
                throw new Error('Failed to fetch order details');
            }

            return await response.json();
        }catch(error){
            console.log('Order fatch error', error.message);
        }
    },



    // create order 
    createOrder: async (orderData) => {
        try{
            const response = await authorizedFetch(`${API_BASE_URL}/api/orders/create-order`, {
                method: 'POST',
                body: JSON.stringify(orderData)
            });

            if(!response.ok){
                throw new Error('Order Creation failed.');
            }

            return await response.json();
        }catch(error){
            console.log('order can not create', error.message);
        }
    },

    // initiate payment
    initiatePhonePeSDK: async (merchantOrderId, amount) => {
        try {
            const response = await authorizedFetch(`${API_BASE_URL}/api/payment/phonePe/initiate-sdk`, {
                method: 'POST',
                body: JSON.stringify({ merchantOrderId, amount })
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.message || `Server error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.log('Service: Payment not initiated', error.message);
            throw error; // ← re-throw so handleCheckout sees the real error
        }
    },

    // verify phone-pe order status
    veriyOrderStatus: async (merchantOrderId) => {
        try{
            const response = await authorizedFetch(`${API_BASE_URL}/api/payment/phonePe/status/${merchantOrderId}`,{
                method: 'GET',
            });

            if(!response.ok){
                throw new Error('Failed to varify order.');
            }

            return await response.json();
        }catch(error){
            console.log('Payment Varification failed', error.message);
        }
    },

    // complete order on server(save payment details on server)
    completeOrder: async (paymentInfo) => {
        try{
            const response = await authorizedFetch(`${API_BASE_URL}/api/orders/varify-payment`,{
                method: 'POST',
                body: JSON.stringify(paymentInfo),
            });

            if(!response.ok){
                throw new Error('Failed to complete order.');
            }

            return await response.json();
        }catch(err){
            console.log('Failed to complete order on server', err.message);
        }
    },

    // complete installment order on server(save payment details on server)
    completeInstallmentOrder: async (paymentInfo) => {
        try{
            const response = await authorizedFetch(`${API_BASE_URL}/api/orders/varifyinstallment-payment`,{
                method: 'POST',
                body: JSON.stringify(paymentInfo),
            });

            if(!response.ok){
                throw new Error('Failed to complete order.');
            }

            return await response.json();
        }catch(err){
            console.log('Failed to complete order on server', err.message);
        }
    },
}