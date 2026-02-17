import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Book, Code } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden min-h-screen">
      {/* Background effects */}
      <div className="absolute inset-0 bg-tech-dots opacity-20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
            About Me
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Senior Software Engineer and AI Training Specialist with a Ph.D. in Software Engineering and over 8 years of experience building scalable systems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8 border border-emerald-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-400">Professional Summary</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Expert in Reinforcement Learning from Human Feedback (RLHF) and Supervised Fine-Tuning (SFT) for Large Language Models (LLMs). 
              Combines deep technical proficiency in Python, Elixir, and TypeScript with the linguistic precision required for high-quality 
              data annotation. Native Swahili speaker with extensive experience in technical localization and cross-cultural AI model evaluation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8 border border-emerald-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-400">Core Competencies</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Technical Leadership and mentoring
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Technical Writing for RLHF and model training
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Cross-Functional Collaboration
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Remote Work Proficiency (5+ years)
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-dark rounded-2xl p-8 border border-emerald-500/20 mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-400">Education & Certifications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-emerald-500/20">
                <h4 className="text-lg font-semibold text-emerald-400">PhD in Software Engineering</h4>
                <p className="text-gray-400">California State University, USA | 2019 – 2022</p>
                <p className="text-gray-500 text-sm mt-2">Focus: Scalable Software Architectures, Distributed Systems, and Performance Modeling</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-emerald-500/20">
                <h4 className="text-lg font-semibold text-emerald-400">MSc in Software Engineering</h4>
                <p className="text-gray-400">Lincoln University, UK | 2015 – 2017 | Merit</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-emerald-500/20">
                <h4 className="text-lg font-semibold text-emerald-400">Software Engineering Bootcamp</h4>
                <p className="text-gray-400">Moringa School, Kenya | Professional Certification</p>
                <p className="text-gray-500 text-sm mt-2">1,000+ hours of coding practice in Python, Flask/Django, and React.js</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-emerald-500/20">
                <h4 className="text-lg font-semibold text-emerald-400">BSc in Applied Computer Science</h4>
                <p className="text-gray-400">University of Nairobi, Kenya | 2010 – 2014</p>
                <p className="text-gray-500 text-sm">Second Class Honours (Upper Division)</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;