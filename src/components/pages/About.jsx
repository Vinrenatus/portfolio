import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { User, Award, Book, Code, Sparkles, Zap, Target, Globe, Heart, Star } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const About = () => {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useSpring(mousePosition.x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(mousePosition.y, { stiffness: 500, damping: 100 });

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

  // Floating particles
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  const stats = [
    { icon: '🎓', label: 'PhD Holders', value: 'Top 1.2%', color: 'from-emerald-400 to-cyan-400' },
    { icon: '💼', label: 'Experience', value: '8+ Years', color: 'from-blue-400 to-purple-400' },
    { icon: '🌍', label: 'Countries', value: '4+', color: 'from-orange-400 to-red-400' },
    { icon: '🚀', label: 'Projects', value: '50+', color: 'from-purple-400 to-pink-400' },
  ];

  const competencies = [
    { icon: Target, title: 'Technical Leadership & Mentorship', desc: 'Leading teams to build exceptional products', color: 'from-emerald-400 to-cyan-400' },
    { icon: Book, title: 'IT Systems Administration & Technical Support', desc: 'Managing systems and providing technical expertise', color: 'from-blue-400 to-purple-400' },
    { icon: Globe, title: 'AI Model Evaluation & Data Analysis', desc: 'Expert evaluation of AI models and data insights', color: 'from-orange-400 to-red-400' },
    { icon: Zap, title: 'Process Automation & Cloud Computing', desc: 'Automating workflows and cloud infrastructure', color: 'from-purple-400 to-pink-400' },
  ];

  const education = [
    {
      icon: '🎓',
      degree: 'PhD in Software Engineering',
      school: 'California State University',
      location: 'USA',
      period: '2019 – 2022',
      focus: 'Scalable Software Architectures, Distributed Systems, and Performance Modeling',
      color: 'from-emerald-400 to-cyan-400'
    },
    {
      icon: '🎓',
      degree: 'MSc in Software Engineering',
      school: 'Lincoln University',
      location: 'UK',
      period: '2015 – 2017',
      focus: 'Merit',
      color: 'from-blue-400 to-purple-400'
    },
    {
      icon: '📚',
      degree: 'BSc in Applied Computer Science',
      school: 'University of Nairobi',
      location: 'Kenya',
      period: '2010 – 2014',
      focus: 'Second Class Honours (Upper Division)',
      color: 'from-orange-400 to-red-400'
    },
    {
      icon: '📜',
      degree: 'Software Engineering Bootcamp (Full-Stack)',
      school: 'Moringa School',
      location: 'Kenya',
      period: '2022',
      focus: '1,000+ hours of coding practice in Python, Flask/Django, and React.js',
      color: 'from-purple-400 to-pink-400'
    },
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className={`py-24 relative overflow-hidden min-h-screen transition-colors duration-500 ${
        theme === 'light' 
          ? 'bg-gradient-to-br from-gray-50 via-emerald-50/30 to-white' 
          : 'bg-gradient-to-br from-gray-900 via-emerald-950/20 to-black'
      }`}
    >
      {/* Animated Grid Background */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px] ${
        theme === 'light' ? 'opacity-50' : 'opacity-100'
      }`} />
      
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_70%)]" />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-emerald-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Gradient Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-30"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mouse Follow Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(500px circle at ${50 + mouseX.get() * 50}% ${50 + mouseY.get() * 50}%, rgba(16, 185, 129, 0.08), transparent 40%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full border border-emerald-500/30 mb-4"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Get to Know Me</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-300% animate-gradient-shift mb-4">
            About Me
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 max-w-3xl mx-auto text-lg"
          >
            Senior Software Engineer and AI Training Specialist with a Ph.D. in Software Engineering and over 8 years of experience building scalable systems.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full mx-auto mt-6"
          />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 glass-card rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all duration-500 text-center">
                  <motion.div 
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div 
                    className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Summary & Competencies */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 relative overflow-hidden group"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/30 rounded-2xl transition-colors duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                >
                  <User className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-emerald-400">Professional Summary</h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed text-lg">
                Senior Software Engineer and AI Training Specialist with a Ph.D. in Software Engineering and over 8 years of experience building scalable systems and training advanced AI models. Expert in <span className="text-emerald-400 font-semibold">Reinforcement Learning from Human Feedback (RLHF)</span>, <span className="text-cyan-400 font-semibold">Supervised Fine-Tuning (SFT)</span>, and Expert-Level Data Annotation for Large Language Models (LLMs). Combines deep technical proficiency in Python, Elixir, and TypeScript with the linguistic precision required for high-quality data annotation, chain-of-thought reasoning, and model evaluation.
              </p>

              {/* Decorative corner */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Core Competencies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-2xl transition-colors duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/30"
                >
                  <Award className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-blue-400">Core Competencies</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {competencies.map((comp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-3 group/comp"
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${comp.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <comp.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="text-gray-200 font-semibold group-hover/comp:text-emerald-400 transition-colors">{comp.title}</h4>
                      <p className="text-gray-400 text-sm">{comp.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
            >
              <Book className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-emerald-400">Education & Certifications</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card p-6 relative overflow-hidden group"
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/30 rounded-2xl transition-colors duration-500" />

                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <motion.span
                      className="text-4xl flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {edu.icon}
                    </motion.span>
                    <div className="flex-1">
                      <h4 className={`text-lg font-bold bg-gradient-to-r ${edu.color} bg-clip-text text-transparent mb-1`}>
                        {edu.degree}
                      </h4>
                      <p className="text-gray-300 font-medium">{edu.school} {edu.location && `(${edu.location})`}</p>
                      <p className="text-gray-500 text-sm">{edu.period}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{edu.focus}</p>

                  {/* Progress indicator */}
                  <motion.div
                    className="mt-4 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                  />
                </div>

                {/* Corner glow */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Touch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-emerald-500/5 rounded-3xl blur-3xl" />
          
          <div className="relative glass-card p-8 rounded-3xl border border-emerald-500/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-4"
              >
                <motion.div
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  💡
                </motion.div>
                <h4 className="text-emerald-400 font-semibold mb-2">Innovation First</h4>
                <p className="text-gray-400 text-sm">Always exploring cutting-edge technologies and methodologies</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-4 border-l border-emerald-500/20"
              >
                <motion.div
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  🤝
                </motion.div>
                <h4 className="text-cyan-400 font-semibold mb-2">Collaborative Spirit</h4>
                <p className="text-gray-400 text-sm">Believe in the power of teamwork and knowledge sharing</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-4 border-l border-emerald-500/20"
              >
                <motion.div
                  className="text-5xl mb-3"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  🎯
                </motion.div>
                <h4 className="text-purple-400 font-semibold mb-2">Results Driven</h4>
                <p className="text-gray-400 text-sm">Focused on delivering measurable impact and value</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
