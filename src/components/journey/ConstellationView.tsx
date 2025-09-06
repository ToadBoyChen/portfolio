import React, { type FC, useMemo, useState, useRef } from 'react'; // Added React import for React.memo
import { motion } from 'framer-motion';
import type { JourneyStep } from './JourneyTypes';
import { Star } from './Star';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

// --- (StardustParticle component is unchanged) ---
interface StardustParticleProps {
  minSize?: number; maxSize?: number; color?: string;
}
const StardustParticle: FC<StardustParticleProps> = ({ minSize = 1, maxSize = 2, color = "#ffffff" }) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = 3 + Math.random() * 4;
  const delay = Math.random() * 4;
  const scale = minSize + Math.random() * (maxSize - minSize);
  return (
    <motion.div className="absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: `${scale}px`, height: `${scale}px`, backgroundColor: color, opacity: Math.random() * 0.5 + 0.3, }} initial={{ scale: 0.5 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }} />
  );
};

// --- ✨ CHANGED: Wrapped in React.memo for performance ---
// This prevents the background from re-rendering when state changes in the parent.
const ConstellationBackground = React.memo(() => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
    <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 0.8, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
    <div>
      <div>
        {Array.from({ length: 70 }).map((_, i) => <StardustParticle key={`bg-star-${i}`} minSize={1} maxSize={2} />)}
      </div>
      <div>
        {Array.from({ length: 30 }).map((_, i) => (
          <StardustParticle key={`fg-star-${i}`} minSize={2} maxSize={4} color={Math.random() > 0.3 ? '#a78bfa' : '#7dd3fc'} />
        ))}
      </div>
    </div>
  </div>
));
// Add a display name for better debugging
ConstellationBackground.displayName = 'ConstellationBackground';


interface ConstellationViewProps {
  constellationName: string; onClose: () => void; onSelectStep: (step: JourneyStep) => void; layoutId: string; allStarPositions: Map<string, { quest: JourneyStep; pos: { x: number; y: number } }>;
}

export const ConstellationView: FC<ConstellationViewProps> = ({ 
  constellationName, onClose, onSelectStep, layoutId, allStarPositions 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);

  const constellationData = useMemo(() => {
    // ✨ FIX: A more robust and explicit logic to prevent overlapping stars.

    // 1. Get all stars that should be INTERACTIVE in this view.
    const interactiveStars = Array
      .from(allStarPositions.values())
      .filter(data => data.quest.questType === constellationName);

    // 2. Create a Set of their titles for efficient lookup. This is our "do not duplicate" list.
    const interactiveStarTitles = new Set(interactiveStars.map(data => data.quest.title));

    // 3. Find all prerequisites for these interactive stars.
    const ghostStarMap = new Map<string, { quest: JourneyStep; pos: { x: number; y: number } }>();
    interactiveStars.forEach(({ quest }) => {
      quest.prerequisites?.forEach(prereqTitle => {
        // 4. IMPORTANT: If a prerequisite is NOT one of the main interactive stars, then it's a ghost.
        if (!interactiveStarTitles.has(prereqTitle)) {
          const prereqData = allStarPositions.get(prereqTitle);
          if (prereqData) {
            ghostStarMap.set(prereqTitle, prereqData);
          }
        }
      });
    });
    
    // Sort the main stars for consistent animation timing
    const sortedInteractiveStars = interactiveStars.sort((a, b) => new Date(a.quest.date).getTime() - new Date(b.quest.date).getTime());
    const ghostStars = Array.from(ghostStarMap.values());
    
    return { stars: sortedInteractiveStars, ghostStars };
  }, [constellationName, allStarPositions]);

  return (
    <motion.div layoutId={layoutId} className="relative inset-0 w-full h-full p-6 md:p-10 flex flex-col" exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}>
      
      <ConstellationBackground />
        
      <div ref={containerRef} className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <motion.div className="flex justify-between items-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-4">
            <Button onClick={onClose} className="rounded-full text-[var(--color-quest-shadow)] bg-white/10 shadow-md hover:text-background hover:bg-[var(--color-quest-shadow)] hover:shadow-lg active:scale-90 transition-all duration-300 tracking-wide font-semibold flex hover:rotate-3 cursor-pointer" variant="ghost">
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back</span>
            </Button>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text chango-regular text-white text-quest-shadow">{constellationName}</h2>
          </div>
        </motion.div>
        
        <div className="relative flex-1">
          {constellationData.ghostStars.map(({ quest, pos }, i) => (
              <motion.div 
                key={`ghost-${quest.title}-${i}`} 
                className="absolute" 
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)', zIndex: 1 }} 
                initial={{ scale: 0, opacity: 0 }} 
                animate={{ scale: 1, opacity: 0.3 }} 
                transition={{ delay: 0.8 }}
              >
                <div className="w-5 h-5 bg-purple-400/30 rounded-full blur-sm pointer-events-none" />
              </motion.div>
          ))}
          {constellationData.stars.map(({ quest, pos }, index) => (
            <motion.div 
              key={quest.title} 
              className="absolute" 
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)', zIndex: hoveredStar === quest.title ? 20 : 10 }} 
              onMouseEnter={() => setHoveredStar(quest.title)}
              onMouseLeave={() => setHoveredStar(null)}
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ type: 'spring', delay: 0.5 + index * 0.1, stiffness: 200, damping: 20 }}
            >
              <Star step={quest} onSelect={onSelectStep} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};