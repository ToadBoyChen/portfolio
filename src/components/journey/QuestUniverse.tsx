import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaBookOpen, FaProjectDiagram } from "react-icons/fa";
import { GiCrystalBall, GiGoldBar, GiScrollQuill } from "react-icons/gi";
import { MdOutlineSportsKabaddi } from "react-icons/md";
import { ExitIcon } from "@radix-ui/react-icons";
import type { JourneyStep } from "./JourneyTypes";
import { ConstellationView } from "./ConstellationView";
import { journeySteps } from "./journeyData";
import { QuestModal } from "./QuestModal";
import AnimatedText from "../../animation/AnimatedText";
import { GalaxyCard } from "./GalaxyCard"; // <-- Import the new component

// Icon map (unchanged)
const questTypeIcons = {
  "The Scholar's Path": <FaBookOpen />,
  "The Arcane Arts": <GiCrystalBall />,
  "Paths of Discovery": <FaProjectDiagram />,
  "The Way of the Warrior": <MdOutlineSportsKabaddi />,
  "The Gold-Spinner's Gambit": <GiGoldBar />,
  "The Chronicler's Task": <GiScrollQuill />,
};

const GALAXY_NAMES = [
  "The Scholar's Path", "The Arcane Arts", "Paths of Discovery",
  "The Way of the Warrior", "The Gold-Spinner's Gambit", "The Chronicler's Task",
];

// New! The fully animated background component
const CosmicBackground = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
            {/* Base static nebula */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(215,40%,15%)_0%,hsl(220,40%,5%)_100%)]" />
            
            {/* Parallax Star Layers */}
            <div className="parallax-layer layer-1" />
            <div className="parallax-layer layer-2" />
            <div className="parallax-layer layer-3" />

            {/* Shooting Stars */}
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
        </div>
    );
};

// And add this extensive CSS to your global stylesheet (e.g., index.css)
/*
:root {
  --mouse-x: 50vw;
  --mouse-y: 50vh;
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.layer-1 {
  background-image: radial-gradient(circle at 10% 20%, #ffffff1a 0.8px, transparent 0.8px), radial-gradient(circle at 75% 80%, #ffffff1a 0.8px, transparent 0.8px);
  background-size: 50px 50px;
  transform: translate(calc( (var(--mouse-x) - 50vw) / -50 ), calc( (var(--mouse-y) - 50vh) / -50 ));
}
.layer-2 {
  background-image: radial-gradient(circle at 50% 50%, #ffffff0d 0.5px, transparent 0.5px);
  background-size: 70px 70px;
  transform: translate(calc( (var(--mouse-x) - 50vw) / -25 ), calc( (var(--mouse-y) - 50vh) / -25 ));
}
.layer-3 {
  background-image: radial-gradient(circle at 25% 75%, #ffffff1f 0.6px, transparent 0.6px);
  background-size: 90px 90px;
  transform: translate(calc( (var(--mouse-x) - 50vw) / -15 ), calc( (var(--mouse-y) - 50vh) / -15 ));
}

.shooting-star {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1), 0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 1);
  animation: animate-star 10s linear infinite;
}
.shooting-star::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, #fff, transparent);
}
.shooting-star:nth-child(1) {
  top: 0;
  left: -100px;
  animation-delay: 0s;
  animation-duration: 9s;
}
.shooting-star:nth-child(2) {
  top: 80%;
  left: 0;
  animation-delay: 4.2s;
  animation-duration: 12s;
}

@keyframes animate-star {
  0% { transform: rotate(315deg) translateX(0); opacity: 1; }
  70% { opacity: 1; }
  100% { transform: rotate(315deg) translateX(150vw); opacity: 0; }
}
*/


// Main component
export function QuestUniverse() {
  const [selectedStep, setSelectedStep] = useState<JourneyStep | null>(null);
  const [zoomedConstellation, setZoomedConstellation] = useState<string | null>(null);
  const navigate = useNavigate();

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <>
      <CosmicBackground />

      <div className="relative z-10 flex flex-col items-center w-full min-h-screen p-4 sm:p-6 text-white overflow-x-hidden">
        <motion.main
          className="w-full flex flex-col items-center font-cinzel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 0.2 } }}
        >
          <div className="text-center my-16 md:my-24 px-2">
            <AnimatedText
              text="Cosmic Trail"
              className="text-4xl sm:text-5xl md:text-7xl chango-regular font-bold 
                         text-white [text-shadow:0_0_10px_theme(colors.cyan.300),0_0_20px_theme(colors.cyan.400),0_0_40px_theme(colors.purple.500)]"
              direction="down"
            />
            <motion.p 
              className="mt-6 text-sm sm:text-base text-slate-300 max-w-md sm:max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.8 } }}
            >
              The universe of experience is vast. Each constellation before you is a chapter, a distinct path traveled.
              <br className="hidden sm:block" />
              Hover to glimpse its essence. Click to explore the quests within.
            </motion.p>
          </div>

          <div className="w-full max-w-4xl mt-4">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {GALAXY_NAMES.map((name) => (
                <GalaxyCard
                  key={name}
                  name={name}
                  icon={questTypeIcons[name as keyof typeof questTypeIcons]}
                  onSelect={() => setZoomedConstellation(name)}
                  layoutId={`constellation-${name}`}
                />
              ))}
            </motion.div>
          </div>
        </motion.main>

        <motion.div
          className="fixed top-4 right-4 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 1 } }}
        >
          <Button
            onClick={() => navigate("/")}
            className="rounded-full text-sm text-cyan-200 bg-black/30 border border-cyan-200/20 backdrop-blur-sm
                       shadow-lg shadow-cyan-500/10 hover:bg-cyan-300/20 hover:text-white active:scale-95 
                       transition-all font-semibold flex items-center px-4 py-2"
          >
            <ExitIcon className="mr-2 h-5 w-5" />
            Exit Universe
          </Button>
        </motion.div>
      </div>

      {/* Modals section (unchanged) */}
      <AnimatePresence>
        {zoomedConstellation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-lg font-cinzel p-2"
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