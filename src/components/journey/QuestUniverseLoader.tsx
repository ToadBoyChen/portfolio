// src/components/journey/QuestUniverseLoader.tsx

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const loadingTexts = [
  "Plotting Celestial Coordinates...",
  "Calibrating Arcane Matrix...",
  "Crossing the Astral Plane...",
  "Aligning Ley Lines...",
  "Summoning Stardust...",
  "Entering the Cosmos...",
];

export const QuestUniverseLoader = () => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through the loading texts
    const textInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
    }, 1200);

    // Animate the progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 60); // Total duration: 60ms * 100 = 6 seconds

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900 bg-[url('/path-to-your/star-bg.svg')]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8">
        <motion.div
          className="absolute inset-0 border-[3px] border-cyan-400/50 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-4 border-[2px] border-purple-500/50 rounded-full"
          animate={{ rotate: -360, scale: [1, 0.9, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-8 bg-gradient-to-br from-purple-600/20 to-cyan-500/20 rounded-full blur-xl"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-12 bg-white rounded-full"
          animate={{
            boxShadow: ['0 0 60px 10px #fff', '0 0 80px 20px #a78bfa', '0 0 60px 10px #fff'],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="relative h-8 w-full max-w-sm text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            className="text-lg font-medium text-white/80 tracking-widest"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {loadingTexts[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="w-64 md:w-96 h-2 mt-4 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
      <p className="text-white font-mono mt-2">{progress}%</p>
    </motion.div>
  );
};