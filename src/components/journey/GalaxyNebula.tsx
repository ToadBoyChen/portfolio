import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface GalaxyNebulaProps {
  name: string;
  icon: ReactNode;
  onSelect: () => void;
  layoutId: string;
}

export const GalaxyNebula: FC<GalaxyNebulaProps> = ({ name, icon, onSelect, layoutId }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onSelect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full cursor-pointer"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow ring */}
      <motion.div 
        className="absolute inset-[-20%] rounded-full"
        animate={{
          boxShadow: isHovered 
            ? '0 0 80px 20px rgba(168, 85, 247, 0.4), 0 0 120px 40px rgba(168, 85, 247, 0.2)'
            : '0 0 60px 10px rgba(168, 85, 247, 0.3), 0 0 100px 20px rgba(168, 85, 247, 0.1)'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Primary nebula layer */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-600/40 via-pink-600/40 to-blue-600/40 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full" />
      </motion.div>
      
      {/* Secondary nebula layer */}
      <motion.div 
        className="absolute inset-[10%] bg-gradient-to-tl from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-md"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner core glow */}
      <motion.div 
        className="absolute inset-[25%] bg-gradient-to-br from-white/40 via-purple-400/40 to-pink-400/40 rounded-full blur-lg"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Particle effects */}
      {isHovered && [...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ 
            x: 0, 
            y: 0, 
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: Math.cos(i * Math.PI / 3) * 100,
            y: Math.sin(i * Math.PI / 3) * 100,
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
      
      {/* Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center"
        animate={{
          y: isHovered ? -5 : 0
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="text-3xl md:text-4xl mb-2"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? [0, -5, 5, -5, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        <h4 className="font-bold text-sm md:text-base bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent px-2">
          {name}
        </h4>
      </motion.div>
      
      {/* Hover indicator ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-purple-400/0"
        animate={{
          borderColor: isHovered ? 'rgba(168, 85, 247, 0.6)' : 'rgba(168, 85, 247, 0)',
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};