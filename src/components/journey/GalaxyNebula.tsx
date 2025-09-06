import type { FC, ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

interface GalaxyNebulaProps {
  name: string;
  icon: ReactNode;
  onSelect: () => void;
  layoutId: string;
  style?: CSSProperties;
}

// --- CHANGE 1: We're making stars bigger, brighter, and more numerous on a smaller canvas for density ---
const createStarfield = (count: number, width: number, height: number) => {
  let boxShadow = '';
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    // 30% of stars are now bigger
    const size = Math.random() > 0.7 ? '2.5px' : '1.5px'; 
    // Stars are now more opaque (0.7 to 1.0 opacity)
    const alpha = 0.7 + Math.random() * 0.3; 
    boxShadow += `${x}px ${y}px 0px ${size} rgba(255, 255, 255, ${alpha})${i < count - 1 ? ',' : ''}`;
  }
  return boxShadow;
};

export const GalaxyNebula: FC<GalaxyNebulaProps> = ({ name, icon, onSelect, layoutId, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Memoize a denser starfield on a more reasonably sized canvas
  const starfieldShadow = useMemo(() => createStarfield(120, 250, 250), []);

  return (
    <motion.div
      layoutId={layoutId}
      style={style}
      onClick={onSelect}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-center w-40 h-40 cursor-pointer"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        transition: { 
          type: 'spring', 
          stiffness: 200, 
          damping: 20, 
          delay: 0.1 
        } 
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* --- LAYER 1: Outer Glow --- */}
      <motion.div 
        className="absolute inset-[-30%] rounded-full opacity-60 z-0"
        animate={{
          boxShadow: isHovered 
            ? '0 0 90px 25px rgba(168, 85, 247, 0.4), 0 0 130px 45px rgba(236, 72, 153, 0.2)'
            : '0 0 70px 15px rgba(168, 85, 247, 0.3), 0 0 110px 30px rgba(236, 72, 153, 0.1)',
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      
      {/* --- LAYER 2: Main Gas Clouds (now behind the stars) --- */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_20%_80%,_rgba(236,72,153,0.4)_0%,_transparent_50%)] z-10"
        animate={{ rotate: 360, scale: [1, 1.02, 1] }}
        transition={{ 
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }
        }}
      />
      <motion.div 
        className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_70%_10%,_rgba(14,165,233,0.4)_0%,_transparent_50%)] mix-blend-lighten z-10"
        animate={{ rotate: -360, scale: [1, 1.03, 1] }}
        transition={{ 
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          scale: { duration: 10, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }
        }}
      />
      
      {/* --- CHANGE 2: Embedded Starfield (Moved up in the visual stack with z-20) --- */}
      <motion.div
        className="absolute inset-0 rounded-full overflow-hidden z-20"
        animate={{ rotate: 180 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <div 
          className="absolute top-[-60%] left-[-60%] w-[220%] h-[220%]" // Made slightly larger
          style={{ boxShadow: starfieldShadow }} 
        />
      </motion.div>
      
      {/* --- LAYER 4: Inner Core Glow --- */}
      <motion.div 
        className="absolute inset-[25%] rounded-full bg-gradient-to-br from-white/60 via-purple-300/60 to-pink-300/60 blur-xl z-30"
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: isHovered ? [0.8, 1, 0.8] : [0.6, 0.8, 0.6]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* --- LAYER 5: Content (Highest z-index) --- */}
      <motion.div 
        className="relative z-40 flex flex-col items-center text-center"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="text-4xl mb-2 text-white/90"
          style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'}}
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? [0, -5, 5, -5, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        <h4 className="font-bold text-base bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent px-2 drop-shadow-lg">
          {name}
        </h4>
      </motion.div>
    </motion.div>
  );
};