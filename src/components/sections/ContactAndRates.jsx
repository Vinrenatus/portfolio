import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Clock, DollarSign, Send, MessageSquare } from 'lucide-react';
import apiService from '../../services/apiService';
import { SERVICES_DATA } from '../../data/projects';
import { PERSONAL_INFO } from '../../constants/config';

const ContactAndRates = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    priceRange: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Save message to JSON server
      await apiService.create('messages', {
        ...formData,
        createdAt: new Date().toISOString()
      });
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', service: '', priceRange: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error saving message:', error);
      alert('Error sending message. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-center mb-16"
        >
          Contact & Services
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 card-hover"
          >
            <h3 className="text-2xl font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <Send className="w-6 h-6" />
              Get in Touch
            </h3>
            <div className="space-y-6">
              <motion.div 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-gray-200 hover:text-emerald-400 transition-colors duration-300">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gray-200 hover:text-emerald-400 transition-colors duration-300">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-4 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Availability</p>
                  <span className="text-gray-200">Available 9 AM - 5 PM EST</span>
                </div>
              </motion.div>
            </div>

            {/* Services Offered */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-emerald-400 mb-4">Services Offered</h4>
              <div className="space-y-3">
                {SERVICES_DATA.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-emerald-500/20"
                  >
                    <h5 className="text-gray-200 font-medium">{service.title}</h5>
                    <p className="text-sm text-gray-400 mt-1">{service.details[0]}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form with Price Range */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-emerald-400 mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Service Interested In</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                >
                  <option value="">Select a service</option>
                  {SERVICES_DATA.map((service, index) => (
                    <option key={index} value={service.title}>{service.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Budget Range</label>
                <select
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                >
                  <option value="">Select your budget range</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000+">$10,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-white/5 border border-emerald-500/20 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                disabled={submitted}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  submitted
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-emerald-500/25'
                }`}
              >
                {submitted ? (
                  <>
                    <span>✓</span> Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" /> Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactAndRates;