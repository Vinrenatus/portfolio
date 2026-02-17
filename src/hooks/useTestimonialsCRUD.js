// hooks/useTestimonialsCRUD.js
import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

export const useTestimonialsCRUD = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read all testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAll('testimonials');
      setTestimonials(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new testimonial
  const createTestimonial = async (testimonialData) => {
    try {
      const newTestimonial = await apiService.create('testimonials', {
        ...testimonialData,
        id: Date.now() // Simple ID generation
      });
      setTestimonials(prev => [...prev, newTestimonial]);
      return newTestimonial;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update a testimonial
  const updateTestimonial = async (id, testimonialData) => {
    try {
      const updatedTestimonial = await apiService.update('testimonials', id, testimonialData);
      setTestimonials(prev => prev.map(t => t.id === id ? updatedTestimonial : t));
      return updatedTestimonial;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete a testimonial
  const deleteTestimonial = async (id) => {
    try {
      await apiService.delete('testimonials', id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    error,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
  };
};