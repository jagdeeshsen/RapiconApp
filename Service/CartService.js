import { authorizedFetch } from "../utils/apiClient";

const API_BASE_URL = 'https://rapiconinfra.com';

export const CartService = {

  // Get all cart items
  getAllCartItems: async (userId) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/api/cart/items?user_id=${userId}`, {
        method: 'GET',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const result= await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  },

  // add item to cart
  addItemToCart: async (data) => {
    const response = await authorizedFetch(`${API_BASE_URL}/api/cart/addItem`,{
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Design not found');

    return await response.json();
  },

  // Create user
  createVendor: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error('Failed to create user');
    return await response.json();
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error('Failed to update user');
    return await response.json();
  },

  // Delete user
  deleteCartItem: async (id) => {
    const response = await authorizedFetch(`${API_BASE_URL}/api/cart/delete?id=${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Failed to delete user');
    return true;
  }
};