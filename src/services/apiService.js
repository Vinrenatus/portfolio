import { db } from '../lib/supabaseClient';

// API Service using Supabase
const apiService = {
  // Read all
  getAll: async (resource) => {
    try {
      return await db.getAll(resource);
    } catch (error) {
      console.error(`Error fetching ${resource}:`, error);
      throw error;
    }
  },

  // Read one
  getById: async (resource, id) => {
    try {
      return await db.getById(resource, id);
    } catch (error) {
      console.error(`Error fetching ${resource} with id ${id}:`, error);
      throw error;
    }
  },

  // Create
  create: async (resource, data) => {
    try {
      return await db.create(resource, data);
    } catch (error) {
      console.error(`Error creating ${resource}:`, error);
      throw error;
    }
  },

  // Update
  update: async (resource, id, data) => {
    try {
      return await db.update(resource, id, data);
    } catch (error) {
      console.error(`Error updating ${resource} with id ${id}:`, error);
      throw error;
    }
  },

  // Delete
  delete: async (resource, id) => {
    try {
      return await db.delete(resource, id);
    } catch (error) {
      console.error(`Error deleting ${resource} with id ${id}:`, error);
      throw error;
    }
  }
};

export default apiService;