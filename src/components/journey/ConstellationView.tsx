import type { FC } from 'react';
import { motion } from 'framer-motion';
import { useMemo, useState, useRef, useEffect } from 'react';
import type { JourneyStep } from './JourneyTypes';
import { Star } from './Star';
import { Button } from '../ui/button';
import { ChevronLeft } from 'lucide-react';
// Import the enhanced GalaxyConnections component and its Connection type
import { GalaxyConnections, type Connection } from './GalaxyConnections';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Get the pixel dimensions of the container to correctly position the connection lines
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);
  
  const constellationData = useMemo(() => {
    const questsInConstellation = Array.from(allStarPositions.values()).filter(
      data => data.quest.questType === constellationName
    );
    
    // Sort quests by date to draw the main path chronologically
    const sortedQuests = questsInConstellation.sort((a, b) => new Date(a.quest.date).getTime() - new Date(b.quest.date).getTime());
    
    const connections: Connection[] = [];
    const ghostStars: { quest: JourneyStep, pos: { x: number, y: number } }[] = [];

    // 1. Create intra-constellation connections (the main quest path)
    for (let i = 1; i < sortedQuests.length; i++) {
        const fromQuest = sortedQuests[i-1];
        const toQuest = sortedQuests[i];
        connections.push({
          type: 'intra',
          from: { 
            x: fromQuest.pos.x * dimensions.width / 100, 
            y: fromQuest.pos.y * dimensions.height / 100 
          },
          to: { 
            x: toQuest.pos.x * dimensions.width / 100, 
            y: toQuest.pos.y * dimensions.height / 100 
          },
          id: `intra-${fromQuest.quest.title}-${toQuest.quest.title}`
        });
    }

    // 2. Create inter-constellation connections (prerequisites)
    sortedQuests.forEach(({ quest, pos }) => {
      quest.prerequisites?.forEach(prereqTitle => {
        const prereqData = allStarPositions.get(prereqTitle);
        if (prereqData) {
          connections.push({
            type: prereqData.quest.progress === 100 ? 'inter-met' : 'inter-unmet',
            from: { 
              x: pos.x * dimensions.width / 100, 
              y: pos.y * dimensions.height / 100 
            },
            to: { 
              x: prereqData.pos.x * dimensions.width / 100, 
              y: prereqData.pos.y * dimensions.height / 100 
            },
            id: `inter-${quest.title}-${prereqData.quest.title}`
          });
          // Also add the prerequisite star to our list of ghost stars to render
          ghostStars.push(prereqData);
        }
      });
    });

    return { stars: sortedQuests, connections, ghostStars };
  }, [constellationName, allStarPositions, dimensions]);

  return (
    <motion.div
      layoutId={layoutId}
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-950 via-purple-950 to-black p-6 md:p-10 flex flex-col"
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
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
      
      <div className="flex-1 relative" ref={containerRef}>
        {/* Background nebula effect */}
        <div className="absolute inset-0 opacity-20">
          <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity }}/>
          <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 0.8, 1] }} transition={{ duration: 12, repeat: Infinity }}/>
        </div>
        
        {dimensions.width > 0 && (
          <GalaxyConnections 
            connections={constellationData.connections}
            width={dimensions.width}
            height={dimensions.height}
          />
        )}
        
        {/* Ghost stars (prerequisites from other constellations) */}
        {constellationData.ghostStars.map(({ quest, pos }, i) => (
            <motion.div
              key={`ghost-${quest.title}-${i}`}
              className="absolute"
              style={{ 
                left: `${pos.x}%`, 
                top: `${pos.y}%`, 
                transform: 'translate(-50%, -50%)' 
              }}
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 0.3 }} 
              transition={{ delay: 0.8 }}
            >
              <div className="relative group cursor-not-allowed">
                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl scale-150 animate-pulse" />
                <Star 
                  step={quest} 
                  onSelect={() => {}} 
                  isGhost
                  onHover={() => {}}
                />
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white/60 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  From: {quest.questType}
                </div>
              </div>
            </motion.div>
        ))}
        
        {/* Main stars */}
        {constellationData.stars.map(({ quest, pos }, index) => (
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
              delay: 0.5 + index * 0.1,
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
          className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md rounded-xl p-4 space-y-2 text-left"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-gradient-to-r from-indigo-300 to-purple-300" />
            <span className="text-white/60 text-sm">Quest Path</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-green-500 opacity-70" />
            <span className="text-white/60 text-sm">Completed Prerequisite</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5" style={{ background: 'repeating-linear-gradient(90deg, rgba(239, 68, 68, 0.6), rgba(239, 68, 68, 0.6) 4px, transparent 4px, transparent 8px)'}} />
            <span className="text-white/60 text-sm">Incomplete Prerequisite</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};