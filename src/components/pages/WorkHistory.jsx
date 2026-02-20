import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Building, Calendar, MapPin, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';

const WorkHistory = () => {
  const containerRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  // Mouse parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const workHistory = [
    {
      id: 1,
      company: "DATA ANNOTATION / TELUS DIGITAL",
      location: "Remote, USA",
      role: "Senior AI Trainer & Software Engineer",
      period: "Jul 2023 – Jan 2026",
      icon: '🤖',
      color: 'from-emerald-400 to-cyan-400',
      responsibilities: [
        "Lead Code Evaluator: Conduct rigorous technical reviews of AI-generated code snippets in Python and TypeScript, identifying logic errors, security vulnerabilities, and inefficiencies.",
        "RLHF Strategy: Rank model responses and author 'Gold Standard' rewrites to train models on best practices, code readability, and modular design.",
        "Model Optimization: Design complex, adversarial prompts to test model reasoning capabilities in edge cases (e.g., race conditions, memory leaks).",
        "Technical Documentation: Provide detailed, pedagogical rationales for every evaluation, teaching the model why specific solutions were superior."
      ]
    },
    {
      id: 2,
      company: "STANDARD CHARTERED BANK",
      location: "UK (Remote)",
      role: "Senior Backend Engineer",
      period: "Dec 2022 – Jun 2023",
      icon: '🏦',
      color: 'from-blue-400 to-purple-400',
      responsibilities: [
        "Regulated Systems: Built secure, high-performance backend services for a global banking platform using Elixir and Python.",
        "API Architecture: Designed versioned, backwards-compatible APIs consumed by millions of users, focusing on data consistency and latency reduction.",
        "Observability: Implemented advanced logging and monitoring to diagnose system bottlenecks in a distributed architecture."
      ]
    },
    {
      id: 3,
      company: "POWER FINANCIAL WELLNESS",
      location: "Nairobi, Kenya",
      role: "Senior Backend Engineer (FinTech)",
      period: "Jul 2021 – Nov 2022",
      icon: '💰',
      color: 'from-orange-400 to-red-400',
      responsibilities: [
        "Scalable Architecture: Led the backend engineering for a high-traffic fintech platform serving thousands of users across East Africa.",
        "Security Integration: Built secure integrations with third-party payment gateways and mobile money providers.",
        "Product Strategy: Translated complex financial product requirements into reliable, bug-free code, aligning technical decisions with business goals."
      ]
    },
    {
      id: 4,
      company: "ALSOUG.COM",
      location: "Khartoum, Sudan",
      role: "Senior Backend Engineer",
      period: "Apr 2020 – Jun 2021",
      icon: '🛒',
      color: 'from-purple-400 to-pink-400',
      responsibilities: [
        "System Modernization: Led the migration from a monolithic legacy system to a modern service-oriented architecture, improving system uptime.",
        "CI/CD Implementation: Established automated testing pipelines to ensure code quality during rapid release cycles."
      ]
    },
    {
      id: 5,
      company: "GLADYS TECHNOLOGIES",
      location: "Nairobi, Kenya",
      role: "Software Engineer",
      period: "Apr 2017 – Mar 2020",
      icon: '💻',
      color: 'from-cyan-400 to-blue-400',
      responsibilities: [
        "API Development: Developed core REST and GraphQL APIs using Elixir and Phoenix that formed the backbone of multiple client applications.",
        "Security: Implemented robust authentication (OAuth/JWT) systems for client applications."
      ]
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section 
      ref={containerRef}
      id="experience" 
      className="py-24 bg-gradient-to-br from-gray-900 via-purple-950/20 to-black relative overflow-hidden min-h-screen"
    >
      {/* Animated Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)]" />

      {/* Floating Particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-30"
        animate={{ scale: [1, 1.3, 1], x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mouse Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${50 + mousePosition.x * 50}% ${50 + mousePosition.y * 50}%, rgba(168, 85, 247, 0.08), transparent 40%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/30 mb-4"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-medium">Career Journey</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-300% animate-gradient-shift mb-4">
            Work History
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg"
          >
            A track record of building exceptional products and leading engineering teams
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-6"
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 md:-translate-x-1/2" />

          {/* Timeline Items */}
          {workHistory.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-8 md:mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className={`absolute top-0 ${
                  index % 2 === 0 ? 'right-0 md:right-auto md:-translate-x-1/2' : 'left-0 md:left-1/2 md:-translate-x-1/2'
                } w-12 h-12 rounded-full bg-gradient-to-br ${job.color} flex items-center justify-center shadow-lg z-10`}
                style={{
                  boxShadow: `0 10px 30px -10px rgba(168, 85, 247, 0.5)`
                }}
              >
                <span className="text-2xl">{job.icon}</span>
              </motion.div>

              {/* Content Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className={`glass-card p-6 md:p-8 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                } relative overflow-hidden group cursor-pointer`}
                onClick={() => toggleExpand(job.id)}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${job.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/30 rounded-2xl transition-colors duration-500" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse md:gap-0' : ''}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      <motion.h3
                        className={`text-xl font-bold bg-gradient-to-r ${job.color} bg-clip-text text-transparent mb-1`}
                      >
                        {job.role}
                      </motion.h3>
                      <p className="text-gray-200 font-semibold flex items-center gap-2 justify-start md:justify-end">
                        <Building className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        {job.company}
                      </p>
                      <div className={`flex items-center gap-4 mt-2 text-sm text-gray-400 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-purple-400" />
                          {job.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expand Indicator */}
                  <motion.div
                    className={`flex items-center gap-2 text-purple-400 text-sm mb-4 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <span>{expandedId === job.id ? 'Show Less' : 'View Details'}</span>
                    <motion.div
                      animate={{ rotate: expandedId === job.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.div>

                  {/* Responsibilities */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedId === job.id ? 'auto' : 0,
                      opacity: expandedId === job.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className={`space-y-3 text-gray-400 ${index % 2 === 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                      {job.responsibilities.map((resp, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          animate={expandedId === job.id ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3 group/li"
                        >
                          {index % 2 !== 0 && (
                            <motion.span
                              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex-shrink-0 mt-2"
                              whileHover={{ scale: 1.5 }}
                            />
                          )}
                          <span className="flex-1">{resp}</span>
                          {index % 2 === 0 && (
                            <motion.span
                              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex-shrink-0 mt-2"
                              whileHover={{ scale: 1.5 }}
                            />
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Corner decoration */}
                  <motion.div
                    className={`absolute -bottom-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-3xl blur-3xl" />
          
          <div className="relative glass-card p-8 rounded-3xl border border-purple-500/20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="text-6xl mb-4"
            >
              🚀
            </motion.div>
            <h3 className="text-2xl font-bold text-purple-400 mb-2">Ready to Build Something Amazing?</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Let's collaborate and bring your vision to life with cutting-edge technology and expertise
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkHistory;
