import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  Terminal, 
  GitBranch, 
  Cloud,
  Zap,
  Shield,
  Layers,
  Box
} from 'lucide-react';

const PyramidAnimation = () => {
  // Coding icons and emojis to display around the pyramid
  const codingIcons = [
    { icon: Code, emoji: '💻', delay: 0, orbit: 'inner' },
    { icon: Cpu, emoji: '🤖', delay: 0.5, orbit: 'inner' },
    { icon: Database, emoji: '🗄️', delay: 1, orbit: 'inner' },
    { icon: Globe, emoji: '🌐', delay: 1.5, orbit: 'inner' },
    { icon: Server, emoji: '🖥️', delay: 2, orbit: 'inner' },
    { icon: Terminal, emoji: '⌨️', delay: 2.5, orbit: 'inner' },
    { icon: GitBranch, emoji: '🔀', delay: 0.3, orbit: 'outer' },
    { icon: Cloud, emoji: '☁️', delay: 0.8, orbit: 'outer' },
    { icon: Zap, emoji: '⚡', delay: 1.3, orbit: 'outer' },
    { icon: Shield, emoji: '🔒', delay: 1.8, orbit: 'outer' },
    { icon: Layers, emoji: '📚', delay: 2.3, orbit: 'outer' },
    { icon: Box, emoji: '📦', delay: 2.8, orbit: 'outer' },
  ];

  // Emojis to float around
  const floatingEmojis = ['🚀', '✨', '💡', '🎯', '🏆', '🌟', '🔥', '⚛️'];

  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Outer rotating circle */}
      <motion.div
        className="absolute w-72 h-72 border-2 border-emerald-500/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer orbit icons */}
        {codingIcons.filter(item => item.orbit === 'outer').map((item, index) => {
          const angle = (index * 30) * (Math.PI / 180);
          const x = Math.cos(angle) * 130;
          const y = Math.sin(angle) * 130;
          
          return (
            <motion.div
              key={`outer-${index}`}
              className="absolute w-12 h-12 flex items-center justify-center text-2xl"
              style={{
                left: `calc(50% + ${x}px - 24px)`,
                top: `calc(50% + ${y}px - 24px)`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <item.icon className="w-8 h-8 text-cyan-400/80" strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Middle rotating circle (opposite direction) */}
      <motion.div
        className="absolute w-56 h-56 border-2 border-cyan-500/40 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {/* Inner orbit icons */}
        {codingIcons.filter(item => item.orbit === 'inner').map((item, index) => {
          const angle = (index * 60) * (Math.PI / 180);
          const x = Math.cos(angle) * 100;
          const y = Math.sin(angle) * 100;
          
          return (
            <motion.div
              key={`inner-${index}`}
              className="absolute w-10 h-10 flex items-center justify-center text-xl"
              style={{
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -15, 15, 0],
              }}
              transition={{
                duration: 2.5,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-2xl">{item.emoji}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Inner glowing circle */}
      <motion.div
        className="absolute w-40 h-40 border-2 border-purple-500/50 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Pyramid container */}
      <motion.div
        className="relative z-10"
        animate={{
          y: [0, -15, 0],
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Pyramid shape using CSS */}
        <div className="relative w-24 h-24">
          {/* Front face */}
          <motion.div
            className="absolute inset-0"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
            }}
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Pyramid glow effect */}
          <div
            className="absolute inset-0 blur-xl"
            style={{
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
              transform: 'scale(1.1)',
            }}
          />

          {/* Pyramid emoji in center */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-4xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🔺
          </motion.div>
        </div>
      </motion.div>

      {/* Floating emojis around the pyramid */}
      {floatingEmojis.map((emoji, index) => {
        const angle = (index * 45) * (Math.PI / 180);
        const radius = 160;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`emoji-${index}`}
            className="absolute text-2xl"
            style={{
              left: `calc(50% + ${x}px - 12px)`,
              top: `calc(50% + ${y}px - 12px)`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              delay: index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>{emoji}</span>
          </motion.div>
        );
      })}

      {/* Additional decorative rings */}
      <motion.div
        className="absolute w-64 h-64 border border-emerald-500/20 rounded-full"
        animate={{
          rotate: -360,
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <motion.div
        className="absolute w-48 h-48 border border-cyan-500/20 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 0.95, 1],
        }}
        transition={{
          rotate: { duration: 18, repeat: Infinity, ease: "linear" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Center glow */}
      <div className="absolute w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
    </div>
  );
};

export default PyramidAnimation;
