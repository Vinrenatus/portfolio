import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import SocialLink from '../common/SocialLink';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-10"
        >
          <source src="https://player.vimeo.com/external/492834557.hd.mp4?s=fc33653a8b36f0f4e9f8c4147a55793d0171e1c2&profile_id=175" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/90 via-sage-50/90 to-green-50/90" />
      </div>
      
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="relative z-10 container mx-auto px-4 pt-32 pb-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent animate-gradient">
              Vincent Irungu
            </span>
          </h1>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden ring-4 ring-emerald-500/30 shadow-xl"
          >
            <img
              src="https://photos.app.goo.gl/kEcH31CxGkw3YTuZ6"
              alt="Vincent Irungu"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
            Full Stack Developer | Academic Tutor | Professional Writer
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-emerald-800 max-w-3xl mx-auto mb-8">
            Transforming ideas into elegant solutions through code, knowledge, and words.
          </motion.p>

          <motion.div variants={itemVariants} className="flex justify-center space-x-6">
            <SocialLink 
              href="https://github.com/yourusername" 
              icon={<Github className="w-6 h-6" />}
              label="GitHub"
              className="text-emerald-600 hover:text-emerald-700"
            />
            <SocialLink 
              href="https://linkedin.com/in/yourusername" 
              icon={<Linkedin className="w-6 h-6" />}
              label="LinkedIn"
              className="text-emerald-600 hover:text-emerald-700"
            />
            <SocialLink 
              href="mailto:vrugundu001@gmail.com" 
              icon={<Mail className="w-6 h-6" />}
              label="Email"
              className="text-emerald-600 hover:text-emerald-700"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;