import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAuth } from '../../context/AuthContext';
import Testimonial from '../common/Testimonial';
import { useTestimonialsCRUD } from '../../hooks/useTestimonialsCRUD';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Sliding carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

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

  // Slide variants for entering/exiting
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8
    })
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 overflow-hidden">
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
        ) : testimonials.length > 0 ? (
          <div className="relative max-w-5xl mx-auto">
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-emerald-600/80 text-white hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 backdrop-blur-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={handleNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-emerald-600/80 text-white hover:bg-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 backdrop-blur-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>

            {/* Sliding Testimonials Container */}
            <div className="overflow-hidden px-12">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 }
                  }}
                  className="flex justify-center"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="w-full max-w-2xl">
                    <Testimonial
                      name={testimonials[currentIndex].name}
                      role={testimonials[currentIndex].role}
                      content={testimonials[currentIndex].content}
                      rating={testimonials[currentIndex].rating}
                      onDelete={isAdmin ? () => deleteTestimonial(testimonials[currentIndex].id) : undefined}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-3 bg-emerald-500'
                      : 'w-3 h-3 bg-emerald-500/30 hover:bg-emerald-500/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Progress Bar */}
            {!isPaused && (
              <div className="mt-6 h-1 bg-emerald-500/20 rounded-full overflow-hidden max-w-md mx-auto">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                  key={currentIndex}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-emerald-700 dark:text-emerald-300">No testimonials yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
