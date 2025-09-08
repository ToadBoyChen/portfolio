import React, { type FC, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { JourneyStep } from './JourneyTypes';
import { Star } from './Star';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

const StaticConstellationBackground = React.memo(() => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-indigo-950">
    {/* Base Gradient & Static Nebulas */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

    {/* Static starfield created with CSS gradients. Infinitely more performant. */}
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:50px_50px]" />
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff11_1px,transparent_1px)] [background-size:90px_90px]" />
    <div className="absolute inset-0 bg-[radial-gradient(#a78bfa33_1.5px,transparent_1.5px)] [background-size:120px_120px]" />
  </div>
));
StaticConstellationBackground.displayName = 'StaticConstellationBackground';


interface ConstellationViewProps {
  constellationName: string;
  onClose: () => void;
  onSelectStep: (step: JourneyStep) => void;
  layoutId: string;
  allStarPositions: Map<
    string,
    { quest: JourneyStep; pos: { x: number; y: number } }
  >;
}

const SPREAD_FACTOR = 1.4;
const PADDING = 8;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

export const ConstellationView: FC<ConstellationViewProps> = ({
  constellationName,
  onClose,
  onSelectStep,
  layoutId,
  allStarPositions,
}) => {
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);

  const constellationData = useMemo(() => {
    // Helper function to spread stars out from the center
    const spreadPosition = (pos: { x: number; y: number }) => {
      const vecX = pos.x - 50;
      const vecY = pos.y - 50;
      const newX = clamp(50 + vecX * SPREAD_FACTOR, PADDING, 100 - PADDING);
      const newY = clamp(50 + vecY * SPREAD_FACTOR, PADDING, 100 - PADDING);
      return { x: newX, y: newY };
    };

    const interactiveStars = Array.from(allStarPositions.values())
      .filter((data) => data.quest.questType === constellationName)
      .map((data) => ({
        ...data,
        pos: spreadPosition(data.pos),
      }))
      .sort((a, b) => new Date(a.quest.date).getTime() - new Date(b.quest.date).getTime());

    // OPTIMIZATION: Removed all logic for calculating and displaying "ghost stars"
    // This simplifies the component's logic and reduces elements on screen.
    return { stars: interactiveStars };

  }, [constellationName, allStarPositions]);

  return (
    <motion.div
      layoutId={layoutId}
      className="relative inset-0 w-full h-full p-6 md:p-10 flex flex-col"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
    >
      <StaticConstellationBackground />

      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header (Unchanged) */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              className="rounded-full text-[var(--color-quest-shadow)] bg-white/10 shadow-md hover:text-background hover:bg-[var(--color-quest-shadow)] hover:shadow-lg active:scale-90 transition-all duration-300 tracking-wide font-semibold flex hover:rotate-3 cursor-pointer"
              variant="ghost"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back</span>
            </Button>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text chango-regular text-white text-quest-shadow">
              {constellationName}
            </h2>
          </div>
        </motion.div>

        {/* Render Area */}
        <div className="relative flex-1">
          {constellationData.stars.map(({ quest, pos }, index) => (
            <motion.div
              key={quest.title}
              className="absolute"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: hoveredStar === quest.title ? 20 : 10,
              }}
              onMouseEnter={() => setHoveredStar(quest.title)}
              onMouseLeave={() => setHoveredStar(null)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                delay: 0.5 + index * 0.1,
                stiffness: 200,
                damping: 20,
              }}
            >
              <Star step={quest} onSelect={onSelectStep} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};