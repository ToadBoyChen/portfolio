// src/components/journey/QuestUniverseLoader.tsx

import { motion, AnimatePresence, useTransform, useMotionValue, animate } from 'framer-motion';
import { useEffect, useState, type FC } from 'react';

/* 
  For the best aesthetic, add this Google Font to your project's CSS:
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');
*/

const loadingTexts = [
  "Awakening the Cosmos...",
  "Weaving the Fabric of Spacetime...",
  "Unlocking Ancient Constellations...",
  "Channeling Starlight...",
  "Breaching the Galactic Veil...",
  "The Universe Beckons...",
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
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${scale * 2}px`,
        height: `${scale * 2}px`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0, 0.7, 0], y: -20 }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export const QuestUniverseLoader = () => {
  const [textIndex, setTextIndex] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 2000);

    const animation = animate(progress, 100, {
      duration: 8,
      ease: 'easeOut',
    });

    return () => {
      clearInterval(textInterval);
      animation.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressText = useTransform(progress, (v) => `${Math.round(v)}%`);
  const glowOpacity = useTransform(progress, [0, 50, 100], [0, 0.5, 1]);
  const tcDraw = useTransform(progress, [0, 80], [500, 0]);


  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 font-cinzel overflow-hidden"
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
        {/* Decorative rings remain the same */}
        <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path id="circlePath" fill="none" d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />
            <text fill="#06b6d4" fontSize="14" letterSpacing="8">
              <textPath href="#circlePath" className="font-sans uppercase tracking-[0.4em]"> · Programming · Mathematics · Athletics ·</textPath>
            </text>
          </svg>
        </motion.div>
        <motion.div className="absolute inset-10 text-purple-400/50" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"> <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path> </svg>
        </motion.div>

        {/* --- CHANGE: Replaced progress text with animated "TC" Logo --- */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          <motion.div className="absolute inset-0 bg-gradient-to-br from-cyan-900 to-purple-900 rounded-full" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute inset-0 rounded-full" style={{ opacity: glowOpacity, boxShadow: '0 0 60px 15px #0891b2, inset 0 0 20px 5px rgba(168, 85, 247, 0.6)', }} />
          
          {/* SVG for the "TC" Logo Animation */}
          <svg width="100" height="100" viewBox="0 0 100 100" className="w-2/3 h-2/3">
            <motion.text
              x="50"
              y="53"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-cinzel font-bold"
              style={{
                fontSize: '70px',
                stroke: '#ffffff',
                strokeWidth: '1.5',
                strokeDasharray: '500', // A value larger than the path length
                strokeDashoffset: tcDraw, // Animated value
                fill: 'transparent', // Start transparent
              }}
              // Animate the fill after the drawing is complete
              animate={{ fill: 'rgba(255, 255, 255, 0.9)' }}
              transition={{ delay: 6.5, duration: 0.5 }}
            >
              TC
            </motion.text>
          </svg>
        </div>
      </div>

      <div className="relative h-10 w-full max-w-lg text-center mt-12">
        <AnimatePresence mode="wait">
          <motion.p key={textIndex} className="text-lg md:text-xl font-medium text-cyan-200/80 tracking-widest" style={{ textShadow: '0 0 15px rgba(107, 227, 255, 0.4)'}} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            {loadingTexts[textIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-72 md:w-96 h-1 mt-4 bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          style={{ width: progressText, boxShadow: '0 0 10px 2px #0891b2, 0 0 20px 5px #a855f7' }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* --- CHANGE: Moved progress percentage here --- */}
      <motion.p className="text-white/70 font-mono text-sm mt-2">
        {progressText}
      </motion.p>
    </motion.div>
  );
};