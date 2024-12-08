import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Testimonial from '../common/Testimonial';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Computer Science Student",
      content: "Vincent's tutoring helped me ace my Advanced Physics course. His ability to break down complex concepts is remarkable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Tech Startup Founder",
      content: "The full-stack application Vincent developed for our startup exceeded our expectations. Professional, efficient, and innovative.",
      rating: 5
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Research Scientist",
      content: "Vincent's technical writing skills are exceptional. He helped us document our research findings with clarity and precision.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-emerald-50/50">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-3xl font-bold text-emerald-800 text-center mb-16"
        >
          Client Testimonials
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;