import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import type { JourneyStep } from './JourneyTypes';
import { Star } from './Star';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';

interface ConstellationViewProps {
  constellationName: string;
  onClose: () => void;
  onSelectStep: (step: JourneyStep) => void;
  layoutId: string;
  allStarPositions: Map<string, { quest: JourneyStep; pos: { x: number; y: number } }>;
}

export const ConstellationView: FC<ConstellationViewProps> = ({ 
  constellationName, 
  onClose, 
  onSelectStep, 
  layoutId, 
  allStarPositions 
}) => {
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  
  const constellationData = useMemo(() => {
    const quests = Array.from(allStarPositions.values()).filter(
      data => data.quest.questType === constellationName
    );
    
    const intraLines: { from: { x: number; y: number }; to: { x: number; y: number }; fromQuest: JourneyStep; toQuest: JourneyStep }[] = [];
    const interLines: { from: { x: number; y: number }; to: { x: number; y: number }; met: boolean; fromQuest: JourneyStep; toQuest?: JourneyStep }[] = [];

    for (let i = 1; i < quests.length; i++) {
        intraLines.push({ 
          from: quests[i-1].pos, 
          to: quests[i].pos,
          fromQuest: quests[i-1].quest,
          toQuest: quests[i].quest
        });
    }

    quests.forEach(({ quest, pos }) => {
      quest.prerequisites?.forEach(prereqTitle => {
        const prereqData = allStarPositions.get(prereqTitle);
        if (prereqData) {
          interLines.push({
            from: pos, 
            to: prereqData.pos, 
                        met: prereqData.quest.progress === 100,
            fromQuest: quest,
            toQuest: prereqData.quest
          });
        }
      });
    });

    return { stars: quests, intraLines, interLines };
  }, [constellationName, allStarPositions]);

  return (
    <motion.div
      layoutId={layoutId}
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-950 via-purple-950 to-black p-6 md:p-10 flex flex-col"
    >
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
            className="group flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300"
            variant="ghost"
          >
            <ChevronLeft className="w-5 h-5 text-white transition-transform group-hover:-translate-x-1" />
            <span className="text-white/80 font-medium">Back</span>
          </Button>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            {constellationName}
          </h2>
        </div>
      </motion.div>
      
      {/* Constellation Map */}
      <div className="flex-1 relative">
        {/* Background nebula effect */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
            animate={{ 
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>
        
        {/* Star map */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Glow filter for lines */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Intra-constellation connections */}
          {constellationData.intraLines.map((line, i) => {
            const isHighlighted = hoveredStar === line.fromQuest.title || hoveredStar === line.toQuest.title;
            return (
              <motion.line
                key={`intra-${i}`} 
                x1={line.from.x} 
                y1={line.from.y} 
                x2={line.to.x} 
                y2={line.to.y}
                stroke="url(#constellation-gradient)"
                strokeWidth={isHighlighted ? "0.4" : "0.2"}
                opacity={isHighlighted ? 1 : 0.4}
                filter="url(#glow)"
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
              />
            );
          })}
          
          {/* Inter-constellation connections (prerequisites) */}
          {constellationData.interLines.map((line, i) => (
            <motion.line
              key={`inter-${i}`} 
              x1={line.from.x} 
              y1={line.from.y} 
              x2={line.to.x} 
              y2={line.to.y}
              stroke={line.met ? "rgba(34, 197, 94, 0.6)" : "rgba(239, 68, 68, 0.4)"}
              strokeWidth="0.3"
              strokeDasharray={line.met ? "none" : "1 2"}
              opacity={hoveredStar === line.fromQuest.title ? 1 : 0.5}
              initial={{ pathLength: 0, opacity: 0 }} 
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "circOut" }}
            />
          ))}
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0e7ff" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#c7d2fe" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ghost stars (prerequisites from other constellations) */}
        {constellationData.interLines.map((line, i) => {
          const prereqQuest = Array.from(allStarPositions.values()).find(s => s.pos === line.to)?.quest;
          if (!prereqQuest) return null;
          return (
            <motion.div
              key={`ghost-${i}`}
              className="absolute"
              style={{ 
                left: `${line.to.x}%`, 
                top: `${line.to.y}%`, 
                transform: 'translate(-50%, -50%)' 
              }}
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 0.3 }} 
              transition={{ delay: 0.8 }}
            >
              <div className="relative group cursor-not-allowed">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl scale-150 animate-pulse" />
                <Star 
                  step={prereqQuest} 
                  onSelect={() => {}} 
                  isGhost
                  onHover={() => {}}
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white/60 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  From: {prereqQuest.questType}
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* Main stars */}
        {constellationData.stars.map(({ quest, pos }) => (
          <motion.div
            key={quest.title}
            className="absolute"
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`, 
              transform: 'translate(-50%, -50%)' 
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: 'spring', 
              delay: 0.5 + constellationData.stars.findIndex(s => s.quest.title === quest.title) * 0.1,
              stiffness: 200,
              damping: 20
            }}
          >
            <Star 
              step={quest} 
              onSelect={onSelectStep}
              onHover={setHoveredStar}
            />
          </motion.div>
        ))}
        
        {/* Legend */}
        <motion.div 
          className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 space-y-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300" />
            <span className="text-white/60 text-sm">Quest Path</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-green-500 opacity-60" />
            <span className="text-white/60 text-sm">Completed Prerequisite</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-red-500 opacity-60 border-b-2 border-dashed border-red-500" />
            <span className="text-white/60 text-sm">Incomplete Prerequisite</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};