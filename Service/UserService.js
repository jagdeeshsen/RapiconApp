import { authorizedFetch } from "../utils/apiClient";

const API_BASE_URL = 'https://rapiconinfra.com/api';

export const userService = {

  // Get user by ID
   getUserById: async (id) => {
    try{
      const response = await authorizedFetch(`${API_BASE_URL}/user/get-user/${id}`,
        {
          method: 'GET',
        }
      );

      const result= await response.json();

      if (!response.ok) throw new Error(result.message || 'User not found');

      return result;
    }catch(error){
      console.log('user fetch error', error.message);
      throw error;
    }
  },

  // Create user
  createUser: async (userData) => {
    try{
      const response = await fetch(`${API_BASE_URL}/auth/register-user`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
      });
      
      const result= await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to create user');
      return result;
    }catch(error){
      console.log("Create user error", error.message);
      throw error;
    }
  },

  // Update user
  updateUser: async (userData) => {
    const response = await authorizedFetch(`${API_BASE_URL}/user/update-user`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  },

  // Delete user
  deleteUser: async (otp) => {
    const response = await authorizedFetch(`${API_BASE_URL}/user/delete-account`, {
      method: 'DELETE',
      body: JSON.stringify(otp)
    });
    
    if (!response.ok) throw new Error('Failed to delete user');
    return await response.json();
  },

  // Get user by ID
   logoutUser: async () => {
    try{
      const response = await authorizedFetch(`${API_BASE_URL}/auth/logout-user`,
        {
          method: 'POST',
        }
      );

      const result= await response.json();

      if (!response.ok) throw new Error(result.message || 'User not  logout');

      return result;
    }catch(error){
      console.log('user logout error', error.message);
      throw error;
    }
  },

  // send otp 
  sendOTP: async (phone) => {
    try{
      const response= await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
      });

      const result= await response.json();

      if(!response.ok){
          throw new Error(result.message || 'Failed to send otp');
      }

      return result;
    }catch(error){
      console.log('otp send error', error.message);
      throw error;
    }
  },

  // varify otp 
  varifyOTP: async (loginData) => {
    try{
      const response= await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify( loginData ),
      });

      const result= await response.json();

      if(!response.ok){
          throw new Error(result.message || 'Failed to varify otp');
      }

      return result;
    }catch(error){
      console.log('varify otp error', error.message);
      throw error;
    }
  }
};