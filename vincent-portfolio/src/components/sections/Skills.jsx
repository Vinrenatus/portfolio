import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillCard from '../common/SkillCard';
import { Code, BookOpen, Pen, Brain, Database, Globe } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      name: "Full Stack Development",
      description: "Building scalable web applications with modern technologies",
      level: 95
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      name: "Academic Tutoring",
      description: "Mathematics, Physics, and Chemistry expertise",
      level: 90
    },
    {
      icon: <Pen className="w-8 h-8" />,
      name: "Technical Writing",
      description: "Documentation, research papers, and content creation",
      level: 85
    },
    {
      icon: <Database className="w-8 h-8" />,
      name: "Database Design",
      description: "Efficient and scalable database architectures",
      level: 90
    },
    {
      icon: <Brain className="w-8 h-8" />,
      name: "System Architecture",
      description: "Designing robust and scalable systems",
      level: 88
    },
    {
      icon: <Globe className="w-8 h-8" />,
      name: "Web Technologies",
      description: "Modern web development and best practices",
      level: 92
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
          Skills & Expertise
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;