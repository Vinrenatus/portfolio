import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What technologies do you specialize in for full-stack development?",
      answer: "I specialize in modern web technologies including React, Node.js, Express, MongoDB, PostgreSQL, and cloud platforms like AWS and Azure. I also have extensive experience with AI/ML frameworks and LLM development."
    },
    {
      question: "What AI and ML services do you offer?",
      answer: "I provide Large Language Model (LLM) training, Reinforcement Learning from Human Feedback (RLHF), Supervised Fine-Tuning (SFT), and custom AI solution development. I also offer model evaluation and optimization services."
    },
    {
      question: "What types of projects do you develop?",
      answer: "I develop full-stack web applications, AI/ML platforms, e-commerce solutions, and custom business systems. I also provide technical consulting and system architecture design."
    },
    {
      question: "How do you handle project deadlines?",
      answer: "I maintain strict adherence to deadlines through careful planning, regular updates, and efficient time management. I ensure transparent communication throughout the project lifecycle."
    },
    {
      question: "What is your approach to AI model development?",
      answer: "I follow a comprehensive approach including data preparation, model selection, training, evaluation, and deployment. I specialize in RLHF and SFT techniques for optimizing LLM performance."
    },
    {
      question: "Do you offer remote services?",
      answer: "Yes, I offer remote services for all my work including development, AI/ML consulting, and technical mentoring. I use various collaboration tools to ensure effective communication."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-tech-circuit opacity-10"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 mb-4"
            >
              <HelpCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400">Find answers to common questions about my services</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-xl border border-emerald-500/20 overflow-hidden hover:border-emerald-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-white/5 transition-colors duration-200"
                >
                  <span className="text-lg font-medium text-gray-200 pr-4">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-emerald-400" />
                    )}
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-400 border-t border-emerald-500/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;