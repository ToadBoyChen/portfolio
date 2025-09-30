// src/components/journey/ConstellationView.tsx

import React, { type FC, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { JourneyStep } from './JourneyTypes';
import { Star } from './Star';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

const StaticConstellationBackground = React.memo(() => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-indigo-950">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
  
    <motion.div
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
    />
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:50px_50px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
    />
     <motion.div
      className="absolute inset-0 bg-[radial-gradient(#a78bfa33_1.5px,transparent_1.5px)] [background-size:120px_120px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
    />
  </div>
));
StaticConstellationBackground.displayName = 'StaticConstellationBackground';

interface ConstellationViewProps {
  constellationName: string;
  onClose: () => void;
  onSelectStep: (step: JourneyStep) => void;
  layoutId: string;
  allQuests: JourneyStep[];
}

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const ConstellationView: FC<ConstellationViewProps> = ({
  constellationName,
  onClose,
  onSelectStep,
  layoutId,
  allQuests,
}) => {
  const questsInConstellation = useMemo(() =>
    allQuests
      .filter(step => step.questType === constellationName)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    [constellationName, allQuests]
  );

  return (
    <motion.div
      layoutId={layoutId}
      className="relative w-full max-w-7xl max-h-[90vh] bg-black/50 border border-purple-400/20 rounded-2xl shadow-2xl shadow-purple-500/10 flex flex-col"
      style={{ willChange: 'transform, opacity' }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
    >
      <StaticConstellationBackground />

      <div className="relative z-10 w-full flex-1 flex flex-col p-4 sm:p-6 md:p-8 min-h-0">
        <motion.div
          className="flex-shrink-0 flex justify-between items-center pb-4 md:pb-6 border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              onClick={onClose}
              className="rounded-full text-purple-300 bg-white/10 shadow-md hover:text-white hover:bg-purple-400/20 active:scale-90 transition-all font-semibold flex cursor-pointer"
              variant="ghost"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-1" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text chango-regular text-white text-quest-shadow">
              {constellationName}
            </h2>
          </div>
        </motion.div>
        <div className="flex-1 mt-4 md:mt-6 overflow-y-auto pr-2 min-h-0">
            <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                variants={gridContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {questsInConstellation.map((quest) => (
                    <Star key={quest.title} step={quest} onSelect={onSelectStep} />
                ))}
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};