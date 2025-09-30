// src/components/journey/ConstellationView.tsx

import React, { type FC, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Virtuoso } from 'react-virtuoso';
import type { JourneyStep } from './JourneyTypes';
import { Star } from './Star';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { QuestListItem } from './QuestListItem';
import { SortOptionsBar, type SortOption } from './SortOptionsBar';

const StaticConstellationBackground = React.memo(({ isMobile }: { isMobile: boolean }) => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-indigo-950">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
    {!isMobile && (
      <>
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
      </>
    )}
    <motion.div
      className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:50px_50px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
    />
    {!isMobile && (
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(#a78bfa33_1.5px,transparent_1.5px)] [background-size:120px_120px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
      />
    )}
  </div>
));
StaticConstellationBackground.displayName = 'StaticConstellationBackground';

interface ConstellationViewProps {
  constellationName: string;
  onClose: () => void;
  onSelectStep: (step: JourneyStep) => void;
  layoutId: string;
  allQuests: JourneyStep[];
  isMobile: boolean;
}

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export const ConstellationView: FC<ConstellationViewProps> = ({
  constellationName,
  onClose,
  onSelectStep,
  layoutId,
  allQuests,
  isMobile,
}) => {
  const [sortOption, setSortOption] = useState<SortOption>('progress-desc');

  const questsInConstellation = useMemo(() => {
    const filtered = allQuests.filter(step => step.questType === constellationName);
    const difficultyMap: { [key: string]: number } = {
      Deadly: 6, Heroic: 5, Hard: 4, Normal: 3, Easy: 2, Trivial: 1,
    };
    switch (sortOption) {
      case 'date-desc':
        return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'difficulty-desc':
        return filtered.sort((a, b) => (difficultyMap[b.difficulty] || 0) - (difficultyMap[a.difficulty] || 0));
      case 'progress-desc':
        return filtered.sort((a, b) => (b.progress || 0) - (a.progress || 0));
      default:
        return filtered;
    }
  }, [constellationName, allQuests, sortOption]);

  return (
    <motion.div
      layoutId={layoutId}
      className="relative w-full max-w-7xl h-full md:h-auto md:max-h-[90vh] bg-black/50 border border-purple-400/20 rounded-2xl shadow-2xl shadow-purple-500/10 flex flex-col"
      style={{ willChange: 'transform, opacity' }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
    >
      <StaticConstellationBackground isMobile={isMobile} />

      <div className="relative z-10 w-full flex-1 flex flex-col p-2 sm:p-6 md:p-8 min-h-0">
        <motion.div
          className="flex-shrink-0 flex items-center justify-between pb-4 md:pb-6 border-b border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={onClose}
            className="rounded-full text-purple-300 bg-white/10 shadow-md hover:text-white hover:bg-purple-400/20 active:scale-90 transition-all font-semibold flex cursor-pointer"
            variant="ghost" size="icon"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="flex-1 text-center px-2">
            <h2 className="text-xl sm:text-3xl md:text-4xl chango-regular font-bold text-white [text-shadow:0_0_10px_theme(colors.cyan.300),0_0_20px_theme(colors.cyan.400),0_0_40px_theme(colors.purple.500)]">
              {constellationName}
            </h2>
          </div>
          <div className="w-10 sm:w-24" />
        </motion.div>
        
        <SortOptionsBar onSortChange={setSortOption} currentSort={sortOption} />
        
        <div className="flex-1 mt-4 md:mt-6 min-h-0">
          {isMobile ? (
            <Virtuoso
              data={questsInConstellation}
              className="!h-full"
              itemContent={(_index, quest) => (
                <div className="pb-3 px-1">
                  <QuestListItem key={quest.title} step={quest} onSelect={onSelectStep} />
                </div>
              )}
            />
          ) : (
            <div className="overflow-y-auto pr-2 h-full">
              <motion.div
                  className={"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"}
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="visible"
              >
                  {questsInConstellation.map((quest) => (
                    <Star 
                      key={quest.title} 
                      step={quest} 
                      onSelect={onSelectStep} 
                      isMobile={isMobile} 
                    />
                  ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};