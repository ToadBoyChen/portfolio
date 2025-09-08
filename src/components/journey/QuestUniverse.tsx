// src/components/journey/QuestUniverse.tsx

import { useState, useMemo } from "react";
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

const StaticStarryBackground = () => (
  <div 
    className="fixed inset-0 -z-10"
    style={{
      backgroundImage: `
        radial-gradient(ellipse at center, hsl(215, 40%, 15%) 0%, hsl(220, 40%, 5%) 100%),
        radial-gradient(circle at 10% 20%, #ffffff1a 0.8px, transparent 0.8px),
        radial-gradient(circle at 75% 80%, #ffffff1a 0.8px, transparent 0.8px),
        radial-gradient(circle at 50% 50%, #ffffff0d 0.5px, transparent 0.5px)
      `,
      backgroundSize: '100% 100%, 50px 50px, 90px 90px, 70px 70px',
    }}
  />
);

// Helper function to keep values within a boundary
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

export function QuestUniverse() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [zoomedConstellation, setZoomedConstellation] = useState<string | null>(null);
  const navigate = useNavigate();

  // NEW: Replaced the sine-wave logic with a stable random position generator.
  // useMemo with an empty dependency array [] ensures this runs only ONCE,
  // so the planet positions are random but don't change on every re-render.
  const { galaxyPositions, containerHeight } = useMemo(() => {
    const positions = new Map<string, { x: string; y: number }>();
    const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;

    // --- Configuration for Random Layout ---
    const VERTICAL_SPACING = isSmallScreen ? 280 : 350; // Average distance between planets vertically
    const HORIZONTAL_JITTER = isSmallScreen ? 35 : 40; // Max % a planet can stray from the center
    const EDGE_PADDING = 15; // Min % distance from the left/right edges
    // ----------------------------------------

    GALAXY_NAMES.forEach((name, index) => {
      // Each planet gets its own vertical "zone" to prevent overlaps
      const y = index * VERTICAL_SPACING;

      // Generate a random horizontal position with "jitter"
      // (Math.random() - 0.5) gives a range from -0.5 to 0.5, for left/right deviation
      const randomJitter = (Math.random() - 0.5) * 2 * HORIZONTAL_JITTER;
      const baseX = 50 + randomJitter;
      
      // Clamp the value to ensure it respects the edge padding
      const x = clamp(baseX, EDGE_PADDING, 100 - EDGE_PADDING);

      positions.set(name, { x: `${x}%`, y });
    });

    const height = (GALAXY_NAMES.length - 1) * VERTICAL_SPACING + 500; // Extra space at the bottom
    return { galaxyPositions: positions, containerHeight: height };
  }, []); // Empty array means this logic runs only once.

  return (
    <>
      <StaticStarryBackground />
      <div 
        className={`relative z-10 flex flex-col items-center w-full min-h-screen p-4 sm:p-6 text-white overflow-x-hidden
        ${(zoomedConstellation || selectedStep) ? 'h-screen' : ''}`}
      >
        <motion.main
          className="w-full flex flex-col items-center font-cinzel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
        >
          <div className="text-center my-16 md:my-24 px-2">
            <AnimatedText 
              text="The Cosmic Trail"
              className="text-4xl sm:text-5xl md:text-6xl chango-regular font-bold text-quest-shadow"
              direction="down"
            />
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-400 max-w-md sm:max-w-2xl mx-auto">
              Welcome to the chronicle of my journey. Each nebula represents a distinct chapter in my life, showing the skills I've developed along the way.
            </p>
          </div>
          
          {/* This container now defines the scrollable area for our absolutely positioned nebulas */}
          <div
            className="relative w-full max-w-5xl mt-12"
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
                  // We now use absolute positioning based on our generated values
                  style={{
                    position: 'absolute',
                    top: `${position.y}px`,
                    left: position.x,
                    transform: 'translateX(-50%)', // Center the nebula on its x-coordinate
                  }}
                />
              );
            })}
          </div>
        </motion.main>
        
        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        >
          <Button className="rounded-full text-sm text-[var(--color-quest-shadow)] bg-white/10 shadow-md hover:text-background hover:bg-[var(--color-quest-shadow)] active:scale-90 transition-all font-semibold flex items-center hover:rotate-3 cursor-pointer px-4 py-2" onClick={() => navigate('/')}>
            <ExitIcon className="mr-2 h-5 w-5" />
            Exit Universe
          </Button>
        </motion.div>
      </div>
      <AnimatePresence>
        {zoomedConstellation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm font-cinzel p-2"
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
              allQuests={journeySteps}
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