// src/components/journey/Star.tsx
import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { Difficulty, JourneyStep } from './JourneyTypes';

// --- Configuration Engine (Dramatically Expanded) ---

type StarTheme = {
  size: number;
  baseColor: string;
  atmosphereColor: string;
  moonColor: string;
  textureGradient: string;
  // New properties for enhanced visuals
  rings?: {
    color: string;
    type: 'single' | 'dual';
  };
  pulse?: {
    color: string;
    scale: number;
  };
  specialEffect?: {
    type: 'flares' | 'arcs';
    color: string;
  };
  surfaceTexture?: 'cracks' | 'clouds';
};

const STAR_CONFIG: Record<Difficulty, StarTheme> = {
  Trivial: {
    size: 20,
    baseColor: "#a1a1aa",
    atmosphereColor: "#71717a",
    moonColor: "#e4e4e7",
    textureGradient: "linear-gradient(135deg, #52525b 0%, #27272a 100%)",
    surfaceTexture: 'cracks', // A rocky, cratered look
  },
  Easy: {
    size: 28,
    baseColor: "#15803d",
    atmosphereColor: "#4ade80",
    moonColor: "#dcfce7",
    textureGradient: "linear-gradient(135deg, #16a34a 0%, #166534 100%)",
    surfaceTexture: 'clouds', // A soft, atmospheric look
  },
  Normal: {
    size: 34,
    baseColor: "#0369a1",
    atmosphereColor: "#38bdf8",
    moonColor: "#e0f2fe",
    textureGradient: "linear-gradient(135deg, #0ea5e9 0%, #075985 100%)",
    surfaceTexture: 'clouds',
    pulse: { color: '#38bdf8', scale: 1.3 }, // A gentle, stable pulse
  },
  Hard: {
    size: 40,
    baseColor: "#b45309",
    atmosphereColor: "#f59e0b",
    moonColor: "#fef3c7",
    textureGradient: "linear-gradient(135deg, #d97706 0%, #92400e 100%)",
    surfaceTexture: 'cracks', // A scorched, cracked surface
    rings: { color: "#f59e0b", type: 'single' },
  },
  Heroic: {
    size: 46,
    baseColor: "#7e22ce",
    atmosphereColor: "#c084fc",
    moonColor: "#f5d0fe",
    textureGradient: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)",
    rings: { color: "#a855f7", type: 'dual' }, // More prominent rings
    specialEffect: { type: 'arcs', color: '#e9d5ff' }, // Crackling with energy
  },
  Deadly: {
    size: 52,
    baseColor: "#be123c",
    atmosphereColor: "#fb7185",
    moonColor: "#ffe4e6",
    textureGradient: "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)",
    rings: { color: "#e11d48", type: 'dual' },
    pulse: { color: '#ef4444', scale: 1.5 }, // An unstable, dangerous pulse
    specialEffect: { type: 'flares', color: '#fda4af' }, // Erupting with solar flares
  },
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
    scale: 1.15,
    transition: { type: 'spring', stiffness: 300, damping: 15 },
  },
};

const tooltipVariants: Variants = {
  initial: { opacity: 0, y: 15, scale: 0.95 },
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
  <div className="absolute inset-0">
    {[...Array(count)].map((_, i) => {
      // Memoize a random direction (-1 or 1) for each moon
      const direction = useMemo(() => (Math.random() < 0.5 ? 1 : -1), []);
      const orbitDuration = 20 + i * 10 + Math.random() * 5; // Varied speeds
      const orbitRadius = starSize * 0.8 + i * 15 + Math.random() * 10; // Varied distances
      const moonSize = 6 + Math.random() * 2;
      return (
        <motion.div
          key={i}
          className="absolute inset-0"
          // Apply the random direction to the rotation
          animate={{ rotate: 360 * direction }}
          transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute top-1/2 left-1/2" style={{ width: orbitRadius * 2, height: orbitRadius * 1.5 }}>
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: `${moonSize}px`,
                height: `${moonSize}px`,
                backgroundColor: color,
                boxShadow: `0 0 8px 1px #00000044, 0 0 5px 1px ${color}55`,
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, delay: i * 0.5 }}
            />
          </div>
        </motion.div>
      );
    })}
  </div>
));
OrbitingMoons.displayName = 'OrbitingMoons';

const StarRings: FC<{ color: string; starSize: number; type: 'single' | 'dual' }> = memo(({ color, starSize, type }) => {
  // Memoize a random direction (-1 or 1) for the rings
  const direction = useMemo(() => (Math.random() < 0.5 ? 1 : -1), []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ transformStyle: "preserve-3d" }}
      // Apply the random direction to the rotation
      animate={{ rotate: 360 * direction }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      variants={{ hover: { rotateX: '65deg', scale: 1.1 } }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: `${starSize * 1.8}px`, height: `${starSize * 0.8}px`,
          transform: "rotateX(75deg) skewY(-5deg)", // Added skew for perspective
          border: `2px solid ${color}aa`,
          boxShadow: `0 0 15px 2px ${color}55, inset 0 0 8px 2px ${color}33`,
        }}
      />
      {type === 'dual' && (
        <div
          className="absolute rounded-full"
          style={{
            width: `${starSize * 2.2}px`, height: `${starSize * 1.0}px`,
            transform: "rotateX(75deg) skewY(-5deg)",
            border: `1px solid ${color}88`,
            opacity: 0.7
          }}
        />
      )}
    </motion.div>
  );
});
StarRings.displayName = 'StarRings';

