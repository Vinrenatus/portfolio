import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from './supabaseConfig';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for CRUD operations
export const db = {
  // Generic getAll
  getAll: async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Get by ID
  getById: async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Create
  create: async (table, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  // Update
  update: async (table, id, data) => {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result;
  },

  // Delete
  delete: async (table, id) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }
};