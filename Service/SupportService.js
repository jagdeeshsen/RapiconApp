import { authorizedFetch } from "../utils/apiClient";

const API_BASE_URL = 'https://rapiconinfra.com';

export const SupportService = {

    // Submit Customer Query
    submitCustomerQuery: async (data) => {
        try{
            const response = await authorizedFetch(`${API_BASE_URL}/api/customer-query/create-query`, {
                method: 'POST',
                body: JSON.stringify(data)
            });

            if(!response.ok){
                throw new Error('Failed to submit customer query.');
            }

            return await response.json();
        }catch(error){
            console.log('Query submit error', error.message);
        }
    },
    
}