// hooks/useTestimonialsCRUD.js
import { useState, useEffect } from 'react';
import apiService from '../services/apiService';

// Static testimonials data for production
const STATIC_TESTIMONIALS = [
  {
    id: 1,
    name: "Amina Diallo",
    role: "Software Engineering Lead",
    content: "Hamman's expertise in AI and full-stack development transformed our product. His ability to implement complex RLHF systems is remarkable.",
    rating: 5
  },
  {
    id: 2,
    name: "Kofi Asante",
    role: "AI Startup Founder",
    content: "The LLM training platform Hamman developed for our startup exceeded our expectations. Professional, efficient, and innovative.",
    rating: 5
  },
  {
    id: 3,
    name: "Fatima Okafor",
    role: "Data Science Manager",
    content: "Hamman's technical skills in machine learning are exceptional. He helped us build robust models with outstanding performance.",
    rating: 5
  }
];

export const useTestimonialsCRUD = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Read all testimonials
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      // Try to fetch from API, fallback to static data
      let data;
      try {
        data = await apiService.getAll('testimonials');
      } catch (apiError) {
        console.log('API unavailable, using static testimonials');
        data = STATIC_TESTIMONIALS;
      }
      setTestimonials(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      // Fallback to static data
      setTestimonials(STATIC_TESTIMONIALS);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  // Create a new testimonial
  const createTestimonial = async (testimonialData) => {
    try {
      const newTestimonial = await apiService.create('testimonials', {
        ...testimonialData,
        id: Date.now()
      });
      setTestimonials(prev => [...prev, newTestimonial]);
      return newTestimonial;
    } catch (err) {
      console.error('Error creating testimonial:', err);
      alert('Note: Testimonial creation requires JSON Server. In production, changes are local only.');
      // Add locally only
      const newTestimonial = { ...testimonialData, id: Date.now() };
      setTestimonials(prev => [...prev, newTestimonial]);
      return newTestimonial;
    }
  };

  // Update a testimonial
  const updateTestimonial = async (id, testimonialData) => {
    try {
      const updatedTestimonial = await apiService.update('testimonials', id, testimonialData);
      setTestimonials(prev => prev.map(t => t.id === id ? updatedTestimonial : t));
      return updatedTestimonial;
    } catch (err) {
      console.error('Error updating testimonial:', err);
      alert('Note: Testimonial updates require JSON Server. In production, changes are local only.');
      // Update locally only
      const updatedTestimonial = { ...testimonialData, id };
      setTestimonials(prev => prev.map(t => t.id === id ? updatedTestimonial : t));
      return updatedTestimonial;
    }
  };

  // Delete a testimonial
  const deleteTestimonial = async (id) => {
    try {
      await apiService.delete('testimonials', id);
      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting testimonial:', err);
      alert('Note: Testimonial deletion requires JSON Server. In production, changes are local only.');
      // Delete locally only
      setTestimonials(prev => prev.filter(t => t.id !== id));
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