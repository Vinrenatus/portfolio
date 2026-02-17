// api/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Generic CRUD methods
const apiService = {
  // Read all
  getAll: async (resource) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${resource}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);
      throw error;
    }
  },

  // Read one
  getById: async (resource, id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${resource}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${resource} with id ${id}:`, error);
      throw error;
    }
  },

  // Create
  create: async (resource, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${resource}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${resource}:`, error);
      throw error;
    }
  },

  // Update
  update: async (resource, id, data) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${resource}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${resource} with id ${id}:`, error);
      throw error;
    }
  },

  // Delete
  delete: async (resource, id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${resource}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting ${resource} with id ${id}:`, error);
      throw error;
    }
  }
};

export default apiService;