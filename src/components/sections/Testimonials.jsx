import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../../context/AuthContext';
import Testimonial from '../common/Testimonial';
import { useTestimonialsCRUD } from '../../hooks/useTestimonialsCRUD';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { isAdmin } = useAuth();
  const { testimonials, loading, error, createTestimonial, updateTestimonial, deleteTestimonial } = useTestimonialsCRUD();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTestimonial(formData);
      setFormData({ name: '', role: '', content: '', rating: 5 });
      setShowForm(false);
    } catch (err) {
      console.error('Error creating testimonial:', err);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/30 to-teal-50/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="text-4xl font-bold text-emerald-800"
          >
            Client Testimonials
          </motion.h2>
          
          {isAdmin && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {showForm ? 'Cancel' : 'Add Testimonial'}
            </button>
          )}
        </div>

        {isAdmin && error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        {isAdmin && showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold text-emerald-700 dark:text-emerald-300 mb-4">Add New Testimonial</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-emerald-700 dark:text-emerald-300 mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full p-2 border border-emerald-200 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-emerald-900 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Add Testimonial
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
            <p className="mt-2 text-emerald-700 dark:text-emerald-300">Loading testimonials...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
                onDelete={isAdmin ? () => deleteTestimonial(testimonial.id) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;