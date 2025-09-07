// src/components/journey/QuestUniverse.tsx

import { useState, useMemo, type FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Button } from "../ui/button";
import { FaBookOpen, FaProjectDiagram, FaStar } from "react-icons/fa";
import { GiCrystalBall, GiGoldBar, GiScrollQuill } from "react-icons/gi";
import { MdOutlineSportsKabaddi } from "react-icons/md";
import { ExitIcon } from "@radix-ui/react-icons";
import type { JourneyStep } from './JourneyTypes';
import { GalaxyNebula } from './GalaxyNebula';
import { ConstellationView } from './ConstellationView';
import { journeySteps } from "./journeyData";
import { QuestModal } from "./QuestModal";
import AnimatedText from "../../animation/AnimatedText";

interface StardustParticleProps {
  minSize?: number;
  maxSize?: number;
  color?: string;
}

const StardustParticle: FC<StardustParticleProps> = ({ 
  minSize = 0.5, 
  maxSize = 1.0, 
  color = "#ffffff" 
}) => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = 2 + Math.random() * 3;
  const delay = Math.random() * 3;
  const scale = minSize + Math.random() * (maxSize - minSize);

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${scale * 2}px`,
        height: `${scale * 2}px`,
        backgroundColor: color,
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

const questTypeIcons = { 
  "": <FaStar />, 
  "The Scholar's Path": <FaBookOpen />, 
  "The Arcane Arts": <GiCrystalBall />, 
  "Paths of Discovery": <FaProjectDiagram />, 
  "The Way of the Warrior": <MdOutlineSportsKabaddi />, 
  "The Gold-Spinner's Gambit": <GiGoldBar />, 
  "The Chronicler's Task": <GiScrollQuill /> 
};

const GALAXY_NAMES = [
  "The Scholar's Path",
  "The Arcane Arts",
  "Paths of Discovery",
  "The Way of the Warrior",
  "The Gold-Spinner's Gambit",
  "The Chronicler's Task",
];

const DynamicStarryBackground = () => (
  <div 
    className="fixed inset-0 z-0 overflow-hidden"
    style={{
      backgroundImage: 'radial-gradient(ellipse at center, hsl(215, 40%, 15%) 0%, hsl(220, 40%, 5%) 100%)',
    }}
  >
    <div className="absolute inset-0 opacity-50">
      {Array.from({ length: 100 }).map((_, i) => <StardustParticle key={i} />)}
    </div>
  </div>
);

export function QuestUniverse() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [zoomedConstellation, setZoomedConstellation] = useState<string | null>(null);
  const navigate = useNavigate();

  const { galaxyPositions, containerHeight } = useMemo(() => {
    const positions = new Map<string, { x: string; y: number }>();
    const numGalaxies = GALAXY_NAMES.length;

    const isSmallScreen = window.innerWidth < 640;
    const VERTICAL_SPACING = isSmallScreen ? 280 : 350;
    const HORIZONTAL_AMPLITUDE = isSmallScreen ? 30 : 120;
    const SINE_FREQUENCY = 5.0;

    GALAXY_NAMES.forEach((name, index) => {
      const y = index * VERTICAL_SPACING;
      const xOffset = HORIZONTAL_AMPLITUDE * Math.sin(index * SINE_FREQUENCY);
      const x = `calc(50% + ${xOffset}px)`;
      positions.set(name, { x, y });
    });
    const height = (numGalaxies - 1) * VERTICAL_SPACING + 500;
    return { galaxyPositions: positions, containerHeight: height };
  }, []);
  const cosmicWebData = useMemo(() => {
    const starPositions = new Map<string, { quest: JourneyStep; pos: { x: number; y: number } }>();
    const storylines = Array.from(new Set(journeySteps.map(step => step.questType)));

    const isSmallScreen = window.innerWidth < 640;
    const RADIUS_SCALE = isSmallScreen ? 0.6 : 1.0;
    const ANGLE_SCALE = isSmallScreen ? 0.7 : 1.0;

    storylines.forEach(storyline => {
      const quests = journeySteps
        .filter(step => step.questType === storyline)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      const baseRadius = 5, spread = 3;
      
      quests.forEach((step, i) => {
        const angle = i * 7 * ANGLE_SCALE;
        const radius = (baseRadius + i * spread) * RADIUS_SCALE;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        starPositions.set(step.title, { quest: step, pos: { x, y } });
      });
    });
    return { starPositions };
  }, []);

  return (
    <>
      <DynamicStarryBackground />
      <div 
        className={`relative z-10 flex flex-col items-center w-full min-h-screen p-4 sm:p-6 md:p-8 text-white overflow-x-hidden
        ${(selectedStep || zoomedConstellation) ? 'overflow-hidden' : ''}`}
      >
        <motion.main
          className="w-full flex flex-col items-center font-cinzel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
        >
          <div className="text-center my-12 sm:my-16 md:my-24 px-2">
            <AnimatedText 
              text="The Cosmic Trail"
              className="text-3xl sm:text-5xl md:text-6xl chango-regular font-bold text-quest-shadow"
              direction="down"
              alwaysAnimate={true}
            />
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-md sm:max-w-xl md:max-w-2xl mx-auto px-2">
              Welcome to the chronicle of my journey. Each nebula represents a distinct chapter in my life, showing the skills I've developed along the way. This is a living record of my growth, with new stories waiting to be told.
            </p>
          </div>
          <div
            className="relative w-full max-w-md sm:max-w-2xl md:max-w-4xl"
            style={{ height: containerHeight }}
          >
            {GALAXY_NAMES.map((name, index) => {
              const position = galaxyPositions.get(name);
              if (!position) return null;

              return (
                <GalaxyNebula
                  key={name}
                  name={name}
                  icon={questTypeIcons[name as keyof typeof questTypeIcons]}
                  onSelect={() => setZoomedConstellation(name)}
                  layoutId={`constellation-${name}`}
                  index={index}
                  style={{
                    position: 'absolute',
                    top: `${position.y}px`,
                    left: position.x,
                    transform: 'translateX(-50%)',
                  }}
                />
              );
            })}
          </div>
        </motion.main>
        
        <motion.div
          className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        >
          <Button className="rounded-full text-xs sm:text-sm md:text-base text-[var(--color-quest-shadow)] bg-white/10 shadow-md hover:text-background hover:bg-[var(--color-quest-shadow)] hover:shadow-lg active:scale-90 transition-all duration-300 tracking-wide font-semibold flex items-center hover:rotate-3 cursor-pointer px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3" onClick={() => navigate('/')}>
            <ExitIcon className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Exit Universe
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {zoomedConstellation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm font-cinzel px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ConstellationView
              key={zoomedConstellation}
              constellationName={zoomedConstellation}
              onClose={() => setZoomedConstellation(null)}
              onSelectStep={setSelectedStep}
              layoutId={`constellation-${zoomedConstellation}`}
              allStarPositions={cosmicWebData.starPositions}
            />
          </motion.div>
        )}
        {selectedStep && (
          <div className="font-cinzel px-2">
            <QuestModal step={selectedStep} onClose={() => setSelectedStep(null)} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}