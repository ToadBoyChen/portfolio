import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { Difficulty, JourneyStep } from './JourneyTypes';

// --- OPTIMIZATION: Simplified Configuration Engine ---
// Removed properties for constant animations like rings, pulses, and special effects.
// Added a `glowColor` for the new performant box-shadow glow effect.
type StarTheme = {
  size: number;
  glowColor: string;
  textureGradient: string;
  difficultyColor: string;
};

const STAR_CONFIG: Record<Difficulty, StarTheme> = {
  Trivial: {
    size: 24,
    glowColor: "#71717a",
    difficultyColor: "#a1a1aa",
    textureGradient: "linear-gradient(135deg, #52525b 0%, #27272a 100%)",
  },
  Easy: {
    size: 30,
    glowColor: "#4ade80",
    difficultyColor: "#4ade80",
    textureGradient: "linear-gradient(135deg, #16a34a 0%, #166534 100%)",
  },
  Normal: {
    size: 36,
    glowColor: "#38bdf8",
    difficultyColor: "#38bdf8",
    textureGradient: "linear-gradient(135deg, #0ea5e9 0%, #075985 100%)",
  },
  Hard: {
    size: 42,
    glowColor: "#f59e0b",
    difficultyColor: "#f59e0b",
    textureGradient: "linear-gradient(135deg, #d97706 0%, #92400e 100%)",
  },
  Heroic: {
    size: 48,
    glowColor: "#c084fc",
    difficultyColor: "#c084fc",
    textureGradient: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)",
  },
  Deadly: {
    size: 54,
    glowColor: "#fb7185",
    difficultyColor: "#fb7185",
    textureGradient: "linear-gradient(135deg, #e11d48 0%, #9f1239 100%)",
  },
};

// --- Framer Motion Variants (Unchanged) ---
const starContainerVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
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
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
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

// --- Main Star Component ---
interface StarProps {
  step: JourneyStep;
  onSelect: (step: JourneyStep) => void;
}

export const Star: FC<StarProps> = memo(({ step, onSelect }) => {
  const { difficulty, progress, title } = step;
  const config = STAR_CONFIG[difficulty];
  const isCompleted = progress === 100;
  const isActive = progress > 0 && progress < 100;

  const starStyle = useMemo(() => ({
    '--star-size': `${config.size}px`,
    '--glow-color': config.glowColor,
    '--texture-gradient': config.textureGradient,
  } as React.CSSProperties), [config]);

  return (
    <motion.div
      className="relative group flex items-center justify-center cursor-pointer"
      style={starStyle}
      variants={starContainerVariants}
      initial="initial"
      animate="visible"
      whileHover="hover"
      onClick={() => onSelect(step)}
    >
      {/* 
        OPTIMIZATION: The star body is now much simpler.
        - The atmospheric glow is a single `box-shadow` instead of a blurred div.
        - All constantly animating child components have been removed.
        - The structure is flatter and requires less computation from the browser.
      */}
      <motion.div
        className="relative w-[var(--star-size)] h-[var(--star-size)] rounded-full overflow-hidden"
        style={{
          boxShadow: `
            inset 8px -4px 16px 0px #00000077, 
            0 0 12px -2px #000000aa,
            0 0 20px 0px var(--glow-color),
            0 0 40px 10px #00000055
          `,
        }}
        transition={{ duration: 0.3 }}
        variants={{ hover: { boxShadow: `
          inset 8px -4px 16px 0px #00000077, 
          0 0 12px -2px #000000aa,
          0 0 35px 5px var(--glow-color),
          0 0 50px 10px #00000055
        `}}}
      >
        {/* Layer 1: Base Gradient */}
        <div className="absolute inset-0" style={{ background: 'var(--texture-gradient)' }} />
        {/* Layer 2: Lighting Highlight */}
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, #ffffff55, transparent 60%)` }} />
      </motion.div>

      {/* Progress Ring */}
      {isActive && (
        <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 overflow-visible">
          <motion.circle cx="50%" cy="50%" r="50%" fill="none" stroke="var(--glow-color)" strokeWidth="3" strokeLinecap="round" pathLength={1} style={{ filter: `drop-shadow(0 0 6px var(--glow-color))` }} initial={{ strokeDashoffset: 1 }} animate={{ strokeDashoffset: 1 - progress / 100 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
        </svg>
      )}

      {/* Completion Rune */}
      {isCompleted && <CompletionRune />}

      {/* Hover Tooltip (largely unchanged, as it's not a constant performance drain) */}
      <motion.div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-5 px-4 py-2 bg-black/70 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl whitespace-nowrap z-50 pointer-events-none"
        variants={tooltipVariants}
      >
        <div className="text-white font-bold text-base mb-1 tracking-wide">{title}</div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold" style={{ color: config.difficultyColor, textShadow: `0 0 8px ${config.difficultyColor}` }}>{difficulty}</span>
          <span className="text-gray-400">{isCompleted ? '✓ Completed' : `${progress}% Progress`}</span>
        </div>
        <div className="absolute bottom-0 left-1/2 w-0 h-0 -translate-x-1/2 translate-y-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800/95" />
      </motion.div>
    </motion.div>
  );
});

Star.displayName = 'Star';