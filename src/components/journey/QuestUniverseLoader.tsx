import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, type FC } from 'react';
import AnimatedText from "../../animation/AnimatedText";

const LOADING_TEXTS = [
  "Waking sprites...",
  "Polishing pixels...",
  "Rolling dice...",
];

const TEXT_CHANGE_INTERVAL_MS = 2200;
const PARTICLE_COUNT_MOBILE = 30;
const PARTICLE_COUNT_DESKTOP = 75;
const ROTATING_TEXT = "Mathematics · Finance · Athletics · Programming · Trading";

const StardustParticle: FC = () => {
  // Calculate duration and delay as numbers for the transition prop
  const duration = 2 + Math.random() * 3;
  const delay = Math.random() * 3;

  return (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{
        left: 'var(--x)',
        top: 'var(--y)',
        width: 'calc(var(--scale) * 2px)',
        height: 'calc(var(--scale) * 2px)',
      }}
      initial={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: [0, 0.7, 0], translateY: -20 }}
      transition={{
        // Use the number variables here, which satisfies TypeScript
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};


// --- Main Loader Component (No changes needed here) ---
export const QuestUniverseLoader = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [particleCount, setParticleCount] = useState(PARTICLE_COUNT_MOBILE);

  // Effect for cycling through the loading texts
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length);
    }, TEXT_CHANGE_INTERVAL_MS);

    return () => clearInterval(textInterval);
  }, []);

  // Effect for setting responsive particle count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // md breakpoint in Tailwind
        setParticleCount(PARTICLE_COUNT_MOBILE);
      } else {
        setParticleCount(PARTICLE_COUNT_DESKTOP);
      }
    };

    handleResize(); // Set initial count
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 overflow-hidden px-4"
      style={{
        backgroundImage: 'radial-gradient(ellipse at center, hsl(215, 40%, 15%) 0%, hsl(220, 40%, 5%) 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      <div className="absolute inset-0 opacity-50">
        {Array.from({ length: particleCount }).map((_, i) => <StardustParticle key={i} />)}
      </div>

      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path id="circlePath" fill="none" d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
            <text fill="#06b6d4" className="text-[10px] sm:text-[12px] md:text-[14px]">
              <textPath href="#circlePath" className="font-sans uppercase tracking-[0.4em]">
                {ROTATING_TEXT}
              </textPath>
            </text>
          </svg>
        </motion.div>
      </div>

      <div className="relative h-10 sm:h-12 w-full max-w-md text-center mt-8 flex justify-center items-center px-2">
        <AnimatePresence mode="wait">
          <AnimatedText
            key={textIndex}
            text={LOADING_TEXTS[textIndex]}
            className="text-xl sm:text-2xl md:text-3xl chango-regular font-bold text-white [text-shadow:0_0_10px_theme(colors.cyan.300),0_0_20px_theme(colors.cyan.400),0_0_40px_theme(colors.purple.500)]"
            direction="down"
            alwaysAnimate={true}
          />
        </AnimatePresence>
      </div>

      {/* Loading Bar */}
      <div className="w-full max-w-xs sm:max-w-sm h-2 bg-cyan-900/50 rounded-full overflow-hidden mt-8 shadow-inner shadow-black/50">
        <motion.div
          className="h-full bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400)]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: (TEXT_CHANGE_INTERVAL_MS / 1000) * LOADING_TEXTS.length,
            ease: 'linear',
          }}
        />
      </div>
    </motion.div>
  );
};