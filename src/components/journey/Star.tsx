// src/components/journey/Star.tsx
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { Difficulty, JourneyStep } from './JourneyTypes';

// --- Configuration (Renamed to STAR_CONFIG) ---

const STAR_CONFIG: Record<
  Difficulty,
  {
    size: number;
    baseColor: string;
    atmosphereColor: string;
    moonColor: string;
    hasRings: boolean;
    ringColor?: string;
    textureGradient: string;
  }
> = {
  Trivial:  { size: 22, baseColor: "#a1a1aa", atmosphereColor: "#e4e4e7", moonColor: "#f4f4f5", hasRings: false, textureGradient: "linear-gradient(135deg, #71717a 0%, #3f3f46 100%)" },
  Easy:     { size: 26, baseColor: "#15803d", atmosphereColor: "#4ade80", moonColor: "#dcfce7", hasRings: false, textureGradient: "linear-gradient(135deg, #16a34a 0%, #166534 100%)" },
  Normal:   { size: 30, baseColor: "#0369a1", atmosphereColor: "#38bdf8", moonColor: "#e0f2fe", hasRings: false, textureGradient: "linear-gradient(135deg, #0ea5e9 0%, #075985 100%)" },
  Hard:     { size: 34, baseColor: "#b45309", atmosphereColor: "#f59e0b", moonColor: "#fef3c7", hasRings: false, textureGradient: "linear-gradient(135deg, #d97706 0%, #92400e 100%)" },
  Heroic:   { size: 38, baseColor: "#7e22ce", atmosphereColor: "#c084fc", moonColor: "#f5d0fe", hasRings: true, ringColor: "#a855f7", textureGradient: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)" },
  Deadly:   { size: 42, baseColor: "#be123c", atmosphereColor: "#fb7185", moonColor: "#ffe4e6", hasRings: true, ringColor: "#e11d48", textureGradient: "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)" },
};

// --- Framer Motion Variants ---

const starContainerVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20, delay: i * 0.05 },
  }),
  hover: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 300, damping: 15 },
  },
};

const tooltipVariants: Variants = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  hover: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
};

// --- Child Components ---

const CompletionRune: FC = memo(() => (
  <motion.svg
    className="absolute inset-0 w-full h-full text-white drop-shadow-lg"
    viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <motion.path
      d="M8 12.5l3 3L17 9.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
    />
  </motion.svg>
));
CompletionRune.displayName = 'CompletionRune';

const OrbitingMoons: FC<{ count: number; color: string; starSize: number }> = memo(({ count, color, starSize }) => (
  <motion.div
    className="absolute inset-0"
    animate={{ rotate: 360 }}
    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
  >
    {[...Array(count)].map((_, i) => {
      const angle = (i / count) * 2 * Math.PI;
      const radius = starSize * 0.8 + Math.random() * 10;
      return (
        <div key={i} className="absolute top-1/2 left-1/2" style={{ transform: `rotate(${angle}rad)` }}>
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color, x: radius, boxShadow: '0 0 5px 1px #00000033' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
          />
        </div>
      );
    })}
  </motion.div>
));
OrbitingMoons.displayName = 'OrbitingMoons';

// --- Re-engineered StarRings to work without JSX styles ---
const StarRings: FC<{ color: string; starSize: number }> = memo(({ color, starSize }) => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center"
    style={{ transformStyle: "preserve-3d" }}
    animate={{ rotate: "-360deg" }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
  >
    {/* The main div acts as a container for the three ring layers */}
    <div
      className="absolute rounded-full"
      style={{
        width: `${starSize * 1.8}px`,
        height: `${starSize * 0.7}px`,
        transform: "rotateX(75deg)",
        border: `2px solid ${color}`,
        boxShadow: `0 0 10px 1px ${color}55, inset 0 0 5px 1px ${color}33`,
      }}
    >
      {/* Inner shadow ring (replaces ::before) */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '2px',
          background: 'rgba(0, 0, 0, 0.4)', // Dark overlay for depth
          boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.4)',
          filter: 'blur(1px)',
        }}
      />
      {/* Outer halo ring (replaces ::after) */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '-6px',
          border: `1px solid ${color}88`,
          filter: 'blur(2px)',
          opacity: 0.7,
        }}
      />
    </div>
  </motion.div>
));
StarRings.displayName = 'StarRings';

