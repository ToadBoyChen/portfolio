import { motion, AnimatePresence, useTransform, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState, type FC } from 'react';
import AnimatedText from '/src/animation/AnimatedText';
import { CiCoffeeCup } from "react-icons/ci";

const loadingTexts = [
  "Sharpening Swords & Quills...",
  "Brewing Potions of Patience...",
  "Charting Unknown Territories...",
  "Waking Up the Sprites...",
  "Polishing the Pixels...",
  "Rolling for Initiative...",
];

// Unchanged Stardust Particle component
const StardustParticle: FC = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = 2 + Math.random() * 3;
  const delay = Math.random() * 3;
  const scale = 0.5 + Math.random() * 0.5;

  return (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{ left: `${x}%`, top: `${y}%`, width: `${scale * 2}px`, height: `${scale * 2}px` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0, 0.7, 0], y: -20 }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
};

// Unchanged LoadingKey/Axe component
const LoadingKey: FC = () => {
  return (
    <motion.div
      className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center text-yellow-300"
      initial={{ scale: 0, rotateY: 180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.5 }}
    >
      <motion.div
        className="text-7xl md:text-8xl"
        style={{ filter: 'drop-shadow(0 0 15px #fde047aa)' }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        <CiCoffeeCup />
      </motion.div>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-yellow-200 rounded-full"
          style={{ filter: 'blur(1px)' }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </motion.div>
  );
};

export const QuestUniverseLoader = () => {
  const [textIndex, setTextIndex] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2200);

    const animation = animate(progress, 100, { duration: 10, ease: 'easeOut' });

    return () => {
      clearInterval(textInterval);
      animation.stop();
    };
  }, [progress]);

  const progressText = useTransform(progress, (v) => `${Math.round(v)}%`);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(ellipse at center, hsl(215, 40%, 15%) 0%, hsl(220, 40%, 5%) 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="absolute inset-0 opacity-50">
        {Array.from({ length: 75 }).map((_, i) => <StardustParticle key={i} />)}
      </div>

      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <motion.div className="absolute inset-0 opacity-30" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path id="circlePath" fill="none" d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
            <text fill="#06b6d4" fontSize="14" letterSpacing="8">
              {/* Cleaned up text path for better readability */}
              <textPath href="#circlePath" className="font-sans uppercase tracking-[0.4em]"> Mathematics · Programming · Athletics ·</textPath>
            </text>
          </svg>
        </motion.div>
        <LoadingKey />
      </div>

      <div className="relative h-12 w-full max-w-lg text-center mt-12 flex justify-center items-center">
        <AnimatePresence mode="wait">
          {/* --- IMPLEMENTATION of AnimatedText --- */}
          <AnimatedText
            key={textIndex} // This is crucial for re-animation on change
            text={loadingTexts[textIndex]}
            className="text-2xl md:text-3xl chango-regular text-quest-shadow text-background/80"
            direction="down"
            alwaysAnimate={true}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
          />
        </AnimatePresence>
      </div>

      <div className="w-72 md:w-96 h-2 mt-4 bg-black/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
        <motion.div
          className="h-full bg-yellow-400 rounded-full relative"
          style={{ width: progressText, boxShadow: '0 0 10px #facc15, 0 0 20px #fde047' }}
          transition={{ duration: 0.1 }}
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full animate-shimmer" />
        </motion.div>
      </div>

      {/* --- CLEANUP: Corrected styling for progress percentage --- */}
      <motion.p className="text-white/70 font-mono text-sm mt-2">
        {progressText}
      </motion.p>
    </motion.div>
  );
};