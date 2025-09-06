import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useMemo, useState, useRef, useEffect } from 'react';
import type { JourneyStep } from './JourneyTypes';
import { Star } from './Star';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
import { GalaxyConnections, type Connection } from './GalaxyConnections';

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

// --- SIMPLIFIED: The background is now fully static and decorative ---
const ConstellationBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-950 to-black" />
    
    {/* Large, soft nebula blurs */}
    <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 0.8, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
    
    {/* Stardust Layers (translateZ styles removed) */}
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
);


interface ConstellationViewProps {
  constellationName: string; onClose: () => void; onSelectStep: (step: JourneyStep) => void; layoutId: string; allStarPositions: Map<string, { quest: JourneyStep; pos: { x: number; y: number } }>;
}

export const ConstellationView: FC<ConstellationViewProps> = ({ 
  constellationName, onClose, onSelectStep, layoutId, allStarPositions 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // (Dimension tracking logic is unchanged)
    const updateDimensions = () => { if (containerRef.current) { const { width, height } = containerRef.current.getBoundingClientRect(); setDimensions({ width, height }); } };
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);
  
  const constellationData = useMemo(() => {
    // (Data processing logic is unchanged)
    const questsInConstellation = Array.from(allStarPositions.values()).filter(data => data.quest.questType === constellationName);
    const sortedQuests = questsInConstellation.sort((a, b) => new Date(a.quest.date).getTime() - new Date(b.quest.date).getTime());
    const connections: Connection[] = [];
    const ghostStars: { quest: JourneyStep, pos: { x: number, y: number } }[] = [];
    for (let i = 1; i < sortedQuests.length; i++) { connections.push({ type: 'intra', from: { x: sortedQuests[i-1].pos.x * dimensions.width / 100, y: sortedQuests[i-1].pos.y * dimensions.height / 100 }, to: { x: sortedQuests[i].pos.x * dimensions.width / 100, y: sortedQuests[i].pos.y * dimensions.height / 100 }, id: `intra-${sortedQuests[i-1].quest.title}-${sortedQuests[i].quest.title}` }); }
    sortedQuests.forEach(({ quest, pos }) => {
      quest.prerequisites?.forEach(prereqTitle => {
        const prereqData = allStarPositions.get(prereqTitle);
        if (prereqData) { connections.push({ type: prereqData.quest.progress === 100 ? 'inter-met' : 'inter-unmet', from: { x: pos.x * dimensions.width / 100, y: pos.y * dimensions.height / 100 }, to: { x: prereqData.pos.x * dimensions.width / 100, y: prereqData.pos.y * dimensions.height / 100 }, id: `inter-${quest.title}-${prereqData.quest.title}` }); ghostStars.push(prereqData); }
      });
    });
    return { stars: sortedQuests, connections, ghostStars };
  }, [constellationName, allStarPositions, dimensions]);

  return (
    // This is the main animated container for the layout transition
    <motion.div layoutId={layoutId} className="relative inset-0 w-full h-full p-6 md:p-10 flex flex-col" exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}>
      
      {/* RENDER 1: The static, non-interactive background */}
      <ConstellationBackground />
        
      {/* RENDER 2: The interactive foreground content, layered on top */}
      <div ref={containerRef} className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <motion.div className="flex justify-between items-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center gap-4">
            <Button onClick={onClose} className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300" variant="ghost">
              <ChevronLeft className="w-5 h-5 text-white transition-transform group-hover:-translate-x-1" />
              <span className="text-white/80 font-medium">Back</span>
            </Button>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">{constellationName}</h2>
          </div>
        </motion.div>
        
        {/* Main Content Area */}
        <div className="relative flex-1">
          {dimensions.width > 0 && <GalaxyConnections connections={constellationData.connections} width={dimensions.width} height={dimensions.height} />}
          
          {constellationData.ghostStars.map(({ quest, pos }, i) => (
              <motion.div key={`ghost-${quest.title}-${i}`} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.3 }} transition={{ delay: 0.8 }}>
                <div className="relative group cursor-not-allowed">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl scale-150 animate-pulse" />
                  <Star step={quest} onSelect={() => {}} isGhost />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white/60 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">From: {quest.questType}</div>
                </div>
              </motion.div>
          ))}
          {constellationData.stars.map(({ quest, pos }, index) => (
            <motion.div key={quest.title} className="absolute" style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.5 + index * 0.1, stiffness: 200, damping: 20 }}>
              <Star step={quest} onSelect={onSelectStep} />
            </motion.div>
          ))}
          <motion.div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 space-y-2 text-left" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
            <div className="flex items-center gap-3"><div className="w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300" /><span className="text-white/60 text-sm">Quest Path</span></div>
            <div className="flex items-center gap-3"><div className="w-8 h-0.5 bg-green-500 opacity-70" /><span className="text-white/60 text-sm">Completed Prerequisite</span></div>
            <div className="flex items-center gap-3"><div className="w-8 h-0.5" style={{ background: 'repeating-linear-gradient(90deg, rgba(239, 68, 68, 0.6), rgba(239, 68, 68, 0.6) 4px, transparent 4px, transparent 8px)'}} /><span className="text-white/60 text-sm">Incomplete Prerequisite</span></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};