// --- Main Star Component ---
interface StarProps {
  step: JourneyStep;
  onSelect: (step: JourneyStep) => void;
  isGhost?: boolean;
  index?: number;
}

export const Star: FC<StarProps> = memo(({ step, onSelect, isGhost = false, index = 0 }) => {
  const { difficulty, progress, title } = step;
  const config = STAR_CONFIG[difficulty];
  const isCompleted = progress === 100;
  const isActive = progress > 0 && progress < 100;

  const starStyle = useMemo(() => ({
    '--star-size': `${config.size}px`,
    '--atmosphere-color': config.atmosphereColor,
    '--texture-gradient': config.textureGradient,
    filter: isGhost ? 'grayscale(0.9) opacity(0.6)' : 'none',
  } as React.CSSProperties), [config, isGhost]);

  return (
    <motion.div
      className={`relative group flex items-center justify-center ${isGhost ? 'pointer-events-none' : 'cursor-pointer'}`}
      style={starStyle}
      variants={starContainerVariants}
      initial="initial"
      animate="visible"
      whileHover="hover"
      custom={index}
      onClick={() => !isGhost && onSelect(step)}
    >
      {/* 1. Celestial Features (Moons & Rings) */}
      {!isGhost && (
        <div className="absolute inset-0 pointer-events-none">
          <OrbitingMoons count={difficulty === "Deadly" ? 2 : 1} color={config.moonColor} starSize={config.size} />
          {config.hasRings && <StarRings color={config.ringColor!} starSize={config.size} />}
        </div>
      )}

      {/* 2. Star Body Container */}
      <div className="relative" style={{ width: 'var(--star-size)', height: 'var(--star-size)' }}>
        {/* 2a. Atmosphere Glow */}
        <div
          className="absolute inset-0 rounded-full blur-lg"
          style={{
            background: `radial-gradient(circle, var(--atmosphere-color) 30%, transparent 70%)`,
            opacity: isActive ? 0.9 : 0.6,
          }}
        />

        {/* 2b. 3D Star Core */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{ boxShadow: `inset 10px -5px 15px 0px #00000066, 0 0 10px -2px #00000088` }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
        >
          <div
            className="w-full h-full"
            style={{
              background: `radial-gradient(circle at 25% 25%, #ffffff55, transparent 50%), var(--texture-gradient)`,
              backgroundSize: '200% 100%',
            }}
          />
        </motion.div>

        {/* 2c. Progress Ring */}
        {isActive && (
          <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible">
            <motion.circle cx="50%" cy="50%" r="50%" fill="none" stroke="var(--atmosphere-color)" strokeWidth="2.5" strokeLinecap="round" pathLength={1} style={{ filter: `drop-shadow(0 0 5px var(--atmosphere-color))` }} initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: 1 - progress / 100 }} transition={{ duration: 1, ease: 'easeOut' }} />
          </svg>
        )}

        {/* 2d. Completion Rune */}
        {isCompleted && <CompletionRune />}
      </div>
      
      {/* 3. Hover Tooltip */}
      {!isGhost && (
        <motion.div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-gray-950/80 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl whitespace-nowrap z-50 pointer-events-none"
          variants={tooltipVariants}
        >
          <div className="text-white font-bold text-base mb-1 tracking-wide">{title}</div>
          <div className="flex items-center gap-3 text-sm">
            <span style={{ color: config.atmosphereColor, textShadow: `0 0 5px ${config.atmosphereColor}` }}>{difficulty}</span>
            <span className="text-gray-400">{isCompleted ? '✓ Completed' : `${progress}% Progress`}</span>
          </div>
          <div className="absolute bottom-0 left-1/2 w-0 h-0 -translate-x-1/2 translate-y-[99%] border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800" />
        </motion.div>
      )}
    </motion.div>
  );
});

Star.displayName = 'Star';