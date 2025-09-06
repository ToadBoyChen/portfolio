// src/components/journey/GalaxyNebula.tsx
import type { FC, ReactNode, CSSProperties } from 'react';
import { memo, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';

// --- Configuration Constants (for easy theming and tweaking) ---
const NEBULA_CONFIG = {
  colors: {
    primary: "rgba(168, 85, 247, 0.5)",  // Purple
    secondary: "rgba(236, 72, 153, 0.4)", // Pink
    tertiary: "rgba(14, 165, 233, 0.4)",  // Blue
  },
  starCount: 150,
};

// --- Framer Motion Variants (for performance and clean JSX) ---
const nebulaVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.1 } 
  },
  exit: { scale: 0.8, opacity: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } },
  hover: { scale: 1.1, transition: { type: 'spring', stiffness: 300, damping: 15 } },
  tap: { scale: 0.95 },
};

const iconVariants: Variants = {
  hover: {
    scale: 1.2,
    rotate: [0, -5, 5, -5, 0],
    transition: { duration: 0.4 }
  }
};

// --- Child Components (Memoized for peak performance) ---

const GasClouds: FC = memo(() => (
  <>
    {/* SVG filter definition for organic texture */}
    <svg className="absolute w-0 h-0">
      <defs>
        <filter id="nebula-texture">
          <feTurbulence baseFrequency="0.02 0.05" numOctaves="2" seed="2" type="fractalNoise" />
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
      </defs>
    </svg>
    {/* The actual cloud layers */}
    <motion.div
      className="absolute inset-0 rounded-full mix-blend-screen"
      style={{ 
        background: `radial-gradient(circle at 20% 80%, ${NEBULA_CONFIG.colors.secondary} 0%, transparent 40%)`,
        filter: 'url(#nebula-texture)',
      }}
      animate={{ rotate: 360, scale: [1, 1.05, 1] }}
      transition={{ rotate: { duration: 50, repeat: Infinity, ease: 'linear' }, scale: { duration: 12, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}}
    />
    <motion.div
      className="absolute inset-0 rounded-full mix-blend-plus-lighter"
      style={{ 
        background: `radial-gradient(circle at 70% 10%, ${NEBULA_CONFIG.colors.tertiary} 0%, transparent 40%)`,
        filter: 'url(#nebula-texture)',
      }}
      animate={{ rotate: -360, scale: [1, 1.08, 1] }}
      transition={{ rotate: { duration: 60, repeat: Infinity, ease: 'linear' }, scale: { duration: 15, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}}
    />
  </>
));
GasClouds.displayName = 'GasClouds';

const Starfield: FC = memo(() => {
  const createLayer = (count: number, size: string) => 
    useMemo(() => [...Array(count)].map(() => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${(Math.random() * 0.5 + 0.5) * parseFloat(size)}px`,
      opacity: Math.random() * 0.5 + 0.5,
    })), [count, size]);

  const layers = [
    { stars: createLayer(50, '1px'), duration: 80 }, // Distant, slow
    { stars: createLayer(40, '1.5px'), duration: 60 }, // Mid-ground
    { stars: createLayer(20, '2px'), duration: 40 }, // Close, fast
  ];

  return (
    <>
      {layers.map(({ stars, duration }, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
        >
          {stars.map((star, j) => (
            <div
              key={j}
              className="absolute rounded-full bg-white"
              style={{
                left: star.x,
                top: star.y,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              }}
            />
          ))}
        </motion.div>
      ))}
    </>
  );
});
Starfield.displayName = 'Starfield';

// --- Main GalaxyNebula Component ---

interface GalaxyNebulaProps {
  name: string;
  icon: ReactNode;
  onSelect: () => void;
  layoutId: string;
  style?: CSSProperties;
}

export const GalaxyNebula: FC<GalaxyNebulaProps> = ({ name, icon, onSelect, layoutId, style }) => {
  return (
    <motion.div
      layoutId={layoutId}
      style={{ ...style, perspective: "800px" }} // Enable 3D perspective for children
      className="relative flex flex-col items-center justify-center w-40 h-40 cursor-pointer"
      onClick={onSelect}
      variants={nebulaVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
    >
      {/* 3D Container for parallax and tilt effect */}
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        variants={{ hover: { rotateY: 15, rotateX: -10 } }}
      >
        {/* Layer 1: Outer Glow */}
        <motion.div
          className="absolute inset-[-40%] rounded-full"
          style={{ 
            background: `radial-gradient(circle, transparent 50%, ${NEBULA_CONFIG.colors.primary} 100%)`,
            transform: "translateZ(-100px)", // Pushed back in 3D space
          }}
          variants={{ hover: { scale: 1.2, opacity: 0.8 }, initial: { opacity: 0.6 } }}
          transition={{ type: 'spring' }}
        />

        {/* Layer 2: Gas Clouds */}
        <div style={{ transform: "translateZ(-50px)" }}>
          <GasClouds />
        </div>

        {/* Layer 3: Starfield with Parallax */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <Starfield />
        </div>

        {/* Layer 4: Inner Core */}
        <motion.div
          className="absolute inset-[25%] rounded-full blur-xl"
          style={{ background: `radial-gradient(circle, white, ${NEBULA_CONFIG.colors.primary} 70%)` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Layer 5: UI Content (on top) */}
      <motion.div 
        className="relative z-10 flex flex-col items-center text-center pointer-events-none"
        variants={{ hover: { y: -5 } }}
      >
        <motion.div
          className="text-4xl mb-2 text-white/90 drop-shadow-lg"
          variants={iconVariants}
        >
          {icon}
        </motion.div>
        <h4 className="font-bold text-base bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
          {name}
        </h4>
      </motion.div>
    </motion.div>
  );
};