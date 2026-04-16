const API_BASE_URL = 'https://rapiconinfra.com';

export const ProductService = {

  // Get all designs
  getAllDesigns: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/approved`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result= await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get user by ID
  getDesignById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/fetch/${id}`);
    if (!response.ok) throw new Error('Design not found');
    return await response.json();
  },

  /* // Create user
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
  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Failed to delete user');
    return true;
  } */
};