const SolarFlares: FC<{ color: string }> = memo(({ color }) => (
    <>
        {[...Array(3)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{
                    width: '150%', height: '10%',
                    background: `linear-gradient(90deg, transparent, ${color}99, transparent)`,
                    transformOrigin: 'center',
                }}
                animate={{
                    rotate: `${Math.random() * 360}deg`,
                    scaleX: [0, 1, 0],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    delay: i * 1.2,
                    ease: 'easeInOut'
                }}
            />
        ))}
    </>
));
SolarFlares.displayName = 'SolarFlares';

const EnergyArcs: FC<{ color: string }> = memo(({ color }) => (
    <motion.svg
        className="absolute inset-0 w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        style={{ transform: "scale(1.2)" }}
    >
        <motion.path
            d="M 20 50 Q 50 20 80 50"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
            d="M 30 70 Q 60 90 90 60"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut", delay: 1.5 }}
        />
    </motion.svg>
));
EnergyArcs.displayName = 'EnergyArcs';

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

  // Memoize random animation orders for textures
  const textureScrollDirection = useMemo(() => (Math.random() < 0.5 ? ['0%', '200%'] : ['200%', '0%']), []);
  const gradientScrollDirection = useMemo(() => (Math.random() < 0.5 ? ["0% 50%", "100% 50%"] : ["100% 50%", "0% 50%"]), []);

  // Use CSS variables for cleaner JSX and easier styling
  const starStyle = useMemo(() => ({
    '--star-size': `${config.size}px`,
    '--atmosphere-color': config.atmosphereColor,
    '--texture-gradient': config.textureGradient,
    filter: isGhost ? 'grayscale(0.95) opacity(0.5) contrast(0.8)' : 'none',
  } as React.CSSProperties), [config, isGhost]);

  const renderSurfaceTexture = () => {
    if (config.surfaceTexture === 'cracks') {
      return <div className="absolute inset-0 bg-cover opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />;
    }
    if (config.surfaceTexture === 'clouds') {
        return <motion.div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ background: 'url(/noise.png)', filter: 'contrast(2) brightness(1.5)' }} animate={{ backgroundPositionX: textureScrollDirection }} transition={{ duration: 40, ease: 'linear', repeat: Infinity }} />;
    }
    return null;
  };

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
      {/* 1. Celestial Features (Moons, Rings, Special Effects) */}
      {!isGhost && (
        <div className="absolute inset-0 pointer-events-none">
          <OrbitingMoons count={difficulty === "Deadly" ? 3 : difficulty === "Heroic" ? 2 : 1} color={config.moonColor} starSize={config.size} />
          {config.rings && <StarRings color={config.rings.color} starSize={config.size} type={config.rings.type} />}
          {config.specialEffect?.type === 'flares' && <SolarFlares color={config.specialEffect.color} />}
          {config.specialEffect?.type === 'arcs' && <EnergyArcs color={config.specialEffect.color} />}
        </div>
      )}

      {/* 2. Star Body Container */}
      <div className="relative" style={{ width: 'var(--star-size)', height: 'var(--star-size)' }}>
        {/* 2a. Pulsing Core (if configured) */}
        {config.pulse && !isGhost && (
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: config.pulse.color }}
                animate={{
                    scale: [1, config.pulse.scale, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
        )}
        
        {/* 2b. Atmosphere Glow */}
        <motion.div
          className="absolute -inset-2 rounded-full blur-xl"
          style={{ background: `radial-gradient(circle, var(--atmosphere-color) 30%, transparent 70%)` }}
          variants={{
            initial: { opacity: 0.6 },
            hover: { opacity: 1, scale: 1.1 },
          }}
          transition={{ duration: 0.3 }}
          animate={{ opacity: isActive ? 0.9 : 0.7, scale: [1, 1.03, 1] }}
        />

        {/* 2c. 3D Star Core */}
        <motion.div
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{ boxShadow: `inset 10px -5px 20px 0px #00000088, 0 0 20px -2px #000000aa` }}
        >
          {/* Layer 1: Base Gradient */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'var(--texture-gradient)', backgroundSize: '200% 100%' }}
            animate={{ backgroundPosition: gradientScrollDirection }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          />
          {/* Layer 2: Surface Texture */}
          {!isGhost && renderSurfaceTexture()}
          {/* Layer 3: Lighting Highlight */}
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, #ffffff66, transparent 60%)` }} />
        </motion.div>

        {/* 2d. Progress Ring */}
        {isActive && (
          <svg className="absolute -inset-0.5 w-[calc(100%+4px)] h-[calc(100%+4px)] -rotate-90 overflow-visible">
            <motion.circle cx="50%" cy="50%" r="50%" fill="none" stroke="var(--atmosphere-color)" strokeWidth="3" strokeLinecap="round" pathLength={1} style={{ filter: `drop-shadow(0 0 8px var(--atmosphere-color))` }} initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: 1 - progress / 100 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
          </svg>
        )}

        {/* 2e. Completion Rune */}
        {isCompleted && <CompletionRune />}
      </div>
      
      {/* 3. Hover Tooltip */}
      {!isGhost && (
        <motion.div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 px-4 py-2 bg-black/70 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl whitespace-nowrap z-50 pointer-events-none"
          variants={tooltipVariants}
        >
          <div className="text-white font-bold text-base mb-1 tracking-wide">{title}</div>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold" style={{ color: config.atmosphereColor, textShadow: `0 0 8px ${config.atmosphereColor}` }}>{difficulty}</span>
            <span className="text-gray-400">{isCompleted ? '✓ Completed' : `${progress}% Progress`}</span>
          </div>
          <div className="absolute bottom-0 left-1/2 w-0 h-0 -translate-x-1/2 translate-y-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800/95" />
        </motion.div>
      )}
    </motion.div>
  );
});

Star.displayName = 'Star';