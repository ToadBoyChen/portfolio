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

const questTypeIcons = { "": <FaStar />, "The Scholar's Path": <FaBookOpen />, "The Arcane Arts": <GiCrystalBall />, "Paths of Discovery": <FaProjectDiagram />, "The Way of the Warrior": <MdOutlineSportsKabaddi />, "The Gold-Spinner's Gambit": <GiGoldBar />, "The Chronicler's Task": <GiScrollQuill /> };

const GALAXY_NAMES = [
  "The Scholar's Path",
  "The Arcane Arts",
  "Paths of Discovery",
  "The Way of the Warrior",
  "The Gold-Spinner's Gambit",
  "The Chronicler's Task",
];

const StarryBackground = () => (
    <div className="fixed inset-0 z-0 bg-gray-900">
        <div className="absolute inset-0 bg-[url('/path-to-your/star-bg.svg')] bg-repeat opacity-20" />
    </div>
);

export function QuestUniverse() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [zoomedConstellation, setZoomedConstellation] = useState<string | null>(null);
  const navigate = useNavigate();

  // --- NEW "SINE WAVE" PATH LOGIC ---
  const { galaxyPositions, containerHeight } = useMemo(() => {
    const positions = new Map<string, { x: string; y: number }>();
    const numGalaxies = GALAXY_NAMES.length;

    // --- Configuration for the path ---
    const VERTICAL_SPACING = 450;
    const HORIZONTAL_AMPLITUDE = 130;
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
    
    storylines.forEach(storyline => {
      const quests = journeySteps.filter(step => step.questType === storyline).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      const baseRadius = 5, spread = 3;
      
      quests.forEach((step, i) => {
        const angle = i * 7;
        const radius = baseRadius + i * spread;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        starPositions.set(step.title, { quest: step, pos: { x, y } });
      });
    });
    return { starPositions };
  }, []);

  return (
    <>
      <StarryBackground />
        <div 
          className={`relative z-10 flex flex-col items-center w-full min-h-screen p-4 sm:p-8 text-white overflow-x-hidden 
          ${(selectedStep || zoomedConstellation) ? 'overflow-hidden' : ''}`}
        >
        <motion.main
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
        >
          <div className="text-center my-16 md:my-24">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              The Cosmic Trail
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl">
              Follow the path of your journey. Each nebula is a milestone, a story of your progress and discovery.
            </p>
          </div>
          <div
            className="relative w-full max-w-4xl"
            style={{ height: containerHeight }}
          >
            {GALAXY_NAMES.map((name) => {
              const position = galaxyPositions.get(name);
              if (!position) return null;

              return (
                <GalaxyNebula
                  key={name}
                  name={name}
                  icon={questTypeIcons[name as keyof typeof questTypeIcons]}
                  onSelect={() => setZoomedConstellation(name)}
                  layoutId={`constellation-${name}`}
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

          <motion.div
            className="fixed top-4 right-4 z-50"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
          >
            <Button variant="destructive" onClick={() => navigate('/')}>
              <ExitIcon className="mr-2 h-5 w-5" />
              Exit Universe
            </Button>
          </motion.div>
        </motion.main>
      </div>
      <AnimatePresence>
        {zoomedConstellation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
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
          <QuestModal step={selectedStep} onClose={() => setSelectedStep(null)} />
        )}
      </AnimatePresence>
    </>
  );
}