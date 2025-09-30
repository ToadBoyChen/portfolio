// src/components/journey/CelestialArtifact.tsx

import React, { type FC, memo, useRef, type ReactElement } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
export interface SpriteSheetData {
  spriteSheet: string;
  frameCount: number;
  frameWidth: number;
  frameHeight: number;
  fps?: number;
}
export type Difficulty = "Trivial" | "Easy" | "Normal" | "Hard" | "Heroic" | "Deadly";
export type Rarity = "Common" | "Uncommon" | "Rare" | "Epic" | "Legendary";

export interface JourneyStep {
  title: string;
  date: string;
  location: string;
  description: string;
  questType: string;
  difficulty: Difficulty;
  recommendedLevel: number;
  recommendedSkills: string[];
  progress: number;
  animationFrames: SpriteSheetData;
  rewards: {
    name: string;
    amount?: number;
    icon: ReactElement;
  }[];
  specialItem: string;
  specialItemFrames: SpriteSheetData;
  specialItemRarity: Rarity;
  prerequisites?: string[];
}

type StarTheme = {
  glow: string;
  colorMain: string;
  colorAccent: string;
};

const STAR_CONFIG: Record<Difficulty, StarTheme> = {
  Trivial: { glow: "#a1a1aa", colorMain: "#52525b", colorAccent: "#27272a" },
  Easy: { glow: "#4ade80", colorMain: "#16a34a", colorAccent: "#166534" },
  Normal: { glow: "#38bdf8", colorMain: "#0ea5e9", colorAccent: "#075985" },
  Hard: { glow: "#f59e0b", colorMain: "#d97706", colorAccent: "#92400e" },
  Heroic: { glow: "#c084fc", colorMain: "#9333ea", colorAccent: "#6b21a8" },
  Deadly: { glow: "#ef4444", colorMain: "#e11d48", colorAccent: "#9f1239" },
};
export const artifactDiscoveryVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  },
};

const contentVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// --- Completion Seal (Unchanged) ---
const CompletionSeal: FC = memo(() => (
  <motion.div
    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
  >
    <motion.div
      className="absolute w-1/2 h-1/2 rounded-full bg-white/20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1], opacity: [0, 0.7, 0] }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
    />
    <motion.svg
      className="w-1/2 h-1/2 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <motion.path
        d="M8 12.5l3 3L17 9.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: 'circOut' }}
      />
    </motion.svg>
  </motion.div>
));
CompletionSeal.displayName = 'CompletionSeal';
interface StarProps {
  step: JourneyStep;
  onSelect: (step: JourneyStep) => void;
}

export const Star: FC<StarProps> = memo(({ step, onSelect }) => {
  const { difficulty, progress, title, recommendedLevel } = step;
  const config = STAR_CONFIG[difficulty];
  const isCompleted = progress === 100;
  const isActive = progress > 0 && progress < 100;

  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateY = (x / width - 0.5) * 25;
    const rotateX = -(y / height - 0.5) * 25;
    cardRef.current.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1500px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(step)}
      variants={artifactDiscoveryVariant}
      className="group aspect-square relative flex flex-col justify-between p-4
                 rounded-2xl bg-slate-900 cursor-pointer overflow-hidden
                 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        transformStyle: 'preserve-3d',
        '--glow': config.glow,
        '--color-main': config.colorMain,
        '--color-accent': config.colorAccent,
        '--bg-texture': 'url("/noise.png")',
      } as React.CSSProperties}
    >
      {/* Background & Energy Wave Layers (Unchanged) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-main)] to-[var(--color-accent)]" />
      <div className="absolute inset-0 bg-[var(--bg-texture)] opacity-10 mix-blend-overlay" />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15), transparent 40%)' }}
      />
      {!isCompleted && <div className="energy-wave-container" />}
      <motion.div
        className="relative z-10 flex flex-col justify-between h-full"
        style={{ transform: 'translateZ(40px)' }}
      >
        <motion.div variants={contentVariant} className='flex justify-between items-center'>
          <span className="font-bold text-xs text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
            LVL {recommendedLevel}
          </span>
          <span className="font-semibold text-xs px-3 py-1 rounded-full border bg-black/30 backdrop-blur-sm" style={{ color: 'var(--glow)', borderColor: 'var(--glow)', textShadow: `0 0 10px var(--glow)` }}>
            {difficulty}
          </span>
        </motion.div>
        <div className="w-full">
          <motion.h3
            variants={contentVariant}
            className="text-lg text-left font-bold text-white tracking-wide [text-shadow:0_2px_6px_rgba(0,0,0,0.8)] mb-2"
          >
            {title}
          </motion.h3>

          {isActive && (
            <motion.div variants={contentVariant} className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `var(--glow)`, filter: `brightness(1.2)` }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>
          )}
        </div>
      </motion.div>
      <AnimatePresence>
        {isCompleted && <CompletionSeal />}
      </AnimatePresence>
    </motion.div>
  );
});

Star.displayName = 'Star';