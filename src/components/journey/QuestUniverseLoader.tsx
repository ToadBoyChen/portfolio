import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState, type FC } from 'react';
import AnimatedText from "../../animation/AnimatedText";

const loadingTexts = [
  "Sharpening blades...",
  "Mixing potions...",
  "Drawing maps...",
  "Waking sprites...",
  "Polishing pixels...",
  "Rolling dice...",
];

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
        {Array.from({ length: 75 }).map((_, i) => <StardustParticle key={i} />)}
      </div>

      <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center">
        <motion.div 
          className="absolute inset-0 opacity-30" 
          animate={{ rotate: 360 }} 
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path id="circlePath" fill="none" d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
            <text fill="#06b6d4" fontSize="10" className="sm:text-[12px] md:text-[14px]" letterSpacing="8">
              <textPath href="#circlePath" className="font-sans uppercase tracking-[0.4em]"> Mathematics · Programming · Athletics ·</textPath>
            </text>
          </svg>
        </motion.div>
      </div>

      <div className="relative h-10 sm:h-12 w-full max-w-md text-center mt-8 sm:mt-12 flex justify-center items-center px-2">
        <AnimatePresence mode="wait">
          <AnimatedText
            key={textIndex}
            text={loadingTexts[textIndex]}
            className="text-xl sm:text-2xl md:text-3xl chango-regular text-quest-shadow text-background/80"
            direction="down"
            alwaysAnimate={true}
          />
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
