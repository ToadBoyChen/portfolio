// src/components/journey/ConstellationView.tsx

import React, { type FC, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { JourneyStep } from './JourneyTypes';
import { Star } from './Star';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

// This background component remains unchanged
const StaticConstellationBackground = React.memo(() => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl bg-indigo-950">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:50px_50px]" />
    <div className="absolute inset-0 bg-[radial-gradient(#a78bfa33_1.5px,transparent_1.5px)] [background-size:120px_120px]" />
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

const SPREAD_FACTOR = 1.4;
const PADDING = 8;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

export const ConstellationView: FC<ConstellationViewProps> = ({
  constellationName,
  onClose,
  onSelectStep,
  layoutId,
  allQuests,
}) => {
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);

  // THE FIX IS APPLIED HERE: Replaced pure random generation with a procedural
  // algorithm that guarantees stars do not spawn on top of each other.
  const constellationData = useMemo(() => {
    const questsInConstellation = allQuests
      .filter(step => step.questType === constellationName)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const starPositions = new Map<string, { quest: JourneyStep; pos: { x: number; y: number } }>();
    const numStars = questsInConstellation.length;
    
    // --- Configuration for Collision-Free Random Layout ---
    const MIN_RADIUS = 15; // Prevents stars from clumping in the absolute center.
    const MAX_RADIUS = 45; // Max distance from the center (50% is the center, so 50-45=5% from edge).
    // ------------------------------------------
    
    // 1. Calculate the angular "slice" for each star to guarantee separation.
    const angleIncrement = (2 * Math.PI) / numStars;

    questsInConstellation.forEach((step, index) => {
        // 2. Determine the base angle for this star's sector.
        const baseAngle = index * angleIncrement;
        
        // 3. Add random "jitter" so they don't form a perfect circle.
        // We use 80% of the increment to ensure a safe margin between sectors.
        const angleJitter = (Math.random() - 0.5) * angleIncrement * 0.8;
        const angle = baseAngle + angleJitter;
        
        // 4. Determine a random radius. The sqrt prevents clumping at the center,
        // and adding a MIN_RADIUS prevents a "dead zone" in the middle.
        const radius = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * Math.sqrt(Math.random());
        
        // Convert from polar (angle, radius) to Cartesian (x, y) coordinates.
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);

        starPositions.set(step.title, { quest: step, pos: { x, y } });
    });

    // The spread function still works perfectly to add a final "zoom" and ensure padding.
    const spreadPosition = (pos: { x: number; y: number }) => {
        const vecX = pos.x - 50;
        const vecY = pos.y - 50;
        const newX = clamp(50 + vecX * SPREAD_FACTOR, PADDING, 100 - PADDING);
        const newY = clamp(50 + vecY * SPREAD_FACTOR, PADDING, 100 - PADDING);
        return { x: newX, y: newY };
    };
    
    const interactiveStars = Array.from(starPositions.values()).map(data => ({
        ...data,
        pos: spreadPosition(data.pos),
    }));

    return { stars: interactiveStars };

  }, [constellationName, allQuests]); // This logic runs only when the constellation changes.

  return (
    <motion.div
      layoutId={layoutId}
      className="relative inset-0 w-full h-full p-6 md:p-10 flex flex-col"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
    >
      <StaticConstellationBackground />
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              className="rounded-full text-[var(--color-quest-shadow)] bg-white/10 shadow-md hover:text-background hover:bg-[var(--color-quest-shadow)] active:scale-90 transition-all font-semibold flex cursor-pointer"
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
                delay: 0.5 + index * 0.08,
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